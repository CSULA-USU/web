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
import { CategoricalAccents } from 'theme';
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
const goldenEagleAwards = buildEvent(
  'awards',
  'Golden Eagle Awards',
  '2027-05-17T18:00:00-07:00',
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

  describe('with a collapsed cap', () => {
    const renderCapped = () =>
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair, goldenEagleAwards]}
          onSelectEvent={jest.fn()}
          collapsedVisibleCount={2}
        />,
      );

    it('shows only the first events, behind a toggle counting them all', () => {
      renderCapped();

      expect(screen.getByRole('button', { name: /LEAD Series/ })).toBeTruthy();
      expect(
        screen.getByRole('button', { name: /Involvement Fair/ }),
      ).toBeTruthy();
      expect(
        screen.queryByRole('button', { name: /Golden Eagle Awards/ }),
      ).toBe(null);
      expect(screen.getByRole('button', { name: 'Show all 3' })).toBeTruthy();
    });

    /* The whole reason the overflow is hidden with CSS rather than dropped:
       Googlebot renders JS but never clicks, so a conditionally rendered
       event would never be indexed. */
    it('leaves the capped events in the DOM for search and find-in-page', () => {
      renderCapped();

      expect(
        screen.getByRole('heading', {
          name: 'Golden Eagle Awards',
          hidden: true,
        }),
      ).toBeTruthy();
    });

    it('reveals the rest when the toggle is pressed', () => {
      renderCapped();

      fireEvent.click(screen.getByRole('button', { name: 'Show all 3' }));

      expect(
        screen.getByRole('button', { name: /Golden Eagle Awards/ }),
      ).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Show fewer' })).toBeTruthy();
    });

    it('re-hides them when the toggle is pressed again', () => {
      renderCapped();

      fireEvent.click(screen.getByRole('button', { name: 'Show all 3' }));
      fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }));

      expect(
        screen.queryByRole('button', { name: /Golden Eagle Awards/ }),
      ).toBe(null);
    });

    /* Wingspan's list shrinks as the term runs out, so the cap has to stop
       announcing itself once everything fits under it. */
    it('offers no toggle when the events already fit', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair]}
          onSelectEvent={jest.fn()}
          collapsedVisibleCount={6}
        />,
      );

      expect(screen.queryByRole('button', { name: /Show all/ })).toBe(null);
    });
  });

  it('shows every event when no cap is given', () => {
    render(
      <ImagelessEventsGrid
        events={[leadSeries, involvementFair, goldenEagleAwards]}
        onSelectEvent={jest.fn()}
      />,
    );

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.queryByRole('button', { name: /Show all/ })).toBe(null);
  });

  /* The assignment logic is covered in month-accent-colors.test.ts; these only
     check that a card's month actually reaches its edge color. styled-
     components mints one class per distinct interpolated value, so comparing
     class names compares accents without parsing CSS. */
  describe('with month accent colors', () => {
    const secondSeptemberEvent = buildEvent(
      'lead-2',
      'LEAD Series - The Art of Service',
      '2026-09-29T12:00:00-07:00',
    );

    const cardFor = (name: RegExp) =>
      screen.getByRole('button', { name }).className;

    it('gives cards in different months different edge colors', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair, goldenEagleAwards]}
          onSelectEvent={jest.fn()}
          monthAccentColors={CategoricalAccents}
        />,
      );

      expect(
        new Set([
          cardFor(/LEAD Series - Stress Less/),
          cardFor(/Involvement Fair/),
          cardFor(/Golden Eagle Awards/),
        ]).size,
      ).toBe(3);
    });

    it('gives cards in the same month the same edge color', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, secondSeptemberEvent, involvementFair]}
          onSelectEvent={jest.fn()}
          monthAccentColors={CategoricalAccents}
        />,
      );

      expect(cardFor(/LEAD Series - Stress Less/)).toBe(
        cardFor(/LEAD Series - The Art of Service/),
      );
    });

    it('leaves every card on one accent when no ramp is given', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair, goldenEagleAwards]}
          onSelectEvent={jest.fn()}
        />,
      );

      expect(
        new Set([
          cardFor(/LEAD Series - Stress Less/),
          cardFor(/Involvement Fair/),
          cardFor(/Golden Eagle Awards/),
        ]).size,
      ).toBe(1);
    });

    /* Colors come from the full list, so the cards still on screen must not
       change color when the rest are revealed. */
    it('holds a card to its color across the collapse toggle', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair, goldenEagleAwards]}
          onSelectEvent={jest.fn()}
          monthAccentColors={CategoricalAccents}
          collapsedVisibleCount={2}
        />,
      );

      const collapsed = cardFor(/Involvement Fair/);
      fireEvent.click(screen.getByRole('button', { name: 'Show all 3' }));

      expect(cardFor(/Involvement Fair/)).toBe(collapsed);
    });
  });

  describe('with a month filter', () => {
    const secondSeptemberEvent = buildEvent(
      'lead-2',
      'LEAD Series - The Art of Service',
      '2026-09-29T12:00:00-07:00',
    );

    const renderFiltered = (props = {}) =>
      render(
        <ImagelessEventsGrid
          events={[
            leadSeries,
            secondSeptemberEvent,
            involvementFair,
            goldenEagleAwards,
          ]}
          onSelectEvent={jest.fn()}
          showMonthFilter
          {...props}
        />,
      );

    it('offers one pill per month, plus All, starting on All', () => {
      renderFiltered();

      expect(
        screen
          .getByRole('button', { name: 'All 4' })
          .getAttribute('aria-pressed'),
      ).toBe('true');
      expect(
        screen.getByRole('button', { name: 'September 2026' }),
      ).toBeTruthy();
      expect(
        screen.getByRole('button', { name: 'February 2027' }),
      ).toBeTruthy();
      expect(screen.getByRole('button', { name: 'May 2027' })).toBeTruthy();
    });

    it('shows only the chosen month once a pill is pressed', () => {
      renderFiltered();

      fireEvent.click(screen.getByRole('button', { name: 'September 2026' }));

      expect(
        screen.getAllByRole('button', { name: /LEAD Series/ }),
      ).toHaveLength(2);
      expect(screen.queryByRole('button', { name: /Involvement Fair/ })).toBe(
        null,
      );
    });

    /* Same rule as the collapse: Googlebot renders JS but never clicks, so an
       event dropped from the tree by a filter would never be indexed. */
    it('leaves the filtered-out events in the DOM', () => {
      renderFiltered();

      fireEvent.click(screen.getByRole('button', { name: 'September 2026' }));

      expect(
        screen.getByRole('heading', { name: 'Involvement Fair', hidden: true }),
      ).toBeTruthy();
    });

    it('puts everything back when All is pressed again', () => {
      renderFiltered();

      fireEvent.click(screen.getByRole('button', { name: 'September 2026' }));
      fireEvent.click(screen.getByRole('button', { name: 'All 4' }));

      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    });

    /* The cap counts what the filter left, not the raw list — otherwise a
       filtered-out card would eat one of the visible slots. */
    it('counts the cap against the filtered events', () => {
      renderFiltered({ collapsedVisibleCount: 2 });

      expect(screen.getByRole('button', { name: 'Show all 4' })).toBeTruthy();

      fireEvent.click(screen.getByRole('button', { name: 'September 2026' }));

      expect(screen.queryByRole('button', { name: /Show all/ })).toBe(null);
      expect(
        screen.getByRole('button', {
          name: /LEAD Series - The Art of Service/,
        }),
      ).toBeTruthy();
    });

    it('retires the toggle when the chosen month fits under the cap', () => {
      renderFiltered({ collapsedVisibleCount: 2 });

      fireEvent.click(screen.getByRole('button', { name: 'February 2027' }));

      expect(screen.queryByRole('button', { name: /Show all/ })).toBe(null);
      expect(
        screen.getByRole('button', { name: /Involvement Fair/ }),
      ).toBeTruthy();
    });

    /* Pills that only ever offer the list you are already looking at are
       clutter, and on a phone they cost a whole row. */
    it('offers no pills when every event falls in one month', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, secondSeptemberEvent]}
          onSelectEvent={jest.fn()}
          showMonthFilter
        />,
      );

      expect(screen.queryByRole('group')).toBe(null);
    });

    it('offers no pills unless asked for', () => {
      render(
        <ImagelessEventsGrid
          events={[leadSeries, involvementFair]}
          onSelectEvent={jest.fn()}
        />,
      );

      expect(screen.queryByRole('group')).toBe(null);
    });
  });

  it('renders nothing when no events are tagged', () => {
    const { container } = render(
      <ImagelessEventsGrid events={[]} onSelectEvent={jest.fn()} />,
    );

    expect(container.childElementCount).toBe(0);
  });
});
