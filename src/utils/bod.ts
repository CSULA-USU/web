import { BodUpdates, DateDoc } from 'types';
import { normalizeDateISO } from 'utils/dates';

export function normalizeUrl(url?: string): string | undefined {
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

export function computeNextDate(doc: DateDoc): string | null {
  if (doc.category === 'Calendar' || doc.is_download_all === true) return null;

  const raw = doc.date;
  if (raw == null || raw === '') return null;

  return normalizeDateISO(raw) || null;
}

export function computeNextDateFromUpdates(
  updates: BodUpdates,
): string | null | undefined {
  if (updates.category === 'Calendar' || updates.is_download_all === true)
    return null;

  if ('date' in updates) {
    const raw = updates.date as string | null | undefined;
    if (raw == null || raw === '') return null;
    return normalizeDateISO(raw) || null;
  }

  return undefined;
}
