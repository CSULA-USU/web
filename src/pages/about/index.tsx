import Head from 'next/head';
import { Page } from 'modules';
import {
  Button,
  Card,
  FluidContainer,
  Image,
  NonBreakingSpan,
  Typography,
} from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

import cards from 'data/about.json';

const ButtonContainer = styled.div`
  margin-top: ${Spaces['sm']};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ./ > *:not(:last-child) {
    margin-right: 8px;
  }
  column-gap: ${Spaces.md};
  row-gap: ${Spaces.md};
`;

const Title = styled.div`
  text-align: center;
`;

// const ImageContainer = styled.div`
//   position: relative;
//   width: 100%;
//   padding-bottom: 128.5%;
//   overflow: hidden;
// `;

export default function About() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>About The U-SU</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Associate Students Incorported, ASI, Cross Cultural Centers, CCC, Center For Student Involvement, CSI, Fraternity, Sorority, GEEK, Presence, Graffix, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, PASRC, Asian Pacific Islander Resource Center, ASPIRC, APIDA, Asian, Pacific Islander, Desi-American, Chicana/o Latina/o Student Resource Center, CLSRC, Chicana, Latina, Chicano, Latino, Latinx, Information and Event Services, Distinguished Women, Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, University Student"
          key="keywords"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
          key="description"
        />
      </Head>
      <FluidContainer
        flex
        justifyContent="center"
        backgroundImage="/backgrounds/subtle-background-2.jpg"
      >
        {isTablet || isMobile ? (
          <>
            <FluidContainer>
              <Typography
                as="h1"
                variant="pageHeader"
                size={isTablet ? '4xl' : '5xl'}
                lineHeight="1.3"
                style={{ textAlign: 'center' }}
              >
                We are <NonBreakingSpan>the U-SU</NonBreakingSpan>
              </Typography>

              <FluidContainer flex justifyContent="center" alignItems="center">
                <Image
                  alt="student union"
                  src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                  style={{ width: '100%', height: '100%' }}
                />
              </FluidContainer>
              <ButtonContainer>
                <Button
                  variant="black"
                  href="https://www.dropbox.com/scl/fi/izpey70bgqtxknffwwvm7/Org-Chart_2.7.25.jpg?rlkey=naso65sp1g1mrryirmecyzyxo&st=v8p3h3bj&raw=1"
                  isExternalLink
                >
                  U-SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                  isExternalLink
                >
                  Strategic Plan
                </Button>
              </ButtonContainer>
            </FluidContainer>
          </>
        ) : (
          <>
            <FluidContainer
              flex
              justifyContent="center"
              alignItems="center"
              padding="0"
            >
              <Image
                alt="student union"
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                style={{ width: '100%', height: 'auto' }}
              />
            </FluidContainer>

            <FluidContainer padding="18px 0px 18px 18px">
              <FluidContainer>
                <Typography
                  as="h1"
                  variant="pageHeader"
                  size={isDesktop ? '4xl' : '5xl'}
                  lineHeight="1.3"
                  style={{ textAlign: 'center' }}
                >
                  We are <NonBreakingSpan>the U-SU</NonBreakingSpan>
                </Typography>
              </FluidContainer>

              <ButtonContainer>
                <Button
                  variant="black"
                  href="https://www.dropbox.com/scl/fi/izpey70bgqtxknffwwvm7/Org-Chart_2.7.25.jpg?rlkey=naso65sp1g1mrryirmecyzyxo&st=v8p3h3bj&raw=1"
                  isExternalLink
                >
                  U-SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                  isExternalLink
                >
                  Strategic Plan
                </Button>
              </ButtonContainer>
            </FluidContainer>
          </>
        )}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection={isMobile ? 'column' : 'row'}
        backgroundColor="primary"
        padding="0"
      >
        <FluidContainer>
          <Typography
            variant="pageHeader"
            as="span"
            size={isDesktop ? 'lg' : 'xl'}
            lineHeight="1.5"
          >
            With open doors and minds, we provide space and opportunities,
            enabling Golden Eagles to soar. Our vision is to become Cal State
            LA&apos;s hub for connection and growth.
          </Typography>
        </FluidContainer>
        <FluidContainer>
          <Typography
            variant="pageHeader"
            color="greyDarkest"
            as="p"
            size={isDesktop ? 'sm' : 'md'}
            lineHeight="1.5"
          >
            The University-Student Union, or U-SU for short, is a great one-stop
            location for students eager to learn about what&apos;s happening on
            campus, collect student discounts or get involved. It is the
            headquarters for the Alumni Center, student government (Associated
            Students Incorporated) and campus organizations and clubs.
          </Typography>
        </FluidContainer>
      </FluidContainer>

      <Title>
        <Typography variant="title" as="h2" margin="48px 0 0 0 ">
          Values
        </Typography>
      </Title>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {cards.map((props) => (
          <Card
            key={props.title}
            {...props}
            width={isDesktop ? '100%' : 'calc(33.33% - 24px)'}
            topBorder
            margin="16px 8px"
            iconWidth="112px"
          />
        ))}
      </FluidContainer>
      {/* <FluidContainer>
        <Title>
          <Typography variant="title" as="h2">
            Map
          </Typography>
        </Title>
        <ImageContainer>
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/USU-Floor-Plan-Inside.jpg"
            alt="map of the university student union"
            maxWidth="100%"
            style={{ position: 'absolute' }}
          />
        </ImageContainer>
      </FluidContainer> */}
      <InstagramFeed department="usu" />
    </Page>
  );
}
