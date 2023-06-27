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

export const fetchInstagramFeed = async (org: string) => {
  const data = await fetch(`/api/instagram?org=${org}`);
  return await data.json();
};

export const fetchTokens = async () => {
  const data = await fetch(`${process.env.SERVER}/api/tokens`);
  return await data.json();
};

export const fetchToken = async (name: string) => {
  const data = await fetch(`/api/token?name=${name}`);

  return await data.json();
};

export const refreshInstagramToken = async (token: string) => {
  const data = await fetch(`/api/refresh-ig-token?token=${token}`);

  return await data.json();
};

export const updateSupabaseToken = async (newToken: string, name: string) => {
  const data = await fetch(
    `/api/update-supabase-token?newToken=${newToken}&name=${name}`,
  );

  return await data.json();
};
