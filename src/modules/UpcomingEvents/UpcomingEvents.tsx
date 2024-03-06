import { Divider, FluidContainer, Typography } from 'components';
import { PresenceEvent } from 'types';
import { SplitEventCard } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import Link from 'next/link';
import { useState } from 'react';
import { Spaces, media } from 'theme';

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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${media('widescreen')(`grid-template-columns: repeat(3, 1fr);`)}
  ${media('desktop')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('tablet')(`grid-template-columns: repeat(1, 1fr);`)}
  grid-template-columns: row;
  gap: ${Spaces.md};
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
          <Link href="/events">
            <Typography as="h2" variant="subheader" margin="0 24px 0 0">
              Upcoming Events
            </Typography>
          </Link>
          {/* <Button href="/events" variant="black">
            View Events
          </Button> */}
        </UpcomingEventsHeading>
      )}
      {monthly ? (
        eventMonths.map((eventMonth) => (
          <div key={`${eventMonth} Events`}>
            <Divider as="h2" label={eventMonth} variant="title" />
            <UpcomingEventsContent>
              {eventsByMonth[eventMonth].map((event) => (
                <SplitEventCard
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
              <SplitEventCard
                key={event.eventNoSqlId}
                event={event}
                onClick={() => selectEvent(event)}
              />
            ))}

            {events.slice(3, 6).map((event) => (
              <SplitEventCard
                key={event.eventNoSqlId}
                event={event}
                onClick={() => selectEvent(event)}
              />
            ))}
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
