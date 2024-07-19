import Head from 'next/head';
import {
  EventHeader,
  ModUpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
  CallToActionImages,
} from 'modules';
import {
  Button,
  FluidContainer,
  Image,
  NonBreakingSpan,
  Typography,
} from 'components';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';

const images = [
  {
    src: '/departments/operations/images/building-maintenance.jpg',
    alt: 'building-maintenance',
    width: '275',
    margin: '0',
  },
  {
    src: '/departments/operations/images/information-event-services.jpg',
    alt: 'information event services',
    width: '275',
    margin: '0',
  },
  {
    src: '/departments/operations/images/building-services.jpg',
    alt: 'building services',
    width: '275',
    margin: '0',
  },
  {
    src: '/departments/operations/images/media-services.jpg',
    alt: 'media services',
    width: '275',
    margin: '0',
  },
];

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

export default function Home() {
  const events = useRecoilValue(eventListState);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, CCC, CSI, ASIPRCS, Graffix, Operations, Recreation"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <meta
          name="image"
          property="og:image"
          content="/about/calstatela-hero.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {events.length > 0 ? (
        <>
          <EventHeader
            subheaderText={
              isMobile
                ? 'California State, Los Angeles'
                : 'California State University, Los Angeles'
            }
            title={isMobile ? 'U-SU' : 'University-Student Union'}
            featuredEvent={events[0]}
          />
          {/* Toggle the line below if there is a promotion. */}
          {/* <BoardOfDirectorsCTAPromotion /> */}
          {events.length > 1 ? <ModUpcomingEvents events={events} /> : null}
        </>
      ) : (
        <>
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
                  <FluidContainer
                    flex
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      alt="student union"
                      src="/about/calstatela-hero.jpeg"
                      width={0}
                      height={0}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </FluidContainer>
                  <ButtonContainer>
                    <Button
                      variant="black"
                      href="https://www.dropbox.com/scl/fi/g49qrggbfireevbvysk8j/06.13.24_Org-Chart.pdf?rlkey=tx5udmki1dxf2n6vnfsz54fzh&e=1&dl=0"
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
                      href="https://www.dropbox.com/scl/fi/g49qrggbfireevbvysk8j/06.13.24_Org-Chart.pdf?rlkey=tx5udmki1dxf2n6vnfsz54fzh&e=1&dl=0"
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
                enabling Golden Eagles to soar. Our vision is to become Cal
                State LA&apos;s hub for connection and growth.
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
                The University-Student Union, or U-SU for short, is a great
                one-stop location for students eager to learn about what&apos;s
                happening on campus, collect student discounts or get involved.
                It is the headquarters for the Alumni Center, student government
                (Associated Students Incorporated) and campus organizations and
                clubs.
              </Typography>
            </FluidContainer>
          </FluidContainer>
        </>
      )}
      <CallToActionImages
        title={
          <>
            Join the
            <br />
            <strong>U-Krew!</strong>
          </>
        }
        buttonHref="/employment"
        buttonText="View Opportunities"
        images={images}
      >
        Catalyze your professional development and build your network by
        becoming a valued member of the <NonBreakingSpan>U-SU</NonBreakingSpan>
      </CallToActionImages>
      {/* Toggle the line below if there is a promotion. */}
      <FluidContainer>
        <BoardOfDirectorsCTA />
      </FluidContainer>
    </Page>
  );
}
