import { Button, Typography, FluidContainer, Divider } from 'components';
import { PresenceEvent } from 'types';
import { EventCard, MinimalistEvent } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import { useState } from 'react';
import { media } from 'theme';

interface UpcomingEventsProps {
  events: PresenceEvent[];
  monthly?: boolean;
}

const UpcomingEventsHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  justify-content: space-between;
`;

const UpcomingEventsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  > div {
    max-width: calc(50% - 12px);
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

const getMonth = (date: string) =>
  new Date(date).toLocaleString('default', { month: 'long' });

export const UpcomingEvents = ({ events, monthly }: UpcomingEventsProps) => {
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);

  const [_, ...laterEvents] = events || [];
  const eventsByMonth = (monthly ? events : laterEvents).reduce(
    (months: { [key: string]: PresenceEvent[] }, event: PresenceEvent) => {
      const updatedMonths = { ...months };
      const month = getMonth(event.startDateTimeUtc);
      if (!updatedMonths.hasOwnProperty(month)) {
        updatedMonths[month] = [];
      }
      updatedMonths[month].push(event);
      return updatedMonths;
    },
    {},
  );

  const eventMonths = Object.keys(eventsByMonth);
  return !events.length ? null : (
    <FluidContainer>
      {!monthly && (
        <UpcomingEventsHeading>
          <Typography as="h2" variant="subheader" margin="0 24px 0 0">
            Upcoming Events
          </Typography>
          <Button href="/events" variant="black">
            View More
          </Button>
        </UpcomingEventsHeading>
      )}
      {monthly ? (
        eventMonths.map((eventMonth) => (
          <div key={`${eventMonth} Events`}>
            <Divider label={eventMonth} />
            <UpcomingEventsContent>
              {eventsByMonth[eventMonth].map((event) => (
                <EventCard
                  key={event.eventNoSqlId}
                  event={event}
                  onClick={() => selectEvent(event)}
                />
              ))}
            </UpcomingEventsContent>
          </div>
        ))
      ) : (
        <>
          <UpcomingEventsContent>
            {events.slice(1, 3).map((event) => (
              <EventCard
                key={event.eventNoSqlId}
                event={event}
                onClick={() => selectEvent(event)}
              />
            ))}
            <TertiaryContainer>
              {events.slice(3, 6).map((event) => (
                <MinimalistEvent
                  key={event.eventNoSqlId}
                  event={event}
                  onClick={() => selectEvent(event)}
                />
              ))}
            </TertiaryContainer>
            {/* {events.slice(3, 6).map((event) => (
              <EventCard
                key={event.eventNoSqlId}
                event={event}
                onClick={() => selectEvent(event)}
              />
            ))} */}
          </UpcomingEventsContent>
        </>
      )}
      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
