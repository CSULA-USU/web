import { PresenceEvent } from 'types';
import { Button, Divider, Typography } from 'components';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { Spaces } from 'theme';

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 20%;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MinimalistEventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  width: 100%;
`;
export interface MinimalistEventProps {
  event: PresenceEvent;
  onClick?: () => void;
}

export const MinimalistEvent = ({ event, onClick }: MinimalistEventProps) => {
  if (!event) return null;
  const { eventName, location, startDateTimeUtc, endDateTimeUtc } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const month = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const day = getDay(startDateTimeUtc);
  return (
    <>
      <MinimalistEventContainer>
        <LeftContainer>
          <Typography as="h3" variant="eventDetail" color="gold">
            {month} {day}
          </Typography>
          <Typography as="h4" variant="eventTime" color="grey" weight="400">
            {startTime} - {endTime}
          </Typography>
        </LeftContainer>
        <MiddleContainer>
          <Typography as="h3" variant="eventTitle" color="black" size="md">
            {eventName}
          </Typography>
          <Typography as="h4" variant="eventTime" color="grey" weight="400">
            {location}
          </Typography>
        </MiddleContainer>
        <RightContainer>
          <Button variant="primary" onClick={onClick}>
            Learn More
          </Button>
        </RightContainer>
      </MinimalistEventContainer>
      <Divider color="greyLighter" margin={`${Spaces.md} 0 `} />
    </>
  );
};
