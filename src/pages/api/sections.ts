// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/supabase';
import { SupaSection } from 'types';

type SplitSections = {
  toDelete: number[];
  toUpdate: SupaSection[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  switch (req.method) {
    case 'POST':
      // split sections into toDelete and toUpdate
      const { toDelete, toUpdate } = req.body.reduce(
        (acc: SplitSections, section: SupaSection) => {
          if (section.stagedDelete) {
            return section.id
              ? { ...acc, toDelete: [...acc.toDelete, section.id] }
              : acc;
          } else {
            delete section.stagedDelete;
            return { ...acc, toUpdate: [...acc.toUpdate, section] };
          }
        },
        { toDelete: [], toUpdate: [] },
      );

      // process deletes
      const responses = await Promise.all(
        await toUpdate.map(async (section: SupaSection, order: number) => {
          const method = section.id ? 'upsert' : 'insert';
          return await supabase.from('sections')[method]({ ...section, order });
        }),
      );

      // process deletes
      responses.push(
        await supabase.from('sections').delete().in('id', toDelete),
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
