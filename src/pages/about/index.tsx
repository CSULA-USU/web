import Head from 'next/head';
import { Page, Header, GenericModal } from 'modules';
import { FluidContainer, Typography, Card, Image } from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { useState } from 'react';
import { media } from 'theme';
const Title = styled.div`
  text-align: center;
`;

const HistoryContainer = styled.div`
  ${media('mobile')(`width:300px;`)}
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
  const { isDesktop } = useBreakpoint();
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

      <Header
        title="About Us"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
        buttons={[
          {
            text: 'U-SU Organizational Chart',
            href: '/about/org-chart.jpg',
          },
          {
            text: 'U-SU History',
            href: '#',
            handleClick: () => {
              setIsOpen(true);
            },
          },
        ]}
      >
        <Image
          src="/about/calstatela-hero.jpeg"
          alt="student union"
          width={isDesktop ? '75%' : '50%'}
          borderRadius="12px"
        />
      </Header>
      <FluidContainer flex flexDirection="column">
        <Typography as="p" variant="cta" size="lg">
          <Typography variant="title" as="span" color="gold">
            Mission:
          </Typography>
          <br />
          With open doors and minds, we provide space and opportunities enabling
          Golden Eagles to soar.
        </Typography>
        <br />
        <Typography as="p" variant="cta" size="lg">
          <Typography variant="title" as="span" color="gold">
            Vision:
          </Typography>
          <br />
          To become Cal State LA&apos;s hub for connection and growth.
        </Typography>
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
