import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let { data, error } = await supabase.from('instagram_tokens').select();

  if (!error) res.status(200).json(data);
}
