import Head from 'next/head';
import {
  EventHeader,
  UpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
  CallToActionImages,
} from 'modules';
import { NonBreakingSpan } from 'components';
import { useRecoilValue } from 'recoil';
import { eventListState } from 'atoms';
import { useBreakpoint } from 'hooks';

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
    margin: '5px 0 0',
  },
  {
    src: '/departments/operations/images/media-services.jpg',
    alt: 'medis services',
    width: '275',
    margin: '5px 0 0',
  },
];

export default function Home() {
  const events = useRecoilValue(eventListState);
  const { isMobile } = useBreakpoint();

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
      <BoardOfDirectorsCTA />
    </Page>
  );
}
