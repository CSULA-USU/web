import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

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
 */
export const checkRateLimit = async (
  limiter: Ratelimit,
  identifier: string,
): Promise<RateLimitOutcome> => {
  try {
    const { success, limit, remaining, reset } = await limiter.limit(
      identifier,
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
