import { checkRateLimit, hashIdentifier } from 'lib/ratelimit';

jest.mock('@upstash/redis', () => ({
  Redis: { fromEnv: () => ({}) },
}));

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

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

describe('hashIdentifier', () => {
  const EMAIL_IDENTIFIER = '73.223.14.22:student@calstatela.edu';

  it('produces a sha256-shaped hex digest', () => {
    expect(hashIdentifier(EMAIL_IDENTIFIER)).toMatch(/^[0-9a-f]{64}$/);
  });

  it('is deterministic, so the same caller keeps the same bucket', () => {
    expect(hashIdentifier(EMAIL_IDENTIFIER)).toBe(
      hashIdentifier(EMAIL_IDENTIFIER),
    );
  });

  it('separates callers that differ at all', () => {
    expect(hashIdentifier('73.223.14.22:a@calstatela.edu')).not.toBe(
      hashIdentifier('73.223.14.22:b@calstatela.edu'),
    );
    expect(hashIdentifier('73.223.14.22')).not.toBe(
      hashIdentifier('73.223.14.23'),
    );
  });

  /* The point of the whole exercise: nothing recognizable about the visitor
     may survive into the value handed to Upstash. */
  it('leaves no trace of the address or email in the digest', () => {
    const digest = hashIdentifier(EMAIL_IDENTIFIER);

    expect(digest).not.toContain('73.223.14.22');
    expect(digest).not.toContain('student');
    expect(digest).not.toContain('calstatela');
    expect(digest).not.toContain('@');
  });
});

describe('checkRateLimit identifier handling', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /* Hashing lives inside checkRateLimit precisely so a call site cannot skip
     it, which makes this the assertion that guards the privacy property. */
  it('sends the limiter a digest, never the raw identifier', async () => {
    const limit = jest
      .fn()
      .mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: 1 });
    const limiter = { limit } as unknown as Parameters<
      typeof checkRateLimit
    >[0];

    await checkRateLimit(limiter, '73.223.14.22:student@calstatela.edu');

    const keyUsed = limit.mock.calls[0][0];
    expect(keyUsed).toMatch(/^[0-9a-f]{64}$/);
    expect(keyUsed).not.toContain('calstatela.edu');
    expect(keyUsed).toBe(hashIdentifier('73.223.14.22:student@calstatela.edu'));
  });
});

/* Guards against the secret being read but not actually mixed in — a keyed and
   an unkeyed digest of the same input must differ, or HMAC is decorative. */
describe('hashIdentifier keying', () => {
  const ORIGINAL_SECRET = process.env.RATELIMIT_HASH_SECRET;

  const digestWithSecret = (secret?: string) => {
    jest.resetModules();
    if (secret === undefined) {
      delete process.env.RATELIMIT_HASH_SECRET;
    } else {
      process.env.RATELIMIT_HASH_SECRET = secret;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('lib/ratelimit');
    return mod.hashIdentifier('73.223.14.22:student@calstatela.edu');
  };

  afterEach(() => {
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.RATELIMIT_HASH_SECRET;
    } else {
      process.env.RATELIMIT_HASH_SECRET = ORIGINAL_SECRET;
    }
    jest.resetModules();
  });

  it('produces a different digest with a secret than without', () => {
    expect(digestWithSecret('a-server-side-secret')).not.toBe(
      digestWithSecret(undefined),
    );
  });

  it('produces a different digest for a different secret', () => {
    expect(digestWithSecret('secret-one')).not.toBe(
      digestWithSecret('secret-two'),
    );
  });

  it('stays sha256-shaped either way', () => {
    expect(digestWithSecret('a-server-side-secret')).toMatch(/^[0-9a-f]{64}$/);
    expect(digestWithSecret(undefined)).toMatch(/^[0-9a-f]{64}$/);
  });
});
