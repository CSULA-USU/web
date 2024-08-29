import { FluidContainer, Typography } from 'components';
import { PresenceEvent } from 'types';
import { MinimalistEvent } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import { useEffect, useState } from 'react';
import { media, Colors } from 'theme';

interface FeaturedEventsProps {
  featuredEvents: EventProps[];
  events: PresenceEvent[];
}

interface EventProps {
  title: string;
  link?: string;
  buttonText?: string;
}

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
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const YellowBoxUnderneath = styled.div`
  background-color: ${Colors.primary};
  position: absolute;
  left: 12px;
  top: 12px;
  height: 100%;
  width: 100%;
  z-index: 0;
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

  useEffect(() => {
    console.log('fe', filteredEvents);
    console.log('events', events);
  }, [filteredEvents]);

  return !events.length ? null : (
    <FluidContainer>
      <Typography as="h2" variant="title">
        Featured
      </Typography>
      <>
        <RelativeContainer>
          <YellowBoxUnderneath />
          <FeaturedEventsSection>
            <TertiaryContainer>
              {filteredEvents.length &&
                filteredEvents.map((event) => (
                  <div key={event.eventNoSqlId}>
                    <MinimalistEvent
                      event={event}
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
