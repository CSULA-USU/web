import {
  formatIsoDate,
  formatTime,
  formatValidityCaption,
  formatWeekdays,
  groupHoursByValidity,
  OpeningHours,
} from 'utils/openingHours';

const span = (overrides: Partial<OpeningHours> = {}): OpeningHours => ({
  days: ['Monday'],
  opens: '09:00',
  closes: '17:00',
  ...overrides,
});

describe('formatTime', () => {
  it('drops :00 so a whole hour reads as one token', () => {
    expect(formatTime('07:00')).toBe('7 AM');
    expect(formatTime('19:00')).toBe('7 PM');
  });

  it('keeps minutes when they are not zero', () => {
    expect(formatTime('07:30')).toBe('7:30 AM');
    expect(formatTime('15:45')).toBe('3:45 PM');
  });

  it('handles the midnight and noon edges', () => {
    expect(formatTime('00:00')).toBe('12 AM');
    expect(formatTime('12:00')).toBe('12 PM');
    expect(formatTime('00:30')).toBe('12:30 AM');
    expect(formatTime('12:30')).toBe('12:30 PM');
  });

  it('treats 12:xx as PM and 11:xx as AM', () => {
    expect(formatTime('11:59')).toBe('11:59 AM');
    expect(formatTime('23:59')).toBe('11:59 PM');
  });
});

describe('formatWeekdays', () => {
  it('hyphenates runs longer than two days', () => {
    expect(formatWeekdays(['Monday', 'Tuesday', 'Wednesday', 'Thursday'])).toBe(
      'Mon–Thu',
    );
    expect(
      formatWeekdays([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]),
    ).toBe('Mon–Sun');
  });

  it('lists a two-day run instead of hyphenating it', () => {
    expect(formatWeekdays(['Saturday', 'Sunday'])).toBe('Sat, Sun');
    expect(formatWeekdays(['Monday', 'Tuesday'])).toBe('Mon, Tue');
  });

  it('lists a single day plainly', () => {
    expect(formatWeekdays(['Friday'])).toBe('Fri');
  });

  it('keeps a split week listed rather than collapsing it', () => {
    expect(formatWeekdays(['Monday', 'Wednesday', 'Friday'])).toBe(
      'Mon, Wed, Fri',
    );
  });

  it('normalizes input order to the calendar week', () => {
    expect(formatWeekdays(['Thursday', 'Monday', 'Wednesday', 'Tuesday'])).toBe(
      'Mon–Thu',
    );
  });

  it('mixes runs and singles in one string', () => {
    expect(
      formatWeekdays(['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Sunday']),
    ).toBe('Mon–Wed, Fri, Sun');
  });

  it('returns an empty string for no days', () => {
    expect(formatWeekdays([])).toBe('');
  });

  // Sunday is last in the week order, so a Sunday+Monday pair is deliberately
  // two runs rather than one wrapping range.
  it('does not wrap a run around the end of the week', () => {
    expect(formatWeekdays(['Sunday', 'Monday'])).toBe('Mon, Sun');
  });
});

describe('formatIsoDate', () => {
  it('formats month, day and year', () => {
    expect(formatIsoDate('2026-08-24')).toBe('Aug 24, 2026');
  });

  it('omits the year when asked', () => {
    expect(formatIsoDate('2026-08-24', false)).toBe('Aug 24');
  });

  it('strips the leading zero from the day', () => {
    expect(formatIsoDate('2026-08-04')).toBe('Aug 4, 2026');
  });

  /**
   * The reason this helper does string arithmetic instead of using Date: passing
   * 'YYYY-MM-DD' to `new Date` parses it as UTC midnight, so any timezone west
   * of Greenwich formats it as the previous day. These two dates would shift
   * across a month and a year boundary respectively if that regressed.
   */
  it('does not shift the date across month or year boundaries', () => {
    expect(formatIsoDate('2026-01-01')).toBe('Jan 1, 2026');
    expect(formatIsoDate('2026-12-31')).toBe('Dec 31, 2026');
    expect(formatIsoDate('2026-03-01')).toBe('Mar 1, 2026');
  });
});

describe('formatValidityCaption', () => {
  it('prints the year once when both bounds share it', () => {
    expect(
      formatValidityCaption(
        span({ validFrom: '2026-08-24', validThrough: '2026-12-18' }),
      ),
    ).toBe('Aug 24 – Dec 18, 2026');
  });

  it('prints both years when the window crosses one', () => {
    expect(
      formatValidityCaption(
        span({ validFrom: '2026-12-19', validThrough: '2027-01-19' }),
      ),
    ).toBe('Dec 19, 2026 – Jan 19, 2027');
  });

  it('reads open-ended when only a start is set', () => {
    expect(formatValidityCaption(span({ validFrom: '2027-01-20' }))).toBe(
      'From Jan 20, 2027',
    );
  });

  it('reads as a deadline when only an end is set', () => {
    expect(formatValidityCaption(span({ validThrough: '2026-12-18' }))).toBe(
      'Through Dec 18, 2026',
    );
  });

  it('is empty for an undated span', () => {
    expect(formatValidityCaption(span())).toBe('');
  });
});

describe('groupHoursByValidity', () => {
  it('buckets spans that share a window under one caption', () => {
    const window = { validFrom: '2026-08-24', validThrough: '2026-12-18' };
    const groups = groupHoursByValidity([
      span({ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], ...window }),
      span({ days: ['Friday'], ...window }),
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].caption).toBe('Aug 24 – Dec 18, 2026');
    expect(groups[0].spans).toHaveLength(2);
  });

  it('separates distinct windows and preserves input order', () => {
    const groups = groupHoursByValidity([
      span({ validFrom: '2026-12-19', validThrough: '2027-01-19' }),
      span({ validFrom: '2026-08-24', validThrough: '2026-12-18' }),
    ]);

    expect(groups.map((group) => group.caption)).toEqual([
      'Dec 19, 2026 – Jan 19, 2027',
      'Aug 24 – Dec 18, 2026',
    ]);
  });

  it('omits captions entirely when nothing is dated', () => {
    const groups = groupHoursByValidity([
      span({ days: ['Monday'] }),
      span({ days: ['Tuesday'], opens: '10:00' }),
    ]);

    // Same empty window, so both spans land in one uncaptioned group.
    expect(groups).toHaveLength(1);
    expect(groups[0].caption).toBe('');
  });

  /**
   * An undated group rendered captionless sits flush under the previous
   * caption and reads as part of it, so it has to name itself once any
   * sibling window is dated.
   */
  it('labels an undated group Year-round once a sibling is dated', () => {
    const groups = groupHoursByValidity([
      span({ validFrom: '2026-08-24', validThrough: '2026-12-18' }),
      span({ days: ['Sunday'] }),
    ]);

    expect(groups.map((group) => group.caption)).toEqual([
      'Aug 24 – Dec 18, 2026',
      'Year-round',
    ]);
  });

  it('returns nothing for no spans', () => {
    expect(groupHoursByValidity([])).toEqual([]);
  });

  it('does not mutate the spans it was given', () => {
    const input = [span({ validFrom: '2026-08-24' })];
    const snapshot = JSON.parse(JSON.stringify(input));

    groupHoursByValidity(input);

    expect(input).toEqual(snapshot);
  });
});
