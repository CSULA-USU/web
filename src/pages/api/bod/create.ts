import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import type { Document } from 'types/Backoffice';
import { normalizeDateISO } from 'utils/dates';
import { requireBodEditPermission } from './_guard';

function normalizeUrl(url?: string) {
  if (!url) return url;

  let next = url;

  if (!next.endsWith('raw=1') && next.includes('.pdf')) {
    next = next.replace(/dl=0$/, 'raw=1').replace(/dl=1$/, 'raw=1');
  }

  if (next.includes('.docx')) {
    next = next
      .replace(/raw=1$/, '')
      .replace(/dl=0$/, '')
      .replace(/dl=1$/, '');
  }

  if (!next.endsWith('dl=1') && next.includes('.zip')) {
    next = next.replace(/dl=0$/, 'dl=1').replace(/raw=1$/, 'dl=1');
  }

  return next;
}

function computeNextDate(doc: Omit<Document, 'id'>) {
  const willBeCalendar = doc.category === 'Calendar';
  const willBeDownloadAll = doc.is_download_all === true;

  if (willBeCalendar || willBeDownloadAll) return null;

  const raw = (doc as any).date as string | null | undefined;
  if (raw == null || raw === '') return null;

  return normalizeDateISO(raw) || null;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const guard = await requireBodEditPermission(req, res);
  if (!guard.ok) return res.status(guard.status).json({ error: guard.message });

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

export default withAuth(handler);
