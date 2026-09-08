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
import { ImagelessEventsGrid } from 'modules/ImagelessEventsGrid';
import { CampusGroupsEvent } from 'types';

const buildEvent = (
  eventId: string,
  title: string,
  eventStartDateTime: string,
): CampusGroupsEvent =>
  ({
    eventId,
    title,
    eventStartDateTime,
    eventEndDateTime: '2026-09-08T14:30:00-07:00',
    eventLocation: 'U-SU Alhambra Room, 5154 State University Drive',
    eventOriginalPhotoFullUrl: 'https://example.org/flyer.jpg',
    eventTopics: ['Wingspan'],
  } as CampusGroupsEvent);

const leadSeries = buildEvent(
  'lead-1',
  'LEAD Series - Stress Less for Success!',
  '2026-09-08T13:00:00-07:00',
);
const involvementFair = buildEvent(
  'fair',
  'Involvement Fair',
  '2027-02-03T14:00:00-08:00',
);

describe('ImagelessEventsGrid', () => {
  it('exposes each event through one control named after it', () => {
    render(
      <ImagelessEventsGrid
        events={[leadSeries, involvementFair]}
        onSelectEvent={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', {
        name: /LEAD Series - Stress Less for Success!/,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /Involvement Fair/ }),
    ).toBeTruthy();
  });

  it('renders in the order given rather than re-sorting', () => {
    render(
      <ImagelessEventsGrid
        events={[leadSeries, involvementFair]}
        onSelectEvent={jest.fn()}
      />,
    );

    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual([
      'LEAD Series - Stress Less for Success!',
      'Involvement Fair',
    ]);
  });

  it('hands the clicked event back to the caller, for the modal to open', () => {
    const onSelectEvent = jest.fn();
    render(
      <ImagelessEventsGrid
        events={[leadSeries, involvementFair]}
        onSelectEvent={onSelectEvent}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Involvement Fair/ }));

    expect(onSelectEvent).toHaveBeenCalledWith(involvementFair);
  });

  /* The flyer belongs to the modal, not the card — that is the whole reason
     this grid exists rather than a row of EventCards. */
  it('renders no flyer art, even when the event carries one', () => {
    const { container } = render(
      <ImagelessEventsGrid events={[leadSeries]} onSelectEvent={jest.fn()} />,
    );

    expect(container.querySelectorAll('img')).toHaveLength(0);
  });

  it('shows the location without its street address', () => {
    render(
      <ImagelessEventsGrid events={[leadSeries]} onSelectEvent={jest.fn()} />,
    );

    expect(screen.getByText('U-SU Alhambra Room')).toBeTruthy();
  });

  /* Wingspan programming spans the academic year, so a card four months out
     is ambiguous without it. */
  it('shows the year on the date badge', () => {
    render(
      <ImagelessEventsGrid
        events={[involvementFair]}
        onSelectEvent={jest.fn()}
      />,
    );

    expect(screen.getByText('2027')).toBeTruthy();
    expect(screen.getByText('Feb')).toBeTruthy();
  });

  it('renders nothing when no events are tagged', () => {
    const { container } = render(
      <ImagelessEventsGrid events={[]} onSelectEvent={jest.fn()} />,
    );

    expect(container.childElementCount).toBe(0);
  });
});
