import { Button, Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { ABBREVIATED_ORGS, PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

export interface EventCardProps {
  event: PresenceEvent;
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
  &:hover,
  &:focus {
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
  &:focus {
    text-decoration: underline;
  }
`;

const EventDetails = styled.div`
  padding-top: ${Spaces.md};
  display: flex;
  flex-direction: column;
`;

const EventDate = styled.div``;

export const EventCard = ({ event, featured, onClick }: EventCardProps) => {
  if (!event) return null;
  const {
    organizationName,
    eventName,
    location,
    startDateTimeUtc,
    endDateTimeUtc,
    photoUri,
  } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const monthAbbr = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const month = getMonth(startDateTimeUtc);
  const day = getDay(startDateTimeUtc);

  return !eventName ? null : (
    <EventCardContainer
      onClick={onClick}
      featured={featured}
      image={`${PRESENCE_URI_BASE}/${photoUri}`}
    >
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
        <abbr title={organizationName}>
          <Typography as="h2" variant="eventDetail">
            {ABBREVIATED_ORGS[organizationName]}
          </Typography>
        </abbr>
      </EventCardTop>
      <EventCardBottom featured={featured}>
        <EventDetails>
          <Typography as="h3" variant="eventTitle" lineHeight="1.2">
            {eventName}
          </Typography>
          <Typography as="h4" variant="eventTime">
            {startTime} - {endTime}
          </Typography>
          <Typography
            as="h5"
            variant="eventDetail"
            style={{ overflowWrap: 'anywhere' }}
          >
            {location.indexOf('.zoom.us') > -1 ? (
              <a href={location}>Zoom Meeting</a>
            ) : (
              location
            )}
          </Typography>
        </EventDetails>
        {featured ? (
          <Button margin="12px 0 0">Learn More</Button>
        ) : (
          <Typography color="primary" size="sm">
            Learn More
          </Typography>
        )}
      </EventCardBottom>
    </EventCardContainer>
  );
};
