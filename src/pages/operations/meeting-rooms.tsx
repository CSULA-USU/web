import { Page, Header, OfficeHours } from 'modules';
import { Card, FluidContainer, Image, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spaces.xl};
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  border-radius: 12px;
  background-color: ${Colors.white};
  width: 300px;
  height: 300px;
  margin: 24px;
`;
const OperationsRoomCard = (props: any) => {
  return (
    <CardContainer>
      <Typography margin="12px 0" variant="titleSmall">
        {props.title}
      </Typography>
      <Image
        src={props.src}
        alt={props.alt}
        width="250px"
        height="200px"
      ></Image>
    </CardContainer>
  );
};
export default function MeetingRooms() {
  const cards = [
    {
      title: 'Attendees',
      children:
        'A list of all event attendees (guests, members organizing, staff and/or volunteers) will be required to obtain a reservation confirmation for all indoor events.',
      imgSrc: '/vectors/operations/people.svg',
      imgAlt: 'people image',
    },
    {
      title: 'Members',
      children:
        'A list of members organizing, staffing and/or volunteering will be required to obtain a reservation confirmation for all outdoor events (no guest list needed)',
      imgSrc: '/vectors/operations/teams.svg',
      imgAlt: 'teams image',
    },
    {
      title: 'Off Campus Vendors',
      children:
        'All off-campus vendors will need to complete the Off-Campus Vendor Form to obtain a reservation confirmation (sponsor of event is responsible for completing this).',
      imgSrc: '/vectors/operations/form.svg',
      imgAlt: 'form image',
    },
    {
      title: 'Food',
      children:
        'All off-campus vendors will need to complete the Off-Campus Vendor Form to obtain a reservation confirmation (sponsor of event is responsible for completing this).',
      imgSrc: '/vectors/operations/food.svg',
      imgAlt: 'food image',
    },
  ];

  const roomCards = [
    {
      title: 'Alhambra Room',
      src: '/operations/alhambra-room.jpg',
      alt: 'Alhambra Room image',
    },
    {
      title: 'San Gabriel Room',
      src: '/operations/san-gabriel-room.jpg',
      alt: 'San Gabriel Room image',
    },
    {
      title: 'Los Angeles Room',
      src: '/operations/la-room.jpg',
      alt: 'Los Angeles Room image',
    },
    {
      title: 'Theater Room',
      src: '/operations/theater-room.jpg',
      alt: 'Theater Room image',
    },
    {
      title: 'Boardroom North',
      src: '/operations/board-room-north.jpg',
      alt: 'Boardroom North',
    },
    {
      title: 'Boardroom South',
      src: '/operations/board-room-south.jpg',
      alt: 'Boardroom South',
    },
  ];
  return (
    <Page>
      <FluidContainer>
        <Header title="Meeting Rooms">
          Rent out a meeting space at CSULA U-SU. Current locations available to
          book are Los Angeles A/B/C (ABC), Theater, Alhambra, San Gabriel, U-SU
          Plaza rooms. We are currently not accepting reservations from
          off-campus sponsors.
        </Header>
        <OfficeHours></OfficeHours>
      </FluidContainer>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="center"
        backgroundColor="greyLightest"
      >
        {roomCards.map((props) => (
          <OperationsRoomCard
            title={`${props.title}`}
            src={`${props.src}`}
            alt={`${props.alt}`}
            key={`${props.title}`}
          />
        ))}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="space-between"
      >
        {cards.map((props) => (
          <FluidContainer flex alignItems="center" key={`${props.title}`}>
            <Image
              src={`${props.imgSrc}`}
              alt={`${props.imgAlt}`}
              width="150px"
              marginRight="48px"
            />
            <Card {...props} minHeight="200px"></Card>
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
