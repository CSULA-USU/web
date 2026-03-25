import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'lib/authMiddleWare';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import type { Document } from 'types/Backoffice';
import { normalizeDateISO } from 'utils/dates';
import { requireBodEditPermission } from './_guard';

type Updates = Partial<Omit<Document, 'id'>>;

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

function computeNextDateFromUpdates(updates: Updates) {
  const willBeCalendar = updates.category === 'Calendar';
  const willBeDownloadAll = updates.is_download_all === true;

  // If switching to Calendar or download-all, force null date
  if (willBeCalendar || willBeDownloadAll) return null;

  // If date was provided, normalize it
  if ('date' in updates) {
    const raw = updates.date as unknown as string | null | undefined;
    if (raw == null || raw === '') return null;
    return normalizeDateISO(raw) || null;
  }

  // Otherwise, leave unchanged
  return undefined;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH')
    return res.status(405).json({ error: 'Method not allowed' });

  const guard = await requireBodEditPermission(req, res);
  if (!guard.ok) return res.status(guard.status).json({ error: guard.message });

  const { id, updates } = req.body as { id?: string; updates?: Updates };
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

export default withAuth(handler);
