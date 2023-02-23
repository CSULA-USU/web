import { Typography, FluidContainer } from 'components';
import { EventCard } from '../../modules/EventCard';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
  infoSection: React.ReactNode;
}
const HeaderContent = styled.div`
  padding: 48px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    min-width: 320px;
    flex: 1;
  }
`;
export const DepartmentHeader = ({
  title,
  children,
  infoSection,
}: DepartmentHeaderProps) => {
  const events = useRecoilValue(eventListState);
  const departmentEvent = events.find(
    (event) => event.organizationName === title,
  );

  return (
    <FluidContainer backgroundImage="subtle-background-3.jpg">
      <HeaderContainer>
        <HeaderContent>
          <Typography variant="labelTitle">Welcome to the</Typography>
          <Typography margin="0 0 24px" variant="titleLarge" weight="400">
            {title}
          </Typography>
          <Typography>{children}</Typography>
        </HeaderContent>
        {departmentEvent && <EventCard featured event={departmentEvent} />}
      </HeaderContainer>
      {infoSection}
    </FluidContainer>
  );
};
