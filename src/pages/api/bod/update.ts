import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { computeNextDateFromUpdates, normalizeUrl } from 'utils/bod';
import { BodUpdates } from 'types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH')
    return res.status(405).json({ error: 'Method not allowed' });

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'boardDocuments',
    action: 'edit',
    scope: '*',
  });
  if (!auth.ok) return;

  const { id, updates } = req.body as { id?: string; updates?: BodUpdates };
  if (!id || !updates)
    return res.status(400).json({ error: 'Missing id or updates' });

  const nextDate = computeNextDateFromUpdates(updates);

  const payload: any = {
    ...updates,
    ...(updates.url !== undefined ? { url: normalizeUrl(updates.url) } : {}),
    ...(nextDate !== undefined ? { date: nextDate } : {}),
  };

  const { data, error } = await supabaseAdmin
    .from('meeting_documents')
    .update(payload)
    .eq('id', id)
    .select('id, title, url, date, category, fy, is_archived, is_download_all')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

export default handler;
