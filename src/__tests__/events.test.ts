import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import handler from 'pages/api/events';

const FEED =
  '<rss><channel><item><title>Game Night</title></item></channel></rss>';

const invoke = async () => {
  const req = createRequest<NextApiRequest>({ method: 'GET' });
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

describe('GET /api/events', () => {
  it('passes the CampusGroups feed through with a CDN cache header', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => FEED,
    });

    const res = await invoke();

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe(FEED);
    expect(res.getHeader('Content-Type')).toBe('application/xml');
    expect(res.getHeader('Cache-Control')).toBe(
      's-maxage=300, stale-while-revalidate',
    );
  });

  it('bounds the upstream request with a timeout signal', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => FEED,
    });

    await invoke();

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toContain('calstatela.campusgroups.com/rss_events');
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('returns 504 when CampusGroups does not answer in time', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new DOMException(
        'The operation was aborted due to timeout',
        'TimeoutError',
      ),
    );

    const res = await invoke();

    expect(res._getStatusCode()).toBe(504);
    expect(res._getJSONData()).toEqual({ error: 'Events feed timed out' });
    expect(res.getHeader('Cache-Control')).toBeUndefined();
  });

  it('returns 502 when CampusGroups answers with an error', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const res = await invoke();

    expect(res._getStatusCode()).toBe(502);
  });

  it('returns 500 on any other failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(
      new TypeError('fetch failed'),
    );

    const res = await invoke();

    expect(res._getStatusCode()).toBe(500);
  });
});
