import Head from 'next/head';
import { Page, Header } from 'modules';
import { FluidContainer, Typography, Card, Image } from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';

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
const buttons = [
  {
    text: 'U-SU Organizational Chart',
    href: '/org-chart.jpg',
  },
  {
    text: 'U-SU History',
    href: '#',
  },
];
export default function About() {
  const { isDesktop } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>University-Student Union About</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="About Us"
        backgroundImage="subtle-background-1.jpg"
        buttons={buttons}
      >
        <Image src="/about.png" alt="student union" width="100%" />
        <Typography>
          <Typography variant="labelTitle" as="span">
            Mission: &nbsp;
          </Typography>
          With open doors and minds, we provide space and opportunities enabling
          Golden Eagles to soar.
        </Typography>
        <Typography>
          <Typography variant="labelTitle" as="span">
            Vision: &nbsp;
          </Typography>
          To become Cal State LA&apos;s hub for connection and growth.
        </Typography>
      </Header>
      <Title>
        <Typography variant="title" margin="48px 0 0 0 ">
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
    </Page>
  );
}
