import { Divider, FluidContainer, Typography } from 'components';
import { CampusGroupsEvent } from 'types';
import { SplitEventCard } from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import Link from 'next/link';
import { useState } from 'react';
import { Spaces, media } from 'theme';
import { getEventMonthAnchorId, groupEventsByMonth } from 'utils/eventUtils';
import { getMonth } from 'utils/timehelpers';

interface UpcomingEventsProps {
  events: CampusGroupsEvent[];
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

/* Each month is an anchor target for the /events month bar, which sticks
   over the top of the page. The margin is that bar's NAV_OFFSET in
   AnchorNav, so a jump lands the heading just below the bar, not under it. */
const MonthSection = styled.section`
  scroll-margin-top: 84px;
`;

export const UpcomingEvents = ({ events, monthly }: UpcomingEventsProps) => {
  const [selectedEvent, selectEvent] = useState<undefined | CampusGroupsEvent>(
    undefined,
  );
  const onRequestClose = () => selectEvent(undefined);

  const eventMonths = monthly ? groupEventsByMonth(events) : [];
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
        eventMonths.map(({ monthKey, events: monthEvents }) => (
          <MonthSection key={monthKey} id={getEventMonthAnchorId(monthKey)}>
            <Divider
              as="h2"
              label={getMonth(monthEvents[0].eventStartDateTime)}
              variant="title"
            />
            <UpcomingEventsContent>
              {monthEvents.map((event) => (
                <SplitEventCard
                  key={event.eventId}
                  event={event}
                  onClick={() => selectEvent(event)}
                />
              ))}
            </UpcomingEventsContent>
          </MonthSection>
        ))
      ) : (
        <>
          <UpcomingEventsContent>
            {events.slice(1, 3).map((event) => (
              <SplitEventCard
                key={event.eventId}
                event={event}
                onClick={() => selectEvent(event)}
              />
            ))}

            {events.slice(3, 6).map((event) => (
              <SplitEventCard
                key={event.eventId}
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
