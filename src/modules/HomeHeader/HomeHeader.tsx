import styled from 'styled-components';
import { Typography, Button, FluidContainer } from 'components';
import { EventCard } from 'modules';
import { PresenceEvent } from 'types';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CTASection = styled.div`
  max-width: 20%;
  margin-right: 144px;
`;

const FeaturedEventSection = styled.div`
  flex: 1;
`;

export const HomeHeader = ({
  featuredEvent,
}: {
  featuredEvent: PresenceEvent;
}) => (
  <FluidContainer backgroundImage="/subtle-background-1.jpg">
    <HeaderContainer>
      <CTASection>
        <Typography as="h1" variant="pageHeader" size="2xl">
          Welcome to the U-SU!
        </Typography>
        <Button variant="black">View Event Calendar</Button>
      </CTASection>
      <FeaturedEventSection>
        <Typography as="h2" variant="titleSmall" margin="0 0 24px">
          Featured Event
        </Typography>
        <EventCard featured {...featuredEvent} />
      </FeaturedEventSection>
    </HeaderContainer>
  </FluidContainer>
);
