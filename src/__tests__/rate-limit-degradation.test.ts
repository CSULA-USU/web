import { checkRateLimit } from 'lib/ratelimit';

jest.mock('@upstash/redis', () => ({
  Redis: { fromEnv: () => ({}) },
}));

type LimiterStub = Parameters<typeof checkRateLimit>[0];

const limiterReturning = (result: unknown): LimiterStub =>
  ({ limit: jest.fn().mockResolvedValue(result) } as unknown as LimiterStub);

const limiterThrowing = (error: unknown): LimiterStub =>
  ({ limit: jest.fn().mockRejectedValue(error) } as unknown as LimiterStub);

describe('checkRateLimit', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('passes through an allowed request with its counters', async () => {
    const outcome = await checkRateLimit(
      limiterReturning({
        success: true,
        limit: 5,
        remaining: 4,
        reset: 1_700_000_000,
      }),
      'ip:person@example.com',
    );

    expect(outcome).toEqual({
      success: true,
      limit: 5,
      remaining: 4,
      reset: 1_700_000_000,
      degraded: false,
    });
  });

  /* The whole point of the guard below is that it must not turn a genuine
     refusal into an allow -- only an unreachable limiter gets waved through. */
  it('still refuses when a working limiter says no', async () => {
    const outcome = await checkRateLimit(
      limiterReturning({ success: false, limit: 5, remaining: 0, reset: 1 }),
      'ip:person@example.com',
    );

    expect(outcome.success).toBe(false);
    expect(outcome.degraded).toBe(false);
  });

  it('allows the request when the limiter cannot be reached', async () => {
    const outcome = await checkRateLimit(
      limiterThrowing(new TypeError('fetch failed')),
      '127.0.0.1',
    );

    expect(outcome.success).toBe(true);
    expect(outcome.degraded).toBe(true);
  });

  it('omits counters while degraded so no ceiling is advertised', async () => {
    const outcome = await checkRateLimit(
      limiterThrowing(new TypeError('fetch failed')),
      '127.0.0.1',
    );

    expect(outcome.limit).toBeUndefined();
    expect(outcome.remaining).toBeUndefined();
    expect(outcome.reset).toBeUndefined();
  });

  /* A silent fail-open is indistinguishable from a limiter that quietly
     stopped working, so the log line is part of the behavior. */
  it('logs the outage under a searchable tag', async () => {
    await checkRateLimit(limiterThrowing(new Error('ECONNREFUSED')), '1.2.3.4');

    expect(console.error).toHaveBeenCalledWith(
      '[RATELIMIT_UNAVAILABLE]',
      expect.stringContaining('ECONNREFUSED'),
    );
  });

  it('handles a non-Error rejection', async () => {
    const outcome = await checkRateLimit(limiterThrowing('boom'), '1.2.3.4');

    expect(outcome.success).toBe(true);
    expect(outcome.degraded).toBe(true);
  });
});
