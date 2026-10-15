/**
 * @jest-environment jsdom
 */
import { fetchEvents } from 'services';
import { filterEventsByTopic, hasEventTopic } from 'utils/eventUtils';
import { CampusGroupsEvent } from 'types';

/* Trimmed from a real CampusGroups pull: the topic block is reproduced exactly,
   including the seven tags on one LEAD Series workshop and the &amp; entity,
   because the parse under test is the one that has to survive both. */
const feedXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <item>
      <eventId>374966</eventId>
      <title>LEAD Series - Stress Less for Success!</title>
      <eventStartDateTime>2026-09-08T13:00:00.0000000-07:00</eventStartDateTime>
      <eventEndDateTime>2026-09-08T14:30:00.0000000-07:00</eventEndDateTime>
      <eventTopics>Leadership Development,Career/Professional Development,Critical Dialogues,Educational Workshop/Program,Food,Guest Speaker,Wingspan</eventTopics>
      <eventTopicsSeparated>
        <eventTopic>Leadership Development</eventTopic>
        <eventTopic>Career/Professional Development</eventTopic>
        <eventTopic>Critical Dialogues</eventTopic>
        <eventTopic>Educational Workshop/Program</eventTopic>
        <eventTopic>Food</eventTopic>
        <eventTopic>Guest Speaker</eventTopic>
        <eventTopic>Wingspan</eventTopic>
      </eventTopicsSeparated>
      <category>Leadership</category>
    </item>
    <item>
      <eventId>374967</eventId>
      <title>Noche de Cultura</title>
      <eventStartDateTime>2026-09-09T18:00:00.0000000-07:00</eventStartDateTime>
      <eventEndDateTime>2026-09-09T20:00:00.0000000-07:00</eventEndDateTime>
      <eventTopics>Cultural,Music &amp; Entertainment</eventTopics>
      <eventTopicsSeparated>
        <eventTopic>Cultural</eventTopic>
        <eventTopic>Music &amp; Entertainment</eventTopic>
      </eventTopicsSeparated>
      <category>Cultural</category>
    </item>
    <item>
      <eventId>374968</eventId>
      <title>Untagged Drop-In</title>
      <eventStartDateTime>2026-09-10T10:00:00.0000000-07:00</eventStartDateTime>
      <eventEndDateTime>2026-09-10T11:00:00.0000000-07:00</eventEndDateTime>
      <eventTopics></eventTopics>
      <eventTopicsSeparated></eventTopicsSeparated>
      <category>Meeting</category>
    </item>
  </channel>
</rss>`;

const buildTaggedEvent = (
  eventId: string,
  eventTopics: string[],
): CampusGroupsEvent => ({ eventId, eventTopics } as CampusGroupsEvent);

describe('fetchEvents topic parsing', () => {
  const parseFeed = async (xml: string) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => xml,
    }) as jest.Mock;
    return fetchEvents(jest.fn());
  };

  it('reads every topic on an event, not just the first', async () => {
    const [workshop] = await parseFeed(feedXml);
    expect(workshop.eventTopics).toEqual([
      'Leadership Development',
      'Career/Professional Development',
      'Critical Dialogues',
      'Educational Workshop/Program',
      'Food',
      'Guest Speaker',
      'Wingspan',
    ]);
  });

  it('decodes XML entities in topic names', async () => {
    const [, cultural] = await parseFeed(feedXml);
    expect(cultural.eventTopics).toContain('Music & Entertainment');
  });

  it('gives an untagged event an empty topic list, not a blank tag', async () => {
    const [, , untagged] = await parseFeed(feedXml);
    expect(untagged.eventTopics).toEqual([]);
  });
});

describe('hasEventTopic', () => {
  it('matches a tag anywhere in the list', () => {
    expect(
      hasEventTopic(buildTaggedEvent('a', ['Food', 'Wingspan']), 'Wingspan'),
    ).toBe(true);
  });

  it('ignores case, since the tags are hand-typed in CampusGroups', () => {
    expect(hasEventTopic(buildTaggedEvent('a', ['wingspan']), 'Wingspan')).toBe(
      true,
    );
  });

  it('does not match a tag that merely contains the topic', () => {
    expect(
      hasEventTopic(buildTaggedEvent('a', ['Wingspan Kickoff']), 'Wingspan'),
    ).toBe(false);
  });

  it('survives an event built without the field', () => {
    expect(hasEventTopic({} as CampusGroupsEvent, 'Wingspan')).toBe(false);
  });
});

describe('filterEventsByTopic', () => {
  it('keeps only tagged events and preserves their order', () => {
    const events = [
      buildTaggedEvent('first', ['Wingspan']),
      buildTaggedEvent('cultural', ['Cultural']),
      buildTaggedEvent('second', ['Food', 'Wingspan']),
    ];
    expect(
      filterEventsByTopic(events, 'Wingspan').map((event) => event.eventId),
    ).toEqual(['first', 'second']);
  });
});
