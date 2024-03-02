import Head from 'next/head';
import { UpcomingEvents, Page, Header } from 'modules';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';

export default function Home() {
  const events = useRecoilValue(eventListState);
  return (
    <Page>
      <Head>
        <title>U-SU Events</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, CCC, Center For Student Involvement, CSI, Fitness Center, Student Orgnizations, Calendar, Events"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Upcoming Events">
        The University-Student Union hosts various events throughout the school
        year. Make sure to check back here to stay up to date with the latest
        events.
      </Header>
      <div style={{ backgroundColor: 'pink' }}>
        <UpcomingEvents monthly events={events} />
      </div>
    </Page>
  );
}
