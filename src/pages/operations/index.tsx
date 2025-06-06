import { Page } from 'modules';
import Head from 'next/head';
import {
  Button,
  Card,
  FluidContainer,
  Typography,
  Image,
  NonBreakingSpan,
} from 'components';
import { Spaces, Colors } from 'theme';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';

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

const HeaderContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  box-shadow: none;
  background-color: ${Colors.black};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-image: url('/departments/operations/videos/ops-loop.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(4px);
    z-index: 1;
  }
`;

const InnerHeaderContainer = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const InnerButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${Spaces.sm};
`;

const MobileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${Spaces.md};
  background-color: ${Colors.black};
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
    title: 'Reservation Policies and Procedures (with Covid)',
    description:
      'Reservation policies and procedures go over guidelines of how the scheduling of U-SU facilities, equipment, sign-up process, and payments are arranged.',
    href: 'https://www.dropbox.com/s/12vg3pe8ahf6jay/POLICIES-PROCEDURES-WITH-COVID-2021.pdf?raw=1',
  },
];

export default function Operations() {
  const { returnByBreakpoint } = useBreakpoint();
  const { isMobile } = useBreakpoint();
  const cardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 32px)',
    widescreen: 'calc(33.33% - 32px)',
  });
  return (
    <Page>
      <Head>
        <title>U-SU Operations</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Meeting Rooms, Alhambra Room, San Gabriel Room, Los Angeles Room, Theater Room, Boardroom North, Boardroom South, Attendees, Members, Off Campus Vendors, Food, Operations, Reservations, Building Maintenance, Building Services, Custodial Services, Media Services, Media Equipment Rental Chart, MMRS Policies, MMRS, Meeting Space Rental Fees, Capacity Charts, COVID"
          key="keywords"
        />
      </Head>
      {isMobile ? (
        <MobileHeaderContainer>
          <Typography
            variant="pageHeader"
            color="white"
            as="h1"
            margin={`${Spaces.md} 0`}
            size={isMobile ? 'xl' : '4xl'}
          >
            Operations & Reservations
          </Typography>
          <Typography color="white" as="p" margin={`${Spaces.md} 0`}>
            {' '}
            The Operations Team consists of five divisions: building
            maintenance, building services, custodial services, media services,
            and union meeting and event services.
          </Typography>
          <InnerButtonContainer>
            {buttons.map((button) => (
              <Button href={button.href} variant="grey" key={button.text}>
                <NonBreakingSpan>{button.text}</NonBreakingSpan>
              </Button>
            ))}
          </InnerButtonContainer>
        </MobileHeaderContainer>
      ) : (
        <HeaderContainer>
          <InnerHeaderContainer>
            <Typography
              variant="pageHeader"
              color="white"
              as="h1"
              margin={`${Spaces.md} 0`}
            >
              Operations and Reservations
            </Typography>
            <Typography color="white" as="p" margin={`${Spaces.md} 0`}>
              {' '}
              The Operations Team consists of five divisions: building
              maintenance, building services, custodial services, media
              services, and union meeting and event services.
            </Typography>
            <InnerButtonContainer>
              <NonBreakingSpan>
                {buttons.map((button) => (
                  <Button
                    href={button.href}
                    variant="grey"
                    margin={`0 ${Spaces.sm}`}
                    key={button.text}
                  >
                    <NonBreakingSpan>{button.text}</NonBreakingSpan>
                  </Button>
                ))}
              </NonBreakingSpan>
            </InnerButtonContainer>
          </InnerHeaderContainer>
        </HeaderContainer>
      )}
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
