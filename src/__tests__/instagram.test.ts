import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

jest.mock('lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

import handler from 'pages/api/instagram';
import { supabase } from 'lib/supabase';

const mockFrom = supabase.from as jest.Mock;

const TOKEN_NAMES = [
  'IG_TOKEN_USU',
  'IG_TOKEN_GRAFFIX',
  'IG_TOKEN_CSI',
  'IG_TOKEN_RECREATION',
  'IG_TOKEN_CCC',
  'IG_TOKEN_APISRC',
  'IG_TOKEN_CLSRC',
  'IG_TOKEN_PASRC',
  'IG_TOKEN_GSRC',
];

const FEED = {
  data: [
    {
      id: '1',
      media_url: 'https://scontent-lax3-1.cdninstagram.com/v/photo.jpg?oh=abc',
      media_type: 'IMAGE',
      username: 'usucalstatela',
    },
  ],
};

const mockTokens = (names: string[] = TOKEN_NAMES) => {
  mockFrom.mockReturnValue({
    select: jest.fn().mockResolvedValue({
      data: names.map((name) => ({ name, token: `token-${name}` })),
    }),
  });
};

const invoke = async (query: Record<string, unknown> = {}) => {
  const req = createRequest<NextApiRequest>({ method: 'GET', query });
  const res = createResponse<NextApiResponse>();
  await handler(req, res);
  return res;
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('GET /api/instagram', () => {
  it('returns the feed for the requested org', async () => {
    mockTokens();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => FEED,
    });

    const res = await invoke({ org: 'gsrc' });

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ data: FEED });
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
      'token-IG_TOKEN_GSRC',
    );
  });

  it('defaults to the usu org', async () => {
    mockTokens();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => FEED,
    });

    await invoke();

    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
      'token-IG_TOKEN_USU',
    );
  });

  /* The proxy at /api/instagram-image keys its cache on the signed URLs this
     route hands out, and Instagram re-signs them per call — so this header is
     what makes the whole image path cacheable. Losing it silently restores the
     per-pageview refetch, which is why it is asserted rather than assumed. */
  it('caches a successful response in shared caches', async () => {
    mockTokens();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => FEED,
    });

    const res = await invoke();
    const cacheControl = String(res.getHeader('Cache-Control'));

    expect(cacheControl).toContain('s-maxage=3600');
    expect(cacheControl).toContain('stale-while-revalidate=3600');
    expect(cacheControl).toContain('max-age=0');
  });

  it('does not cache an upstream failure', async () => {
    mockTokens();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({}),
    });

    const res = await invoke();

    expect(res._getStatusCode()).toBe(429);
    expect(res.getHeader('Cache-Control')).toBeUndefined();
  });

  it('throws when an Instagram token is missing', async () => {
    mockTokens(TOKEN_NAMES.filter((name) => name !== 'IG_TOKEN_PASRC'));

    await expect(invoke()).rejects.toThrow(
      'One or more Instagram auth tokens may be missing',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
