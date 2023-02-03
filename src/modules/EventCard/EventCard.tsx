import { Button, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';

export interface EventCardProps extends PresenceEvent {
  featured?: boolean;
}

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
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

const abvOrgNames: { [key: string]: string } = {
  'Center for Student Involvement': 'CSI',
  'Cross Cultural Centers': 'CCC',
  Recreation: 'REC',
};

const getTime = (utc: string) => {
  return new Date(utc).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const EventCard = ({
  organizationName,
  eventName,
  location,
  startDateTimeUtc,
  endDateTimeUtc,
  photoUri,
  featured,
}: EventCardProps) => {
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const month = new Date(startDateTimeUtc)
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();
  const day = new Date(startDateTimeUtc).getDate();

  return !eventName ? null : (
    <EventCardContainer
      featured={featured}
      image={`https://calstatela-cdn.presence.io/event-photos/caa045a5-87e3-4730-9e3b-3237755bc0a8/${photoUri}`}
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
          {abvOrgNames[organizationName]}
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
