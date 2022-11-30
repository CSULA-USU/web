import styled from 'styled-components';
import { Typography, Button } from 'components';
import { EventCard } from 'modules';

const HeroSectionContainer = styled.div`
  height: 835px;
  background: url('/hero-background.jpg');
  background-size: cover;
  padding: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CTASection = styled.div`
  margin-right: 144px;
`;

const FeaturedEventSection = styled.div`
  flex: 1;
`;

export const HeroSection = () => (
  <HeroSectionContainer>
    <CTASection>
      <Typography as="h1" variant="heroHeading">Welcome to the U-SU!</Typography>
      <Button variant="black">
        View Event Calendar
      </Button>
    </CTASection>
    <FeaturedEventSection>
      <Typography as="h2" variant="smallHeadingCaps" margin='0 0 24px'>Featured Event</Typography>
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
  </HeroSectionContainer>
);
