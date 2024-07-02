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

const cards = [
  {
    title: 'Accountability',
    children:
      'We are accountable to each other and to those we serve, acknowledging and reflecting on our actions, and identifying solutions to maximize our impact.',
    iconSrc: '/vectors/about/business-deal.svg',
    iconAlt: 'certificate, interview, agreement, business deal',
  },
  {
    title: 'Integrity',
    children:
      'We show our integrity by leading, operating, and communicating openly with those we serve.',
    iconSrc: '/vectors/about/growth.svg',
    iconAlt: 'mirror and self-reflection',
  },
  {
    title: 'Innovation',
    children:
      'We actively seek opportunities to create and innovate to improve outcomes across our facilities, services, and activities.',
    iconSrc: '/vectors/about/upgrade.svg',
    iconAlt: 'empowerment, upgrade, presentation',
  },
  {
    title: 'Community',
    children:
      'We identify the unique needs of our community and intentionally act to create a culture of belonging for all who enter our space.',
    iconSrc: '/vectors/about/community.svg',
    iconAlt: 'community, connected',
  },
  {
    title: 'Fun',
    children:
      'We enjoy what we do. We strive to share our joy and passion with those around us to instill a fun, welcoming and positive environment in the U-SU.',
    iconSrc: '/vectors/about/fireworks.svg',
    iconAlt: 'fun moments, fireworks',
  },
  {
    title: 'Connection',
    children:
      'We prioritize genuine connections with all in our community, enabling us to appreciate the unique value in each other and amplify our successes as a team.',
    iconSrc: '/vectors/about/connection.svg',
    iconAlt: 'connection, living, people, showing support, connected',
  },
];

export default function About() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>About The U-SU</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Associate Students Incorported, ASI, Cross Cultural Centers, CCC, Center For Student Involvement, CSI, Fraternity, Sorority, GEEK, Presence, Graffix, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, PASRC, Asian Pacific Islander Resource Center, ASPIRC, APIDA, Asian, Pacific Islander, Desi-American, Chicana/o Latina/o Student Resource Center, CLSRC, Chicana, Latina, Chicano, Latino, Latinx, Information and Event Services, Distinguished Women, Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, University Student"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
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
                  src="/about/calstatela-hero.jpeg"
                  style={{ width: '100%', height: '100%' }}
                ></Image>
              </FluidContainer>
              <ButtonContainer>
                <Button
                  variant="black"
                  href="https://www.dropbox.com/scl/fi/urzsa3jzhqq4di4bqbbpb/Org-Chart_07.01.24.jpg?rlkey=crgqneb8rqrftdg6q0bror5v3&dl=0"
                >
                  U-SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&dl=0"
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
                src="/about/calstatela-hero.jpeg"
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
                  href="https://www.dropbox.com/scl/fi/urzsa3jzhqq4di4bqbbpb/Org-Chart_07.01.24.jpg?rlkey=crgqneb8rqrftdg6q0bror5v3&dl=0"
                >
                  U-SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&dl=0"
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
          ></Card>
        ))}
      </FluidContainer>
      <FluidContainer>
        <Title>
          <Typography variant="title" as="h2">
            Map
          </Typography>
        </Title>
        <Image
          src="https://www.dropbox.com/scl/fi/drgfh9sry5evvs4hg05tp/USU-Floor-Plan-Inside.jpg?rlkey=w2180m5xqn5tlabvulsk2i3v8&raw=1"
          alt="map of the university student union"
          maxWidth="100%"
        />
      </FluidContainer>
      <InstagramFeed department="usu" />
    </Page>
  );
}
