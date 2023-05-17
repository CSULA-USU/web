export const fetchEvents = async () => {
  const events = await (
    await fetch('https://api.presence.io/calstatela/v1/events')
  ).json();
  return events;
};

export const fetchPagesSections = async (slug: string) => {
  const data = await fetch(`/api/sections?slug=${slug}`);
  return await data.json();
};
