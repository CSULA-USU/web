import { Button, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { ABREVIATED_ORGS, PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

export interface EventCardProps {
  event: PresenceEvent;
  featured?: boolean;
  onClick?: () => void;
}

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: ${Colors.grey};
  padding: 36px;
  width: 100%;
  justify-content: ${({ featured }) =>
    featured ? `flex-end` : `space-between`};
  height: ${({ featured }) => (featured ? `560px` : `400px`)};
  color: ${Colors.white};
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.2) 20%,
      rgba(0, 0, 0, 0) 55%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.85) 100%
    ),
    ${({ image }) => image && `url(${image})`};
  background-size: cover;
  background-position: center;
  > div:first-child {
    padding-bottom: 12px;
    border-bottom: ${({ featured }) =>
      featured ? `1px solid ${Colors.white}` : `none`};
    align-items: ${({ featured }) => (featured ? 'flex-end' : 'flex-start')};
  }
  position: relative;
`;

const EventCardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EventCardBottom = styled(EventCardTop)<{ featured?: boolean }>`
  ${(p) => (p.featured ? `align-items: flex-end;` : `flex-direction: column;`)}
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
  const month = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const day = getDay(startDateTimeUtc);

  return !eventName ? null : (
    <EventCardContainer
      onClick={onClick}
      featured={featured}
      image={`${PRESENCE_URI_BASE}/${photoUri}`}
    >
      <EventCardTop>
        <EventDate>
          {featured ? (
            <Typography as="span" variant="eventDetail" lineHeight="1">
              {month} {day}
            </Typography>
          ) : (
            <>
              <Typography as="span" variant="eventDetail" lineHeight="1">
                {month} <br />
              </Typography>
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
        <Typography as="h5" variant="eventDetail">
          {ABREVIATED_ORGS[organizationName]}
        </Typography>
      </EventCardTop>
      <EventCardBottom featured={featured}>
        <EventDetails>
          <Typography as="h3" variant="eventTitle" lineHeight="1.2">
            {eventName}
          </Typography>
          <Typography as="h4" variant="eventTime">
            {startTime} - {endTime}
          </Typography>
          <Typography as="h5" variant="eventDetail">
            {location}
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
