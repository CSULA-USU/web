import { Button, Typography, VisuallyHidden } from 'components';
import { useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Colors, media, Radii, Shadows, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import {
  formatEventLocation,
  getEventMonthAccents,
  getEventMonthKey,
} from 'utils/eventUtils';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

/**
 * A grid of landscape event cards with no flyer art, for program pages that
 * list their own events inline.
 *
 * The imagelessness is the point, not a limitation: a program page is already
 * carrying its own photography, and a second grid of unrelated event flyers
 * competes with it. Text-only cards let a reader scan dates, which is what
 * someone on a program page is doing. The flyer still exists — `EventModal`
 * shows it once the card is opened.
 *
 * Pass `collapsedVisibleCount` to cap the list behind a toggle; see the prop.
 *
 * Two columns rather than as many as fit, because event titles run long
 * ("LEAD Series - The Art of Service: How To Make Meaning Out of Life
 * Experiences"). Narrow columns wrapped those to four or five lines and made
 * the cards portrait, so the date and location fell far below the title. A
 * wide card gives the title room to stay on one or two lines and keeps the
 * whole card landscape.
 */

/* An explicit column count, not `auto-fit`: the point is exactly two on
   desktop, and an auto-fit track would silently become three on a wide enough
   viewport, which is the portrait-card problem again. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${Spaces.md};
  width: 100%;

  ${media('tablet')(`grid-template-columns: minmax(0, 1fr);`)}
`;

/* The explicit `[hidden]` rule is load-bearing: the UA stylesheet's
   `[hidden] { display: none }` loses to any author `display`, so the
   `display: flex` below would leave a collapsed card on screen without it. */
const EventButton = styled.button<{ accentColor: string }>`
  display: flex;
  align-items: center;
  gap: ${Spaces.md};
  width: 100%;
  height: 100%;
  text-align: left;
  cursor: pointer;
  font: inherit;
  background-color: ${Colors.white};
  padding: ${Spaces.md};
  border: 1px solid ${Colors.greyLightest};
  border-left: 8px solid ${(p) => p.accentColor};
  border-radius: ${Radii.surface};
  box-shadow: ${Shadows.soft};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    box-shadow: ${Shadows.lifted};
    transform: translateY(-2px);
  }

  &[hidden] {
    display: none;
  }
`;

/**
 * The date as a badge rather than another icon row, which is what lets the
 * card read landscape: it puts the one thing a scanning reader is looking for
 * in a fixed-width column on the left, and leaves the full remaining width to
 * the title. `flex-shrink: 0` because a long title would otherwise compress
 * the badge until the day number wrapped.
 */
const DateBadge = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 56px;
  padding: ${Spaces.sm};
  background-color: ${Colors.greyLightest};
  border-radius: ${Radii.control};
`;

const EventBody = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};
  min-width: 0;
`;

const EventDetail = styled.span`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};

  svg {
    color: ${Colors.gold};
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }
`;

const ToggleRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${Spaces.lg};
`;

/* Wraps rather than scrolling sideways: a scroller would put months off the
   edge with nothing to say they are there, which is the problem this filter
   exists to solve. */
const MonthFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.sm};
  margin-bottom: ${Spaces.lg};
`;

/* The chosen pill fills with primary and keeps black text — the house pattern
   for holding a fill on an active trigger, and about 14:1 on the yellow.
   Everything here stays black-on-light in every state, deliberately: a pill's
   label is a `Typography`, which paints its variant's own color and ignores an
   inherited one, so any design needing light text would have to thread a color
   prop through and would break silently the day someone forgot.

   Hover fills too, but only to greyLightest. If hover also went primary there
   would be no way to tell the pill under the pointer from the one applied. */
const MonthFilterButton = styled.button<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.sm};
  padding: ${Spaces.sm} ${Spaces.md};
  cursor: pointer;
  font: inherit;
  color: ${Colors.black};
  border-radius: ${Radii.pill};
  border: 1px solid ${(p) => (p.$selected ? Colors.black : Colors.greyLighter)};
  background-color: ${(p) => (p.$selected ? Colors.primary : Colors.white)};
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover:not([aria-pressed='true']) {
    background-color: ${Colors.greyLightest};
    border-color: ${Colors.greyDark};
  }

  &:focus-visible {
    outline: 3px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

/* The pill's swatch is what turns the card accents into a legend — without it
   the edge colors are decoration a reader has to guess at. `$`-prefixed
   because styled-components forwards a bare `color` to the DOM as an
   attribute. */
const MonthDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: ${Radii.pill};
  background-color: ${(p) => p.$color};
  /* The ring is what keeps a light swatch visible on a light surface. The
     nearest month's accent is the same primary the chosen pill fills with, so
     without it that one dot disappears on exactly the pill it labels — and the
     paler accents wash out against white too. Outside the box, so every dot
     stays the same size. */
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
`;

interface ImagelessEventsGridProps {
  /** Rendered in the order given — the caller owns the sort. */
  events: CampusGroupsEvent[];
  onSelectEvent: (event: CampusGroupsEvent) => void;
  /** Card edge color. Defaults to the U-SU yellow. */
  accentColor?: string;
  /**
   * Colors the card edges by month instead of uniformly, handing these out in
   * order and wrapping if there are more months than colors. Omit for one flat
   * `accentColor`.
   *
   * The job is telling one month's block of cards from the next at a glance in
   * a long list, so pass hues that are separable rather than a ramp — nothing
   * here implies that an earlier color means sooner. `CategoricalAccents` in
   * the theme is the set picked for exactly this.
   *
   * Color is never the only carrier: the date badge prints the month and year
   * on every card.
   *
   * Pass a module-scope constant rather than an inline array; the month
   * mapping is memoized on this prop's identity.
   */
  monthAccentColors?: readonly string[];
  /**
   * How many cards to show before the toggle. Omit to show every event.
   *
   * The cap changes what is visible, never what is rendered: every card stays
   * in the DOM and the overflow is hidden with CSS, so Googlebot — which
   * renders JS but never clicks — and find-in-page still see the whole list.
   * Dropping the overflow from the tree instead would make those events
   * unindexable.
   */
  collapsedVisibleCount?: number;
  /**
   * Adds a row of month pills above the grid, defaulting to "All".
   *
   * For lists long enough that scanning a phone one card at a time is the only
   * way to find a month — a full academic year is sixteen full-width cards.
   * Suppressed when every event falls in one month, where the pills would only
   * offer a choice between the list and the same list.
   *
   * Filtering hides with CSS exactly as the collapse does, so the events
   * filtered out stay in the DOM and stay indexable. The two share one set of
   * positions rather than compounding: the cap applies to whatever the filter
   * has left, so picking a month with fewer events than the cap simply retires
   * the toggle.
   */
  showMonthFilter?: boolean;
}

export const ImagelessEventsGrid = ({
  events,
  onSelectEvent,
  accentColor = Colors.primary,
  monthAccentColors,
  collapsedVisibleCount,
  showMonthFilter,
}: ImagelessEventsGridProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  /** `null` is "All" — the month keys themselves are never null. */
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const gridId = useId();

  /* Built from the whole list, never the visible slice, so a card keeps the
     same color whether the grid is collapsed, expanded, or filtered. */
  const monthAccents = useMemo(
    () =>
      monthAccentColors
        ? getEventMonthAccents(events, monthAccentColors)
        : null,
    [events, monthAccentColors],
  );

  /* One entry per month, in the order the months occur, which is the order the
     caller already sorted them into. */
  const monthOptions = useMemo(() => {
    const options: { key: string; label: string; description: string }[] = [];
    events.forEach((event) => {
      const key = getEventMonthKey(event);
      if (options.some((option) => option.key === key)) return;
      options.push({
        key,
        label: getMonth(event.eventStartDateTime, 'short'),
        description: `${getMonth(event.eventStartDateTime, 'long')} ${getYear(
          event.eventStartDateTime,
        )}`,
      });
    });
    return options;
  }, [events]);

  /* Where each still-showing event sits among the others still showing, which
     is what the cap counts against — a raw index over `events` would let a
     filtered-out card consume one of the slots. An event missing from this map
     is filtered out. */
  const filteredPositions = useMemo(() => {
    const positions = new Map<string, number>();
    events
      .filter(
        (event) =>
          selectedMonth === null || getEventMonthKey(event) === selectedMonth,
      )
      .forEach((event, index) => positions.set(event.eventId, index));
    return positions;
  }, [events, selectedMonth]);

  const filteredCount = filteredPositions.size;
  const visibleCount = collapsedVisibleCount ?? filteredCount;
  const isCollapsible = filteredCount > visibleCount;
  const selectedMonthLabel = monthOptions.find(
    (option) => option.key === selectedMonth,
  )?.description;
  /* One month means the pills could only offer the list already on screen. */
  const isMonthFilterShown =
    Boolean(showMonthFilter) && monthOptions.length > 1;

  const handleToggle = () => {
    const isCollapsing = isExpanded;
    setIsExpanded(!isExpanded);
    /* Collapsing pulls the toggle up by the full height of everything it just
       hid, which drops the reader into whichever section follows. Bringing the
       button back into view leaves them where they were looking. `nearest` is
       a no-op when it is already on screen, and scrollIntoView's default jump
       is instant, so there is no motion for prefers-reduced-motion to fight. */
    if (isCollapsing) {
      requestAnimationFrame(() =>
        toggleRef.current?.scrollIntoView?.({ block: 'nearest' }),
      );
    }
  };

  if (events.length === 0) return null;

  return (
    <>
      {isMonthFilterShown && (
        <MonthFilterRow role="group" aria-label="Filter events by month">
          <MonthFilterButton
            type="button"
            $selected={selectedMonth === null}
            aria-pressed={selectedMonth === null}
            aria-controls={gridId}
            onClick={() => setSelectedMonth(null)}
          >
            <Typography as="span" variant="cta">
              All {events.length}
            </Typography>
          </MonthFilterButton>
          {monthOptions.map(({ key, label, description }) => (
            <MonthFilterButton
              key={key}
              type="button"
              $selected={selectedMonth === key}
              aria-pressed={selectedMonth === key}
              aria-controls={gridId}
              /* The visible label is the short month alone; the year and full
                 name live here, so a pill reading "Feb" is unambiguous lifted
                 out of context without padding what is on screen. */
              aria-label={description}
              onClick={() => setSelectedMonth(key)}
            >
              {monthAccents && (
                <MonthDot
                  aria-hidden="true"
                  $color={monthAccents.get(key) ?? accentColor}
                />
              )}
              <Typography as="span" variant="cta">
                {label}
              </Typography>
            </MonthFilterButton>
          ))}
        </MonthFilterRow>
      )}

      {/* The pills change what is on screen without moving focus, so nothing
          would otherwise tell a screen reader the list had shrunk. Only the
          pills move this number, so there is nothing to announce without
          them. */}
      {isMonthFilterShown && (
        <VisuallyHidden aria-live="polite">
          {`${filteredCount} ${filteredCount === 1 ? 'event' : 'events'}${
            selectedMonthLabel ? ` in ${selectedMonthLabel}` : ''
          }`}
        </VisuallyHidden>
      )}

      <Grid id={gridId}>
        {events.map((event) => {
          const { eventStartDateTime, eventEndDateTime, eventLocation, title } =
            event;
          const filteredPosition = filteredPositions.get(event.eventId);
          const isFilteredOut = filteredPosition === undefined;
          return (
            <EventButton
              key={event.eventId}
              accentColor={
                monthAccents?.get(getEventMonthKey(event)) ?? accentColor
              }
              hidden={
                isFilteredOut ||
                (!isExpanded && filteredPosition >= visibleCount)
              }
              onClick={() => onSelectEvent(event)}
            >
              <DateBadge>
                <Typography
                  as="span"
                  variant="cta"
                  color="gold"
                  uppercase
                  letterSpacing="0.08em"
                >
                  {getMonth(eventStartDateTime, 'short')}
                </Typography>
                <Typography as="span" variant="titleSmall" color="black">
                  {getDay(eventStartDateTime)}
                </Typography>
                {/* The year is always shown, not just when it differs from the
                  current one: Wingspan programming runs across the academic
                  year, so a list read in September carries both a "FEB 03"
                  four months out and a "MAY 17" eight months out. Deriving
                  "this year" to hide it would also mean calling new Date()
                  during render, which can disagree between server and client
                  across a New Year boundary. */}
                <Typography as="span" variant="span" color="greyDark">
                  {getYear(eventStartDateTime)}
                </Typography>
              </DateBadge>
              <EventBody>
                <Typography as="h3" variant="titleSmall" color="black">
                  {title}
                </Typography>
                <EventDetail>
                  <FaClock aria-hidden="true" />
                  <Typography as="span" variant="span" color="greyDarkest">
                    {getTime(eventStartDateTime)} – {getTime(eventEndDateTime)}
                  </Typography>
                </EventDetail>
                <EventDetail>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <Typography as="span" variant="span" color="greyDarkest">
                    {formatEventLocation(eventLocation)}
                  </Typography>
                </EventDetail>
              </EventBody>
            </EventButton>
          );
        })}
      </Grid>
      {isCollapsible && (
        <ToggleRow>
          <Button
            ref={toggleRef}
            variant="black"
            aria-expanded={isExpanded}
            aria-controls={gridId}
            onClick={handleToggle}
          >
            {isExpanded ? 'Show fewer' : `Show all ${filteredCount}`}
          </Button>
        </ToggleRow>
      )}
    </>
  );
};
