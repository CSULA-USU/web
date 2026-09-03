import { Button, SkeletonWrapper, Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { ABBREVIATED_ORGS } from 'utils/constants';
import { formatEventLocation } from 'utils/eventUtils';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

export interface EventCardProps {
  event: CampusGroupsEvent;
  featured?: boolean;
  onClick?: () => void;
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.5s ease-out;
`;

const EventCardTop = styled.div`
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  transition: 0.3s ease;
  justify-content: space-between;
`;

const EventCardBottom = styled(EventCardTop)<{ featured?: boolean }>`
  z-index: 1;
  transition: 0.3s ease;
  ${(p) => (p.featured ? `align-items: flex-end;` : `flex-direction: column;`)}
`;

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.grey};
  padding: 32px;
  overflow: hidden;
  ${media('desktop')(`
    padding: 24px;
  `)}
  ${media('tablet')(`
    padding: 16px;
  `)}
  width: 100%;
  justify-content: ${({ featured }) =>
    featured ? `flex-end` : `space-between`};
  height: ${({ featured }) => (featured ? `560px` : `400px`)};
  color: ${Colors.white};
  > div:first-child {
    padding-bottom: 12px;
    border-bottom: ${({ featured }) =>
      featured ? `1px solid ${Colors.white}` : `none`};
    align-items: ${({ featured }) => (featured ? 'flex-end' : 'flex-start')};
  }
  ${Overlay} {
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.7) 5%,
        rgba(0, 0, 0, 0) 30%,
        rgba(0, 0, 0, 0.85) 75%,
        rgba(0, 0, 0, 0.95) 100%
      ),
      ${({ image }) => image && `url(${image})`};
    background-size: cover;
    background-position: center;
  }
  border: 1px solid transparent;
  /* focus-within rather than focus: the card is a div and can never take
     focus itself. The old &:focus rule here could not fire, which is what let
     the card look interactive while being unreachable by keyboard. */
  &:hover,
  &:focus-within {
    border: 1px solid ${Colors.black};
    ${Overlay} {
      filter: blur(4px) brightness(0.6);
    }
    ${EventCardTop} {
      transform: translateY(10%);
    }
    ${EventCardBottom} {
      transform: translateY(-10%);
    }
  }
`;

/*
 * One real control per card, on the title, stretched over the whole card by its
 * own ::after. Mouse users keep clicking anywhere; keyboard users get a single
 * tab stop whose accessible name is the event title, instead of the
 * div-with-onClick that no keyboard could reach.
 */
const CardTrigger = styled.button`
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  &:focus-visible {
    outline: 2px solid ${Colors.white};
    outline-offset: 2px;
  }
`;

/* Lifted over the trigger's overlay, or the card would swallow the click. */
const ZoomLink = styled.a`
  position: relative;
  z-index: 3;
`;

const EventDetails = styled.div`
  padding-top: ${Spaces.md};
  display: flex;
  flex-direction: column;
`;

const EventDate = styled.div``;

export const EventSkeleton = styled(SkeletonWrapper)`
  box-sizing: border-box;
  padding: 32px;
  overflow: hidden;
  ${media('desktop')(`
    padding: 24px;
  `)}
  ${media('tablet')(`
    padding: 16px;
  `)}
  width: 100%;
  height: 560px;
  border: 1px solid transparent;
`;

export const EventCard = ({ event, featured, onClick }: EventCardProps) => {
  if (!event) return null;
  const {
    group,
    title,
    eventLocation,
    eventStartDateTime,
    eventEndDateTime,
    eventOriginalPhotoFullUrl,
  } = event;
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const monthAbbr = getMonth(eventStartDateTime, 'short').toUpperCase();
  const month = getMonth(eventStartDateTime);
  const day = getDay(eventStartDateTime);

  return !title ? (
    <EventSkeleton />
  ) : (
    <EventCardContainer featured={featured} image={eventOriginalPhotoFullUrl}>
      <Overlay />
      <EventCardTop>
        <EventDate>
          {featured ? (
            <abbr title={`${month} ${day}`}>
              <Typography as="span" variant="eventDetail" lineHeight="1">
                {monthAbbr} {day}
              </Typography>
            </abbr>
          ) : (
            <>
              <abbr title={`${month} ${day}`}>
                <Typography as="span" variant="eventDetail" lineHeight="1">
                  {monthAbbr} <br />
                </Typography>
              </abbr>
              <Typography
                as="span"
                variant="pageHeader"
                size="xl"
                color="white"
                lineHeight="1"
              >
                {day}
              </Typography>
            </>
          )}
        </EventDate>
        <abbr title={group}>
          <Typography as="h2" variant="eventDetail">
            {ABBREVIATED_ORGS[group]}
          </Typography>
        </abbr>
      </EventCardTop>
      <EventCardBottom featured={featured}>
        <EventDetails>
          <Typography as="h3" variant="eventTitle" lineHeight="1.2">
            <CardTrigger type="button" onClick={onClick}>
              {title}
            </CardTrigger>
          </Typography>
          <Typography as="h4" variant="eventTime">
            {startTime} - {endTime}
          </Typography>
          <Typography
            as="h5"
            variant="eventDetail"
            style={{ overflowWrap: 'anywhere' }}
          >
            {eventLocation.indexOf('.zoom.us') > -1 ? (
              <ZoomLink href={eventLocation}>Zoom Meeting</ZoomLink>
            ) : (
              formatEventLocation(eventLocation)
            )}
          </Typography>
        </EventDetails>
        {featured ? (
          /* Decorative: the title above is the control. Kept out of the tab
             order and the accessibility tree so one card is one stop. */
          <Button margin="12px 0 0" tabIndex={-1} aria-hidden="true">
            Learn More
          </Button>
        ) : (
          <Typography color="primary" size="sm">
            Learn More
          </Typography>
        )}
      </EventCardBottom>
    </EventCardContainer>
  );
};
