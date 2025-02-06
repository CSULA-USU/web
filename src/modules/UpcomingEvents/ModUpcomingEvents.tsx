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
    return monthly ? (
      <div>
        <Divider label="Month" />
        <UpcomingEventsContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton height="400px" key={index} />
          ))}
        </UpcomingEventsContent>
      </div>
    ) : (
      <>
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
      </>
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
      {loading ? (
        <UpcomingEventsSkeleton monthly={monthly} />
      ) : !events.length ? (
        <Typography as="h3" variant="label">
          No events Available.
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
                {events.length > eventLimit ? (
                  <Button
                    margin="16px auto 0px"
                    onClick={() => {
                      setEventLimit(eventLimit + 3);
                    }}
                    variant="outline"
                  >
                    Load More
                  </Button>
                ) : (
                  ''
                )}
              </UpcomingEventsContent>
            </>
          )}
          <EventModal
            isOpen={!!selectedEvent}
            event={selectedEvent}
            onRequestClose={onRequestClose}
          />
        </>
      )}
    </FluidContainer>
  );
};
