import type { ParsedUrlQuery } from 'querystring';
import { CampusGroupsEvent } from 'types';

/** What the /events page is narrowed to. Every field empty means everything. */
export type EventFilterState = {
  searchQuery: string;
  departmentSlug?: string;
};

export const EMPTY_EVENT_FILTERS: EventFilterState = { searchQuery: '' };

export type DepartmentOption = {
  /** The feed's own group name, e.g. "U-SU Recreation". */
  name: string;
  shortName: string;
  slug: string;
};

/**
 * Chip labels for the groups in `USU_GROUP_IDS`, keyed by CampusGroups group
 * ID rather than by name because the feed's names are not ours to keep stable.
 * A group missing here still gets a chip — it falls back to the feed's own
 * name — so adding an ID to `USU_GROUP_IDS` cannot silently hide its events
 * from the filter; it only gets a longer label until it is added here.
 */
const DEPARTMENT_SHORT_NAMES: { [groupId: string]: string } = {
  '18633': 'CSI',
  '35617': 'Recreation',
  '35630': 'CCC',
};

/**
 * Folds case and strips accents, so "dia" finds "Día de Los Muertos" — nobody
 * types the accent into a search box, and the feed is inconsistent about
 * carrying it anyway.
 */
const normalizeSearchText = (text: string): string =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Anything that is not a letter or digit in any script, so "Movie/Film"
 * yields "film" and a title in Korean is not discarded whole. Built with the
 * constructor because tsconfig targets ES5, which rejects the `u` flag in a
 * literal; every browser the site supports handles it at runtime.
 */
const NON_WORD_CHARACTERS = new RegExp('[^\\p{L}\\p{N}]+', 'u');

const toSearchWords = (text: string): string[] =>
  normalizeSearchText(text).split(NON_WORD_CHARACTERS).filter(Boolean);

/** URL-safe form of a label: "U-SU Recreation" → "u-su-recreation". */
export const toFilterSlug = (label: string): string =>
  normalizeSearchText(label)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getEventDepartment = (
  event: CampusGroupsEvent,
): DepartmentOption => {
  const shortName = DEPARTMENT_SHORT_NAMES[event.groupId] ?? event.group;
  return { name: event.group, shortName, slug: toFilterSlug(shortName) };
};

/**
 * One option per department that has an upcoming event, alphabetized by the
 * label the chip shows. Built from the events rather than from
 * `USU_GROUP_IDS`, so a department with nothing scheduled gets no chip that
 * could only ever lead to an empty list.
 */
export const getDepartmentOptions = (
  events: CampusGroupsEvent[],
): DepartmentOption[] => {
  const departmentsBySlug = new Map<string, DepartmentOption>();
  events.forEach((event) => {
    const department = getEventDepartment(event);
    departmentsBySlug.set(department.slug, department);
  });
  return Array.from(departmentsBySlug.values()).sort((a, b) =>
    a.shortName.localeCompare(b.shortName, 'en'),
  );
};

/**
 * Whether an event survives every active filter at once.
 *
 * Every word of the search must begin some word of the event, in any order,
 * so "yoga monday" can match a title and a description at once. Matching word
 * starts rather than any substring keeps "dia" off every description that
 * mentions social media. It still finds "Critical Dialogues", as typing
 * ahead should, until a second word narrows it.
 */
export const matchesEventFilters = (
  event: CampusGroupsEvent,
  filters: EventFilterState,
): boolean => {
  if (
    filters.departmentSlug &&
    getEventDepartment(event).slug !== filters.departmentSlug
  ) {
    return false;
  }

  const searchWords = toSearchWords(filters.searchQuery);
  if (!searchWords.length) return true;
  const eventWords = toSearchWords(
    [
      event.title,
      event.description,
      event.group,
      ...(event.eventTopics ?? []),
    ].join(' '),
  );
  return searchWords.every((searchWord) =>
    eventWords.some((eventWord) => eventWord.startsWith(searchWord)),
  );
};

export const filterEvents = (
  events: CampusGroupsEvent[],
  filters: EventFilterState,
): CampusGroupsEvent[] =>
  events.filter((event) => matchesEventFilters(event, filters));

const firstQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/**
 * Reads filters back out of the URL. A parameter given twice keeps its
 * first value rather than turning into an array nothing downstream expects.
 */
export const parseEventFilterQuery = (
  query: ParsedUrlQuery,
): EventFilterState => ({
  searchQuery: firstQueryValue(query.q) ?? '',
  departmentSlug: firstQueryValue(query.department) || undefined,
});

/** The inverse of `parseEventFilterQuery`, leaving out every empty filter. */
export const toEventFilterQuery = (
  filters: EventFilterState,
): ParsedUrlQuery => {
  const query: ParsedUrlQuery = {};
  const searchQuery = filters.searchQuery.trim();
  if (searchQuery) query.q = searchQuery;
  if (filters.departmentSlug) query.department = filters.departmentSlug;
  return query;
};
