import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';
import axios from 'axios';

async function fetchToken(name: string) {
  let { data } = await supabase
    .from('instagram_tokens')
    .select()
    .eq('name', name);
  return data;
}

async function refreshToken(token: string) {
  const URL = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  const refreshedToken = await axios
    .get(URL)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return refreshedToken;
}

async function updateSupabase(name: string, refreshedToken: any) {
  console.log(name, refreshedToken);
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
      let newToken = await refreshToken(oldToken?.[0].token);
      await updateSupabase(tokenName, newToken.access_token);
    }),
  );

  res.status(200).json({ success: true });
}
