import { fiscalYearFromDate } from 'utils/dates';

describe('fiscalYearFromDate', () => {
  it('starts a new fiscal year on July 1', () => {
    expect(fiscalYearFromDate('2025-06-30')).toBe('24-25');
    expect(fiscalYearFromDate('2025-07-01')).toBe('25-26');
  });

  it('keeps January through June in the year that started the previous July', () => {
    expect(fiscalYearFromDate('2026-01-23')).toBe('25-26');
    expect(fiscalYearFromDate('2026-05-08')).toBe('25-26');
  });

  it('pads both halves to two digits across a century boundary', () => {
    expect(fiscalYearFromDate('2099-08-01')).toBe('99-00');
    expect(fiscalYearFromDate('2008-09-01')).toBe('08-09');
  });

  it('accepts a full ISO timestamp', () => {
    expect(fiscalYearFromDate('2025-12-05T00:00:00Z')).toBe('25-26');
  });

  it('returns null when there is no usable date', () => {
    expect(fiscalYearFromDate(null)).toBeNull();
    expect(fiscalYearFromDate(undefined)).toBeNull();
    expect(fiscalYearFromDate('')).toBeNull();
    expect(fiscalYearFromDate('December 5, 2025')).toBeNull();
  });
});
