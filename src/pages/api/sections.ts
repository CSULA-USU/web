// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let { data: sections, error } = await supabase
    .from('pages')
    .select(
      'slug, pages_sections(id, data, section_name, component:sections(name, schema))',
    )
    .eq('slug', req.query.slug)
    .order('order', { foreignTable: 'pages_sections', ascending: true });

  if (!error) res.status(200).json(sections?.[0]);
}
