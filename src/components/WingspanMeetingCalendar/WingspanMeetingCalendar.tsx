// WingspanMeetingCalendar.tsx
import { FluidContainer } from 'components';
import styled from 'styled-components';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStickyNote,
} from 'react-icons/fa';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div<{ borderTopColor?: string }>`
  background-color: white;
  color: black;
  padding: 16px;
  border: 1px solid white;
  border-top: 16px solid ${(p) => p.borderTopColor || 'grey'};
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
`;

const MeetingDetail = styled.p`
  margin: 4px 0;
  display: flex;
  align-items: start;
  color: black;

  svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

interface ManualMeeting {
  date: string; // Assume date string like "2025-07-15"
  time: string;
  location: string;
  note?: string;
  borderTopColor?: string;
}

interface WingspanMeetingCalendarProps {
  meetings: ManualMeeting[];
}

const filterUpcomingMeetings = (meetings: ManualMeeting[]): ManualMeeting[] => {
  const today = new Date();
  return meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= today;
  });
};

export const WingspanMeetingCalendar = ({
  meetings,
}: WingspanMeetingCalendarProps) => {
  const upcomingMeetings = filterUpcomingMeetings(meetings);

  if (upcomingMeetings.length === 0) return null; // 👈 hide if no meetings

  return (
    <FluidContainer padding="0">
      <GridContainer>
        {upcomingMeetings.map((meeting) => {
          const key = `${meeting.date}-${meeting.time}-${meeting.location}`;
          return (
            <GridItem key={key} borderTopColor={meeting.borderTopColor}>
              <MeetingDetail>
                <FaCalendarAlt aria-hidden="true" />
                {new Date(meeting.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </MeetingDetail>
              <MeetingDetail>
                <FaClock aria-hidden="true" />
                {meeting.time}
              </MeetingDetail>
              <MeetingDetail>
                <FaMapMarkerAlt aria-hidden="true" />
                {meeting.location}
              </MeetingDetail>
              {meeting.note && (
                <MeetingDetail>
                  <FaStickyNote aria-hidden="true" />
                  {meeting.note}
                </MeetingDetail>
              )}
            </GridItem>
          );
        })}
      </GridContainer>
    </FluidContainer>
  );
};
