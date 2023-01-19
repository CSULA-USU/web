export const fetchEvents = async () => {
  const events = await (
    await fetch('https://api.presence.io/calstatela/v1/events')
  ).json();
  return events;
};
