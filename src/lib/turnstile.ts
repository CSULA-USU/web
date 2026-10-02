const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Cloudflare's documented ceiling on a token's length. */
const MAX_TOKEN_LENGTH = 2048;

/* Long enough for a slow siteverify round trip, short enough that an outage
   costs the visitor a few seconds rather than the whole function timeout. */
const SITEVERIFY_TIMEOUT_MS = 5000;

/* Siteverify answers these when the fault is ours or Cloudflare's rather than
   the visitor's — a bad or missing secret, or Cloudflare's own failure. They
   count as "could not check", not as "failed the check". */
const NOT_THE_VISITORS_FAULT = new Set([
  'missing-input-secret',
  'invalid-input-secret',
  'internal-error',
]);

/**
 * - `human` — Cloudflare confirmed the token.
 * - `rejected` — the token is missing, malformed, spent, or failed.
 * - `unverified` — the check could not run: no secret configured, Cloudflare
 *   unreachable, or an error on Cloudflare's side.
 *
 * Callers accept `unverified` and log it, by decision: during an outage a
 * dropped message is real feedback lost, while the honeypot, fill-time check
 * and rate limits still stand. `rejected` is never accepted. A missing token in
 * particular stays a rejection even though an outage would also leave the
 * browser without one — accepting tokenless submissions would let any script
 * skip the check by leaving the field out.
 */
export type TurnstileVerdict = 'human' | 'rejected' | 'unverified';

const logUnverified = (reason: string, details?: Record<string, unknown>) => {
  console.error(
    '[TURNSTILE_UNVERIFIED]',
    JSON.stringify({ reason, ...details }),
  );
};

export const verifyTurnstileToken = async (
  token: unknown,
  remoteIp?: string,
  secret: string | undefined = process.env.TURNSTILE_SECRET_KEY,
): Promise<TurnstileVerdict> => {
  if (!secret) {
    logUnverified('TURNSTILE_SECRET_KEY is not set');
    return 'unverified';
  }

  if (typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) {
    return 'rejected';
  }

  const body = new URLSearchParams({ secret, response: token });
  /* The visitor's browser has already sent Cloudflare this address by
     loading the widget; passing it along lets siteverify compare the two. */
  if (remoteIp && remoteIp !== 'unknown') body.append('remoteip', remoteIp);

  let outcome: { success?: unknown; 'error-codes'?: unknown };
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
    });
    if (!response.ok) {
      logUnverified('siteverify returned an HTTP error', {
        status: response.status,
      });
      return 'unverified';
    }
    outcome = await response.json();
  } catch (error) {
    logUnverified('siteverify was unreachable', {
      message: error instanceof Error ? error.message : String(error),
    });
    return 'unverified';
  }

  /* No check on the response's `hostname`: the widget is restricted to this
     site's hostnames in the Cloudflare dashboard, so a token cannot be minted
     anywhere else, and Cloudflare's test keys report a placeholder hostname
     that would fail every local and preview submission. */
  if (outcome.success === true) return 'human';

  const errorCodes = Array.isArray(outcome['error-codes'])
    ? outcome['error-codes'].filter(
        (code): code is string => typeof code === 'string',
      )
    : [];
  if (errorCodes.some((code) => NOT_THE_VISITORS_FAULT.has(code))) {
    logUnverified('siteverify could not check the token', { errorCodes });
    return 'unverified';
  }

  return 'rejected';
};
