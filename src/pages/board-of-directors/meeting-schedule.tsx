import Head from 'next/head';
import { HeaderWithImage, Page } from 'modules';
import { BODDownloads, BODMeetingCalendar, GovernanceFooter } from 'partials';

export default function MeetingSchedule() {
  return (
    <Page>
      <Head>
        <title>Meeting Schedule</title>
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
