export function normalizeDateISO(input?: string | null): string | null {
  if (input == null || input === '') return null; // handles undefined or null
  return input.length === 10
    ? input
    : new Date(input).toISOString().slice(0, 10);
}

export function formatDate(input?: string) {
  if (!input) return '—';
  const src = input.length === 10 ? `${input}T00:00:00Z` : input;
  const d = new Date(src);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function sortByDateDesc(a: { date?: string }, b: { date?: string }) {
  const x = a.date ?? '';
  const y = b.date ?? '';
  return x < y ? 1 : x > y ? -1 : 0; // works for YYYY-MM-DD
}
