import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

async function fetchToken(name: string) {
  let { data } = await supabase
    .from('instagram_tokens')
    .select()
    .eq('name', name);
  return data;
}

async function refreshToken(token: string) {
  const URL = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

  try {
    const response = await fetch(URL);
    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

async function updateSupabase(name: string, refreshedToken: any) {
  if (!refreshedToken) return; // prevent failed refreshes from updating supabase
  let { data } = await supabase
    .from('instagram_tokens')
    .update({ token: refreshedToken, created_at: new Date() })
    .eq('name', name)
    .select();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (process.env.NODE_ENV === 'production') {
    return res
      .status(500)
      .json({ error: 'CRON_SECRET is not configured in production' });
  }

  const tokens = [
    'IG_TOKEN_CSI',
    'IG_TOKEN_CLSRC',
    'IG_TOKEN_CCC',
    'IG_TOKEN_RECREATION',
    'IG_TOKEN_USU',
    'IG_TOKEN_GRAFFIX',
    'IG_TOKEN_APISRC',
    'IG_TOKEN_GSRC',
    'IG_TOKEN_PASRC',
  ];

  await Promise.all(
    tokens.map(async (tokenName) => {
      let oldToken = await fetchToken(tokenName);
      const tokenValue = oldToken?.[0]?.token;
      if (!tokenValue) return;

      let newToken = await refreshToken(tokenValue);
      if (!newToken?.access_token) return;

      await updateSupabase(tokenName, newToken.access_token);
    }),
  );

  return res.status(200).json({ success: true });
}
