import { Button, Image, Typography } from 'components';
import { BsInfoCircle } from 'react-icons/bs';
import { useBreakpoint } from 'hooks';
import { PresenceEvent } from 'types';
import styled from 'styled-components';
import { getDay, getMonth, getTime } from 'utils/timehelpers';
import { PRESENCE_URI_BASE } from 'utils/constants';
import { Colors, media } from 'theme';

const InfoContainer = styled.span`
  cursor: pointer;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  ${media('tablet')('width: 80%;')};
  ${media('mobile')('width: 100%;')};
`;

const PreviewContainer = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: fadeIn 0.3s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
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
  &:hover ${PreviewContainer} {
    display: block;
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

const PreviewImage = styled.div`
  height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const { eventName, location, photoUri, startDateTimeUtc, endDateTimeUtc } =
    event;
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
          </>
        )
      ) : (
        <>
          <EventAndPreviewContainer>
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
                <Button variant="grey" onClick={onClick}>
                  View Event
                </Button>
              </RightContainer>
              <PreviewContainer>
                <PreviewImage>
                  <Image
                    src={`${PRESENCE_URI_BASE}/${photoUri}`}
                    alt={eventName}
                    style={{ height: '100%', width: 'auto' }}
                  />
                </PreviewImage>
              </PreviewContainer>
            </MinimalistEventContainer>
          </EventAndPreviewContainer>
        </>
      )}
    </>
  );
};
