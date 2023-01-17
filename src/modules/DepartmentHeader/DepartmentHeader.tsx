import { Typography, FluidContainer } from 'components';
import { EventCard } from '../../modules/EventCard';
import styled from 'styled-components';
import { OfficeHours } from 'modules/OfficeHours';
import { PresenceEvent } from 'types';

interface HourProps {
  title: string;
  times: string[];
}
interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
  address: string;
  phoneNumber: string;
  hours?: HourProps[];
  featuredEvent: PresenceEvent;
}
const HeaderContent = styled.div`
  width: 80%;
  padding: 72px;
`;
const HeaderContainer = styled.div`
  display: flex;
`;
export const DepartmentHeader = ({
  title,
  children,
  address,
  phoneNumber,
  hours,
  featuredEvent,
}: DepartmentHeaderProps) => (
  <FluidContainer backgroundImage="subtle-background-3.jpg">
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="titleSmall">Welcome to the</Typography>
        <Typography margin="0 0 24px" variant="titleLarge" weight="400">
          {title}
        </Typography>
        <Typography>{children}</Typography>
      </HeaderContent>
      <EventCard featured {...featuredEvent} />
    </HeaderContainer>
    <OfficeHours
      address={address}
      phoneNumber={phoneNumber}
      hours={hours}
    ></OfficeHours>
  </FluidContainer>
);
