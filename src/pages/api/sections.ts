// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'pages/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let { data: sections, error } = await supabase
    .from('pages')
    .select('slug, pages_sections(data, sections(name, schema))')
    .eq('slug', req.query.slug);

  if (!error) res.status(200).json(sections?.[0]);
}
