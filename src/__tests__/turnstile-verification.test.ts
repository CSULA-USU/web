import { verifyTurnstileToken } from 'lib/turnstile';

const SECRET = 'test-secret';

const respondWith = (
  body: unknown,
  init: { ok?: boolean; status?: number } = {},
) =>
  jest.fn().mockResolvedValue({
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  });

describe('verifyTurnstileToken', () => {
  const originalFetch = global.fetch;
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    global.fetch = originalFetch;
    consoleError.mockRestore();
  });

  it('passes a token Cloudflare confirms', async () => {
    global.fetch = respondWith({ success: true });

    await expect(
      verifyTurnstileToken('token', '203.0.113.7', SECRET),
    ).resolves.toBe('human');
  });

  it('sends the secret, the token and the visitor IP to siteverify', async () => {
    const fetchMock = respondWith({ success: true });
    global.fetch = fetchMock;

    await verifyTurnstileToken('token', '203.0.113.7', SECRET);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    );
    const body = init.body as URLSearchParams;
    expect(body.get('secret')).toBe(SECRET);
    expect(body.get('response')).toBe('token');
    expect(body.get('remoteip')).toBe('203.0.113.7');
  });

  it('leaves out an IP the route could not determine', async () => {
    const fetchMock = respondWith({ success: true });
    global.fetch = fetchMock;

    await verifyTurnstileToken('token', 'unknown', SECRET);

    expect(
      (fetchMock.mock.calls[0][1].body as URLSearchParams).has('remoteip'),
    ).toBe(false);
  });

  it.each([
    ['missing', undefined],
    ['empty', ''],
    ['not a string', 42],
    ['over the length limit', 'x'.repeat(2049)],
  ])('rejects a %s token without calling Cloudflare', async (_, token) => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    await expect(
      verifyTurnstileToken(token, '203.0.113.7', SECRET),
    ).resolves.toBe('rejected');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['invalid-input-response', 'timeout-or-duplicate', 'bad-request'])(
    'rejects a token Cloudflare fails with %s',
    async (errorCode) => {
      global.fetch = respondWith({
        success: false,
        'error-codes': [errorCode],
      });

      await expect(
        verifyTurnstileToken('token', undefined, SECRET),
      ).resolves.toBe('rejected');
    },
  );

  describe('when the check cannot run, it lets the submission through and logs it', () => {
    it('with no secret configured', async () => {
      const fetchMock = jest.fn();
      global.fetch = fetchMock;

      await expect(verifyTurnstileToken('token', undefined, '')).resolves.toBe(
        'unverified',
      );
      expect(fetchMock).not.toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith(
        '[TURNSTILE_UNVERIFIED]',
        expect.any(String),
      );
    });

    it('when Cloudflare is unreachable', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('fetch failed'));

      await expect(
        verifyTurnstileToken('token', undefined, SECRET),
      ).resolves.toBe('unverified');
      expect(consoleError).toHaveBeenCalledWith(
        '[TURNSTILE_UNVERIFIED]',
        expect.stringContaining('fetch failed'),
      );
    });

    it('when siteverify answers with an HTTP error', async () => {
      global.fetch = respondWith({}, { ok: false, status: 503 });

      await expect(
        verifyTurnstileToken('token', undefined, SECRET),
      ).resolves.toBe('unverified');
    });

    it.each(['internal-error', 'invalid-input-secret', 'missing-input-secret'])(
      'when Cloudflare reports %s, which is not the visitor’s fault',
      async (errorCode) => {
        global.fetch = respondWith({
          success: false,
          'error-codes': [errorCode],
        });

        await expect(
          verifyTurnstileToken('token', undefined, SECRET),
        ).resolves.toBe('unverified');
      },
    );
  });
});
