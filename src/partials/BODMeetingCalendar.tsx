import { useState } from 'react';
import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStickyNote,
} from 'react-icons/fa';
import { useBreakpoint } from 'hooks';
import meetingSchedule from 'data/bod-meeting-schedule.json';
import { Colors } from 'theme';

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

type GroupedMeetingsByMonth = {
  [key: string]: Meeting[];
};

const ButtonCluster = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
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
  background-color: ${Colors.greyLightest};
  border-radius: 8px;
  border-top: 16px solid ${(p) => p.borderTopColor || 'grey'};
  color: black;
  padding: 16px;
`;

const MeetingDetail = styled.p`
  margin: 4px 0;
  display: flex;
  align-items: start;
  margin: 4px 0;

  svg {
    margin-right: 8px;
    width: 16px; /* Set a fixed width */
    height: 16px; /* Set a fixed height */
    flex-shrink: 0; /* Prevent the icon from shrinking */
  }
`;

// output is an object where keys are meeting type names and values are arrays of meetings sorted by the meeting type
const groupMeetingsByType = (meetings: Meeting[]): GroupedMeetings => {
  return meetings.reduce((acc: GroupedMeetings, meeting: Meeting) => {
    if (!acc[meeting.meeting]) {
      acc[meeting.meeting] = [];
    }
    acc[meeting.meeting].push(meeting);
    return acc;
  }, {});
};

// output is an object where keys are month names and values are arrays of meetings sorted by month of meeting date
const groupMeetingsByMonth = (meetings: Meeting[]): GroupedMeetingsByMonth => {
  return meetings.reduce((acc: GroupedMeetingsByMonth, meeting: Meeting) => {
    const month = new Date(meeting.date).toLocaleString('default', {
      month: 'long',
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(meeting);
    return acc;
  }, {});
};

const filterPastMeetings = (meetings: Meeting[]): Meeting[] => {
  const currentDate = new Date();
  return meetings.filter((meeting) => new Date(meeting.date) >= currentDate);
};

const filteredMeetings = filterPastMeetings(meetingSchedule);
const groupedMeetings = groupMeetingsByType(filteredMeetings);
const monthlyMeetings = groupMeetingsByMonth(filteredMeetings);

// eslint-disable-next-line no-unused-vars
export enum MeetingView {
  ByMonth = 'By Month',
  ByType = 'By Type',
}

export const BODMeetingCalendar = () => {
  const [meetingView, setMeetingView] = useState<MeetingView>(
    MeetingView.ByMonth,
  );
  const { isMobile } = useBreakpoint();

  let chosenView;
  switch (meetingView) {
    case MeetingView.ByMonth:
      chosenView = monthlyMeetings;
      break;
    case MeetingView.ByType:
      chosenView = groupedMeetings;
      break;
    default:
      chosenView = groupedMeetings;
  }

  return (
    <FluidContainer>
      <FluidContainer flex flexDirection="column" alignItems="center">
        <Typography variant="title" as="h2" size={isMobile ? 'xl' : '2xl'}>
          Upcoming Meetings
        </Typography>
        <ButtonCluster>
          {Object.values(MeetingView).map((option, index) => (
            <Button
              key={index}
              onClick={() => setMeetingView(option)}
              variant="grey"
            >
              {option}
            </Button>
          ))}
        </ButtonCluster>
      </FluidContainer>
      {Object.keys(chosenView).map((meetingType, index) => (
        <SectionContainer key={index}>
          <Typography as="h3" variant="labelTitle">
            {meetingType}
          </Typography>
          <GridContainer>
            {chosenView[meetingType].map((meeting, idx) => (
              <GridItem
                key={idx}
                borderTopColor={MeetingColorsMap.get(meeting.meeting)}
              >
                {chosenView === monthlyMeetings ? (
                  <Typography variant="labelTitleSmall">
                    {meeting.meeting}
                  </Typography>
                ) : (
                  ''
                )}
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
