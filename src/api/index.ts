export const fetchEvents = async () => {
  const events = await (
    await fetch('https://api.presence.io/calstatela/v1/events')
  ).json();
  return events;
};

export const fetchPagesSections = async (slug: string | string[]) => {
  const data = await fetch(`/api/sections?slug=${slug}`);
  return await data.json();
};

export const fetchInstagramFeed = async (org: string) => {
  const data = await fetch(`/api/instagram?org=${org}`);
  return await data.json();
};
