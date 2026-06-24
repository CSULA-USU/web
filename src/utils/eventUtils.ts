export const formatEventLocation = (eventLocation: string): string => {
  const commaIndex = eventLocation.indexOf(',');
  return commaIndex === -1 ? eventLocation : eventLocation.slice(0, commaIndex);
};
