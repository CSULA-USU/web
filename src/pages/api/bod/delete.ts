import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBodEditPermission } from './_guard';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE')
    return res.status(405).json({ error: 'Method not allowed' });

  const guard = await requireBodEditPermission(req, res);
  if (!guard.ok) return res.status(guard.status).json({ error: guard.message });

  const { id } = req.body as { id?: string };
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const { error } = await supabaseAdmin
    .from('meeting_documents')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}

export default withAuth(handler);
