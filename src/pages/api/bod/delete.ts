import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE')
    return res.status(405).json({ error: 'Method not allowed' });

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'boardDocuments',
    action: 'edit',
    scope: '*',
  });
  if (!auth.ok) return;

  const { id } = req.body as { id?: string };
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const { error } = await supabaseAdmin
    .from('meeting_documents')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}

export default handler;
