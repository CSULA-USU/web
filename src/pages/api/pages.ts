// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let { data: pages, error } = await supabase.from('pages').select('*');

  if (!error) res.status(200).json(pages);
}
