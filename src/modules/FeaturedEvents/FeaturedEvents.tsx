import { FluidContainer, Typography } from 'components';
import { PresenceEvent } from 'types';
import { MinimalistEvent } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import { useEffect, useState } from 'react';
import { media, Colors, Spaces } from 'theme';

interface FeaturedEventsProps {
  featuredEvents: EventProps[];
  events: PresenceEvent[];
}

interface EventProps {
  title: string;
  link?: string;
  buttonText?: string;
}

const YellowBoxUnderneath = styled.div`
  background-color: ${Colors.primary};
  height: 100%;
  left: 12px;
  position: absolute;
  top: 12px;
  transition: top 0.3s ease, left 0.3s ease;
  width: 100%;
  z-index: 0;
  ${media('tablet')('top: 8px; left: 8px;')};
`;

const FeaturedEventsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  > div {
    max-width: 100%;
    ${media('tablet')(`max-width: 100%;`)}
  }
  > div:nth-child(n + 3) {
    max-width: 100%;
    ${media('tablet')(`max-width: 100%;`)}
  }
  background-color: black;
  padding: 0 24px;
  position: relative;
  z-index: 2;
  ${media('tablet')('padding: 0 16px;')};
`;

const RelativeContainer = styled.div`
  position: relative;
  &:hover ${YellowBoxUnderneath} {
    top: 8px;
    left: 8px;
  }
`;

const TertiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const FeaturedEvents = ({
  events = [],
  featuredEvents = [],
}: FeaturedEventsProps) => {
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);
  const filteredEvents =
    events.length && featuredEvents.length
      ? events.filter((event) =>
          featuredEvents.some((featured) => featured.title === event.eventName),
        )
      : [];
  const combinedArray = filteredEvents.length
    ? filteredEvents.map((item, index) => ({
        ...item,
        ...featuredEvents[index],
      }))
    : [];

  useEffect(() => {
    console.log('fe', filteredEvents);
    console.log('events', events);
    console.log('combined', combinedArray);
  }, [filteredEvents]);

  return !events.length ? null : (
    <FluidContainer>
      <Typography as="h2" variant="title" margin={`0 0 ${Spaces.lg} 0`}>
        Featured
      </Typography>
      <>
        <RelativeContainer>
          <YellowBoxUnderneath />
          <FeaturedEventsSection>
            <TertiaryContainer>
              {combinedArray.length &&
                combinedArray.map((event) => (
                  <div key={event.eventNoSqlId}>
                    <MinimalistEvent
                      buttonText={event.buttonText ? event.buttonText : ''}
                      event={event}
                      link={event.link ? event.link : ''}
                      onClick={() => selectEvent(event)}
                      isFeatured
                    />
                  </div>
                ))}
            </TertiaryContainer>
          </FeaturedEventsSection>
        </RelativeContainer>
      </>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
