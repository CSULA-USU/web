import { HeaderWithVideo, Page } from 'modules';
import Head from 'next/head';
import { Button, Card, FluidContainer, Typography, Image } from 'components';
import { Spaces, media } from 'theme';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import OPSHeroVideo from '/videos/u-krew-header-video.mp4?thumbnailTime=0';
import MobileOPSHeroVideo from '/videos/mobile-u-krew-header-video.mp4?thumbnailTime=0';

const PDFDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: ${Spaces.md};
  > * {
    margin-bottom: ${Spaces.md};
  }
`;
const Title = styled.div`
  width: 200px;
`;
const Description = styled.div`
  width: 800px;
`;

const TextCenter = styled.div`
  text-align: center;
`;
const ImageContainer = styled.div`
  height: 10%;
`;

const HeroDescriptionContainer = styled.div`
  max-width: 680px;
  ${media('mobile')(`
    margin-top: ${Spaces.lg};
  `)};
`;

const HeroButtonContainer = styled.div`
  display: flex;
  gap: ${Spaces.lg};
  margin-top: ${Spaces.md};
  ${media('mobile')(`
    flex-direction: column;
    margin: ${Spaces.lg} ${Spaces['xl']};
  `)};
`;

const OperationsPDFDescriptions = (props: any) => {
  return (
    <PDFDescriptionContainer>
      <Title>
        <Typography variant="subheader" weight="700" as="h3">
          {props.title}
        </Typography>
      </Title>
      <Description>
        <Typography>{props.description}</Typography>
      </Description>
      <Button href={props.href} variant="black">
        PDF
      </Button>
    </PDFDescriptionContainer>
  );
};

const buttons = [
  {
    text: 'Events Request Form',
    href: 'https://form.jotform.com/221578153228053',
  },
  { text: 'Meeting Rooms', href: '/operations/meeting-rooms' },
];

const cards = [
  {
    title: 'Building Maintenance',
    children:
      'Is responsible for the efficient upkeep of the University-Student Union including all equipment and furnishings in and around the facility. Additionally, this department addresses any electrical, plumbing, HVAC, carpentry, landscaping, and beautification needs of the building.',
    iconSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-maintenance.jpg',
    iconAlt: 'Fixing the ceiling light',
  },
  {
    title: 'Building Services',
    children:
      'Supports the needs of students, faculty and staff who utilize space in and around the U-SU by providing dependable set-ups for events, meetings, and programs.',
    iconSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-services.jpg',
    iconAlt: 'Setting up a canopy',
    iconWidth: '160px',
  },
  {
    title: 'Custodial Services',
    children:
      'Is responsible for the general cleanliness of all areas in and surrounding the Union facility including all interior/exterior furnishings and addresses all concerns related to general housekeeping.',
    iconSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/custodial-services.jpg',
    iconAlt: 'Cleaning the windows',
    iconWidth: '100px',
  },
  {
    title: 'Media Services',
    children:
      'Assists in supporting the increased technical needs of the building and addresses a wide variety of programs and events that occur inside and outside of the U-SU by providing knowledgeable technical and theatrical support.',
    iconSrc:
      'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/media-services.jpg',
    iconAlt: 'Adjusting stage lighting',
    iconWidth: '150px',
  },
  {
    title: 'Info and Event Services',
    children:
      'Is responsible for processing reservation requests and assisting sponsors with identifying the most efficient use of designated and programmable spaces of the University-Student Union.',
    iconSrc: '/departments/operations/images/information-event-services.jpg',
    iconAlt: 'Handing a student paper an informative program',
    iconWidth: '150px',
  },
];

const pdfDescriptionCards = [
  {
    title: 'Meeting Room Manual Request Form',
    description:
      'Manual form to request and reserve a room and media services from the University-Student Union.',
    href: 'https://www.dropbox.com/s/tepxskcnm4cie18/meeting-room-request.pdf?raw=1',
  },
  {
    title: 'Media Equipment Rental Chart',
    description: 'CSULA University-Student Union media equipment rental fees.',
    href: 'https://www.dropbox.com/s/3ksbraj09bi07la/Media-Equipment-Fees-Chart.pdf?raw=1',
  },
  {
    title: 'MMRS Policies',
    description:
      'The Mind Matters Relaxation Station is designated space to support restorative wellness. The intended use is for brief napping in a semi-quiet environment. Access to the room is limited to Cal State LA enrolled students only.',
    href: 'https://www.dropbox.com/s/iskp1a8hn7uj5qq/MMRS-Policies.pdf?raw=1',
  },
  {
    title: 'Meeting Space Rental Fees and Capacity Chart',
    description:
      'CSULA University-Student Union meeting space rental fees and capacity.',
    href: 'https://www.dropbox.com/scl/fi/ad7ijda4l5i3a8joyf317/meeting-space-capacity-chart.pdf?rlkey=sphutjmwuecebqa7nbl088p6n&st=k5ykis0k&raw=1',
  },
  {
    title: 'Reservation Policies and Procedures',
    description:
      'Reservation policies and procedures go over guidelines of how the scheduling of U-SU facilities, equipment, sign-up process, and payments are arranged.',
    href: 'https://www.dropbox.com/scl/fi/ap2nhg75x69zf4hrkriff/POLICIES-PROCEDURES-Updated-07.25.docx?rlkey=qqz8pa269bm3e1yc14vdsgwwo&st=n456ua3l&dl=1',
  },
];

export default function Operations() {
  const { returnByBreakpoint } = useBreakpoint();
  const { isMini, isMobile, isDesktop } = useBreakpoint();
  const cardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 32px)',
    widescreen: 'calc(33.33% - 32px)',
  });
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Operations</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Operations Department at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Reserve meeting rooms and event spaces at Cal State LA U-SU. Explore our facilities, media services, rental fees, and reservation policies for students and faculty."
          key="description"
        />
        <meta
          name="keywords"
          content="The University Student Union, Cal State LA, U-SU Operations, Meeting Rooms, Event Reservations, Media Services, Room Rentals, Alhambra Room, Los Angeles Room, San Gabriel Room, MMRS Policies"
          key="keywords"
        />

        {/* Open Graph / Social Media - Deduplication Keys Applied */}
        <meta
          property="og:title"
          content="Operations & Reservations | Cal State LA University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="The hub for campus event support, facility maintenance, and meeting room reservations at the Cal State LA U-SU."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/operations"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://www.calstatelausu.org/departments/operations/images/building-maintenance.jpg"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="U-SU Operations and Facilities at Cal State LA"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="U-SU Operations & Reservations | Cal State LA"
        />
        <meta
          name="twitter:description"
          content="Plan your next meeting or event at the University-Student Union. Access rental forms, capacity charts, and equipment fees."
        />
        <meta
          name="twitter:image"
          content="https://www.calstatelausu.org/departments/operations/images/building-maintenance.jpg"
        />

        <link rel="canonical" href="https://www.calstatelausu.org/operations" />

        {/* Structured Data for Google/AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'U-SU Operations & Reservations',
              url: 'https://www.calstatelausu.org/operations',
              description:
                'The Operations Team consists of five divisions: building maintenance, building services, custodial services, media services, and union meeting and event services.',
              telephone: '+13233432465',
              email: 'jortiz@cslanet.calstatela.edu',
              provider: {
                '@type': 'NonprofitOrganization',
                name: 'University-Student Union at Cal State LA',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'U-SU Facilities',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Meeting Room Rentals',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Media Equipment Rental',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Event Support Services',
                    },
                  },
                ],
              },
            }),
          }}
        />
      </Head>
      <HeaderWithVideo
        desktopSrc={OPSHeroVideo}
        mobileSrc={MobileOPSHeroVideo}
        thumbnail="https://image.mux.com/5006jkrbON0102GtWswHvULvNts6fBCS1HngiHL011spHuQ/thumbnail.png?time=23&fit_mode=preserve"
      >
        <FluidContainer flex flexDirection="column">
          <Typography
            variant="titleLargest"
            color="white"
            size={isDesktop ? (isMini ? 'xl' : '3xl') : '6xl'}
            lineHeight={isMini ? '1' : '1.2'}
            as="h1"
          >
            Operations & Reservations
          </Typography>
          <HeroDescriptionContainer>
            <Typography
              variant="span"
              color="white"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight={isDesktop ? '1' : '1.5'}
            >
              The Operations Team consists of five divisions: building
              maintenance, building services, custodial services, media
              services, and union meeting and event services.
            </Typography>
          </HeroDescriptionContainer>
          <HeroButtonContainer>
            {buttons.map((button) => (
              <Button key={button.href} variant="grey" href={button.href}>
                {button.text}
              </Button>
            ))}
          </HeroButtonContainer>
        </FluidContainer>
      </HeaderWithVideo>
      <FluidContainer justifyContent="center">
        <TextCenter>
          <Typography variant="title" as="h2">
            Divisions
          </Typography>
        </TextCenter>
        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="center"
          padding="18px 0px"
        >
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              title={props.title}
              width={cardWidth}
              minHeight="280px"
            >
              <ImageContainer>
                <Image
                  src={props.iconSrc}
                  alt={props.iconAlt}
                  width="100%"
                  marginBottom={Spaces.sm}
                />
              </ImageContainer>
              {props.children}
            </Card>
          ))}
        </FluidContainer>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="greyLightest"
        justifyContent="center"
      >
        <TextCenter>
          <Typography variant="title" as="h2">
            Additional Information
          </Typography>
        </TextCenter>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        {pdfDescriptionCards.map((props) => (
          <FluidContainer key={`${props.title}`}>
            <OperationsPDFDescriptions {...props} />
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
