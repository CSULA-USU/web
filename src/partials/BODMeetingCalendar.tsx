import { FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStickyNote,
} from 'react-icons/fa';
import { useBreakpoint } from 'hooks';
import meetingSchedule from 'data/bod-meeting-schedule.json';

interface Meeting {
  meeting: string;
  date: string;
  time: string;
  location: string;
  note?: string;
}

type GroupedMeetings = {
  [key: string]: Meeting[];
};

const MeetingColors = {
  purple: '#a04b9e',
  red: '#fb0200',
  orange: '#e97818',
  green: '#68bc5a',
  blue: '#2d86e4',
  pink: '#f083d4',
};

const MeetingColorsMap = new Map<string, string>([
  ['Board of Directors', MeetingColors.purple],
  ['Audit Committee', MeetingColors.red],
  ['Personnel Committee', MeetingColors.orange],
  ['Nominating Committee', MeetingColors.green],
  ['Fiscal Committee', MeetingColors.blue],
  ['Student Directors', MeetingColors.pink],
]);

const SectionContainer = styled.div`
  margin-bottom: 32px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Change to single column on mobile devices */
  }
`;

interface GridItemProps {
  borderTopColor?: string;
}

const GridItem = styled.div<GridItemProps>`
  background-color: black;
  color: white;
  padding: 16px;
  border: 1px solid white;
  border-top: 16px solid ${(p) => p.borderTopColor || 'grey'};
  border-radius: 8px;
`;

const MeetingDetail = styled.p`
  margin: 4px 0;
  display: flex;
  align-items: start;
  margin: 4px 0;
  color: white;

  svg {
    margin-right: 8px;
    width: 16px; /* Set a fixed width */
    height: 16px; /* Set a fixed height */
    flex-shrink: 0; /* Prevent the icon from shrinking */
  }
`;

export const BODMeetingCalendar = () => {
  const groupMeetingsByType = (meetings: Meeting[]): GroupedMeetings => {
    return meetings.reduce((acc: GroupedMeetings, meeting: Meeting) => {
      if (!acc[meeting.meeting]) {
        acc[meeting.meeting] = [];
      }
      acc[meeting.meeting].push(meeting);
      return acc;
    }, {});
  };

  const filterPastMeetings = (meetings: Meeting[]): Meeting[] => {
    const currentDate = new Date();
    return meetings.filter((meeting) => new Date(meeting.date) >= currentDate);
  };

  const filteredMeetings = filterPastMeetings(meetingSchedule);
  const groupedMeetings = groupMeetingsByType(filteredMeetings);

  const { isMobile } = useBreakpoint();

  return (
    <FluidContainer>
      <Typography
        variant="title"
        as="h2"
        margin={`0`}
        size={isMobile ? 'xl' : '2xl'}
      >
        Upcoming Meetings
      </Typography>
      {Object.keys(groupedMeetings).map((meetingType, index) => (
        <SectionContainer key={index}>
          <Typography as="h3" variant="labelTitle">
            {meetingType}
          </Typography>
          <GridContainer>
            {groupedMeetings[meetingType].map((meeting, idx) => (
              <GridItem
                key={idx}
                borderTopColor={MeetingColorsMap.get(meeting.meeting)}
              >
                <MeetingDetail>
                  <FaCalendarAlt />
                  {meeting.date}
                </MeetingDetail>
                <MeetingDetail>
                  <FaClock />
                  {meeting.time}
                </MeetingDetail>
                <MeetingDetail>
                  <FaMapMarkerAlt />
                  {meeting.location}
                </MeetingDetail>
                {meeting.note && (
                  <MeetingDetail>
                    <FaStickyNote />
                    {meeting.note}
                  </MeetingDetail>
                )}
              </GridItem>
            ))}
          </GridContainer>
        </SectionContainer>
      ))}
    </FluidContainer>
  );
};
