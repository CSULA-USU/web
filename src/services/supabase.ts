import { SupaPage, SupaSection } from 'types';

export const fetchPages = async (): Promise<SupaPage[]> => {
  const data = await fetch(`/api/pages`);
  return await data.json();
};

export const fetchPageSections = async (slug: string): Promise<SupaPage> => {
  const data = await fetch(`/api/sections?slug=${slug}`);
  return await data.json();
};

const insertOrUpsert = (data: Partial<SupaSection> | Partial<SupaSection>[]) =>
  fetch(`/api/sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const savePageSections = async (pageSection: Partial<SupaSection>[]) => {
  const data = await insertOrUpsert(pageSection);
  return await data.json();
};
