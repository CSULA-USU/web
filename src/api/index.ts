// src/api/index.ts
import { StatusType } from 'atoms';
import { supabase } from 'lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import type { SupabaseSchema } from 'types/SupabaseSchema';
import {
  fromSupabase,
  type BODMeetingDocs,
  type Category,
} from 'types/Backoffice';
import { SupaPage, SupaSection } from 'types';

/* ---------------------- DB row/insert/update type aliases ---------------------- */
type MeetingDocumentRow =
  SupabaseSchema['public']['Tables']['meeting_documents']['Row'];
type MeetingDocumentInsert =
  SupabaseSchema['public']['Tables']['meeting_documents']['Insert'];
type MeetingDocumentUpdate =
  SupabaseSchema['public']['Tables']['meeting_documents']['Update'];

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

/* --------------------------- Board Meeting Docs --------------------------- */

/** Normalize to YYYY-MM-DD (no TZ shift) */
const normalizeDateISO = (input?: string | null) => {
  if (input == null || input === '') return null;
  const justDate = input.length >= 10 ? input.slice(0, 10) : input;
  return /^\d{4}-\d{2}-\d{2}$/.test(justDate) ? justDate : justDate;
};

type GetDocsOptions = {
  category?: Category;
  fy?: string | null;
  isArchived?: boolean;
  isDownloadAll?: boolean;
  limit?: number;
  order?: 'asc' | 'desc';
};

/**
 * Fetch meeting documents with optional filters.
 * Defaults to newest first (date desc). Public pages can call this safely (anon client + RLS select).
 */
export const getMeetingDocuments = async (
  opts: GetDocsOptions = {},
): Promise<BODMeetingDocs[]> => {
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
    .select(
      'id, title, url, date, category, fy, is_archived, is_download_all, created_at, updated_at',
    )
    .order('date', { ascending: order === 'asc' });

  if (category) query = query.eq('category', category);
  if (fy !== undefined)
    query = fy === null ? query.is('fy', null) : query.eq('fy', fy);
  if (typeof isArchived === 'boolean')
    query = query.eq('is_archived', isArchived);
  if (typeof isDownloadAll === 'boolean')
    query = query.eq('is_download_all', isDownloadAll);
  if (typeof limit === 'number') query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data ?? []) as MeetingDocumentRow[];
  return rows.map(fromSupabase);
};

export const getDownloadAllDoc = async (
  category: Category,
  opts?: { isArchived?: boolean },
): Promise<BODMeetingDocs | null> => {
  const isArchived = opts?.isArchived ?? false;
  const { data, error } = await supabase
    .from('meeting_documents')
    .select(
      'id, title, url, category, is_download_all, is_archived, date, fy, created_at, updated_at',
    )
    .eq('category', category)
    .eq('is_download_all', true)
    .eq('is_archived', isArchived)
    .maybeSingle();

  if (error) throw error;
  const row = (data ?? null) as MeetingDocumentRow | null;
  return row ? fromSupabase(row) : null;
};

export const createMeetingDocument = async (
  doc: Omit<BODMeetingDocs, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<BODMeetingDocs> => {
  const payload: MeetingDocumentInsert = {
    title: doc.title,
    url: doc.url,
    category: doc.category,
    date: normalizeDateISO(doc.date ?? null),
    fy: doc.fy ?? null,
    is_archived: !!doc.isArchived,
    is_download_all: !!doc.isDownloadAll,
  };

  const { data, error } = await supabase
    .from('meeting_documents')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return fromSupabase(data as MeetingDocumentRow);
};

export const updateMeetingDocument = async (
  id: string,
  updates: Partial<BODMeetingDocs>,
): Promise<BODMeetingDocs> => {
  const payload: MeetingDocumentUpdate = {
    title: updates.title,
    url: updates.url,
    category: updates.category,
    date:
      updates.date === ''
        ? null
        : updates.date !== undefined
        ? normalizeDateISO(updates.date)
        : undefined,
    fy: updates.fy ?? undefined,
    is_archived:
      updates.isArchived !== undefined ? !!updates.isArchived : undefined,
    is_download_all:
      updates.isDownloadAll !== undefined ? !!updates.isDownloadAll : undefined,
  };

  const { data, error } = await supabase
    .from('meeting_documents')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return fromSupabase(data as MeetingDocumentRow);
};

export const archiveMeetingDocument = async (
  category: Category,
): Promise<BODMeetingDocs[]> => {
  const { data, error } = await supabase
    .from('meeting_documents')
    .update({ is_archived: true })
    .eq('category', category)
    .neq('is_download_all', true)
    .select();

  if (error) throw error;

  const rows = (data ?? []) as MeetingDocumentRow[];
  return rows.map(fromSupabase);
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
