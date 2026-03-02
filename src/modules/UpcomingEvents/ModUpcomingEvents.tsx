import {
  Button,
  Divider,
  FluidContainer,
  Skeleton,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { PresenceEvent } from 'types';
import {
  EventCard,
  MinimalistEvent,
  MinimalistEventSkeleton,
} from 'modules/EventCard';
import styled from 'styled-components';
import { EventModal } from 'modules/EventModal';
import { useState } from 'react';
import { media, Spaces } from 'theme';

interface UpcomingEventsProps {
  loading: boolean;
  events: PresenceEvent[];
  monthly?: boolean;
}

const UpcomingEventsHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UpcomingEventsContent = styled.div`
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

const TertiaryContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const getMonth = (date: string) =>
  new Date(date).toLocaleString('default', { month: 'long' });

export const ModUpcomingEvents = ({
  loading,
  events,
  monthly,
}: UpcomingEventsProps) => {
  const [selectedEvent, selectEvent] = useState<undefined | PresenceEvent>(
    undefined,
  );
  const [eventLimit, setEventLimit] = useState<number>(6);
  const { isMobile } = useBreakpoint();
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

  const UpcomingEventsSkeleton = ({ monthly }: { monthly?: boolean }) => {
    return (
      <div style={{ minHeight: monthly ? '800px' : '600px' }}>
        {monthly ? (
          <div>
            <Divider label="Month" />
            <UpcomingEventsContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton height="400px" key={index} />
              ))}
            </UpcomingEventsContent>
          </div>
        ) : (
          <UpcomingEventsContent>
            <TertiaryContainer>
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <MinimalistEventSkeleton />
                  {index === 4 ? (
                    ''
                  ) : (
                    <Divider color="greyLighter" margin={`${Spaces.md} 0`} />
                  )}
                </li>
              ))}
            </TertiaryContainer>
          </UpcomingEventsContent>
        )}
      </div>
    );
  };

  return (
    <FluidContainer>
      {!monthly && (
        <UpcomingEventsHeading>
          <Typography
            as="h2"
            variant="title"
            color="black"
            size={isMobile ? 'xl' : '2xl'}
          >
            Upcoming
          </Typography>
        </UpcomingEventsHeading>
      )}

      {/* We lock the height of this entire section */}
      <div style={{ minHeight: monthly ? '800px' : '600px' }}>
        {loading ? (
          <UpcomingEventsSkeleton monthly={monthly} />
        ) : events.length <= 1 ? (
          /* If events.length is 1, index 0 is featured, 
             so this list has nothing to show. 
             We keep the min-height div so the page doesn't collapse.
          */
          <Typography as="h3" variant="label" style={{ paddingTop: '20px' }}>
            No additional upcoming events.
          </Typography>
        ) : (
          <>
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
                  <TertiaryContainer>
                    {events
                      .slice(1, eventLimit) // Keep your skip logic
                      .map((event, index, eventArray) => (
                        <li key={event.eventNoSqlId}>
                          <MinimalistEvent
                            event={event}
                            onClick={() => selectEvent(event)}
                          />
                          {index === eventArray.length - 1 ? (
                            ''
                          ) : (
                            <Divider
                              color="greyLighter"
                              margin={`${Spaces.md} 0`}
                            />
                          )}
                        </li>
                      ))}
                  </TertiaryContainer>
                </UpcomingEventsContent>

                <FluidContainer
                  flex
                  flexDirection="row"
                  justifyContent="center"
                  gap="16px"
                >
                  {events.length > eventLimit && (
                    <Button
                      onClick={() => setEventLimit(eventLimit + 3)}
                      variant="black"
                    >
                      Load More
                    </Button>
                  )}

                  {eventLimit > 6 && (
                    <Button onClick={() => setEventLimit(6)} variant="outline">
                      Show Less
                    </Button>
                  )}
                </FluidContainer>
              </>
            )}
          </>
        )}
      </div>

      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
