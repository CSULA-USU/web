import Head from 'next/head';
import { HeaderWithImage, Page } from 'modules';
import { BODDownloads, BODMeetingCalendar, GovernanceFooter } from 'partials';

export default function MeetingSchedule() {
  return (
    <Page>
      <Head>
        <title>Meeting Schedule</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Elections, Student Government, Application, Candidate, Voting, Vote, Meeting, Schedule, Calendar, Agenda, Minutes"
          key="keywords"
        />
      </Head>
      <HeaderWithImage
        title="Board of Directors Meeting Schedule"
        heroImage="/vectors/board-of-directors/schedule.svg"
        centered
      />
      <BODMeetingCalendar />
      <BODDownloads />
      <GovernanceFooter />
    </Page>
  );
}
