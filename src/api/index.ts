// src/api/index.ts
import { StatusType } from 'atoms';
import { Dispatch, SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';
import { SupaPage, SupaSection } from 'types';

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
