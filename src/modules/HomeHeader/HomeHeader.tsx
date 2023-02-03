import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
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
  <FluidContainer
    flex
    flexDirection="column"
    backgroundImage="/subtle-background-1.jpg"
  >
    <Typography margin="0 auto" variant="title">
      Welcome to the
    </Typography>
    <Typography margin="32px auto 48px" size="4xl" weight="700">
      University-Student Union
    </Typography>
    <HeaderContainer>
      <EventCard featured {...featuredEvent} />
    </HeaderContainer>
  </FluidContainer>
);
