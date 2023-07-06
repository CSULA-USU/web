import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { newToken, name } = req.query;
  let { data, error } = await supabase
    .from('instagram_tokens')
    .update({ token: newToken })
    .eq('name', name)
    .select();

  if (!error) res.status(200).json(data);
}
