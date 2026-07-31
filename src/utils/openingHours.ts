/**
 * Formatting for opening-hours data stored the way schema.org wants it — full
 * day names, 24-hour times, ISO dates — so one set of values can drive both the
 * visible hours and the structured data without the two disagreeing.
 *
 * Deliberately does not use `Date`, unlike `utils/timehelpers`, which formats
 * UTC datetime strings. Everything here is string arithmetic; see the note on
 * `formatIsoDate` for why that distinction matters.
 */

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

/**
 * One open-hours span. Leave a day out entirely to mean closed — there is no
 * "closed" entry.
 */
export interface OpeningHours {
  days: Weekday[];
  /** 24-hour 'HH:MM', e.g. '07:30'. */
  opens: string;
  closes: string;
  /**
   * 'YYYY-MM-DD' bounds on when this span applies, so term-time hours are not
   * advertised through summer. Spans that share a validity window render under
   * one caption. Leaving both off claims the hours are year-round — only do
   * that when they genuinely are.
   */
  validFrom?: string;
  validThrough?: string;
}

export interface OpeningHoursGroup {
  caption: string;
  spans: OpeningHours[];
}

const WEEKDAY_ORDER: Weekday[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const WEEKDAY_ABBREVIATIONS: Record<Weekday, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const MONTH_ABBREVIATIONS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** '07:30' to '7:30 AM', dropping ':00' so '18:00' reads as a clean '6 PM'. */
export const formatTime = (time24: string) => {
  const [hourText, minuteText] = time24.split(':');
  const hour = Number(hourText);
  const meridiem = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return minuteText === '00'
    ? `${hour12} ${meridiem}`
    : `${hour12}:${minuteText} ${meridiem}`;
};

/**
 * Collapses consecutive days into a range: Mon/Tue/Wed/Thu reads as 'Mon–Thu',
 * while a split week stays listed as 'Mon, Wed, Fri'. Two-day runs are listed
 * rather than hyphenated, because 'Sat–Sun' is no shorter than 'Sat, Sun'.
 * Input order does not matter — output always follows the calendar week.
 */
export const formatWeekdays = (days: Weekday[]) => {
  const runs: Weekday[][] = [];

  WEEKDAY_ORDER.filter((day) => days.includes(day)).forEach((day) => {
    const currentRun = runs[runs.length - 1];
    const lastDayInRun = currentRun?.[currentRun.length - 1];
    const isConsecutive =
      lastDayInRun !== undefined &&
      WEEKDAY_ORDER.indexOf(day) === WEEKDAY_ORDER.indexOf(lastDayInRun) + 1;

    if (isConsecutive) {
      currentRun.push(day);
    } else {
      runs.push([day]);
    }
  });

  return runs
    .map((run) =>
      run.length > 2
        ? `${WEEKDAY_ABBREVIATIONS[run[0]]}–${
            WEEKDAY_ABBREVIATIONS[run[run.length - 1]]
          }`
        : run.map((day) => WEEKDAY_ABBREVIATIONS[day]).join(', '),
    )
    .join(', ');
};

/**
 * Formats 'YYYY-MM-DD' by splitting the string rather than going through Date.
 * `new Date('2026-08-24')` is parsed as UTC midnight, which renders as the 23rd
 * anywhere west of Greenwich — and a locale-dependent format would differ
 * between the build and the browser, which is a hydration mismatch.
 */
export const formatIsoDate = (isoDate: string, withYear = true) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  const monthAndDay = `${MONTH_ABBREVIATIONS[month - 1]} ${day}`;

  return withYear ? `${monthAndDay}, ${year}` : monthAndDay;
};

/** The caption above a group of spans, describing when they apply. */
export const formatValidityCaption = ({
  validFrom,
  validThrough,
}: OpeningHours) => {
  if (validFrom && validThrough) {
    const sameYear = validFrom.slice(0, 4) === validThrough.slice(0, 4);

    return `${formatIsoDate(validFrom, !sameYear)} – ${formatIsoDate(
      validThrough,
    )}`;
  }

  if (validFrom) {
    return `From ${formatIsoDate(validFrom)}`;
  }

  if (validThrough) {
    return `Through ${formatIsoDate(validThrough)}`;
  }

  return '';
};

/**
 * Buckets spans by their validity window so a caption is printed once per
 * window instead of once per row — term hours are usually two or three spans
 * sharing a single set of dates. First-appearance order is preserved, so the
 * caller's list controls which window shows first.
 */
export const groupHoursByValidity = (
  hours: OpeningHours[],
): OpeningHoursGroup[] => {
  const groups: OpeningHoursGroup[] = [];
  const groupsByWindow = new Map<string, OpeningHoursGroup>();

  hours.forEach((span) => {
    const window = `${span.validFrom ?? ''}|${span.validThrough ?? ''}`;
    const existingGroup = groupsByWindow.get(window);

    if (existingGroup) {
      existingGroup.spans.push(span);
      return;
    }

    const group = { caption: formatValidityCaption(span), spans: [span] };
    groupsByWindow.set(window, group);
    groups.push(group);
  });

  // Once any window is dated, an undated group has to say so out loud. Left
  // captionless it renders flush under the previous caption and reads as part
  // of it. Captions are dropped entirely only when nothing is scoped.
  const hasDatedWindow = groups.some((group) => group.caption !== '');

  return hasDatedWindow
    ? groups.map((group) => ({
        ...group,
        caption: group.caption || 'Year-round',
      }))
    : groups;
};
