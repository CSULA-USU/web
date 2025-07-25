import { Button, Skeleton, SkeletonWrapper, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { EventModal } from 'modules/EventModal';
import { useState } from 'react';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { VscOrganization } from 'react-icons/vsc';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { ABBREVIATED_ORGS, PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

export interface ModEventCardProps {
  event: PresenceEvent;
  featured?: boolean;
  onClick?: () => void;
}

const EventCardSkeletonContainer = styled(SkeletonWrapper)`
  display: flex;
  z-index: 1;
  flex-direction: column;
  margin: 0px auto ${Spaces.lg};
  max-width: 800px;
  min-height: 480px;
  @media (max-width: 1024px) {
    min-height: 480px;
  }
  @media (max-width: 768px) {
    min-height: 400px;
  }
  @media (max-width: 600px) {
    min-height: 320px;
  }
  @media (max-width: 540px) {
    min-height: 272px;
  }
  @media (max-width: 320px) {
    min-height: 240px;
  }
`;

export const ModEventCardSkeleton = () => {
  return (
    <EventContainer>
      <EventCardSkeletonContainer />
      <HeroEventDetailsSkeleton />
    </EventContainer>
  );
};

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  filter: drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25));
  z-index: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  margin: 0px auto ${Spaces.lg};
  overflow: hidden;
  max-width: 800px;
  min-height: 480px;
  justify-content: ${({ featured }) =>
    featured ? `flex-end` : `space-between`};
  @media (max-width: 1024px) {
    min-height: 480px;
  }
  @media (max-width: 768px) {
    min-height: 400px;
  }
  @media (max-width: 600px) {
    min-height: 320px;
  }
  @media (max-width: 540px) {
    min-height: 272px;
  }
  @media (max-width: 320px) {
    min-height: 240px;
  }
  > div:first-child {
    padding-bottom: 12px;
    align-items: ${({ featured }) => (featured ? 'flex-end' : 'flex-start')};
  }
  background: ${({ image }) => image && `url(${image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid transparent;
  border-radius: 16px;
`;

const EventContainer = styled.div`
flex;
flex-direction: column;
width: 1080px;
`;

const EventDetails = styled.div`
  margin: 0px ${Spaces.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EventDateSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  min-width: 50px;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin: auto;
  @media (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;

const HeroEventDetails = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  height: 100px;
  width: 100%;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  min-width: 184px;
`;

const DetailsSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const MobileDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MobileRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MobileBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeroEventDetailsSkeleton = () => {
  return <Skeleton height="100px" />;
};

export const ModEventCard = ({
  event,
  featured,
  onClick,
}: ModEventCardProps) => {
  const { isTablet } = useBreakpoint();
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  if (!event) return null;
  const {
    organizationName,
    eventName,
    location,
    startDateTimeUtc,
    endDateTimeUtc,
    photoUri,
  } = event;
  const onRequestClose = () => selectEvent(undefined);
  const startTime = getTime(startDateTimeUtc);
  const endTime = getTime(endDateTimeUtc);
  const monthAbbr = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const month = getMonth(startDateTimeUtc);

  const day = getDay(startDateTimeUtc);

  return (
    <EventContainer>
      <EventCardContainer
        onClick={onClick}
        featured={featured}
        image={`${PRESENCE_URI_BASE}/${photoUri}`}
      ></EventCardContainer>
      {featured && !isTablet ? (
        <HeroEventDetails>
          <EventDateSection>
            <Typography
              as="span"
              variant="eventDetail"
              size="md"
              lineHeight="1"
            >
              <abbr title={month}>{monthAbbr}</abbr> <br />
            </Typography>
            <Typography
              as="span"
              variant="pageHeader"
              size="2xl"
              color="white"
              lineHeight="1"
            >
              {day}
            </Typography>
          </EventDateSection>
          <DetailsSection>
            <EventDetails>
              <Typography
                as="h2"
                variant="eventTitle"
                lineHeight="1.2"
                color="black"
              >
                {eventName}
              </Typography>
              <InfoContainer>
                <BiTimeFive
                  aria-hidden="true"
                  size="20px"
                  style={{ margin: '0px 3px 0px 4px' }}
                />
                <Typography as="h3" variant="eventTime" color="black">
                  {startTime} - {endTime}
                </Typography>
              </InfoContainer>
              <InfoContainer>
                <MdLocationPin
                  size="20px"
                  style={{ margin: '0px 3px 0px 3px' }}
                  aria-hidden="true"
                />
                <Typography
                  as="h4"
                  variant="eventDetail"
                  style={{ overflowWrap: 'anywhere' }}
                  color="black"
                >
                  {location.indexOf('.zoom.us') > -1 ? (
                    <a href={location}>Zoom Meeting</a>
                  ) : (
                    location
                  )}
                </Typography>
              </InfoContainer>
            </EventDetails>
            <ButtonSection>
              <Typography as="h3" variant="eventDetail" color="black">
                {ABBREVIATED_ORGS[organizationName]}
              </Typography>
              {featured ? (
                <Button
                  margin="12px 0 0"
                  onClick={() => selectEvent(event)}
                  variant="black"
                >
                  Learn More
                </Button>
              ) : (
                <Typography color="primary" size="sm">
                  Learn More
                </Typography>
              )}
            </ButtonSection>
          </DetailsSection>
        </HeroEventDetails>
      ) : (
        <MobileDetails>
          <MobileRight>
            <Typography
              as="h2"
              variant="eventDetail"
              lineHeight="1.2"
              color="black"
              size="lg"
            >
              {eventName}
            </Typography>
            <InfoContainer>
              <BiCalendar size="20px" style={{ margin: '0px 8px 2px 0px' }} />
              <Typography as="h3" variant="eventDetail" color="black">
                <abbr title={month}>{monthAbbr}</abbr> {day}
              </Typography>
            </InfoContainer>
            <InfoContainer>
              <BiTimeFive
                aria-hidden="true"
                size="20px"
                style={{ margin: '0px 8px 2px 0px' }}
              />
              <Typography as="h3" variant="eventTime" color="black">
                {startTime} - {endTime}
              </Typography>
            </InfoContainer>
            <InfoContainer>
              <MdLocationPin
                size="20px"
                style={{ margin: '0px 8px 0px 0px' }}
              />
              <Typography
                as="h4"
                variant="eventDetail"
                style={{ overflowWrap: 'anywhere' }}
                color="black"
              >
                {location.indexOf('.zoom.us') > -1 ? (
                  <a href={location}>Zoom Meeting</a>
                ) : (
                  location
                )}
              </Typography>
            </InfoContainer>
            <MobileBottom>
              <InfoContainer>
                <VscOrganization
                  size="20px"
                  style={{ margin: '0px 8px 2px 0px' }}
                />
                <Typography as="h1" variant="eventDetail" color="black">
                  {ABBREVIATED_ORGS[organizationName]}
                </Typography>
              </InfoContainer>
              {featured ? (
                <Button
                  onClick={() => selectEvent(event)}
                  variant="transparent"
                  padding="500px"
                >
                  <BsInfoCircle
                    aria-label="Learn More"
                    size="20"
                    color={`${Colors.gold}`}
                  />
                </Button>
              ) : (
                <Typography color="primary" size="sm">
                  Learn More
                </Typography>
              )}
            </MobileBottom>
          </MobileRight>
        </MobileDetails>
      )}
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </EventContainer>
  );
};
