import { Button, Typography } from 'components';
import { BsInfoCircle } from 'react-icons/bs';
import { useBreakpoint } from 'hooks';
import { PresenceEvent } from 'types';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { Colors, media } from 'theme';

const InfoContainer = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  ${media('tablet')('width: 80%;')};
  ${media('mobile')('width: 100%;')};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  width: 25%;
  ${media('mobile')('width: 100%; padding-left: 0px;')};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EventAndPreviewContainer = styled.div`
  position: relative;
  display: flex;
  &:hover ${LeftContainer} {
    border-left: 10px solid ${Colors.primary};
  }
`;

const MinimalistEventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  width: 100%;
  ${media('mobile')(
    'flex-direction: column; align-items: start; height: 200px; justify-content: center',
  )};
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
  const monthAbbr = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const month = getMonth(startDateTimeUtc);
  const day = getDay(startDateTimeUtc);
  return (
    <>
      {isDesktop ? (
        isMobile ? (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  <abbr title={`${month} ${day}`}>
                    {monthAbbr} {day}
                  </abbr>
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
                    title="Learn More"
                    size={isMobile ? '18px' : '30px'}
                    onClick={onClick}
                  />
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
          </>
        ) : (
          <>
            <MinimalistEventContainer>
              <LeftContainer>
                <Typography as="h3" variant="eventDetail" color="gold">
                  <abbr title={`${month} ${day}`}>
                    {monthAbbr} {day}
                  </abbr>
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
                    title="Learn More"
                    size={isMobile ? '18px' : '30px'}
                    onClick={onClick}
                  />
                </InfoContainer>
              </RightContainer>
            </MinimalistEventContainer>
          </>
        )
      ) : (
        <>
          <MinimalistEventContainer>
            <LeftContainer>
              <abbr title={`${month} ${day}`}>
                <Typography as="h3" variant="eventDetail" color="gold">
                  {monthAbbr} {day}
                </Typography>
              </abbr>
              <Typography as="h4" variant="eventTime" color="grey" weight="400">
                {startTime} - {endTime}
              </Typography>
            </LeftContainer>
            <MiddleContainer>
              <TitleContainer onClick={onClick}>
                <EventAndPreviewContainer>
                  <Typography
                    as="h3"
                    variant="eventTitle"
                    color="black"
                    size="md"
                  >
                    {eventName}
                  </Typography>
                </EventAndPreviewContainer>
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
        </>
      )}
    </>
  );
};
