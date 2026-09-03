/**
 * @jest-environment jsdom
 */
// The `components` barrel transitively reaches lib/supabase, which throws at
// import time without env vars. Stubbing it keeps this a pure UI test.
jest.mock('lib/supabase', () => ({ supabase: {} }));
// The barrels also reach Nav, whose drawer library ships ESM that ts-jest will
// not parse. Nothing here renders it.
jest.mock('@accessible/drawer', () => ({}));

import { fireEvent, render, screen } from '@testing-library/react';
import { EventHeader } from 'modules/EventHeader';
import { CampusGroupsEvent } from 'types';

/* No photo URL on purpose: it sends the card down its "nothing to preload"
   branch, so the card paints instead of holding its skeleton forever. */
const buildEvent = (eventId: string, title: string): CampusGroupsEvent =>
  ({
    eventId,
    eventUid: `uid-${eventId}`,
    groupId: '18633',
    group: 'Center for Student Involvement',
    groupAcronym: 'usucsi',
    title,
    description: '',
    eventStartDateTime: '2026-09-03T11:00:00-07:00',
    eventEndDateTime: '2026-09-03T14:00:00-07:00',
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

const cultureFest = buildEvent('live-1', 'Culture Fest');
const karaokeNight = buildEvent('live-2', 'Karaoke Night');
const rsoWorkshop = buildEvent('next-1', 'RSO Workshop');

describe('EventHeader', () => {
  it('badges a single live event without offering a switcher', () => {
    render(<EventHeader loading={false} liveEvents={[cultureFest]} />);

    expect(screen.getAllByText('Live now')).toHaveLength(1);
    expect(screen.queryByRole('tablist')).toBeNull();
  });

  it('renders one tab per live event, the earliest selected first', () => {
    render(
      <EventHeader loading={false} liveEvents={[cultureFest, karaokeNight]} />,
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      'Culture Fest',
      'Karaoke Night',
    ]);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
  });

  it('keeps every panel mounted so a hidden one is not lost', () => {
    render(
      <EventHeader loading={false} liveEvents={[cultureFest, karaokeNight]} />,
    );

    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(2);
    expect(screen.getAllByText('Live now')).toHaveLength(2);
  });

  it('switches on click', () => {
    render(
      <EventHeader loading={false} liveEvents={[cultureFest, karaokeNight]} />,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Karaoke Night' }));

    expect(
      screen
        .getByRole('tab', { name: 'Karaoke Night' })
        .getAttribute('aria-selected'),
    ).toBe('true');
    expect(
      screen
        .getByRole('tab', { name: 'Culture Fest' })
        .getAttribute('aria-selected'),
    ).toBe('false');
  });

  it('switches on arrow keys and wraps around', () => {
    render(
      <EventHeader loading={false} liveEvents={[cultureFest, karaokeNight]} />,
    );
    const [firstTab] = screen.getAllByRole('tab');

    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(
      screen
        .getByRole('tab', { name: 'Karaoke Night' })
        .getAttribute('aria-selected'),
    ).toBe('true');

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Karaoke Night' }), {
      key: 'ArrowRight',
    });
    expect(
      screen
        .getByRole('tab', { name: 'Culture Fest' })
        .getAttribute('aria-selected'),
    ).toBe('true');
  });

  it('holds exactly one tab in the tab order', () => {
    render(
      <EventHeader loading={false} liveEvents={[cultureFest, karaokeNight]} />,
    );

    const tabIndexes = screen
      .getAllByRole('tab')
      .map((tab) => tab.getAttribute('tabindex'));
    expect(tabIndexes).toEqual(['0', '-1']);
  });

  it('falls back to the next event, unbadged, when nothing is live', () => {
    render(
      <EventHeader
        loading={false}
        liveEvents={[]}
        featuredEvent={rsoWorkshop}
      />,
    );

    expect(screen.getByText('RSO Workshop')).toBeTruthy();
    expect(screen.queryByText('Live now')).toBeNull();
    expect(screen.queryByRole('tablist')).toBeNull();
  });
});
