export const fetchPages = async () => {
  const data = await fetch(`/api/pages`);
  return await data.json();
};

export const fetchPagesSections = async (slug: string) => {
  const data = await fetch(`/api/sections?slug=${slug}`);
  return await data.json();
};
