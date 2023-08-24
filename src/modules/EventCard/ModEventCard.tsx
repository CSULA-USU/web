import { Button, Typography } from 'components';
import { EventModal } from 'modules/EventModal';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
import { PresenceEvent } from 'types';
import { ABBREVIATED_ORGS, PRESENCE_URI_BASE } from 'utils/constants';
import { getDay, getMonth, getTime } from 'utils/timehelpers';

export interface ModEventCardProps {
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

const EventCardContainer = styled.div<{ image?: string; featured?: boolean }>`
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
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
    align-items: ${({ featured }) => (featured ? 'flex-end' : 'flex-start')};
  }
  ${Overlay} {
    background: ${({ image }) => image && `url(${image})`};
    background-size: cover;
    background-position: center;
  }
  border: 1px solid transparent;
`;

const EventContainer = styled.div`
  flex;
  flex-direction: column;
  width: 1200px;
  margin: 0px auto;
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
  width: 80px;
  height: 80px;
  border-radius: 16px;
  margin: auto 0px;
`;

const HeroEventDetails = styled.div`
  display: flex;
  height: 100px;
  margin: ${Spaces.md} 0px;
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

export const ModEventCard = ({
  event,
  featured,
  onClick,
}: ModEventCardProps) => {
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
  const month = getMonth(startDateTimeUtc, 'short').toUpperCase();
  const day = getDay(startDateTimeUtc);

  return !eventName ? null : (
    <EventContainer>
      <EventCardContainer
        tabIndex={0}
        onClick={onClick}
        featured={featured}
        image={`${PRESENCE_URI_BASE}/${photoUri}`}
      >
        <Overlay />

        {/* <EventCardTop>
       
        <Typography as="h5" variant="eventDetail">
          {ABBREVIATED_ORGS[organizationName]}
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
      </EventCardBottom> */}
      </EventCardContainer>
      {featured ? (
        <HeroEventDetails>
          <EventDateSection>
            <Typography
              as="span"
              variant="eventDetail"
              size="md"
              lineHeight="1"
            >
              {month} <br />
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
                as="h3"
                variant="eventTitle"
                lineHeight="1.2"
                color="black"
              >
                {eventName}
              </Typography>
              <Typography as="h4" variant="eventTime" color="black">
                {startTime} - {endTime}
              </Typography>
              <Typography
                as="h5"
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
            </EventDetails>
            <ButtonSection>
              <Typography as="h5" variant="eventDetail" color="black">
                {ABBREVIATED_ORGS[organizationName]}
              </Typography>
              {featured ? (
                <Button margin="12px 0 0" onClick={() => selectEvent(event)}>
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
        <p>upcoming</p>
      )}
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </EventContainer>
  );
};
