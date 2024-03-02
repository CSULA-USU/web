import { Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { ABBREVIATED_ORGS, PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

export interface SplitEventCardProps {
  event: PresenceEvent;
  featured?: boolean;
  onClick?: () => void;
}

const Card = styled.div`
  background-color: ${Colors.white};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  height: 450px;
  width: 420px;
  &:hover,
  &:focus {
    filter: drop-shadow(-${Spaces.xs} ${Spaces.xs} ${Spaces.xs} ${Colors.grey});
  }
`;

const Graphic = styled.div<{ image?: string }>`
  background: ${({ image }) => image && `url(${image})`};
  background-size: 100%;
  background-position: center;
  width: 100%;
  height: 40%;
  object-fit: contain;
`;

const Details = styled.div`
  height: 60%;
  padding: ${Spaces.md};
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  justify-content: space-evenly;
`;

const EventHeader = styled.div`
  height: 30%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  box-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FinerDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SplitEventCard = ({ event, onClick }: SplitEventCardProps) => {
  if (!event) return null;
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
  const month = getMonth(startDateTimeUtc);
  const day = getDay(startDateTimeUtc);
  const year = getYear(startDateTimeUtc);
  const dayOfTheWeek = daysOfWeek[new Date(startDateTimeUtc).getDay()];

  return (
    <Card tabIndex={0} onClick={onClick}>
      <Graphic image={`${PRESENCE_URI_BASE}/${photoUri}`} />
      <Details>
        <EventHeader>
          <Typography as="h3" variant="eventTitle" color="black">
            {eventName}
          </Typography>
        </EventHeader>
        <Typography variant="copy" color="black">
          {dayOfTheWeek}, {month} {day}, {year}
        </Typography>
        <Typography variant="copy" color="black">
          {startTime} to {endTime}
        </Typography>
        <Typography variant="copy" color="black">
          {location}
        </Typography>
        <FinerDetails>
          <Typography
            color="gold"
            size="sm"
            style={{ textDecoration: 'underline' }}
          >
            Learn More
          </Typography>
          <Typography variant="cta">
            {ABBREVIATED_ORGS[organizationName]}
          </Typography>
        </FinerDetails>
      </Details>
    </Card>
  );
};
