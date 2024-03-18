import Head from 'next/head';
import styled from 'styled-components';
import { Page } from 'modules';
import {
  Image,
  Typography,
  Card,
  FluidContainer,
  NonBreakingSpan,
} from 'components';
import { BiPhone, BiTimeFive } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
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

const LocationContainer = styled.span`
  display: flex;
  align-items: center;
`;

const NumberInnerContainer = styled.div`
  display: flex;
  gap: ${Spaces.sm};
`;

const NumberContainer = styled.div`
  display: flex;
  gap: ${Spaces.lg};
`;

const TimeContainer = styled.span`
  display: flex;
`;

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
        <meta name="author" content="Recreation" />
        <meta
          name="keywords"
          content="Recreation, Fitness, Workout, Calstate LA, CSULA, U-SU, University Student Union, Chris Balam, Jay San Luis, Gym, GENE, Golden Eagle Nutrition Education, Nutrition, hours, locations, schedule, muscle, buff, fitness, center, housing, south village, exercise, dumbbell, weights, sports, esports, game room"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          alt="recreation logo"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
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
        <HoursSection>
          <div>
            <Typography
              as="h3"
              variant="titleSmall"
              size={!isTablet ? 'xl' : 'lg'}
            >
              Rec 1 & 2
            </Typography>
            <LocationContainer>
              <MdLocationPin aria-hidden="true" size="24px" />
              <Typography as="p" variant="label" size="md">
                U-SU Basement
              </Typography>
            </LocationContainer>
            <TimeContainer>
              <BiTimeFive
                aria-hidden="true"
                style={{ margin: '2px 3px 0px 2px' }}
                size="20px"
              />
              <Typography as="p">
                <u>Monday – Friday</u>
                <br />
                7:00 AM to 9:30 PM
                <br />
                <u>Saturday - Sunday</u>
                <br />
                Closed
                <br />
              </Typography>
            </TimeContainer>
          </div>
          <br />
          <div>
            <Typography
              as="h3"
              variant="titleSmall"
              size={!isTablet ? 'xl' : 'lg'}
            >
              Game Room
            </Typography>
            <LocationContainer>
              <MdLocationPin aria-hidden="true" size="24px" />
              <Typography as="p" variant="label" size="md">
                U-SU Room 201
              </Typography>
            </LocationContainer>
            <TimeContainer>
              <BiTimeFive
                aria-hidden="true"
                style={{ margin: '2px 3px 0px 2px' }}
                size="20px"
              />
              <Typography as="p">
                <u>Monday – Thursday</u>
                <br />
                12:00 PM to 6:00 PM
                <br />
                <u>Friday - Sunday</u>
                <br />
                Closed
              </Typography>
            </TimeContainer>
          </div>
          <br />
          <div>
            <Typography
              as="h3"
              variant="titleSmall"
              size={!isTablet ? 'xl' : 'lg'}
            >
              South Village Wellness Zone
            </Typography>
            <LocationContainer>
              <MdLocationPin aria-hidden="true" size="24px" />
              <Typography as="p" variant="label" size="md">
                South Village Housing
              </Typography>
            </LocationContainer>
            <TimeContainer>
              <BiTimeFive
                aria-hidden="true"
                style={{ margin: '2px 3px 0px 2px' }}
                size="20px"
              />
              <Typography as="p">
                <u>Monday – Friday</u>
                <br />
                7:00 AM to 12:00 PM, 4:30 PM to 9:30 PM
                <br />
                <u>Saturday - Sunday</u>
                <br />
                Closed
              </Typography>
            </TimeContainer>
          </div>
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
          basement level of the U-SU, and will be open to all students, staff
          and faculty.
        </Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLighter">
        <Typography
          as="h3"
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
            alt="todo:"
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
            alt="todo:"
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
            alt="todo:"
            width="100%"
          />
        </Card>
      </FluidContainer>
      <InstagramFeed department="recreation" />
    </Page>
  );
}
