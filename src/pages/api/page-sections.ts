// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    console.log(req.body.section_name);
    const { error } = await supabase.from('pages_sections').insert({
      order: req.body.order,
      page_id: req.body.page_id,
      section_name: req.body.section_name,
    });

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({ message: 'success' });
    }
  } else {
    const { data: sections, error } = await supabase
      .from('pages')
      .select(
        'id, slug, sections:pages_sections(id, page_id, section_name, order, data, component:sections(name, schema))',
      )
      .eq('slug', req.query.slug)
      .order('order', { foreignTable: 'pages_sections', ascending: true });

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(sections?.[0]);
    }
  }
}
