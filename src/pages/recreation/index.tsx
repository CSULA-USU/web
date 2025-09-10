import Head from 'next/head';
import styled from 'styled-components';
import { BiPhone } from 'react-icons/bi';
import RecData from '../../data/recreation.json';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';
import {
  Image,
  Typography,
  Card,
  FluidContainer,
  StyledLink,
} from 'components';
import { Page } from 'modules';
import {
  NonDiscriminationPolicy,
  PhotoVideoDisclaimer,
  RecreationHoursSection,
} from 'partials';
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

const LongDescriptionSection = styled.div`
  display: flex;
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

const CTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(to right, rgb(255, 244, 200), ${Colors.primary});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 48px 24px;
  text-align: center;
  border-radius: 12px;
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
        <title>U&ndash;SU Recreation</title>
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
          <PhoneSection>
            <NumberContainer>
              <NumberInnerContainer>
                <BiPhone aria-hidden="true" fontSize={Spaces.lg} />
                <Typography as="p" variant="labelTitleSmall">
                  Recreation 1:
                </Typography>
                <Typography as="p">(323) 343&ndash;7546</Typography>
              </NumberInnerContainer>
            </NumberContainer>
            <NumberContainer>
              <NumberInnerContainer>
                <BiPhone aria-hidden="true" fontSize={Spaces.lg} />
                <Typography as="p" variant="labelTitleSmall">
                  Recreation 2:
                </Typography>
                <Typography as="p">(323) 343&ndash;2520</Typography>
              </NumberInnerContainer>
            </NumberContainer>
          </PhoneSection>
        </HeaderSection>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Fall 2025 Hours:
        </Typography>
        <HoursSection>
          {RecData.home.locations.map((location, index) => (
            <RecreationHoursSection
              key={index}
              title={location.title}
              location={location.location}
              isTablet={isTablet}
              hours={location.hours}
            />
          ))}
        </HoursSection>
        <LongDescriptionSection>
          <Typography as="p" margin="0 72px 0 0">
            Recreation at Cal State LA provides Golden Eagles with opportunities
            to play, exercise and engage their campus community through
            programming and events aimed toward enhancing the experience of all
            who participate.
          </Typography>
          <Typography as="p">
            Recreation is comprised of the Recreation Fitness Center Center and
            Recreation Esports. The Recreation Fitness Center is located on the
            basement level of the U&ndash;SU and the Recreation Game Room is
            located on the second floor at room 201. They are open to all
            students, staff and faculty.
          </Typography>
        </LongDescriptionSection>
      </FluidContainer>

      <FluidContainer>
        <CTA>
          <Typography
            variant="labelTitle"
            as="h2"
            color="black"
            size={isMobile ? 'lg' : '2xl'}
            lineHeight="1.5"
          >
            Get the Cal State LA Recreation App
          </Typography>
          <Typography margin="0 0 10px 0">
            Download our free app to sign up for workout classes and gain access
            to our recreation facilities.
          </Typography>
          <FluidContainer
            flex
            flexDirection={isMobile ? 'column' : 'row'}
            gap="24px"
            padding="0"
          >
            <StyledLink href="https://apps.apple.com/us/app/cal-state-la-recreation/">
              <Image
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/App_Store_Badge.webp"
                alt="Download on the App Store"
                width={150}
              />
            </StyledLink>
            <StyledLink href="https://play.google.com/store/apps/details?id=com.innosoftfusiongo.californiastateuniversitylosangeles&pcampaignid=web_share">
              <Image
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/Google_Play_Store_badge.webp"
                alt="Get it on Google Play"
                width={150}
              />
            </StyledLink>
          </FluidContainer>
        </CTA>
      </FluidContainer>

      <FluidContainer>
        <StyledLink
          href="https://www.dropbox.com/scl/fi/77otth0tcc69v2j6yz4lr/USU_Recreation_Facilities_General_Policies_8-19-25.pdf?rlkey=sp0iijyxc83ywk4c1dnnizbur&st=zlnqf6hq&raw=1"
          isExternalLink
          isInverseUnderlineStyling
        >
          Recreation General Policies
        </StyledLink>
      </FluidContainer>
      <FluidContainer
        backgroundColor="greyLighter"
        justifyContent="space-between"
        flex
        flexWrap="wrap"
      >
        {RecData.home.cards.map((card, index) => (
          <Card
            key={index}
            margin={`0 0 ${Spaces.md}`}
            width={cardWidth}
            title={card.title}
          >
            <Image
              alt={card.alt}
              sizes="(min-width: 768px) 624px, (min-width: 1024px) 400px, 100vw" // Match your breakpoints
              src={card.src}
              srcset={`${card.src} 271w, ${card.desktopSrc} 400w, ${card.tabletSrc} 624w`}
              width="100%"
            />
          </Card>
        ))}
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
