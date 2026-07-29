import { UpcomingEvents, Page, Header } from 'modules';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import styled from 'styled-components';
import { FluidContainer, Loading, PageMeta, Typography } from 'components';
import { useState, useEffect } from 'react';

const BackgroundImage = styled.div`
  background: url(https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp);
  height: 100%;
`;

export default function Home() {
  const events = useRecoilValue(eventListState);
  const eventsStatus = useRecoilValue(eventListStatusState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventsStatus != 'undefined') {
      setLoading(false);
    }
  }, [eventsStatus]);

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
          <UpcomingEvents monthly events={events} />
        )}
      </BackgroundImage>
    </Page>
  );
}
