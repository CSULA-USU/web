import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import type { Category } from 'types/Backoffice';
import { requireBodEditPermission } from './_guard';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH')
    return res.status(405).json({ error: 'Method not allowed' });

  const guard = await requireBodEditPermission(req, res);
  if (!guard.ok) return res.status(guard.status).json({ error: guard.message });

  const { category } = req.body as { category?: Category };
  if (!category) return res.status(400).json({ error: 'Missing category' });

  const { data, error } = await supabaseAdmin
    .from('meeting_documents')
    .update({ is_archived: true })
    .eq('category', category)
    .neq('is_download_all', true)
    .select('id');

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ archived: data?.length ?? 0 });
}

export default withAuth(handler);
