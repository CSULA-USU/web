import { Typography } from 'components';
import styled from 'styled-components';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Colors, media, Radii, Shadows, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { formatEventLocation } from 'utils/eventUtils';
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

interface ImagelessEventsGridProps {
  /** Rendered in the order given — the caller owns the sort. */
  events: CampusGroupsEvent[];
  onSelectEvent: (event: CampusGroupsEvent) => void;
  /** Card edge color. Defaults to the U-SU yellow. */
  accentColor?: string;
}

export const ImagelessEventsGrid = ({
  events,
  onSelectEvent,
  accentColor = Colors.primary,
}: ImagelessEventsGridProps) => {
  if (events.length === 0) return null;

  return (
    <Grid>
      {events.map((event) => {
        const { eventStartDateTime, eventEndDateTime, eventLocation, title } =
          event;
        return (
          <EventButton
            key={event.eventId}
            accentColor={accentColor}
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
  );
};
