import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse, RequestMethod } from 'node-mocks-http';

import handler, {
  isAllowedImageHost,
  resolveAllowedImageUrl,
} from 'pages/api/instagram-image';

const IMAGE_BYTES = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]).buffer;

/** Minimal stand-in for the parts of `Response` the handler actually reads. */
const upstreamResponse = ({
  status = 200,
  headers = { 'content-type': 'image/jpeg' },
  body = IMAGE_BYTES,
}: {
  status?: number;
  headers?: Record<string, string>;
  body?: ArrayBuffer;
} = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: {
    get: (name: string) => headers[name.toLowerCase()] ?? null,
  },
  arrayBuffer: async () => body,
});

const invoke = async (
  query: Record<string, unknown>,
  method: RequestMethod = 'GET',
) => {
  const req = createRequest<NextApiRequest>({ method, query });
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

describe('isAllowedImageHost', () => {
  it('accepts the registrable domain itself', () => {
    expect(isAllowedImageHost('cdninstagram.com')).toBe(true);
    expect(isAllowedImageHost('fbcdn.net')).toBe(true);
  });

  it('accepts regional CDN subdomains', () => {
    expect(isAllowedImageHost('scontent-lax3-1.cdninstagram.com')).toBe(true);
    expect(isAllowedImageHost('scontent-iad3-1.cdninstagram.com')).toBe(true);
    expect(isAllowedImageHost('scontent.xx.fbcdn.net')).toBe(true);
  });

  it('rejects a lookalike host that merely ends with the domain', () => {
    expect(isAllowedImageHost('evilcdninstagram.com')).toBe(false);
    expect(isAllowedImageHost('notfbcdn.net')).toBe(false);
  });

  it('rejects the domain appearing as a prefix of another host', () => {
    expect(isAllowedImageHost('cdninstagram.com.evil.test')).toBe(false);
  });

  it('rejects unrelated hosts', () => {
    expect(isAllowedImageHost('example.com')).toBe(false);
    expect(isAllowedImageHost('localhost')).toBe(false);
  });
});

describe('resolveAllowedImageUrl', () => {
  it('returns a URL for an https link to an allowed host', () => {
    const url = resolveAllowedImageUrl(
      'https://scontent-lax3-1.cdninstagram.com/v/photo.jpg?sig=abc',
    );
    expect(url).not.toBeNull();
    expect(url?.hostname).toBe('scontent-lax3-1.cdninstagram.com');
  });

  it('rejects a non-https protocol', () => {
    expect(
      resolveAllowedImageUrl('http://scontent.cdninstagram.com/photo.jpg'),
    ).toBeNull();
    expect(resolveAllowedImageUrl('file:///etc/passwd')).toBeNull();
  });

  it('rejects an allowed-looking host over a disallowed protocol', () => {
    expect(
      resolveAllowedImageUrl('ftp://scontent.cdninstagram.com/photo.jpg'),
    ).toBeNull();
  });

  it('rejects hosts outside the allowlist, including internal addresses', () => {
    expect(resolveAllowedImageUrl('https://example.com/photo.jpg')).toBeNull();
    expect(resolveAllowedImageUrl('https://169.254.169.254/latest')).toBeNull();
    expect(resolveAllowedImageUrl('https://localhost/admin')).toBeNull();
  });

  it('rejects unparseable and non-string input', () => {
    expect(resolveAllowedImageUrl('not a url')).toBeNull();
    expect(resolveAllowedImageUrl('')).toBeNull();
    expect(resolveAllowedImageUrl(undefined)).toBeNull();
    expect(resolveAllowedImageUrl(42)).toBeNull();
    expect(
      resolveAllowedImageUrl(['https://cdninstagram.com/a.jpg']),
    ).toBeNull();
  });
});

describe('GET /api/instagram-image', () => {
  const allowedSrc = 'https://scontent-lax3-1.cdninstagram.com/v/photo.jpg';

  it('rejects methods other than GET', async () => {
    const res = await invoke({ src: allowedSrc }, 'POST');
    expect(res._getStatusCode()).toBe(405);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects a missing src', async () => {
    const res = await invoke({});
    expect(res._getStatusCode()).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects a host outside the allowlist without making a request', async () => {
    const res = await invoke({ src: 'https://example.com/photo.jpg' });
    expect(res._getStatusCode()).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('rejects a lookalike host without making a request', async () => {
    const res = await invoke({ src: 'https://evilcdninstagram.com/x.jpg' });
    expect(res._getStatusCode()).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns the image bytes and a cacheable content type', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(upstreamResponse());

    const res = await invoke({ src: allowedSrc });

    expect(res._getStatusCode()).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('image/jpeg');
    expect(res.getHeader('Content-Length')).toBe('4');
    expect(String(res.getHeader('Cache-Control'))).toContain('public');
    expect(res.getHeader('X-Content-Type-Options')).toBe('nosniff');
  });

  it('does not follow redirects', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      upstreamResponse({
        status: 302,
        headers: { location: 'https://evil.test/' },
      }),
    );

    const res = await invoke({ src: allowedSrc });

    expect(res._getStatusCode()).toBe(502);
    expect((global.fetch as jest.Mock).mock.calls[0][1]).toMatchObject({
      redirect: 'manual',
    });
  });

  it('refuses an upstream response that is not an image', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      upstreamResponse({ headers: { 'content-type': 'text/html' } }),
    );

    const res = await invoke({ src: allowedSrc });
    expect(res._getStatusCode()).toBe(502);
  });

  it('refuses an upstream image larger than the cap', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      upstreamResponse({
        headers: {
          'content-type': 'image/jpeg',
          'content-length': String(11 * 1024 * 1024),
        },
      }),
    );

    const res = await invoke({ src: allowedSrc });
    expect(res._getStatusCode()).toBe(502);
  });

  it('refuses an oversized body that understated its content-length', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      upstreamResponse({
        headers: { 'content-type': 'image/jpeg', 'content-length': '4' },
        body: new Uint8Array(11 * 1024 * 1024).buffer,
      }),
    );

    const res = await invoke({ src: allowedSrc });
    expect(res._getStatusCode()).toBe(502);
  });

  it('returns 502 when the upstream fetch throws', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('timed out'));

    const res = await invoke({ src: allowedSrc });
    expect(res._getStatusCode()).toBe(502);
  });

  it('returns 502 when the upstream responds with an error status', async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      upstreamResponse({ status: 403 }),
    );

    const res = await invoke({ src: allowedSrc });
    expect(res._getStatusCode()).toBe(502);
  });
});
