import Head from 'next/head';
import { Header, Page } from 'modules';
import { BODDownloads, BODMeetingCalendar, GovernanceFooter } from 'partials';

export default function MeetingSchedule() {
  return (
    <Page>
      <Head>
        <title>Meeting Schedule</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Elections, Student Government, Application, Candidate, Voting, Vote, Meeting, Schedule, Calendar, Agenda, Minutes"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Board of Directors Meeting Schedule" />
      <BODDownloads />
      <BODMeetingCalendar />
      <GovernanceFooter />
    </Page>
  );
}
