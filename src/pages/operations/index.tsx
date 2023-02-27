import { Page, Header } from 'modules';
import { Button, Card, FluidContainer, Typography } from 'components';
import { Spaces } from 'theme';
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
const OperationsPDFDescriptions = (props: any) => {
  return (
    <PDFDescriptionContainer>
      <Title>
        <Typography variant="titleSmall">{props.title}</Typography>
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
export default function Operations() {
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
      iconSrc: 'vectors/operations/gardening.png',
      iconAlt: 'gardening image',
    },
    {
      title: 'Building Services',
      children:
        'Supports the needs of students, faculty and staff who utilize space in and around the U-SU by providing dependable set-ups for events, meetings, and programs.',
      iconSrc: 'vectors/operations/set-up.jpeg',
      iconAlt: 'decorating image',
      iconWidth: '160px',
    },
    {
      title: 'Custodial Services',
      children:
        'Is responsible for the general cleanliness of all areas in and surrounding the Union facility including all interior/exterior furnishings and addresses all concerns related to general housekeeping.',
      iconSrc: '/vectors/operations/cleaning.jpg',
      iconAlt: 'cleaning image',
      iconWidth: '100px',
    },
    {
      title: 'Media Services',
      children:
        'Assists in supporting the increased technical needs of the building and addresses a wide variety of programs and events that occur inside and outside of the U-SU by providing knowledgeable technical and theatrical support.',
      iconSrc: 'vectors/operations/media.jpg',
      iconAlt: 'media image',
      iconWidth: '150px',
    },
    {
      title: 'Information & Event Services',
      children:
        'Is responsible for processing reservation requests and assisting sponsors with identifying the most efficient use of designated and programmable spaces of the University-Student Union.',
      iconSrc: 'vectors/operations/reservation.jpg',
      iconAlt: 'media image',
      iconWidth: '150px',
    },
  ];

  const pdfDescriptionCards = [
    {
      title: 'Media Equipment Rental Chart',
      description: 'CSULA Univeristy-Student Union media equipment rental fees',
      href: '/operations/pdfs/Media-Equipment-Fees-Chart.pdf',
    },
    {
      title: 'MMRS Policies',
      description:
        'The Mind Matters Relaxation Station is designated space to support restorative wellness. The intended use is for brief napping in a semi-quiet environment. Access to the room is limited to CAL STATE LA enrolled students only.',
      href: '/operations/pdfs/MMRS-Policies.pdf',
    },
    {
      title: 'Meeting Space Rental Fees & Capacity Chart',
      description:
        'CSULA Univeristy-Student Union meeting space rental fees & capacity.',
      href: '/operations/pdfs/Meeting-Space-Capacity-Chart.pdf',
    },
    {
      title: 'Reservation Policies and Procedures (with Covid)',
      description:
        'Reservation policies and procedures go over guidelines of how the scheduling of U-SU facilities, equipment, sign-up process, and payments are arranged.',
      href: '/operations/pdfs/POLICIES-PROCEDURES-WITH-COVID-2021.pdf',
    },
  ];
  const { returnByBreakpoint } = useBreakpoint();
  const cardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 32px)',
    widescreen: 'calc(33.33% - 32px)',
  });
  return (
    <Page>
      <Header
        title="Operations"
        buttons={buttons}
        backgroundImage="/subtle-background-2.jpg"
      >
        The Operations Team consists of five divisions: building maintenance,
        building services, custodial services, media services, and union meeting
        & event services.
      </Header>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {cards.map((props) => (
          <Card
            margin={`${Spaces.md}`}
            topBorder
            key={`${props.title}`}
            {...props}
            width={cardWidth}
            minHeight="280px"
          ></Card>
        ))}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        backgroundColor="greyLightest"
      >
        <Typography variant="title">Additional Information</Typography>
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        {pdfDescriptionCards.map((props) => (
          <FluidContainer key={`${props.title}`}>
            <OperationsPDFDescriptions {...props}></OperationsPDFDescriptions>
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
