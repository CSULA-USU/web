import { supabase } from 'lib/supabase';
import { normalizeDateISO } from 'utils/dates';
import type { Document, Category, GetDocsOptions } from 'types/Backoffice';

/**
 * Fetch meeting documents with optional filters.
 * Defaults to newest first (date desc). Public pages can call this safely (anon client + RLS select).
 */
export const getMeetingDocuments = async (
  opts: GetDocsOptions = {},
): Promise<Document[]> => {
  const {
    category,
    fy,
    isArchived,
    isDownloadAll,
    limit,
    order = 'desc',
  } = opts;

  let query = supabase
    .from('meeting_documents')
    .select('id, title, url, date, category, fy, is_archived, is_download_all')
    .order('date', { ascending: order === 'asc' });

  if (category) query = query.eq('category', category);
  if (fy !== undefined) {
    if (fy === null) query = query.is('fy', null);
    else query = query.eq('fy', fy);
  }
  if (typeof isArchived === 'boolean')
    query = query.eq('is_archived', isArchived);
  if (typeof isDownloadAll === 'boolean')
    query = query.eq('is_download_all', isDownloadAll);
  if (typeof limit === 'number') query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch meeting documents:', error);
    throw error;
  }

  return (data ?? []) as Document[];
};

export const getDownloadAllDoc = async (
  category: Category,
  opts?: { isArchived?: boolean },
): Promise<Document | null> => {
  const isArchived = opts?.isArchived ?? false;
  const { data, error } = await supabase
    .from('meeting_documents')
    .select('id, title, url, category, is_download_all, is_archived')
    .eq('category', category)
    .eq('is_download_all', true)
    .eq('is_archived', isArchived)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch download all document:', error);
    throw error;
  }

  return data as Document | null;
};

export const createMeetingDocument = async (doc: Omit<Document, 'id'>) => {
  const willBeCalendar = doc.category === 'Calendar';
  const willBeDownloadAll = doc.is_download_all === true;

  let nextDate: string | null | undefined;

  if (willBeCalendar || willBeDownloadAll) {
    nextDate = null;
  } else if ('date' in doc) {
    const raw = doc.date as unknown as string | null | undefined;
    if (raw == null || raw === '') {
      nextDate = null;
    } else {
      nextDate = normalizeDateISO(raw) || null;
    }
  } else {
    nextDate = undefined;
  }

  if (!doc.url?.endsWith('raw=1') && doc.url?.includes('.pdf')) {
    doc.url = doc.url.replace(/dl=0$/, 'raw=1');
    doc.url = doc.url.replace(/dl=1$/, 'raw=1');
  }

  if (doc.url?.includes('.docx')) {
    doc.url = doc.url.replace(/raw=1$/, '');
    doc.url = doc.url.replace(/dl=0$/, '');
    doc.url = doc.url.replace(/dl=1$/, '');
  }

  if (!doc.url?.endsWith('dl=1') && doc.url?.includes('.zip')) {
    doc.url = doc.url.replace(/dl=0$/, 'dl=1');
    doc.url = doc.url.replace(/raw=1$/, 'dl=1');
  }

  const payload = {
    ...doc,
    ...(nextDate !== undefined ? { date: nextDate } : {}),
  };

  const { data, error } = await supabase
    .from('meeting_documents')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data as Document;
};

export const updateMeetingDocument = async (
  id: string,
  updates: Partial<Document>,
) => {
  const willBeCalendar = updates.category === 'Calendar';
  const willBeDownloadAll = updates.is_download_all === true;

  let nextDate: string | null | undefined;

  if (willBeCalendar || willBeDownloadAll) {
    nextDate = null;
  } else if ('date' in updates) {
    const raw = updates.date as unknown as string | null | undefined;
    if (raw == null || raw === '') {
      nextDate = null;
    } else {
      nextDate = normalizeDateISO(raw) || null;
    }
  } else {
    nextDate = undefined;
  }

  if (!updates.url?.endsWith('raw=1') && updates.url?.includes('.pdf')) {
    updates.url = updates.url.replace(/dl=0$/, 'raw=1');
    updates.url = updates.url.replace(/dl=1$/, 'raw=1');
  }

  if (updates.url?.includes('.docx')) {
    updates.url = updates.url.replace(/raw=1$/, '');
    updates.url = updates.url.replace(/dl=0$/, '');
    updates.url = updates.url.replace(/dl=1$/, '');
  }

  if (!updates.url?.endsWith('dl=1') && updates.url?.includes('.zip')) {
    updates.url = updates.url.replace(/dl=0$/, 'dl=1');
    updates.url = updates.url.replace(/raw=1$/, 'dl=1');
  }

  const payload = {
    ...updates,
    ...(nextDate !== undefined ? { date: nextDate } : {}),
  };

  const { data, error } = await supabase
    .from('meeting_documents')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Document;
};

export const archiveMeetingDocument = async (category: Category) => {
  const payload = {
    is_archived: true,
  };

  const { data, error } = await supabase
    .from('meeting_documents')
    .update(payload)
    .eq('category', category)
    .neq('is_download_all', true)
    .select();

  if (error) throw error;
  return data;
};

export const deleteMeetingDocument = async (id: string) => {
  const { error } = await supabase
    .from('meeting_documents')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
