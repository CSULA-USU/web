import styled from 'styled-components';
import Head from 'next/head';
import { Spaces } from 'theme';
import { CallToAction, Page, Header } from 'modules';
import { FluidContainer, Typography, Button, Card, Image } from 'components';
import { useBreakpoint } from 'hooks';

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

const TextCenter = styled.div`
  text-align: center;
`;

const cards = [
  {
    title: 'Sample Constitution',
    children:
      'This document is intended to serve as the model to follow when writing the constitution of your organization.',
    linkText: 'View PDF',
    href: 'https://www.dropbox.com/s/wiggbjzvx0epz9l/csi-sample-constitution.pdf?dl=0',
  },
  {
    title: 'ODC Info and Videos',
    children:
      'The online Organizational Development Course was designed to provide you and your organization with on-demand and on-the-go training and access to campus policies and procedures pertinent to student organizations.',
    linkText: 'Learn More',
    href: 'https://calstatela.presence.io/experiences',
  },
  {
    title: 'Club Banking Forms',
    children:
      'Be on the lookout for flyers, banners, or postcards that advertise student group meetings and events. Attending these activities is a great and easy way to start your on-campus involvement.',
    linkText: 'See Forms',
    href: '/csi/forms',
  },
  {
    title: 'Officer Change Form',
    children:
      "To begin the organization officer transition, the organization's President must first complete the Organization Officer Change Form.",
    linkText: 'See Form',
    href: 'https://forms.office.com/Pages/ResponsePage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3Ss0cdfPUjJEkZSkEGEKuVJUN1M1U1JGSVAzRkFSVEs4V0RQU1daTUZTTCQlQCN0PWcu',
  },
];

const orgsCards = [
  {
    title: 'Organization Registration Form',
    href: 'https://calstatela.presence.io/form/event-registration',
    linkText: 'View Form',
  },
  {
    title: 'Officer & Advisor Form',
    href: 'https://calstatela.presence.io/form/student-organization-officer-advisor-acknowledgement-form',
    linkText: 'View Form',
  },
  {
    title: 'Organizational Development',
    href: 'https://calstatela.presence.io/form/apply-for-opportunity',
    linkText: 'View Form',
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

const buttons = [
  { text: 'Resources', href: '#resources' },
  { text: 'Start Your Own', href: '#start' },
];

export default function StudentOrgs() {
  const { isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU Recognized Student Organizations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement Student Organizations"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, Presence, Sample Constitution, ODC Info and Videos, Club Banking Forms, Officer Change Form, clubs, organization"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Recognized Student Organizations" buttons={buttons}>
        Cal State LA is home to over 120 recognized student organizations that
        host events and meetings to engage students in community building,
        entertainment, and professional development.
      </Header>
      <CallToAction
        href="https://www.calstatela.edu/studentservices/student-organization-handbook"
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
      <FluidContainer flex flexDirection={isTablet ? 'column' : 'row'}>
        <FluidContainer flex flexDirection="column">
          {isTablet ? (
            <TextCenter>
              <Typography margin="auto 24px 24px" variant="title" as="h2">
                Presence
              </Typography>
            </TextCenter>
          ) : (
            <Typography margin="auto 24px 24px" variant="title" as="h2">
              Presence
            </Typography>
          )}
          <Image
            margin="auto"
            size="100%"
            src="/departments/csi/presence-screen.png"
            alt="screenshot of presence homepage"
            borderRadius="12px"
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

      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="primary"
      >
        <TextCenter id="resources">
          <Typography margin="auto" variant="title" as="h2">
            Student Organization Resources
          </Typography>
        </TextCenter>
        <FluidContainer flex justifyContent="space-between" flexWrap="wrap">
          {cards.map((props) => (
            <Card
              rounded
              hoverable
              key={`${props.title}`}
              {...props}
              width={
                !isDesktop
                  ? 'calc(25% - 24px)'
                  : !isTablet
                  ? 'calc(50% - 24px)'
                  : '100%'
              }
              minHeight="280px"
              margin={`${Spaces.sm} 0`}
            ></Card>
          ))}
        </FluidContainer>
        <TextCenter>
          <Typography as="p">
            These organizations provide limitless opportunities to achieve an
            active role on campus and to pursue individual interests.
            <br />
            Learn more about our recognized student organizations and their
            events.
          </Typography>
        </TextCenter>
        <Button
          margin="24px"
          variant="black"
          href="https://calstatela.presence.io/organizations"
        >
          Learn More
        </Button>
      </FluidContainer>

      <FluidContainer flex flexDirection="column">
        <TextCenter id="start">
          <Typography margin="auto" variant="title" as="h2">
            Start Your Own Organization
          </Typography>
        </TextCenter>
        <FluidContainer flex justifyContent="space-between" flexWrap="wrap">
          {orgsCards.map((props) => (
            <Card
              topBorder
              key={`${props.title}`}
              {...props}
              width={!isDesktop ? 'calc(33.33% - 24px)' : '100%'}
              minHeight="240px"
              margin={`${Spaces.sm} 0`}
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
          Read up on the Student Organization Conduct Code <br />
          or report an incident related to student organizations
        </Typography>
      </CallToAction>
    </Page>
  );
}
