import Head from 'next/head';
import {
  EventHeader,
  UpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
} from 'modules';
import {
  NonBreakingSpan,
  Typography,
  FluidContainer,
  Button,
  Image,
} from 'components';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';

export default function Home() {
  const events = useRecoilValue(eventListState);
  const { isMobile, isDesktop } = useBreakpoint();
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EventHeader
        title={
          <>
            {isMobile ? (
              <>
                Welcome to <NonBreakingSpan>the U-SU!</NonBreakingSpan>
              </>
            ) : (
              <>
                Welcome to the{' '}
                <NonBreakingSpan>University-Student Union</NonBreakingSpan>
              </>
            )}
          </>
        }
        featuredEvent={events[0]}
      />
      <UpcomingEvents events={events} />
      <FluidContainer flex backgroundColor="primary" padding="0">
        <FluidContainer>
          <Typography as="h2" variant="titleLarge" lineHeight="1">
            Join the
            <br />
            <strong>U-Krew!</strong>
          </Typography>
          <Typography as="p" margin={`${Spaces.md} 0`}>
            Catalyze your professional development and build your network by
            becoming a valued member of the U-SU.
          </Typography>
          <Button href="/employment" variant="black">
            View Opportunities
          </Button>
        </FluidContainer>
        {!isDesktop && (
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="space-evenly"
            backgroundColor="white"
          >
            <Image
              src="/departments/operations/images/building-maintenance.jpg"
              alt="building-maintenance"
              width="275px"
              margin="6px"
            />
            <Image
              src="/departments/operations/images/information-event-services.jpg"
              alt="building-maintenance"
              width="275px"
              margin="6px"
            />
            <Image
              src="/departments/operations/images/building-services.jpg"
              alt="building-maintenance"
              width="275px"
              margin="6px"
            />
            <Image
              src="/departments/operations/images/media-services.jpg"
              alt="building-maintenance"
              width="275px"
              margin="6px"
            />
          </FluidContainer>
        )}
      </FluidContainer>
      <BoardOfDirectorsCTA />
    </Page>
  );
}
