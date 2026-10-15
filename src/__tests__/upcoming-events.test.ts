import { sortUpcomingEvents } from 'services';
import {
  isEventInProgress,
  isEventLiveToday,
  splitFeaturedEvents,
  MAX_LIVE_EVENT_TABS,
} from 'utils/eventUtils';
import { CampusGroupsEvent } from 'types';

/* Every timestamp below carries the Pacific offset the CampusGroups feed
   actually emits, so the tests exercise the same parse the site does. */
const NOW = new Date('2026-09-03T12:00:00-07:00').getTime();

const buildEvent = (
  eventId: string,
  eventStartDateTime: string,
  eventEndDateTime: string,
): CampusGroupsEvent =>
  ({
    eventId,
    eventUid: `uid-${eventId}`,
    groupId: '18633',
    group: 'Center for Student Involvement',
    groupAcronym: 'usucsi',
    title: `Event ${eventId}`,
    description: '',
    eventStartDateTime,
    eventEndDateTime,
    eventDate: '',
    eventTime: '',
    eventEndTime: '',
    eventLocation: 'U-SU Alhambra Room',
    locationType: 'On-Campus',
    eventType: 'Leadership',
    eventLink: '',
    eventOriginalPhotoFullUrl: '',
    eventPhotoAltText: '',
    iCalLink: '',
    allDayEvent: '0',
    approvalStatus: '1',
    timeZoneId: 'Pacific Standard Time',
  } as CampusGroupsEvent);

const inProgress = buildEvent(
  'in-progress',
  '2026-09-03T11:00:00-07:00',
  '2026-09-03T14:00:00-07:00',
);
const alsoInProgress = buildEvent(
  'also-in-progress',
  '2026-09-03T11:30:00-07:00',
  '2026-09-03T13:00:00-07:00',
);
const ended = buildEvent(
  'ended',
  '2026-09-03T08:00:00-07:00',
  '2026-09-03T10:00:00-07:00',
);
const laterToday = buildEvent(
  'later-today',
  '2026-09-03T17:00:00-07:00',
  '2026-09-03T19:00:00-07:00',
);
const nextWeek = buildEvent(
  'next-week',
  '2026-09-10T13:00:00-07:00',
  '2026-09-10T15:00:00-07:00',
);
/* The feed really does carry one of these — 9/21 through 9/25. */
const multiDay = buildEvent(
  'multi-day',
  '2026-09-01T09:00:00-07:00',
  '2026-09-25T17:00:00-07:00',
);

describe('sortUpcomingEvents', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('keeps an event that has started but not ended', () => {
    const kept = sortUpcomingEvents([inProgress]);
    expect(kept.map((event) => event.eventId)).toEqual(['in-progress']);
  });

  it('drops an event that has already ended', () => {
    expect(sortUpcomingEvents([ended])).toEqual([]);
  });

  it('orders by start time, earliest first', () => {
    const ordered = sortUpcomingEvents([nextWeek, laterToday, inProgress]);
    expect(ordered.map((event) => event.eventId)).toEqual([
      'in-progress',
      'later-today',
      'next-week',
    ]);
  });

  it('falls back to the start time when the feed omits an end', () => {
    const noEnd = buildEvent('no-end', '2026-09-04T13:00:00-07:00', '');
    expect(sortUpcomingEvents([noEnd]).map((event) => event.eventId)).toEqual([
      'no-end',
    ]);
  });

  it('drops an event whose start and end are both unparseable', () => {
    expect(sortUpcomingEvents([buildEvent('junk', 'nonsense', '')])).toEqual(
      [],
    );
  });
});

describe('isEventLiveToday', () => {
  it('is true for an event under way that ends today', () => {
    expect(isEventLiveToday(inProgress, NOW)).toBe(true);
  });

  it('is false before the event starts', () => {
    expect(isEventLiveToday(laterToday, NOW)).toBe(false);
  });

  it('is false once the event has ended', () => {
    expect(isEventLiveToday(ended, NOW)).toBe(false);
  });

  it('is false for a multi-day event that is not ending today', () => {
    /* It is genuinely in progress — it just must not wear a live badge for
       three weeks, which is how the badge stops meaning anything. */
    expect(isEventInProgress(multiDay, NOW)).toBe(true);
    expect(isEventLiveToday(multiDay, NOW)).toBe(false);
  });
});

describe('splitFeaturedEvents', () => {
  it('features the next event when nothing is live', () => {
    const { liveEvents, nextEvent, remainingEvents } = splitFeaturedEvents(
      [laterToday, nextWeek],
      NOW,
    );
    expect(liveEvents).toEqual([]);
    expect(nextEvent?.eventId).toBe('later-today');
    expect(remainingEvents.map((event) => event.eventId)).toEqual([
      'next-week',
    ]);
  });

  it('holds the live event and leaves the next one to the list below', () => {
    const { liveEvents, nextEvent, remainingEvents } = splitFeaturedEvents(
      [inProgress, laterToday],
      NOW,
    );
    expect(liveEvents.map((event) => event.eventId)).toEqual(['in-progress']);
    expect(nextEvent).toBeUndefined();
    expect(remainingEvents.map((event) => event.eventId)).toEqual([
      'later-today',
    ]);
  });

  it('keeps two live events in the order they started', () => {
    const { liveEvents } = splitFeaturedEvents(
      [inProgress, alsoInProgress],
      NOW,
    );
    expect(liveEvents.map((event) => event.eventId)).toEqual([
      'in-progress',
      'also-in-progress',
    ]);
  });

  it('caps the tabs and sends the overflow to the list rather than dropping it', () => {
    const live = Array.from({ length: MAX_LIVE_EVENT_TABS + 1 }, (_, index) =>
      buildEvent(
        `live-${index}`,
        `2026-09-03T11:0${index}:00-07:00`,
        '2026-09-03T14:00:00-07:00',
      ),
    );
    const { liveEvents, remainingEvents } = splitFeaturedEvents(live, NOW);
    expect(liveEvents).toHaveLength(MAX_LIVE_EVENT_TABS);
    expect(remainingEvents.map((event) => event.eventId)).toEqual([
      `live-${MAX_LIVE_EVENT_TABS}`,
    ]);
  });

  it('never shows the same event in the hero and the list', () => {
    const { liveEvents, remainingEvents } = splitFeaturedEvents(
      [inProgress, alsoInProgress, laterToday, nextWeek],
      NOW,
    );
    const heroIds = liveEvents.map((event) => event.eventId);
    expect(
      remainingEvents.filter((event) => heroIds.includes(event.eventId)),
    ).toEqual([]);
  });
});
