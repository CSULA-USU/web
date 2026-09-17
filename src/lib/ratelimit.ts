import { createHash, createHmac } from 'crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const HASH_SECRET = process.env.RATELIMIT_HASH_SECRET;

let hasWarnedAboutMissingSecret = false;

/**
 * Turns a rate-limit identifier into an opaque key.
 *
 * The identifiers here are a visitor's IP address, and for the per-submitter
 * limit an IP paired with their email — directly identifying, and previously
 * written to Upstash verbatim as the Redis key. A limiter only ever needs to
 * know whether it has seen the same caller before, never who that caller is,
 * so hashing costs nothing: the same input yields the same key and the counts
 * behave identically.
 *
 * Keyed rather than plain, because a bare digest of an email is guessable. The
 * address space of `@calstatela.edu` addresses is small and the format is
 * predictable, so anyone holding the digests could hash their way back to the
 * originals. Mixing in a secret the server alone knows removes that.
 *
 * Falls back to an unkeyed digest when no secret is configured, and says so
 * once. That is weaker, but it still keeps plaintext out of Upstash, and a
 * missing environment variable should not take down the only written channel
 * students have to reach the U-SU — the same reasoning as `checkRateLimit`.
 *
 * Changing or introducing the secret re-keys everyone, which empties the
 * current windows. Harmless: they are minutes and hours long.
 */
export const hashIdentifier = (identifier: string): string => {
  if (HASH_SECRET) {
    return createHmac('sha256', HASH_SECRET).update(identifier).digest('hex');
  }

  if (!hasWarnedAboutMissingSecret) {
    hasWarnedAboutMissingSecret = true;
    console.warn(
      '[RATELIMIT_HASH_SECRET_MISSING] Falling back to an unkeyed digest. ' +
        'Rate-limit keys stay opaque but become guessable; set the variable.',
    );
  }

  return createHash('sha256').update(identifier).digest('hex');
};

/**
 * Per-submitter limit, keyed on IP *and* email: bounds how often one person can
 * resubmit the contact form.
 */
export const jotformContactRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'ratelimit:contact',
});

/**
 * Per-origin limit, keyed on IP alone.
 *
 * The limit above cannot stand on its own: varying the email varies the key, so
 * one machine inventing a fresh address each time gets a fresh allowance every
 * time — which is the exact shape automated form spam takes, and it matters
 * here because a submission makes the site send a confirmation email to
 * whatever address it was handed. This bounds the machine regardless of what it
 * claims to be.
 *
 * The ceiling is deliberately loose rather than tight. Campus traffic egresses
 * through a small number of shared addresses, so a low per-IP limit would lock
 * out real students during any burst — a facility problem prompting a run of
 * complaints, say. This is a backstop against runaway automation, not the
 * precise gate; the per-submitter limit above is what paces an individual.
 */
export const jotformContactIpRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 h'),
  analytics: true,
  prefix: 'ratelimit:contact:ip',
});

export interface RateLimitOutcome {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
  /** The limiter could not be reached, and the caller was let through anyway. */
  degraded: boolean;
}

/**
 * Applies a limiter, treating an unreachable Upstash as "allow".
 *
 * Pacing is a nice-to-have; the contact form is the only way a student can
 * reach the U-SU in writing. When the limiter itself is down, refusing every
 * submission costs far more than briefly accepting unthrottled ones — and the
 * checks that actually catch bots, the honeypot and the fill-duration floor,
 * run in-process and are unaffected by Upstash being gone. This exact failure
 * took the form down completely once already.
 *
 * A refusal from a *working* limiter is still a refusal. Only an error
 * reaching one is waved through, and it is logged loudly under a searchable
 * tag, because a fail-open nobody can see is indistinguishable from a limiter
 * that silently stopped doing anything.
 *
 * Takes the raw identifier and hashes it here rather than asking callers to,
 * so no future call site can leak an IP or an email to Upstash by forgetting.
 */
export const checkRateLimit = async (
  limiter: Ratelimit,
  identifier: string,
): Promise<RateLimitOutcome> => {
  try {
    const { success, limit, remaining, reset } = await limiter.limit(
      hashIdentifier(identifier),
    );
    return { success, limit, remaining, reset, degraded: false };
  } catch (error) {
    console.error(
      '[RATELIMIT_UNAVAILABLE]',
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      }),
    );
    return { success: true, degraded: true };
  }
};
