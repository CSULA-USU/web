// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  switch (req.method) {
    case 'POST':
      const responses = await Promise.all(
        await req.body.map(async (section: any) => {
          if (section.order === -1) {
            if (section.id) {
              return await supabase
                .from('sections')
                .delete()
                .eq('id', section.id);
            }
            return {};
          } else if (section.id) {
            return await supabase.from('sections').upsert(section);
          } else {
            return await supabase.from('sections').insert(section);
          }
        }),
      );

      const hasErrors = responses.some((r) => r.error);
      if (hasErrors) res.status(500).json(responses.filter((r) => r.error));

      res.status(200).json({ message: 'success' });
      break;
    case 'DELETE':
      const { error: deleteError } = await supabase
        .from('sections')
        .delete()
        .eq('id', req.body.id);

      if (deleteError) {
        res.status(500).json(deleteError);
      } else {
        res.status(200).json({ message: 'success' });
      }
      break;
    default:
      const { data: sections, error: getError } = await supabase
        .from('pages')
        .select('id, slug, sections(id, page_id, name, order, data)')
        .eq('slug', req.query.slug)
        .order('order', { foreignTable: 'sections', ascending: true });

      if (getError) {
        res.status(500).json(getError);
      } else {
        res.status(200).json(sections?.[0]);
      }
      break;
  }
}
