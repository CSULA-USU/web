import Head from 'next/head';
import { UpcomingEvents, Page, Header } from 'modules';
import { useRecoilValue } from 'recoil';
import { eventListState, eventListStatusState } from 'atoms';
import styled from 'styled-components';
import { FluidContainer, Loading, Typography } from 'components';
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
  }, [events]);

  return (
    <Page>
      <Head>
        <title>U-SU Events</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, CCC, Center For Student Involvement, CSI, Fitness Center, Student Orgnizations, Calendar, Events"
          key="keywords"
        />
      </Head>
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
