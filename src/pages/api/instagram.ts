import type { NextApiRequest, NextApiResponse } from 'next';
import { Departments } from 'types';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { org = 'usu' } = req.query;

  let IG_TOKEN_USU = '';
  let IG_TOKEN_GRAFFIX = '';
  let IG_TOKEN_CSI = '';
  let IG_TOKEN_RECREATION = '';
  let IG_TOKEN_CCC = '';
  let IG_TOKEN_APISRC = '';
  let IG_TOKEN_CLSRC = '';
  let IG_TOKEN_PASRC = '';
  let IG_TOKEN_GSRC = '';
  let { data } = await supabase.from('instagram_tokens').select();

  data?.map((item: any) => {
    switch (item.name) {
      case 'IG_TOKEN_USU':
        IG_TOKEN_USU = item.token;
        break;
      case 'IG_TOKEN_GRAFFIX':
        IG_TOKEN_GRAFFIX = item.token;
        break;
      case 'IG_TOKEN_CSI':
        IG_TOKEN_CSI = item.token;
        break;
      case 'IG_TOKEN_RECREATION':
        IG_TOKEN_RECREATION = item.token;
        break;
      case 'IG_TOKEN_CCC':
        IG_TOKEN_CCC = item.token;
        break;
      case 'IG_TOKEN_APISRC':
        IG_TOKEN_APISRC = item.token;
        break;
      case 'IG_TOKEN_CLSRC':
        IG_TOKEN_CLSRC = item.token;
        break;
      case 'IG_TOKEN_PASRC':
        IG_TOKEN_PASRC = item.token;
        break;
      case 'IG_TOKEN_GSRC':
        IG_TOKEN_GSRC = item.token;
        break;
    }
  });

  if (
    !IG_TOKEN_USU ||
    !IG_TOKEN_GRAFFIX ||
    !IG_TOKEN_CSI ||
    !IG_TOKEN_RECREATION ||
    !IG_TOKEN_CCC ||
    !IG_TOKEN_APISRC ||
    !IG_TOKEN_CLSRC ||
    !IG_TOKEN_PASRC ||
    !IG_TOKEN_GSRC
  ) {
    throw new Error('One or more Instagram auth tokens may be missing');
  }

  /*eslint no-unused-vars: "off"*/
  const tokens: Pick<
    { [key in Departments]: string },
    | 'usu'
    | 'graffix'
    | 'csi'
    | 'recreation'
    | 'ccc'
    | 'apisrc'
    | 'clsrc'
    | 'pasrc'
    | 'gsrc'
  > = {
    usu: IG_TOKEN_USU,
    graffix: IG_TOKEN_GRAFFIX,
    csi: IG_TOKEN_CSI,
    recreation: IG_TOKEN_RECREATION,
    ccc: IG_TOKEN_CCC,
    apisrc: IG_TOKEN_APISRC,
    clsrc: IG_TOKEN_CLSRC,
    pasrc: IG_TOKEN_PASRC,
    gsrc: IG_TOKEN_GSRC,
  };
  const token = tokens[org as keyof typeof tokens];
  const URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp,thumbnail_url,permalink&access_token=${token}`;

  const resFetch = await fetch(URL);

  if (!resFetch.ok) {
    return res
      .status(resFetch.status)
      .json({ error: 'Failed to fetch from Instagram' });
  }

  const response = await resFetch.json();

  /* Instagram re-signs every `media_url` on each Graph API call, so an uncached
     response hands every visitor a different set of URLs for the same photos.
     That defeats the cache on /api/instagram-image, which necessarily keys on
     those URLs — without this header every pageview re-fetches the whole feed's
     images through the proxy. Holding one set of URLs steady for everyone in
     the window is what makes the proxy cacheable at all.

     The window stays well inside the signature's own expiry, which runs to
     days: serving a stale body for longer than that would hand out URLs that
     have since expired, and the images would break. `max-age=0` keeps the
     browser revalidating so a long-lived tab cannot pin an old feed — the
     shared cache is what does the work here.

     Set on the success path only. An error must not be cached, or one failed
     Graph API call would blank the feed for everyone until the window rolled. */
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=3600',
  );
  res.status(200).json({ data: response });
}
