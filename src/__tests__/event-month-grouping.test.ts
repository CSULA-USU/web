import {
  getEventMonthAnchorId,
  getEventMonthKey,
  groupEventsByMonth,
} from 'utils/eventUtils';
import { CampusGroupsEvent } from 'types';

/* Built from local-time parts so a month boundary under test does not move
   with the machine's timezone. */
const eventOn = (
  title: string,
  year: number,
  monthIndex: number,
  day: number,
): CampusGroupsEvent =>
  ({
    eventId: title,
    title,
    eventStartDateTime: new Date(year, monthIndex, day, 12).toISOString(),
  } as CampusGroupsEvent);

const summarize = (events: CampusGroupsEvent[]) =>
  groupEventsByMonth(events).map(({ monthKey, events: monthEvents }) => [
    monthKey,
    monthEvents.map((event) => event.title),
  ]);

describe('groupEventsByMonth', () => {
  it('groups by calendar month in the order the months appear', () => {
    expect(
      summarize([
        eventOn('Zumba', 2026, 9, 21),
        eventOn('Altar', 2026, 9, 29),
        eventOn('Movie Night', 2026, 10, 5),
        eventOn('Kickoff', 2027, 0, 12),
      ]),
    ).toEqual([
      ['2026-10', ['Zumba', 'Altar']],
      ['2026-11', ['Movie Night']],
      ['2027-1', ['Kickoff']],
    ]);
  });

  it('keeps the same month of different years apart', () => {
    expect(
      summarize([
        eventOn('This year', 2026, 9, 1),
        eventOn('Next year', 2027, 9, 1),
      ]),
    ).toEqual([
      ['2026-10', ['This year']],
      ['2027-10', ['Next year']],
    ]);
  });

  it('collects a month whose events are not next to each other', () => {
    const groups = groupEventsByMonth([
      eventOn('Early', 2026, 9, 1),
      eventOn('November', 2026, 10, 1),
      eventOn('Late', 2026, 9, 30),
    ]);
    expect(groups).toHaveLength(2);
    expect(groups[0].events.map((event) => event.title)).toEqual([
      'Early',
      'Late',
    ]);
  });

  it('returns nothing for no events', () => {
    expect(groupEventsByMonth([])).toEqual([]);
  });
});

describe('getEventMonthAnchorId', () => {
  it('yields an id usable as a CSS selector', () => {
    const anchorId = getEventMonthAnchorId(
      getEventMonthKey(eventOn('Zumba', 2026, 9, 21)),
    );
    expect(anchorId).toBe('events-2026-10');
    expect(/^[A-Za-z][\w-]*$/.test(anchorId)).toBe(true);
  });
});
