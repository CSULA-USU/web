import { Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Shadows, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { Image } from 'components';
import { ABBREVIATED_ORGS } from 'utils/constants';
import { formatEventLocation } from 'utils/eventUtils';
import { getDay, getMonth, getTime, getYear } from 'utils/timehelpers';

export interface SplitEventCardProps {
  event: CampusGroupsEvent;
  featured?: boolean;
  onClick?: () => void;
}

const Card = styled.div`
  border: ${Colors.greyLighter} solid 1px;
  background-color: ${Colors.white};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  height: 550px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover,
  &:focus {
    transform: translateY(-4px);
    box-shadow: ${Shadows.lifted};
  }
`;

const GraphicContainer = styled.div`
  width: 100%;
  height: 75%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Details = styled.div`
  height: 55%;
  padding: ${Spaces.lg};
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  justify-content: space-between;
`;

const EventHeader = styled.div`
  height: 24.3%;
  ${media('desktop')(`
    height: 27%;
  `)}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FinerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  color: ${Colors.gold};
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
    group,
    title,
    eventLocation,
    eventStartDateTime,
    eventEndDateTime,
    eventOriginalPhotoFullUrl,
  } = event;
  const startTime = getTime(eventStartDateTime);
  const endTime = getTime(eventEndDateTime);
  const month = getMonth(eventStartDateTime);
  const day = getDay(eventStartDateTime);
  const year = getYear(eventStartDateTime);
  const dayOfTheWeek = daysOfWeek[new Date(eventStartDateTime).getDay()];

  return (
    <Card onClick={onClick}>
      <GraphicContainer>
        <Image
          alt=""
          src={eventOriginalPhotoFullUrl}
          width={0}
          height={0}
          sizes="100vw"
          lazy
          style={{ width: '100%', height: 'auto' }}
          aria-hidden="true"
        />
      </GraphicContainer>
      <Details>
        <EventHeader>
          <Typography as="h3" variant="labelTitle" color="black">
            {title}
          </Typography>
        </EventHeader>
        <Typography variant="copy" color="black">
          {dayOfTheWeek}, {month} {day}, {year}
        </Typography>
        <Typography variant="copy" color="black">
          {startTime} to {endTime}
        </Typography>
        <Typography variant="copy" color="black">
          {formatEventLocation(eventLocation)}
        </Typography>
        <FinerDetails>
          <Typography variant="cta">
            <abbr title={group}>{ABBREVIATED_ORGS[group]}</abbr>
          </Typography>
          <LearnMoreButton onClick={onClick}>
            <Typography color="gold">Learn More</Typography>
          </LearnMoreButton>
        </FinerDetails>
      </Details>
    </Card>
  );
};
