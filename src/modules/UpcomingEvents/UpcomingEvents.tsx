import { Button, Typography, FluidContainer, Divider } from 'components';
import { PresenceEvent } from 'types';
import { EventCard } from 'modules/EventCard';
import styled from 'styled-components';

interface UpcomingEventsProps {
  events: PresenceEvent[];
  monthly?: boolean;
}

const UpcomingEventsHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const UpcomingEventsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  > div {
    max-width: calc(50% - 12px);
  }
  > div:nth-child(n + 3) {
    max-width: calc(33.33% - 16px);
  }
`;

const getMonth = (date: string) =>
  new Date(date).toLocaleString('default', { month: 'long' });

export const UpcomingEvents = ({ events, monthly }: UpcomingEventsProps) => {
  const [_, ...laterEvents] = events || [];
  const eventsByMonth = laterEvents.reduce(
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
  return (
    <FluidContainer>
      {!monthly && (
        <UpcomingEventsHeading>
          <Typography as="h2" variant="subheader" margin="0 24px 0 0">
            Upcoming Events
          </Typography>
          <Button href="#" variant="grey">
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
                <EventCard key={event.eventNoSqlId} {...event} />
              ))}
            </UpcomingEventsContent>
          </div>
        ))
      ) : (
        <>
          <UpcomingEventsContent>
            {events.slice(1, 3).map((event) => (
              <EventCard key={event.eventNoSqlId} {...event} />
            ))}
            {events.slice(3, 6).map((event) => (
              <EventCard key={event.eventNoSqlId} {...event} />
            ))}
          </UpcomingEventsContent>
        </>
      )}
    </FluidContainer>
  );
};
