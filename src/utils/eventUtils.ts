import { CampusGroupsEvent } from 'types';
import { getMonth, getYear } from 'utils/timehelpers';

export const formatEventLocation = (eventLocation: string): string => {
  const commaIndex = eventLocation.indexOf(',');
  return commaIndex === -1 ? eventLocation : eventLocation.slice(0, commaIndex);
};

/**
 * At most this many in-progress events get hero tabs. A fourth falls through to
 * the upcoming list rather than growing the strip — a hero someone has to read
 * across is worse than one event they actually see.
 */
export const MAX_LIVE_EVENT_TABS = 3;

/** Milliseconds since epoch, or null when the feed gave us something unparseable. */
const parseFeedTime = (isoDateTime: string): number | null => {
  const timestamp = new Date(isoDateTime).getTime();
  return Number.isNaN(timestamp) ? null : timestamp;
};

export const getEventStartTime = (event: CampusGroupsEvent): number | null =>
  parseFeedTime(event.eventStartDateTime);

/**
 * When an event is over, which is what decides whether it still belongs on the
 * site at all.
 *
 * CampusGroups has populated `eventEndDateTime` on every item we have pulled,
 * but a blank one parses to NaN, and NaN loses every comparison — so without
 * the fallback a single malformed row would vanish from the site silently
 * rather than degrade. Falling back to the start reproduces the old
 * "gone the moment it begins" behavior for that one row instead of hiding it.
 */
export const getEventEndTime = (event: CampusGroupsEvent): number | null =>
  parseFeedTime(event.eventEndDateTime) ?? getEventStartTime(event);

/** Started, not yet over. Says nothing about how long it runs. */
export const isEventInProgress = (
  event: CampusGroupsEvent,
  now: number,
): boolean => {
  const startTime = getEventStartTime(event);
  const endTime = getEventEndTime(event);
  if (startTime === null || endTime === null) return false;
  return startTime <= now && now < endTime;
};

/**
 * In progress *and* wrapping up today, which is the bar for the "Live now"
 * badge and a hero tab.
 *
 * The extra day check is what keeps a multi-day event — the feed carries one
 * running 9/21 through 9/25 — from wearing a live badge for five straight
 * days, which is exactly how a live indicator stops meaning anything. Such an
 * event still sits at the top of the upcoming list for its whole run, since it
 * genuinely is the next thing happening; it just does not get badged until the
 * day it ends.
 *
 * "Today" is the viewer's calendar day, not campus time. Nearly everyone
 * reading this is on Pacific anyway, and a viewer abroad is better served by a
 * badge that agrees with their own clock.
 */
export const isEventLiveToday = (
  event: CampusGroupsEvent,
  now: number,
): boolean => {
  if (!isEventInProgress(event, now)) return false;
  const endTime = getEventEndTime(event);
  if (endTime === null) return false;
  return new Date(endTime).toDateString() === new Date(now).toDateString();
};

export type FeaturedEvents = {
  /**
   * In-progress events for the hero's tab strip, earliest start first — the
   * order the caller's list already carries, which is what makes the strip
   * first-come-first-serve without a second sort to disagree with.
   */
  liveEvents: CampusGroupsEvent[];
  /** What the hero features when nothing is live. */
  nextEvent?: CampusGroupsEvent;
  /** Everything the hero is not already showing, for the list beneath it. */
  remainingEvents: CampusGroupsEvent[];
};

/**
 * Decides what the homepage hero features and what is left over for the list
 * below it, so the two cannot disagree about who is showing which event.
 *
 * Expects `events` already filtered and sorted by start ascending — what
 * `sortUpcomingEvents` returns. A live event past `MAX_LIVE_EVENT_TABS` stays
 * in `remainingEvents`, so it appears in the upcoming list while it is running
 * rather than disappearing.
 */
export const splitFeaturedEvents = (
  events: CampusGroupsEvent[],
  now: number,
): FeaturedEvents => {
  const liveEvents = events
    .filter((event) => isEventLiveToday(event, now))
    .slice(0, MAX_LIVE_EVENT_TABS);

  const featuredIds = new Set(liveEvents.map((event) => event.eventId));
  const notFeatured = events.filter((event) => !featuredIds.has(event.eventId));

  return liveEvents.length
    ? { liveEvents, remainingEvents: notFeatured }
    : {
        liveEvents,
        nextEvent: notFeatured[0],
        remainingEvents: notFeatured.slice(1),
      };
};

/**
 * Whether an event carries a given topic tag.
 *
 * Matches a whole tag case-insensitively rather than testing a substring: the
 * feed's topic list already holds both "Wingspan" and "Weeks of Welcome", so a
 * substring test would let a future "Wingspan Kickoff" tag quietly pull events
 * onto a page filtering for "Wingspan". Case is forgiven because the tags are
 * typed by hand in CampusGroups, where "wingspan" is one slip away.
 *
 * Reads through `?? []` because every CampusGroupsEvent in the tests is built
 * with an `as` cast, so the required field is not a runtime guarantee.
 */
export const hasEventTopic = (
  event: CampusGroupsEvent,
  topic: string,
): boolean =>
  (event.eventTopics ?? []).some(
    (eventTopic) => eventTopic.toLowerCase() === topic.toLowerCase(),
  );

/** Keeps only the events tagged with `topic`, preserving the given order. */
export const filterEventsByTopic = (
  events: CampusGroupsEvent[],
  topic: string,
): CampusGroupsEvent[] => events.filter((event) => hasEventTopic(event, topic));

/**
 * A single calendar month, as the key the accent ramp groups events on.
 *
 * Built from the same helpers the date badge renders with, so a card's color
 * and its printed month resolve the timestamp in one timezone and cannot
 * disagree. The year is part of the key because Wingspan programming runs
 * across the academic year — a bare month would fold February 2027 into
 * February 2028 and hand them the same accent.
 */
export const getEventMonthKey = (event: CampusGroupsEvent): string =>
  `${getYear(event.eventStartDateTime)}-${getMonth(
    event.eventStartDateTime,
    'numeric',
  )}`;

/**
 * Maps each distinct month in `events` to an accent color, handing them out
 * from `accentColors` in order and wrapping when the list runs out.
 *
 * Assignment is by a month's position in the list, never by which calendar
 * month it is, which keeps the whole thing clock-free: `events` arrives
 * already filtered to upcoming and sorted ascending, so the soonest month is
 * just index 0. Deriving it from `new Date()` instead would put a
 * server/client disagreement into a value the markup depends on.
 *
 * The colors carry no meaning and no order — they exist so a reader can see
 * where one month's block of cards ends and the next begins. That is why
 * wrapping is safe: a seventh month repeating the first color is fine as long
 * as neighbors differ, which they always will.
 *
 * Expects the caller's full list rather than a visible slice, so collapsing a
 * grid cannot recolor the cards that stay on screen.
 */
export const getEventMonthAccents = (
  events: CampusGroupsEvent[],
  accentColors: readonly string[],
): Map<string, string> => {
  const monthKeys: string[] = [];
  events.forEach((event) => {
    const monthKey = getEventMonthKey(event);
    if (!monthKeys.includes(monthKey)) monthKeys.push(monthKey);
  });

  return new Map(
    monthKeys.map((monthKey, index) => [
      monthKey,
      accentColors[index % accentColors.length],
    ]),
  );
};
