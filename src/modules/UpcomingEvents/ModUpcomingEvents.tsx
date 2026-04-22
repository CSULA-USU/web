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

  // --- 1. DEFINE DERIVED DATA SAFELY ---
  const onRequestClose = () => selectEvent(undefined);

  // Guard against undefined events array
  const safeEvents = events || [];
  const [_, ...laterEvents] = safeEvents;

  const eventsByMonth = (monthly ? safeEvents : laterEvents).reduce(
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

  // --- 2. IMPROVED LOADING LOGIC ---
  // If parent says loading OR we have 0 events, keep the skeleton visible.
  // This prevents the "No additional events" text from flashing while the array is empty.
  const isActuallyLoading = loading || safeEvents.length === 0;

  const UpcomingEventsSkeleton = ({ monthly }: { monthly?: boolean }) => {
    return (
      /* ... keeping your skeleton code exactly as is ... */
      <FluidContainer innerMinHeight={monthly ? '800px' : '600px'} padding="0">
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
      </FluidContainer>
    );
  };

  return (
    <FluidContainer>
      {!monthly && (
        <UpcomingEventsHeading>
          <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
            Upcoming
          </Typography>
        </UpcomingEventsHeading>
      )}

      <FluidContainer innerMinHeight={monthly ? '800px' : '600px'} padding="0">
        {/* Use the new combined loading check here */}
        {isActuallyLoading ? (
          <UpcomingEventsSkeleton monthly={monthly} />
        ) : safeEvents.length <= 1 ? (
          <Typography as="h3" variant="label" margin="20px 0 0 0">
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
                    {safeEvents
                      .slice(1, eventLimit)
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
                  {safeEvents.length > eventLimit && (
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
      </FluidContainer>

      <EventModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onRequestClose={onRequestClose}
      />
    </FluidContainer>
  );
};
