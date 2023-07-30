import { SupaSection } from 'types';

export const fetchPages = async () => {
  const data = await fetch(`/api/pages`);
  return await data.json();
};

export const fetchPageSections = async (slug: string) => {
  const data = await fetch(`/api/sections?slug=${slug}`);
  return await data.json();
};

export const addPageSection = async (pageSection: Partial<SupaSection>) => {
  const data = await fetch(`/api/sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageSection),
  });
  return await data.json();
};
