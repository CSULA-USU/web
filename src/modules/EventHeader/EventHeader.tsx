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

export const EventHeader = ({
  featuredEvent,
  title,
}: {
  featuredEvent: PresenceEvent;
  title?: React.ReactNode;
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
      {title}
    </Typography>
    <HeaderContainer>
      <EventCard featured event={featuredEvent} />
    </HeaderContainer>
  </FluidContainer>
);
