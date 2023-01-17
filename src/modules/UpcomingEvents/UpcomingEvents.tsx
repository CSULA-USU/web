import { Button, Typography, FluidContainer } from 'components';
import { PresenceEvent } from 'types';
import { EventCard } from 'modules/EventCard';
import styled from 'styled-components';

const UpcomingEventsHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const UpcomingEventsContent = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-child) {
    margin-right: 16px;
    margin-bottom: 24px;
  }
`;

export const UpcomingEvents = ({ events }: { events: PresenceEvent[] }) => (
  <FluidContainer>
    <UpcomingEventsHeading>
      <Typography as="h2" variant="title" margin="0 24px 0 0">
        Upcoming Events
      </Typography>
      <Button href="#" variant="grey">
        View More
      </Button>
    </UpcomingEventsHeading>
    <UpcomingEventsContent>
      {events.slice(1, 3).map((event) => (
        <EventCard key={event.eventNoSqlId} {...event} />
      ))}
    </UpcomingEventsContent>
    <UpcomingEventsContent>
      {events.slice(3, 6).map((event) => (
        <EventCard key={event.eventNoSqlId} {...event} />
      ))}
    </UpcomingEventsContent>
  </FluidContainer>
);
