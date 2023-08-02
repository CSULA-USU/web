export * from './supabase';

export const fetchEvents = async () => {
  const events = await (
    await fetch('https://api.presence.io/calstatela/v1/events')
  ).json();
  return events;
};

export const fetchInstagramFeed = async (org: string) => {
  const data = await fetch(`/api/instagram?org=${org}`);
  return await data.json();
};
