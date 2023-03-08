import { Page, Header, ImageAndCard } from 'modules';
import { Card, FluidContainer, Image } from 'components';
import { Spaces } from 'theme';
import Link from 'next/link';
import meetingRoomsData from 'data/meetingRooms.json';
import { useBreakpoint } from 'hooks';
export default function MeetingRooms() {
  const { isTablet } = useBreakpoint();
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

  return (
    <Page>
      <FluidContainer>
        <Header title="Meeting Rooms">
          Rent out a meeting space at CSULA U-SU. Current locations available to
          book are Los Angeles A/B/C (ABC), Theater, Alhambra, San Gabriel, U-SU
          Plaza rooms. We are currently not accepting reservations from
          off-campus sponsors.
        </Header>
      </FluidContainer>
      <FluidContainer
        flex
        flexWrap="wrap"
        justifyContent="center"
        backgroundColor="greyLightest"
      >
        {meetingRoomsData.map((props: any) => (
          <Card
            key={props.title}
            margin={`${Spaces.sm}`}
            width={isTablet ? 'calc(80%)' : 'calc(25%)'}
            title={props.title}
          >
            <Link key={props.title} href={'./meeting-rooms/' + props.id}>
              {' '}
              <Image
                src={props.mainImageSrc}
                alt={props.mainImageAlt}
                width="100%"
              />
            </Link>
          </Card>
        ))}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="space-between"
      >
        {cards.map((props) => (
          <ImageAndCard key={props.title} {...props} />
        ))}
      </FluidContainer>
    </Page>
  );
}
