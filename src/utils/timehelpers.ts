export const getTime = (utc: string) =>
  new Date(utc).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

export const getMonth = (
  utc: string,
  format: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'long',
) => new Date(utc).toLocaleString('default', { month: format });

export const getDay = (utc: string) => new Date(utc).getDate();

export const getYear = (
  utc: string,
  format: 'numeric' | '2-digit' = 'numeric',
) => new Date(utc).toLocaleString('default', { year: format });
