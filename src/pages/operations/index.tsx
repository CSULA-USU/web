import { Page, Header } from 'modules';
import { Card, FluidContainer } from 'components';
import { Spaces } from 'theme';

export default function Operations() {
  const buttons = [
    {
      text: 'Forms',
      href: '#',
    },
    { text: 'Meeting Rooms', href: '#' },
  ];

  const cards = [
    {
      title: 'Building Maintenance',
      children:
        'Is responsible for the efficient upkeep of the University-Student Union including all equipment and furnishings in and around the facility. Additionally, this department addresses any electrical, plumbing, HVAC, carpentry, landscaping, and beautification needs of the building.',
    },
    {
      title: 'Building Services',
      children:
        'Supports the needs of students, faculty and staff who utilize space in and around the U-SU by providing dependable set-ups for events, meetings, and programs.',
    },
    {
      title: 'Custodial Services',
      children:
        'Is responsible for the general cleanliness of all areas in and surrounding the Union facility including all interior/exterior furnishings and addresses all concerns related to general housekeeping.',
    },
    {
      title: 'Media Services',
      children:
        'Assists in supporting the increased technical needs of the building and addresses a wide variety of programs and events that occur inside and outside of the U-SU by providing knowledgeable technical and theatrical support.',
    },
    {
      title: 'Information & Event Services',
      children:
        'Is responsible for processing reservation requests and assisting sponsors with identifying the most efficient use of designated and programmable spaces of the University-Student Union.',
    },
  ];
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
            width="calc(30.33% - 8px)"
            minHeight="280px"
          ></Card>
        ))}
      </FluidContainer>
    </Page>
  );
}
