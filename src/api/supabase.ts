import { PageSection } from 'types/Supabase';

export const fetchPages = async () => {
  const data = await fetch(`/api/pages`);
  return await data.json();
};

export const fetchPageSections = async (slug: string) => {
  const data = await fetch(`/api/page-sections?slug=${slug}`);
  return await data.json();
};

export const fetchSections = async () => {
  const data = await fetch(`/api/sections`);
  return await data.json();
};

export const addPageSection = async (pageSection: Partial<PageSection>) => {
  const data = await fetch(`/api/page-sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageSection),
  });
  return await data.json();
};
