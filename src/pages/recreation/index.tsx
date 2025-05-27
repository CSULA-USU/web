import Head from 'next/head';
import styled from 'styled-components';
import {
  Image,
  Typography,
  Card,
  FluidContainer,
  NonBreakingSpan,
} from 'components';
import { Page } from 'modules';
import {
  NonDiscriminationPolicy,
  PhotoVideoDisclaimer,
  RecreationHoursSection,
} from 'partials';
import { BiPhone } from 'react-icons/bi';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const HeaderSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const HoursSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PhoneSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  flex: 1 0 auto;
  margin: 0px 0px 32px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: start;
  }
`;

const NumberInnerContainer = styled.div`
  display: flex;
  gap: ${Spaces.sm};
`;

const NumberContainer = styled.div`
  display: flex;
  gap: ${Spaces.lg};
`;

const StyledH1 = styled.h1`
  padding: 0;
  margin: 0;
`;

const locations = [
  {
    title: 'Rec 1',
    location: 'U-SU Basement',
    hours: [
      { day: 'Monday to Friday', time: '7:10 AM to 6:45 PM' },
      { day: 'Saturday to Sunday', time: 'Closed' },
    ],
  },
  {
    title: 'Rec 2',
    location: 'U-SU Basement',
    hours: [{ day: 'Monday to Sunday', time: 'Closed' }],
  },
  {
    title: 'Game Room',
    location: 'U-SU Room 201',
    hours: [{ day: 'Monday to Sunday', time: 'Closed' }],
  },
  {
    title: 'South Village Housing Wellness Zone',
    location: 'South Village Housing',
    hours: [{ day: 'Monday to Sunday', time: 'Closed' }],
  },
];

export default function Recreation() {
  const { isMobile, isTablet, returnByBreakpoint } = useBreakpoint();
  const cardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(33.33% - 8px)',
  });

  return (
    <Page>
      <Head>
        <title>U-SU Recreation</title>
        <meta name="author" content="Recreation" key="author" />
        <meta
          name="keywords"
          content="Recreation, Fitness, Workout, Calstate LA, CSULA, U-SU, University Student Union, Gym, GENE, Golden Eagle Nutrition Education, Nutrition, hours, locations, schedule, muscle, buff, fitness, center, housing, south village, exercise, dumbbell, weights, sports, esports, game room, video games"
          key="keywords"
        />
      </Head>
      <StyledH1>
        <FluidContainer
          backgroundImage="/departments/recreation/recreation-hero-background.jpg"
          flex
          justifyContent="center"
          alignItems="center"
          innerMinHeight={isMobile ? '320px' : '640px'}
          innerMaxWidth="640px"
        >
          <Image
            src="/departments/recreation/recreation-hero.svg"
            alt="university-student union recreation play wellness connection"
            width="100%"
            height="fit-content"
          />
        </FluidContainer>
      </StyledH1>
      <FluidContainer
        flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <HeaderSection>
          <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <Typography
              as="h2"
              variant="pageHeader"
              lineHeight="1"
              size={isMobile ? '2xl' : '4xl'}
            >
              The Recreation <NonBreakingSpan>Fitness Center</NonBreakingSpan>{' '}
              <NonBreakingSpan>is now open!</NonBreakingSpan>
            </Typography>
          </div>
          <PhoneSection>
            <NumberContainer>
              <NumberInnerContainer>
                <BiPhone aria-hidden="true" fontSize={Spaces.lg} />
                <Typography as="p" variant="labelTitleSmall">
                  Recreation 1:{' '}
                </Typography>
                <Typography as="p">(323) 343-7546</Typography>
              </NumberInnerContainer>
            </NumberContainer>
            <NumberContainer>
              <NumberInnerContainer>
                <BiPhone aria-hidden="true" fontSize={Spaces.lg} />
                <Typography as="p" variant="labelTitleSmall">
                  Recreation 2:{' '}
                </Typography>
                <Typography as="p">(323) 343-2520</Typography>
              </NumberInnerContainer>
            </NumberContainer>
          </PhoneSection>
        </HeaderSection>
        <Typography as="h3" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Summer 2025 Hours:
        </Typography>
        <HoursSection>
          {locations.map((location, index) => (
            <RecreationHoursSection
              key={index}
              title={location.title}
              location={location.location}
              isTablet={isTablet}
              hours={location.hours}
            />
          ))}
        </HoursSection>
      </FluidContainer>
      <FluidContainer
        flex
        justifyContent="space-between"
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
      >
        <Typography as="p" margin="0 72px 24px 0">
          Recreation at Cal State LA provides Golden Eagles with opportunities
          to play, exercise and engage their campus community through
          programming and events aimed toward enhancing the experience of all
          who participate.
        </Typography>
        <Typography as="p">
          Recreation is comprised of the Recreation Fitness Center Center and
          Recreation Esports. The Recreation Fitness Center is located on the
          basement level of the U-SU and the Recreation Game Room is located on
          the second floor at room 201. They are open to all students, staff and
          faculty.
        </Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLighter">
        <Typography
          as="h2"
          variant="title"
          margin="24px 0 0 0"
          size={isMobile ? 'lg' : '2xl'}
        >
          Our Newly Renovated Fitness Center is Ready For You!
        </Typography>
      </FluidContainer>
      <FluidContainer
        backgroundColor="greyLighter"
        justifyContent="space-between"
        flex
        flexWrap="wrap"
      >
        <Card
          margin={`0 0 ${Spaces.md}`}
          width={cardWidth}
          title="Major Expansion&nbsp;&nbsp;&nbsp;"
        >
          <Image
            src="/departments/recreation/recreation-treadmill.jpg"
            alt="students exercising in rec 2"
            width="100%"
          />
        </Card>
        <Card
          margin={`0 0 ${Spaces.md}`}
          width={cardWidth}
          title="Strength Equipment"
        >
          <Image
            src="/departments/recreation/recreation-bench.jpg"
            alt="students working out using the bench press"
            width="100%"
          />
        </Card>
        <Card
          margin={`0 0 ${Spaces.md}`}
          width={cardWidth}
          title="Rubber Flooring"
        >
          <Image
            src="/departments/recreation/recreation-floor-2.jpg"
            alt="student performing floor exercises"
            width="100%"
          />
        </Card>
      </FluidContainer>
      <InstagramFeed department="recreation" />
      <NonDiscriminationPolicy />
      <PhotoVideoDisclaimer />
      <FluidContainer flex justifyContent="center">
        <Image
          alt=""
          src="departments/recreation/recreation-hero.svg"
          height="232px"
          width="100%"
        />
      </FluidContainer>
    </Page>
  );
}
