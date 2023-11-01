import { Button, Divider, Typography } from 'components';
import { BsInfoCircle } from 'react-icons/bs';
import { useBreakpoint } from 'hooks';
import { PresenceEvent } from 'types';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { Spaces, media } from 'theme';

const InfoContainer = styled.span`
  cursor: pointer;
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 20%;
  ${media('mobile')('width: 100%;')}
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  ${media('tablet')('width: 80%;')}
  ${media('mobile')('width: 100%;')}
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
  ${media('mobile')(
    'flex-direction: column; align-items: start; height: 160px; justify-content: center',
  )}
`;

const TitleContainer = styled.span`
  cursor: pointer;
`;
export interface MinimalistEventProps {
  event: PresenceEvent;
  onClick?: () => void;
}

export const MinimalistEvent = ({ event, onClick }: MinimalistEventProps) => {
  const { isDesktop, isMobile } = useBreakpoint();
  if (!event) return null;
  const { eventName, location, startDateTimeUtc, endDateTimeUtc } = event;
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const month = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const day = getDay(startDateTimeUtc);
  return (
    <>
      {isDesktop ? (
        isMobile ? (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  {month} {day}
                </Typography>
                <TitleContainer onClick={onClick}>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color="black"
                    size="md"
                  >
                    {eventName}
                  </Typography>
                </TitleContainer>
              </LeftContainer>
              <MiddleContainer>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color="grey"
                  weight="400"
                >
                  {location}
                </Typography>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color="grey"
                  weight="400"
                >
                  {startTime}
                </Typography>
              </MiddleContainer>
              <RightContainer>
                <InfoContainer>
                  <BsInfoCircle
                    size={isMobile ? '18px' : '30px'}
                    onClick={onClick}
                  />
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
            <Divider color="greyLighter" />
          </>
        ) : (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  {month} {day}
                </Typography>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color="grey"
                  weight="400"
                >
                  {startTime}
                </Typography>
              </LeftContainer>
              <MiddleContainer>
                <TitleContainer onClick={onClick}>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color="black"
                    size="md"
                  >
                    {eventName}
                  </Typography>
                </TitleContainer>
                <Typography
                  as="h4"
                  variant="eventTime"
                  color="grey"
                  weight="400"
                >
                  {location}
                </Typography>
              </MiddleContainer>
              <RightContainer>
                <InfoContainer>
                  <BsInfoCircle
                    size={isMobile ? '18px' : '30px'}
                    onClick={onClick}
                  />
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
            <Divider color="greyLighter" margin={`${Spaces.md} 0`} />
          </>
        )
      ) : (
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
              <TitleContainer onClick={onClick}>
                <Typography
                  as="h3"
                  variant="eventTitle"
                  color="black"
                  size="md"
                >
                  {eventName}
                </Typography>
              </TitleContainer>
              <Typography as="h4" variant="eventTime" color="grey" weight="400">
                {location}
              </Typography>
            </MiddleContainer>
            <RightContainer>
              <Button variant="grey" onClick={onClick}>
                View Event
              </Button>
            </RightContainer>
          </MinimalistEventContainer>
          <Divider color="greyLighter" margin={`${Spaces.md} 0`} />
        </>
      )}
    </>
  );
};
