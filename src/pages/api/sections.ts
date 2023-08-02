// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    const errors = await Promise.all(
      await req.body.reduce(async (acc, section: any) => {
        let e;
        if (section.id) {
          const { error } = await supabase.from('sections').upsert(section);
          e = error;
        } else {
          const { error } = await supabase.from('sections').insert(section);
          e = error;
        }
        return e ? [...acc, e] : acc;
      }, []),
    );

    if (errors.length) res.status(500).json(errors);

    res.status(200).json({ message: 'success' });
  } else {
    const { data: sections, error } = await supabase
      .from('pages')
      .select('id, slug, sections(id, page_id, name, order, data)')
      .eq('slug', req.query.slug)
      .order('order', { foreignTable: 'sections', ascending: true });

    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(sections?.[0]);
    }
  }
}
