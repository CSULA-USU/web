import { PageMeta } from 'components';
import { HeaderWithImage, Page } from 'modules';
import { BODDownloads, BODMeetingCalendar, GovernanceFooter } from 'partials';

export default function MeetingSchedule() {
  return (
    <Page>
      <PageMeta
        title="Meeting Schedule"
        description="Board of Directors meeting dates, agendas, and minutes for the University-Student Union at Cal State LA. Meetings are open to the campus community."
        path="/board-of-directors/meeting-schedule"
        socialTitle="U-SU Board Meeting Schedule | Cal State LA"
        socialDescription="Upcoming Board of Directors meeting dates, agendas, and minutes. Open to the campus community."
      />
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
