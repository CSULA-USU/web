import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Serves Instagram post images from this origin instead of Meta's.
 *
 * The Graph API returns image URLs, not image bytes, and those URLs point at
 * Meta's own CDN. Painting them directly — which is what `InstagramFeed` did
 * before this route existed — makes every visitor's browser open a connection
 * to Meta carrying their IP address, User-Agent, and a Referer naming the page
 * they are on. On the identity-based resource center pages that discloses the
 * topic, not merely the visit, to an advertising company. No cookie is involved
 * and none is needed; the headers alone carry it.
 *
 * Fetching server-side keeps the visitor out of that exchange: Meta sees this
 * function once per image, rather than once per student.
 */

/**
 * Hosts this route is willing to fetch from. Instagram's CDN edge names are
 * regional (`scontent-lax3-1`, `scontent-iad3-1`, …) and Meta also serves from
 * `fbcdn.net`, so the match is on the registrable domain rather than a fixed
 * list of hostnames that would go stale.
 */
const ALLOWED_IMAGE_HOSTS = ['cdninstagram.com', 'fbcdn.net'];

/**
 * True for the domain itself or any subdomain of it, and never for a mere
 * suffix. A bare `endsWith('cdninstagram.com')` would also accept
 * `evilcdninstagram.com`, which is precisely the case this guard exists for.
 */
export const isAllowedImageHost = (hostname: string): boolean =>
  ALLOWED_IMAGE_HOSTS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );

/**
 * Returns the caller's URL only if it is a plain https request to an allowed
 * host. Everything else — another protocol, another host, unparseable input —
 * comes back null.
 *
 * Without this the route would fetch whatever it was handed, which makes it a
 * way to reach addresses only the server can see and hands anyone who finds it
 * a free bandwidth relay running under this domain.
 */
export const resolveAllowedImageUrl = (src: unknown): URL | null => {
  if (typeof src !== 'string' || !src) return null;

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') return null;
  if (!isAllowedImageHost(url.hostname)) return null;

  return url;
};

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const UPSTREAM_TIMEOUT_MS = 10_000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const target = resolveAllowedImageUrl(req.query.src);

  if (!target) {
    return res.status(400).json({ error: 'Invalid image source' });
  }

  try {
    const upstream = await fetch(target, {
      /* Fail closed on a redirect rather than following it. A followed redirect
         is checked against nothing, so it would step straight around the
         allowlist above. Instagram's CDN serves these directly; if that ever
         changes, re-validate the Location header rather than relaxing this. */
      redirect: 'manual',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    /* Covers redirects too: 3xx is not `ok`. */
    if (!upstream.ok) {
      return res.status(502).json({ error: 'Failed to fetch image' });
    }

    const contentType = upstream.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
      return res
        .status(502)
        .json({ error: 'Upstream response was not an image' });
    }

    /* Checked before and after reading: the declared length is a hint that an
       upstream is free to omit or understate. */
    const declaredLength = Number(upstream.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_IMAGE_BYTES) {
      return res.status(502).json({ error: 'Image too large' });
    }

    const body = Buffer.from(await upstream.arrayBuffer());
    if (body.byteLength > MAX_IMAGE_BYTES) {
      return res.status(502).json({ error: 'Image too large' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', String(body.byteLength));
    /* The bytes are the same for everyone, and a post's image does not change
       once published, so this caches hard. The signed URL upstream expires, but
       a cached copy here outliving it is the point, not a problem. */
    res.setHeader(
      'Cache-Control',
      'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');

    return res.status(200).send(body);
  } catch {
    /* Timeout, upstream refusal, or a malformed body. The feed degrades to its
       broken-image state, which is preferable to surfacing upstream detail. */
    return res.status(502).json({ error: 'Failed to fetch image' });
  }
}
