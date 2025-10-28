import styled from 'styled-components';
import Head from 'next/head';
import { GoChecklist } from 'react-icons/go';
import { ImCalendar, ImCheckmark, ImUsers } from 'react-icons/im';
import { Colors, Spaces } from 'theme';
import { CallToAction, Page, Header } from 'modules';
import { FluidContainer, Typography, Button, Card, Image } from 'components';
import { useBreakpoint } from 'hooks';

const CardDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #2d3748;
  font-size: 0.875rem;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 0.95rem;
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  @media (min-width: 640px) {
    width: 48px;
    height: 48px;
  }
`;

const OrgsCategoriesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PresenceInfoContainer = styled.div`
  margin-top: ${Spaces['2xl']};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReservationCards = styled.article`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
  }
  
  &:focus-within {
    outline: 3px solid{Colors.primary}
    outline-offset: 4px;
  }
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
    href: 'https://www.dropbox.com/scl/fi/t7gcv0qxjarwasfjise7j/csi-sample-constitution.pdf?rlkey=lpjuxkhuofjbvklxb904n9xjm&st=ktobc3oq&raw=1',
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
    href: 'https://asicalstatela.org/student-org-banking',
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
    linkText: 'Visit',
    children:
      'Find a recognized student organization on The Nest, Cal State LA’s hub for student organizations and events. ',
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
        <title>U&ndash;SU Recognized Student Organizations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement Student Organizations"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, Presence, Sample Constitution, ODC Info and Videos, Club Banking Forms, Officer Change Form, clubs, organization, orgs"
          key="keywords"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
          key="description"
        />
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
        <Typography variant="label">
          Can&apos;t find an organization that interests you? Start your own!
          Read up on the policies and procedures governing student
          organizations, information about recognition processes for new and
          returning orgs, and conduct procedures.
        </Typography>
      </CallToAction>
      <FluidContainer flex flexDirection="column">
        {isTablet ? (
          <TextCenter>
            <Typography margin="auto 24px 24px" variant="title" as="h2">
              The Nest
            </Typography>
          </TextCenter>
        ) : (
          <TextCenter>
            <Typography margin="auto 24px 24px" variant="title" as="h2">
              The Nest
            </Typography>
          </TextCenter>
        )}
        <FluidContainer
          flex
          flexDirection={isTablet ? 'column' : 'row'}
          gap={Spaces.lg}
          padding="0"
          flexWrap={isTablet ? 'wrap' : 'nowrap'}
        >
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/csi/student-orgs/nest-preview.webp"
            alt="screenshot of The Nest homepage"
            borderRadius="12px"
            width="100%"
            maxWidth="800px"
            height="auto"
          />
          <PresenceInfoContainer>
            <OrgsCategoriesCardsContainer>
              {orgsCategoriesCards.map((props) => (
                <Card
                  margin={`${Spaces.md} 0`}
                  key={`${props.title}`}
                  {...props}
                />
              ))}
            </OrgsCategoriesCardsContainer>
          </PresenceInfoContainer>
        </FluidContainer>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundColor="greyLightest"
      >
        <TextCenter id="meeting-spaces">
          <Typography margin="auto" variant="title" as="h2">
            Reserve Your Perfect Meeting/Event Space
          </Typography>
        </TextCenter>
        <TextCenter>
          <Typography margin={`${Spaces.md} auto 0 0`} size="md">
            Streamlined room reservations for student organizations. Book your
            space in minutes and focus on what matters most.
          </Typography>
        </TextCenter>
        <FluidContainer flex justifyContent="center" gap={Spaces.md}>
          <Button href="/operations/meeting-rooms" variant="black">
            Reserve a Room
          </Button>
          <Button
            href="https://www.dropbox.com/scl/fi/ap2nhg75x69zf4hrkriff/POLICIES-PROCEDURES-Updated-07.25.docx?rlkey=qqz8pa269bm3e1yc14vdsgwwo&st=n456ua3l&dl=1"
            variant="outline"
          >
            Reservation Policies
          </Button>
        </FluidContainer>
        <CardsGrid role="region" aria-label="Meeting types">
          <ReservationCards>
            <CardHeader>
              <IconWrapper $color={Colors.grey} aria-hidden="true">
                <ImCalendar size={24} />
              </IconWrapper>
              <CardTitle>Recurring Meetings</CardTitle>
            </CardHeader>
            <CardDescription>
              Perfect for recurring weekly/bi&ndash;weekly organizational
              meetings. Submit request one month before ODC for Fall or Spring
              semester.
            </CardDescription>
            <FeatureList aria-label="Weekly/Bi&ndash;Weekly meeting features">
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.grey} aria-hidden="true" />
                <span>Same day, time, and location, based on availability</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.grey} aria-hidden="true" />
                <span>Must be held in one meeting space only</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.grey} aria-hidden="true" />
                <span>Cannot exceed two (2) hours in duration</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.grey} aria-hidden="true" />
                <span>Cannot be co&ndash;sponsored events</span>
              </FeatureItem>
            </FeatureList>
          </ReservationCards>

          <ReservationCards>
            <CardHeader>
              <IconWrapper $color={Colors.gold} aria-hidden="true">
                <ImUsers size={24} />
              </IconWrapper>
              <CardTitle>One&ndash;Time Meetings</CardTitle>
            </CardHeader>
            <CardDescription>
              Flexible one&ndash;time meetings for your organization. Submit
              requests no more than 15 business days in advance.
            </CardDescription>
            <FeatureList aria-label="General meeting features">
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.gold} aria-hidden="true" />
                <span>Single U&ndash;SU meeting room only</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.gold} aria-hidden="true" />
                <span>Maximum 2 hours duration</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.gold} aria-hidden="true" />
                <span>Cannot be co&ndash;sponsored events</span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.gold} aria-hidden="true" />
                <span>
                  Food allowed. Doesn&apos;t count toward complimentary
                  reservations
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark size={20} color={Colors.gold} aria-hidden="true" />
                <span>
                  Submit minimum 15 business days in advance before meeting date
                </span>
              </FeatureItem>
            </FeatureList>
          </ReservationCards>
          <ReservationCards>
            <CardHeader>
              <IconWrapper $color={Colors.primary} aria-hidden="true">
                <ImUsers size={24} />
              </IconWrapper>
              <CardTitle>Event Reservations</CardTitle>
            </CardHeader>
            <CardDescription>
              Reservations are applicable for single use rooms and
              one&ndash;time single events. Based on availability.
            </CardDescription>
            <FeatureList aria-label="event reservations features">
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.primary}
                  aria-hidden="true"
                />
                <span>
                  Maximum of eight (8) complimentary event reservations per
                  semester.
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.primary}
                  aria-hidden="true"
                />
                <span>
                  One&ndash;time single events are allowed up to a max of four
                  (4) meeting rooms and cannot exceed four (4) hours in
                  duration.
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.primary}
                  aria-hidden="true"
                />
                <span>
                  If the one&ndash;time single event occurs on two (2)
                  consecutive days, then the two (2) days are considered as two
                  (2) event reservations.
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.primary}
                  aria-hidden="true"
                />
                <span>Cannot be carried over to the next semester.</span>
              </FeatureItem>
            </FeatureList>
          </ReservationCards>

          <ReservationCards>
            <CardHeader>
              <IconWrapper $color={Colors.black} aria-hidden="true">
                <GoChecklist size={24} />
              </IconWrapper>
              <CardTitle>Eligibility Requirements</CardTitle>
            </CardHeader>
            <FeatureList aria-label="General meeting features">
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.black}
                  aria-hidden="true"
                />
                <span>
                  Organization must be in good standing with the university
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.black}
                  aria-hidden="true"
                />
                <span>
                  Only designated members on Officer Information Form can make
                  reservations
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.black}
                  aria-hidden="true"
                />
                <span>
                  Officially recognized through the Center for Student
                  Involvement
                </span>
              </FeatureItem>
              <FeatureItem>
                <ImCheckmark
                  size={20}
                  color={Colors.black}
                  aria-hidden="true"
                />
                <span>
                  Completed Event Registration Form required for all events and
                  meetings
                </span>
              </FeatureItem>
            </FeatureList>
          </ReservationCards>
        </CardsGrid>
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
            />
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
            />
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
        <Typography variant="label" color="white">
          Read up on the Student Organization Conduct Code <br />
          or report an incident related to student organizations
        </Typography>
      </CallToAction>
    </Page>
  );
}
