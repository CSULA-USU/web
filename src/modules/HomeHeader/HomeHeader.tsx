import styled from 'styled-components';
import { FluidContainer } from 'components';
import { EventCard } from 'modules';
import { PresenceEvent } from 'types';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HomeHeader = ({
  featuredEvent,
}: {
  featuredEvent: PresenceEvent;
}) => (
  <FluidContainer backgroundImage="/subtle-background-1.jpg">
    <HeaderContainer>
      <EventCard featured {...featuredEvent} />
    </HeaderContainer>
  </FluidContainer>
);
