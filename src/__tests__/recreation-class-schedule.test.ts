import { Icon } from 'components/Icon';
import { isWeekday } from 'utils/openingHours';
// No module alias covers src/data, so this one import is relative.
import RecData from '../data/recreation.json';

describe('isWeekday', () => {
  it('accepts full day names', () => {
    expect(isWeekday('Monday')).toBe(true);
    expect(isWeekday('Sunday')).toBe(true);
  });

  it('rejects abbreviations, plurals, and misspellings', () => {
    expect(isWeekday('Mon')).toBe(false);
    expect(isWeekday('Mondays')).toBe(false);
    expect(isWeekday('Thrusday')).toBe(false);
  });
});

/* The page filters days through isWeekday, so a typo in the JSON would drop
   that day from the card without an error. This is what catches it. */
describe('Recreation class schedule data', () => {
  it.each(RecData.home.classes.map((c) => [c.title, c.days] as const))(
    '%s lists only valid weekdays',
    (_title, days) => {
      expect(days.length).toBeGreaterThan(0);
      days.forEach((day) => expect(isWeekday(day)).toBe(true));
    },
  );

  /* Icon renders nothing for a name missing from its map, so a typo here
     would leave a card bare without an error. */
  it.each(
    RecData.home.classes.map((c) => [c.title, c.backgroundIconName] as const),
  )('%s names an icon that Icon knows (%s)', (_title, iconName) => {
    expect(Icon({ iconName })).toBeDefined();
  });
});
