import { FluidContainer, Typography } from 'components';
import { PresenceEvent } from 'types';
import { MinimalistEvent } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import { useEffect, useState } from 'react';
import { media } from 'theme';

interface FeaturedEventsProps {
  featuredEvents: EventProps[];
  events: PresenceEvent[];
}

interface EventProps {
  title: string;
  link?: string;
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
`;

const TertiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
        <FeaturedEventsSection>
          <TertiaryContainer>
            {filteredEvents.length &&
              filteredEvents.map((event) => (
                <div key={event.eventNoSqlId}>
                  <MinimalistEvent
                    event={event}
                    onClick={() => selectEvent(event)}
                  />
                </div>
              ))}
          </TertiaryContainer>
        </FeaturedEventsSection>
      </>
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
