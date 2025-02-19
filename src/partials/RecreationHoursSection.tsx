import React from 'react';
import { Typography } from 'components';
import { BiTimeFive } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import styled from 'styled-components';
import { Spaces } from 'theme';

const LocationContainer = styled.span`
  display: flex;
  align-items: center;
`;

const TimeInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const TimeContainer = styled.div`
  display: flex;
`;

const DayTimeEntry = styled.div`
  margin-bottom: ${Spaces.md};
`;

interface LocationHoursSectionProps {
  title: string;
  location: string;
  hours: { day: string; time: string }[];
  isTablet: boolean;
}

export const RecreationHoursSection: React.FC<LocationHoursSectionProps> = ({
  title,
  location,
  hours,
  isTablet,
}) => (
  <div>
    <Typography as="h4" variant="titleSmall" size={!isTablet ? 'xl' : 'lg'}>
      {title}
    </Typography>
    <LocationContainer>
      <MdLocationPin aria-hidden="true" size="24px" />
      <Typography variant="label" size="md">
        {location}
      </Typography>
    </LocationContainer>
    <TimeContainer>
      <BiTimeFive
        aria-hidden="true"
        style={{ margin: '2px 3px 0px 2px' }}
        size="20px"
      />
      <TimeInnerContainer>
        {hours.map((hour, index) => (
          <DayTimeEntry key={index}>
            <Typography as="p">{hour.day}</Typography>
            <Typography as="p">{hour.time}</Typography>
          </DayTimeEntry>
        ))}
      </TimeInnerContainer>
    </TimeContainer>
  </div>
);
