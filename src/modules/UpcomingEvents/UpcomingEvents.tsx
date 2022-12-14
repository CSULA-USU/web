import { Button, Typography, FluidContainer } from 'components';
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

const events = [
  {
    image: '/event-1.jpg',
    org: 'APISRC',
    title: 'A Very Important Event',
    location: '204B',
    time: '4:00 PM – 5:00 PM',
    url: '#',
  },
  {
    image: '/event-2.jpg',
    org: 'APISRC',
    title: 'A Very Important Event',
    location: '204B',
    time: '4:00 PM – 5:00 PM',
    url: '#',
  },
  {
    image: '/event-3.jpg',
    org: 'APISRC',
    title: 'A Very Important Event',
    location: '204B',
    time: '4:00 PM – 5:00 PM',
    url: '#',
  },
  {
    image: '/event-4.jpg',
    org: 'APISRC',
    title: 'A Very Important Event',
    location: '204B',
    time: '4:00 PM – 5:00 PM',
    url: '#',
  },
  {
    image: '/event-5.jpg',
    org: 'APISRC',
    title: 'A Very Important Event',
    location: '204B',
    time: '4:00 PM – 5:00 PM',
    url: '#',
  },
];

export const UpcomingEvents = () => (
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
      {events.slice(0, 2).map((event, i) => (
        <EventCard key={`${i} ${event.title}`} {...event} />
      ))}
    </UpcomingEventsContent>
    <UpcomingEventsContent>
      {events.slice(2, 5).map((event, i) => (
        <EventCard key={`${i} ${event.title}`} {...event} />
      ))}
    </UpcomingEventsContent>
  </FluidContainer>
);
