import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { EventCard } from 'modules';
import { PresenceEvent } from 'types';
import { Spaces } from 'theme';

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
    <Typography
      variant="pageHeader"
      margin={`0 auto ${Spaces.lg}`}
      size="2xl"
      color="greyDarker"
    >
      Welcome to the University-Student Union!
    </Typography>
    <HeaderContainer>
      <EventCard featured {...featuredEvent} />
    </HeaderContainer>
  </FluidContainer>
);
