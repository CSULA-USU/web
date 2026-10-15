import { CategoricalAccents } from 'theme';
import { CampusGroupsEvent } from 'types';
import { getEventMonthAccents, getEventMonthKey } from 'utils/eventUtils';

const buildEvent = (eventStartDateTime: string): CampusGroupsEvent =>
  ({ eventStartDateTime } as CampusGroupsEvent);

const accentFor = (
  accents: Map<string, string>,
  event: CampusGroupsEvent,
): string | undefined => accents.get(getEventMonthKey(event));

describe('getEventMonthKey', () => {
  it('groups events that share a month', () => {
    expect(getEventMonthKey(buildEvent('2026-09-08T13:00:00-07:00'))).toBe(
      getEventMonthKey(buildEvent('2026-09-29T12:00:00-07:00')),
    );
  });

  /* Wingspan programming runs across the academic year, so the same month name
     turns up under two different years and must not share an accent. */
  it('separates the same month in different years', () => {
    expect(getEventMonthKey(buildEvent('2027-02-03T14:00:00-08:00'))).not.toBe(
      getEventMonthKey(buildEvent('2028-02-03T14:00:00-08:00')),
    );
  });
});

describe('getEventMonthAccents', () => {
  const september = buildEvent('2026-09-08T13:00:00-07:00');
  const octoberFirst = buildEvent('2026-10-06T13:00:00-07:00');
  const octoberSecond = buildEvent('2026-10-19T14:00:00-07:00');
  const november = buildEvent('2026-11-03T13:00:00-08:00');
  const february = buildEvent('2027-02-03T14:00:00-08:00');

  it('hands the colors out in the order the months appear', () => {
    const accents = getEventMonthAccents(
      [september, octoberFirst, november],
      CategoricalAccents,
    );

    expect([
      accentFor(accents, september),
      accentFor(accents, octoberFirst),
      accentFor(accents, november),
    ]).toEqual(CategoricalAccents.slice(0, 3));
  });

  /* The whole point: one month's block of cards has to be distinguishable
     from the next. */
  it('gives every month a distinct accent', () => {
    const accents = getEventMonthAccents(
      [september, octoberFirst, november, february],
      CategoricalAccents,
    );

    expect(new Set(accents.values()).size).toBe(4);
  });

  it('gives events in the same month the same accent', () => {
    const accents = getEventMonthAccents(
      [september, octoberFirst, octoberSecond],
      CategoricalAccents,
    );

    expect(accentFor(accents, octoberFirst)).toBe(
      accentFor(accents, octoberSecond),
    );
  });

  /* Wrapping is safe because the colors mean nothing on their own — a repeat
     only has to avoid landing next to itself, which it cannot. */
  it('wraps to the start when there are more months than colors', () => {
    const monthly = Array.from(
      { length: CategoricalAccents.length + 1 },
      (_, i) =>
        buildEvent(`2026-${String(i + 1).padStart(2, '0')}-05T13:00:00-08:00`),
    );

    const accents = getEventMonthAccents(monthly, CategoricalAccents);
    const assigned = monthly.map((event) => accentFor(accents, event));

    expect(assigned[CategoricalAccents.length]).toBe(assigned[0]);
    expect(assigned[CategoricalAccents.length]).not.toBe(
      assigned[CategoricalAccents.length - 1],
    );
  });

  it('gives a single month the first color', () => {
    const accents = getEventMonthAccents([september], CategoricalAccents);

    expect(accentFor(accents, september)).toBe(CategoricalAccents[0]);
  });

  /* The accent is assigned by a month's position in the list, never by which
     calendar month it is — that is what keeps it clock-free and lets the list
     stay correct as the term drains. */
  it('re-assigns the first color once an earlier month drops off the list', () => {
    const wholeTerm = getEventMonthAccents(
      [september, octoberFirst, november],
      CategoricalAccents,
    );
    const septemberOver = getEventMonthAccents(
      [octoberFirst, november],
      CategoricalAccents,
    );

    expect(accentFor(wholeTerm, octoberFirst)).not.toBe(CategoricalAccents[0]);
    expect(accentFor(septemberOver, octoberFirst)).toBe(CategoricalAccents[0]);
  });

  it('returns nothing to map when there are no events', () => {
    expect(getEventMonthAccents([], CategoricalAccents).size).toBe(0);
  });
});
