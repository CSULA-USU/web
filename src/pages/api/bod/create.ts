import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import type { Document } from 'types/Backoffice';
import { requireBackofficePolicyV2 } from 'lib/backoffice';
import { normalizeUrl, computeNextDate } from 'utils/bod';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const auth = await requireBackofficePolicyV2(req, res, {
    pageKey: 'boardDocuments',
    action: 'edit',
    scope: '*',
  });
  if (!auth.ok) return;

  const { doc } = req.body as { doc?: Omit<Document, 'id'> };
  if (!doc) return res.status(400).json({ error: 'Missing doc' });

  const payload = {
    ...doc,
    url: normalizeUrl(doc.url),
    date: computeNextDate(doc),
  };

  const { data, error } = await supabaseAdmin
    .from('meeting_documents')
    .insert(payload)
    .select('id, title, url, date, category, fy, is_archived, is_download_all')
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

export default handler;
