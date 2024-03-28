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

export const fetchRequests = async () => {
  try {
    const data = await fetch('/api/notion');
    const requestFeed = await data.json();
    return requestFeed;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// export const fetchJotform = async (center: number) => {
//   try {
//     const data = await fetch(
//       `https://api.jotform.com/form/${center}/submissions?apiKey=fc4a91bbc9f53fd73d5934839ee8dcd1
//       `,
//     );
//     return await data.json();
//   } catch (error) {
//     console.error('Error fetching jotform data:', error);
//   }
// };

export const fetchJotform = async () => {
  try {
    const data = await fetch(
      `https://api.jotform.com/form/233465206027148/submissions?apiKey=fc4a91bbc9f53fd73d5934839ee8dcd1&limit=1000
      `,
    );
    return await data.json();
  } catch (error) {
    console.error('Error fetching jotform data:', error);
  }
};
