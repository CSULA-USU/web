// src/api/index.ts
import { StatusType } from 'atoms';
import { supabase } from 'lib/supabase';
import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import type { Document, Category } from 'types/Backoffice';

export * from './supabase';

/* ------------------------------ External APIs ------------------------------ */

export const fetchEvents = async (
  setEventsStatus: SetterOrUpdater<StatusType>,
) => {
  const res = await fetch('https://api.presence.io/calstatela/v1/events');
  if (!res.ok) {
    setEventsStatus('failed');
    return [];
  }
  setEventsStatus('success');
  return res.json();
};

export const fetchInstagramFeed = async (
  setInstagramResponseStatus: Dispatch<SetStateAction<StatusType>>,
  org: string,
) => {
  const res = await fetch(`/api/instagram?org=${encodeURIComponent(org)}`);
  if (!res.ok) {
    setInstagramResponseStatus('failed');
    return null;
  }
  setInstagramResponseStatus('success');
  return res.json();
};

export const fetchRequests = async () => {
  const res = await fetch('/api/notion');
  return await res.json();
};

/* --------------------------- Meeting documents DB -------------------------- */

/** Normalize to YYYY-MM-DD (no TZ shift) */
const normalizeDateISO = (input?: string | null) => {
  if (!input) return null;
  // Accept "YYYY-MM-DD" or any Date-parsable string; store YYYY-MM-DD
  const justDate = input.length >= 10 ? input.slice(0, 10) : input;
  // Basic sanity: 4-2-2 digits
  if (!/^\d{4}-\d{2}-\d{2}$/.test(justDate)) return justDate;
  return justDate;
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
  const payload = {
    ...doc,
    date: normalizeDateISO((doc as any).date),
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
  const payload = {
    ...updates,
    date: normalizeDateISO((updates as any).date ?? undefined),
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

import { SupaPage, SupaSection } from 'types';

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
