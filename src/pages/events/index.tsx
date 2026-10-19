import {
  EventFilters,
  UpcomingEvents,
  Page,
  Header,
  useEventFilterState,
} from 'modules';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import styled from 'styled-components';
import {
  AnchorNav,
  Button,
  FluidContainer,
  Loading,
  PageMeta,
  Typography,
} from 'components';
import { useState, useEffect, useMemo } from 'react';
import { EMPTY_EVENT_FILTERS, filterEvents } from 'utils/eventFilters';
import { getEventMonthAnchorId, groupEventsByMonth } from 'utils/eventUtils';
import { getMonth, getYear } from 'utils/timehelpers';

const BackgroundImage = styled.div`
  background: url(https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp);
  height: 100%;
`;

export default function Home() {
  const events = useRecoilValue(eventListState);
  const eventsStatus = useRecoilValue(eventListStatusState);
  const [loading, setLoading] = useState(true);
  const { filters, setFilters, setSearchQuery } = useEventFilterState();

  useEffect(() => {
    if (eventsStatus != 'undefined') {
      setLoading(false);
    }
  }, [eventsStatus]);

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters],
  );

  /* Built from the filtered list, so the bar only offers months that still
     have events in view. The year is spelled out on the month where it
     changes — "Jan 2027" — rather than abbreviated: "Jan '27" reads as the
     27th of January, aloud and at a glance. Memoized because AnchorNav
     re-registers its scroll listener whenever its links change. */
  const monthLinks = useMemo(
    () =>
      groupEventsByMonth(filteredEvents).map(
        ({ monthKey, events: monthEvents }, index, months) => {
          const monthStart = monthEvents[0].eventStartDateTime;
          const previousMonthStart =
            months[index - 1]?.events[0].eventStartDateTime;
          const startsNewYear =
            previousMonthStart !== undefined &&
            getYear(monthStart) !== getYear(previousMonthStart);
          const monthLabel = getMonth(monthStart, 'short');
          return {
            label: startsNewYear
              ? `${monthLabel} ${getYear(monthStart)}`
              : monthLabel,
            href: `#${getEventMonthAnchorId(monthKey)}`,
          };
        },
      ),
    [filteredEvents],
  );

  return (
    <Page>
      <PageMeta
        title="U–SU Events"
        description="See what's happening at the University-Student Union. Browse upcoming events, programs, and celebrations across Cal State LA's campus hub."
        path="/events"
        socialTitle="Upcoming Events at the Cal State LA U-SU"
        socialDescription="Concerts, cultural celebrations, workshops, and recreation programming — find your next thing to do on campus."
      />
      <BackgroundImage>
        <Header title="Upcoming Events">
          The University-Student Union hosts various events throughout the
          school year.
          <br />
          U&ndash;SU programs and activities are open and available to all
          regardless of race, sex, color, ethnicity or national origin.
        </Header>
        {loading ? (
          <Loading load={loading} />
        ) : events.length < 1 ? (
          <>
            <FluidContainer flex justifyContent="center">
              <Typography as="h3" variant="label">
                There are currently no upcoming events. Check back later for
                updates!
              </Typography>
            </FluidContainer>
          </>
        ) : (
          <>
            <FluidContainer
              padding="36px 72px 0"
              paddingDesktop="18px 36px 0"
              paddingMobile="18px 16px 0"
            >
              <EventFilters
                events={events}
                filters={filters}
                onFiltersChange={setFilters}
                onSearchQueryChange={setSearchQuery}
                resultCount={filteredEvents.length}
              />
            </FluidContainer>
            {/* One month needs no navigating between. */}
            {monthLinks.length > 1 && (
              <AnchorNav links={monthLinks} floatsOverHero={false} />
            )}
            {filteredEvents.length ? (
              <UpcomingEvents monthly events={filteredEvents} />
            ) : (
              <FluidContainer flex flexDirection="column" alignItems="center">
                <Typography as="h3" variant="label">
                  No events match.
                </Typography>
                <Button
                  variant="outline"
                  onClick={() => setFilters(EMPTY_EVENT_FILTERS)}
                >
                  Clear filters
                </Button>
              </FluidContainer>
            )}
          </>
        )}
      </BackgroundImage>
    </Page>
  );
}
