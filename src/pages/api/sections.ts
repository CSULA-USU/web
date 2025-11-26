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
    case 'POST': {
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

      // Process inserts/updates
      const responses = await Promise.all(
        toUpdate.map(async (section: SupaSection, order: number) => {
          const record = { ...section, order };
          if (section.id) {
            return await supabase.from('sections').upsert(record);
          } else {
            return await supabase.from('sections').insert(record);
          }
        }),
      );

      // Process deletes
      if (toDelete.length > 0) {
        responses.push(
          await supabase.from('sections').delete().in('id', toDelete),
        );
      }

      const hasErrors = responses.some((r) => r.error);
      if (hasErrors) {
        return res.status(500).json(responses.filter((r) => r.error));
      }

      return res.status(200).json({ message: 'success' });
    }

    case 'DELETE': {
      const { error: deleteError } = await supabase
        .from('sections')
        .delete()
        .eq('id', req.body.id);

      if (deleteError) {
        return res.status(500).json(deleteError);
      } else {
        return res.status(200).json({ message: 'success' });
      }
    }

    default: {
      const slugParam = req.query.slug;
      const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

      if (!slug) {
        return res.status(400).json({ error: 'Missing slug' });
      }

      const { data: sections, error: getError } = await supabase
        .from('pages')
        .select('id, slug, sections(id, page_id, name, order, data)')
        .eq('slug', slug)
        .order('order', { foreignTable: 'sections', ascending: true });

      if (getError) {
        return res.status(500).json(getError);
      }

      return res.status(200).json(sections?.[0]);
    }
  }
}
