export function normalizeDateISO(input?: string) {
  // Accept "", undefined, or "YYYY-MM-DD" or full ISO
  if (!input) return '';
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

/**
 * Fiscal-year label ("25-26") for a YYYY-MM-DD date. The CSU fiscal year
 * runs July 1 – June 30, so July onward belongs to the year that starts then.
 * Returns null for anything that is not a YYYY-MM-DD date.
 */
export function fiscalYearFromDate(input?: string | null) {
  const match = /^(\d{4})-(\d{2})-\d{2}/.exec(input ?? '');
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const startYear = month >= 7 ? year : year - 1;
  const twoDigits = (y: number) => String(y % 100).padStart(2, '0');
  return `${twoDigits(startYear)}-${twoDigits(startYear + 1)}`;
}

export function sortByDateDesc(a: { date?: string }, b: { date?: string }) {
  const x = a.date ?? '';
  const y = b.date ?? '';
  return x < y ? 1 : x > y ? -1 : 0; // works for YYYY-MM-DD
}
