import { Typography, FluidContainer } from 'components';
import { EventCard } from '../../modules/EventCard';
import styled from 'styled-components';
import { OfficeHours } from 'modules/OfficeHours';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
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
      <EventCard
        featured
        image="event-0.jpg"
        org="Department Name"
        title="Event Title"
        location="204B"
        time="8:00 AM – 9:00AM"
        href="#"
      />
    </HeaderContainer>
    <OfficeHours></OfficeHours>
  </FluidContainer>
);
