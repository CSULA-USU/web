import {
  EMPTY_EVENT_FILTERS,
  EventFilterState,
  filterEvents,
  getDepartmentOptions,
  parseEventFilterQuery,
  toEventFilterQuery,
  toFilterSlug,
} from 'utils/eventFilters';
import { CampusGroupsEvent } from 'types';

const buildEvent = (fields: Partial<CampusGroupsEvent>): CampusGroupsEvent =>
  ({
    eventId: fields.title,
    title: '',
    description: '',
    group: 'U-SU Recreation',
    groupId: '35617',
    eventTopics: [],
    ...fields,
  } as CampusGroupsEvent);

const filtersWith = (filters: Partial<EventFilterState>): EventFilterState => ({
  ...EMPTY_EVENT_FILTERS,
  ...filters,
});

const titles = (events: CampusGroupsEvent[]) =>
  events.map((event) => event.title);

describe('toFilterSlug', () => {
  it('reduces a label to lowercase words joined by dashes', () => {
    expect(toFilterSlug('U-SU Recreation')).toBe('u-su-recreation');
    expect(toFilterSlug('Center for Student Involvement')).toBe(
      'center-for-student-involvement',
    );
  });

  it('strips accents', () => {
    expect(toFilterSlug('Día de Los Muertos')).toBe('dia-de-los-muertos');
  });
});

describe('getDepartmentOptions', () => {
  it('gives each department one option, alphabetized by its chip label', () => {
    const options = getDepartmentOptions([
      buildEvent({ group: 'U-SU Recreation', groupId: '35617' }),
      buildEvent({ group: 'Cross Cultural Centers', groupId: '35630' }),
      buildEvent({ group: 'U-SU Recreation', groupId: '35617' }),
      buildEvent({
        group: 'Center for Student Involvement',
        groupId: '18633',
      }),
    ]);
    expect(options.map((option) => option.shortName)).toEqual([
      'CCC',
      'CSI',
      'Recreation',
    ]);
    expect(options.map((option) => option.slug)).toEqual([
      'ccc',
      'csi',
      'recreation',
    ]);
  });

  it('falls back to the feed name for a group with no short label', () => {
    const [option] = getDepartmentOptions([
      buildEvent({ group: 'University-Student Union', groupId: '35618' }),
    ]);
    expect(option.shortName).toBe('University-Student Union');
    expect(option.slug).toBe('university-student-union');
  });
});

describe('filterEvents', () => {
  const zumba = buildEvent({
    title: 'Zumba',
    description: 'Dance cardio in Rec 2.',
    eventTopics: ['Recreational Program'],
  });
  const altar = buildEvent({
    title: 'Día de Los Muertos Altar',
    group: 'Cross Cultural Centers',
    groupId: '35630',
    eventTopics: ['Cultural', 'Food'],
  });
  const movieNight = buildEvent({
    title: 'Reel Black Movie Night',
    group: 'Cross Cultural Centers',
    groupId: '35630',
    eventTopics: ['Movie/Film', 'Music & Entertainment'],
  });
  const events = [zumba, altar, movieNight];

  it('keeps everything when no filter is active', () => {
    expect(filterEvents(events, EMPTY_EVENT_FILTERS)).toEqual(events);
  });

  it('narrows by department', () => {
    expect(
      titles(filterEvents(events, filtersWith({ departmentSlug: 'ccc' }))),
    ).toEqual(['Día de Los Muertos Altar', 'Reel Black Movie Night']);
  });

  it('applies department and search together', () => {
    expect(
      titles(
        filterEvents(
          events,
          filtersWith({ departmentSlug: 'ccc', searchQuery: 'movie' }),
        ),
      ),
    ).toEqual(['Reel Black Movie Night']);
  });

  it('searches ignoring case and accents', () => {
    expect(
      titles(filterEvents(events, filtersWith({ searchQuery: 'DIA' }))),
    ).toEqual(['Día de Los Muertos Altar']);
  });

  it('matches the start of a word, not the middle of one', () => {
    const socialMedia = buildEvent({
      title: 'Social Media Workshop',
      eventTopics: ['Leadership Development'],
    });
    expect(
      titles(
        filterEvents([altar, socialMedia], filtersWith({ searchQuery: 'dia' })),
      ),
    ).toEqual(['Día de Los Muertos Altar']);
    expect(
      titles(
        filterEvents(
          [altar, socialMedia],
          filtersWith({ searchQuery: 'lead' }),
        ),
      ),
    ).toEqual(['Social Media Workshop']);
  });

  it('requires every search word, matched anywhere in the event', () => {
    expect(
      titles(
        filterEvents(events, filtersWith({ searchQuery: 'zumba  cardio' })),
      ),
    ).toEqual(['Zumba']);
    expect(
      filterEvents(events, filtersWith({ searchQuery: 'zumba film' })),
    ).toEqual([]);
  });

  it('searches tags and the department name', () => {
    expect(
      titles(filterEvents(events, filtersWith({ searchQuery: 'film' }))),
    ).toEqual(['Reel Black Movie Night']);
    expect(
      titles(filterEvents(events, filtersWith({ searchQuery: 'cultural' }))),
    ).toEqual(['Día de Los Muertos Altar', 'Reel Black Movie Night']);
  });
});

describe('event filter URL query', () => {
  it('round-trips every filter', () => {
    const filters: EventFilterState = {
      searchQuery: 'yoga',
      departmentSlug: 'recreation',
    };
    expect(parseEventFilterQuery(toEventFilterQuery(filters))).toEqual(filters);
  });

  it('leaves out empty filters and trims the search', () => {
    expect(toEventFilterQuery(EMPTY_EVENT_FILTERS)).toEqual({});
    expect(toEventFilterQuery(filtersWith({ searchQuery: '  yoga ' }))).toEqual(
      { q: 'yoga' },
    );
  });

  it('keeps the first value of a repeated parameter', () => {
    expect(
      parseEventFilterQuery({ department: ['ccc', 'csi'] }).departmentSlug,
    ).toBe('ccc');
  });
});
