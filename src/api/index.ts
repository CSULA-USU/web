// src/api/index.ts
import { StatusType } from 'atoms';
import { supabase } from 'lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import type { Document, Category, GetDocsOptions } from 'types/Backoffice';
import { SupaPage, SupaSection } from 'types';
import { normalizeDateISO } from 'utils/dates';

export * from './supabase';

/* ------------------------------ External APIs ------------------------------ */

export const fetchEvents = async (
  setEventsStatus: SetterOrUpdater<StatusType>,
) => {
  const events = await fetch(
    'https://api.presence.io/calstatela/v1/events',
  ).then((res) => {
    if (!res.ok) {
      setEventsStatus('failed');
      return [];
    } else {
      setEventsStatus('success');
      return res.json();
    }
  });
  return events;
};

export const fetchInstagramFeed = async (
  setInstagramResponseStatus: Dispatch<SetStateAction<StatusType>>,
  org: string,
) => {
  const data = await fetch(`/api/instagram?org=${org}`).then((res) => {
    if (!res.ok) {
      setInstagramResponseStatus('failed');
      return null;
    } else {
      setInstagramResponseStatus('success');
      return res.json();
    }
  });
  return await data;
};

export const fetchRequests = async () => {
  try {
    const data = await fetch('/api/notion');
    const requestFeed = await data.json();
    return requestFeed;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchJotform = async (id: any) => {
  try {
    const data = await fetch(`/api/jotform?id=${id}`);
    const dataFeed = await data.json();
    return dataFeed;
  } catch (error) {
    console.error('Error fetching jotform data:', error);
  }
};

/* --------------------------- Meeting documents DB -------------------------- */

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

  const { data } = await query;
  return (data ?? []) as Document[];
};

export const getDownloadAllDoc = async (
  category: Category,
  opts?: { isArchived?: boolean },
): Promise<Document | null> => {
  const isArchived = opts?.isArchived ?? false;
  const { data } = await supabase
    .from('meeting_documents')
    .select('id, title, url, category, is_download_all, is_archived')
    .eq('category', category)
    .eq('is_download_all', true)
    .eq('is_archived', isArchived)
    .maybeSingle();
  return data as Document | null;
};

export const createMeetingDocument = async (doc: Omit<Document, 'id'>) => {
  // Decide if this doc turns the row into "no date" cases
  const willBeCalendar = doc.category === 'Calendar';
  const willBeDownloadAll = doc.is_download_all === true;

  // Compute the next date only if we must (either flags require null,
  // or the caller explicitly provided a date field)
  let nextDate: string | null | undefined;

  if (willBeCalendar || willBeDownloadAll) {
    nextDate = null; // force null for these categories
  } else if ('date' in doc) {
    const raw = doc.date as unknown as string | null | undefined;
    if (raw == null || raw === '') {
      nextDate = null;
    } else {
      // your helper only accepts string/undefined, so coerce safely
      nextDate = normalizeDateISO(raw) || null; // normalize -> '' means null
    }
  } else {
    // leave undefined => don't update the column
    nextDate = undefined;
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
  // Decide if this update turns the row into "no date" cases
  const willBeCalendar = updates.category === 'Calendar';
  const willBeDownloadAll = updates.is_download_all === true;

  // Compute the next date only if we must (either flags require null,
  // or the caller explicitly provided a date field)
  let nextDate: string | null | undefined;

  if (willBeCalendar || willBeDownloadAll) {
    nextDate = null; // force null for these categories
  } else if ('date' in updates) {
    const raw = updates.date as unknown as string | null | undefined;
    if (raw == null || raw === '') {
      nextDate = null;
    } else {
      // your helper only accepts string/undefined, so coerce safely
      nextDate = normalizeDateISO(raw) || null; // normalize -> '' means null
    }
  } else {
    // leave undefined => don't update the column
    nextDate = undefined;
  }

  // Build payload without accidentally sending undefined fields
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

/* ------------------------------ Pages & CMS ------------------------------ */

export const fetchPages = async (): Promise<SupaPage[]> => {
  const res = await fetch('/api/pages');
  return res.json();
};

export const fetchPageSections = async (slug: string): Promise<SupaPage> => {
  const res = await fetch(`/api/sections?slug=${encodeURIComponent(slug)}`);
  return res.json();
};

const insertOrUpsert = (data: Partial<SupaSection> | Partial<SupaSection>[]) =>
  fetch('/api/sections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const savePageSections = async (pageSection: Partial<SupaSection>[]) => {
  const res = await insertOrUpsert(pageSection);
  return res.json();
};
