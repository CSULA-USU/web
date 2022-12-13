import styled from 'styled-components';
import { Typography, Button, FluidContainer } from 'components';
import { EventCard } from 'modules';

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

export const Header = () => (
  <FluidContainer backgroundImage="/subtle-background-1.jpg">
    <HeaderContainer>
      <CTASection>
        <Typography as="h1" variant="heroHeading">
          Welcome to the U-SU!
        </Typography>
        <Button variant="black">View Event Calendar</Button>
      </CTASection>
      <FeaturedEventSection>
        <Typography as="h2" variant="smallHeadingCaps" margin="0 0 24px">
          Featured Event
        </Typography>
        <EventCard
          featured
          image="/event-0.jpg"
          org="APISRC"
          title="A Very Important Event"
          location="204B"
          time="4:00 PM – 5:00 PM"
          url="#"
        />
      </FeaturedEventSection>
    </HeaderContainer>
  </FluidContainer>
);
