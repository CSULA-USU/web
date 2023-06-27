import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { name } = req.query;
  let { data, error } = await supabase
    .from('instagram_tokens')
    .select()
    .eq('name', name);

  if (!error) res.status(200).json(data);
}
