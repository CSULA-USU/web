import styled from 'styled-components';
import Head from 'next/head';
import { Colors, Spaces } from 'theme';
import { CallToAction, Page, Header } from 'modules';
import { FluidContainer, Typography, Button, Card, Image } from 'components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
`;
const MoreInformationContainer = styled.div`
  background-color: ${Colors.primary};
  height: 705px;
  margin: 0 auto;
`;
const MoreInformationTextContainer = styled.div`
  text-align: center;
  width: 762px;
  margin: auto;
`;
const PresenceInfoContainer = styled.div`
  margin-top: ${Spaces['2xl']};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const OrgsCategoriesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const cards = [
  {
    title: 'Sample Constitution',
    children:
      'This document is intended to serve as the model to follow when writing the constitution of your organization.',
  },
  {
    title: 'Presence Trainings',
    children:
      'The online Organizational Development Course was designed to provide you and your organization with on-demand and on-the-go training and access to campus policies and procedures pertinent to student organizations.',
  },
  {
    title: 'Club Banking Forms',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
  },
];

const orgsCards = [
  {
    title: 'Complete The Following Forms Online',
    href: '#',
    linkText: 'View Forms',
  },
  {
    title: "Submit Your Organization's Constitution and Bylaws",
    href: '#',
    linkText: 'View Forms',
  },
  {
    title: 'Attend The Sexual Violence Prevention and Resources Training',
    href: '#',
    linkText: 'View Forms',
  },
];
const orgsCategoriesCards = [
  {
    title: 'Explore Student Organizations',
    href: 'https://calstatela.presence.io/',
    linkText: 'Visit Presence',
    children:
      'Find a recognized student organization on Presence, Cal State LA’s hub for student organizations and events. ',
  },
];

export default function StudentOrgs() {
  const buttons = [
    { text: 'Get Involved', href: '#' },
    { text: 'Start Your Own', href: '#' },
  ];
  return (
    <Page>
      <Head>
        <title>U-SU Student Organizations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="csula cal state la student union center for student involvement csi u-su university-student"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer>
        <HeaderContainer>
          <Typography variant="titleSmall">University-Student Union</Typography>
          <Header title="Recognized Student Organizations" buttons={buttons}>
            Cal State LA is home to over 120 recognized student organizations
            that host events and meetings to engage students in community
            building, entertainment, and professional development.
          </Header>
        </HeaderContainer>
      </FluidContainer>
      <CallToAction
        href="https://www.calstatela.edu/studentservices/student-organization-recognition"
        buttonText="Learn More"
        text="Visit the Student Organization Handbook"
      >
        <Typography as="h2" variant="label">
          Can&apos;t find an organization that interests you? Start your own!
          Read up on the policies and procedures governing student
          organizations, information about recognition processes for new and
          returning orgs, and conduct procedures.
        </Typography>
      </CallToAction>
      <FluidContainer flex>
        <FluidContainer flex flexDirection="column">
          <Typography margin="auto 24px 24px" variant="title">
            Presence
          </Typography>
          <Image
            margin="auto"
            size="100%"
            src="/departments/csi/presence-screen.png"
            alt="screenshot of presence homepage"
          />
        </FluidContainer>
        <PresenceInfoContainer>
          <OrgsCategoriesCardsContainer>
            {orgsCategoriesCards.map((props) => (
              <Card
                margin={`${Spaces.md} 0`}
                key={`${props.title}`}
                {...props}
              ></Card>
            ))}
          </OrgsCategoriesCardsContainer>
        </PresenceInfoContainer>
      </FluidContainer>
      <MoreInformationContainer>
        <FluidContainer flex flexDirection="column" alignItems="center">
          <Typography margin="auto" variant="title">
            Student Organization Resources
          </Typography>
          <FluidContainer flex justifyContent="space-between">
            {cards.map((props) => (
              <Card
                rounded
                hoverable
                key={`${props.title}`}
                {...props}
                width="calc(33.33% - 24px)"
                minHeight="280px"
              ></Card>
            ))}
          </FluidContainer>
          <MoreInformationTextContainer>
            <Typography>
              These organizations provide limitless opportunities to achieve an
              active role on campus and to pursue individual interests. Learn
              more about our recognized student organizations and their events.
            </Typography>
          </MoreInformationTextContainer>
          <Button margin="24px" variant="black">
            Learn More
          </Button>
        </FluidContainer>
      </MoreInformationContainer>
      <FluidContainer flex flexDirection="column">
        <Typography margin="auto" variant="title">
          Start Your Own Organization
        </Typography>
        <FluidContainer flex justifyContent="space-between">
          {orgsCards.map((props) => (
            <Card
              topBorder
              key={`${props.title}`}
              {...props}
              width="calc(33.33% - 24px)"
              minHeight="240px"
            ></Card>
          ))}
        </FluidContainer>
      </FluidContainer>
      <CallToAction
        href="https://www.calstatela.edu/deanofstudents/cal-state-la-standards-conduct-and-disciplinary-procedures-university-recognized"
        buttonText="Learn More"
        buttonVariantColor="primary"
        text="Conduct and Disciplinary Procedures"
        backgroundColorProp="black"
        textColorProp="white"
      >
        <Typography as="h2" variant="label" color="white">
          Learn more about the Student Organization Conduct code <br />
          or report an incident related to student organizations
        </Typography>
      </CallToAction>
    </Page>
  );
}
