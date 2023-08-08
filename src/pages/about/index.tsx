import Head from 'next/head';
import { Page, GenericModal } from 'modules';
import {
  Button,
  Card,
  FluidContainer,
  Image,
  NonBreakingSpan,
  SideImageHeader,
  Typography,
} from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { useState } from 'react';
import { media, Spaces } from 'theme';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const ButtonContainer = styled.div`
  margin-top: ${Spaces['2xl']};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ./ > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const HeaderContainer = styled.div`
  width: 50%;
  ${media('tablet')(`width:50%;`)}
  ${media('desktop')(`width:50%;`)}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${Spaces.lg};
`;

const HistoryContainer = styled.div`
  ${media('mobile')(`width:300px;`)}
`;

const Title = styled.div`
  text-align: center;
`;

const cards = [
  {
    title: 'Inclusiveness',
    children:
      'We create a welcoming environment that acknowledges and respects everyone. Through our programs and services, we proactively respond to the evolving needs of our communities.',
    iconSrc: '/vectors/about/inclusive.svg',
    iconAlt: 'friends',
  },
  {
    title: 'Growth',
    children:
      'We are committed to expanding our intellectual and personal horizons. We evaluate our individual and shared experiences, reflect on them, and integrate new thoughts and ideas into our work, lives, and behaviors.',
    iconSrc: '/vectors/about/growth.svg',
    iconAlt: 'growth',
  },
  {
    title: 'Empowerment',
    children:
      'We enable our students to thrive by encouraging mindful conversations, supporting risk-taking, and providing new opportunities to lead and grow.',
    iconSrc: '/vectors/about/leader.svg',
    iconAlt: 'empowerment',
  },
  {
    title: 'Innovation',
    children:
      'We constantly seek ways to improve, and strive to develop ideas and solutions in service of our students and our mission.',
    iconSrc: '/vectors/about/ideas.svg',
    iconAlt: 'ideas',
  },
  {
    title: 'Service-Oriented Leadership',
    children:
      'We promote friendly interactions and provide resources that create positive and joyful experiences for those we serve. We lead by example. We are caring, respectful and responsive.',
    iconSrc: '/vectors/about/service.svg',
    iconAlt: 'service',
  },
  {
    title: 'Teamwork',
    children:
      'We build and foster relationships that enable us to learn from each other, have fun together, and collaborate seamlessly to make our greatest impact.',
    iconSrc: '/vectors/about/team.svg',
    iconAlt: 'team',
  },
];

export default function About() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);

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

      <SideImageHeader
        imgAlt="student union"
        imgSrc="/about/about-hero-bw.jpeg"
        imgWidth={isDesktop ? '100%' : '50%'}
        background="https://www.dropbox.com/scl/fi/m1su64mfjv6zfjp891lfy/streak-2.png?rlkey=dkj7qc5gutprfo2jv17mp53gb&raw=1"
      >
        <HeaderContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isDesktop ? 'xl' : isTablet ? '3xl' : '4xl'}
            margin={
              isMobile
                ? `${Spaces.xl} 0 ${Spaces.md} 0`
                : `0 0 ${Spaces['2xl']}`
            }
          >
            About Us
          </Typography>
          <Typography variant="title" as="span" size={isDesktop ? 'lg' : '2xl'}>
            Mission: &nbsp;
          </Typography>
          <Typography as="p" size={isDesktop ? 'md' : 'lg'} lineHeight="2">
            <NonBreakingSpan>With open doors and minds</NonBreakingSpan>
            <br />
            <NonBreakingSpan>
              We provide space and opportunities
            </NonBreakingSpan>{' '}
            <br />
            <NonBreakingSpan>Enabling Golden Eagles to soar</NonBreakingSpan>
          </Typography>
          <Typography
            variant="title"
            as="span"
            margin={`${Spaces.lg} 0 0 0`}
            size={isDesktop ? 'lg' : '2xl'}
          >
            Vision: &nbsp;
          </Typography>
          <Typography as="p" size={isDesktop ? 'md' : 'lg'}>
            To become Cal State LA&apos;s hub for connection and growth
          </Typography>
          <ButtonContainer>
            <Button variant="black" href="/about/org-chart-5-31-23.jpg">
              U-SU Organizational Chart
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              U-SU History
            </Button>
          </ButtonContainer>
        </HeaderContainer>
      </SideImageHeader>
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
      <GenericModal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <HistoryContainer>
          <Typography variant="title">U-SU History</Typography>
          <video width="100%" controls>
            <source src="/about/usu-opening.mp4" type="video/mp4" />
          </video>
        </HistoryContainer>
      </GenericModal>
    </Page>
  );
}
