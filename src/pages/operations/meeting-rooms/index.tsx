import { Page, Header, ImageAndCard } from 'modules';
import Head from 'next/head';
import { Card, FluidContainer, Image, Typography } from 'components';
import { Spaces } from 'theme';
import Link from 'next/link';
import meetingRoomsData from 'data/meetingRooms.json';
import { useBreakpoint } from 'hooks';
export default function MeetingRooms() {
  const { isDesktop } = useBreakpoint();
  const cards = [
    {
      title: 'Attendees',
      children:
        'A list of all event attendees (guests, members organizing, staff and/or volunteers) will be required to obtain a reservation confirmation for all indoor events.',
      imgSrc: '/vectors/operations/people.svg',
      imgAlt: 'Three People',
    },
    {
      title: 'Members',
      children:
        'A list of members organizing, staffing and/or volunteering will be required to obtain a reservation confirmation for all outdoor events (no guest list needed).',
      imgSrc: '/vectors/operations/teams.svg',
      imgAlt: 'Connecting Teams',
    },
    {
      title: 'Off Campus Vendors',
      children:
        'All off-campus vendors will need to complete the Off-Campus Vendor Form to obtain a reservation confirmation (sponsor of event is responsible for completing this).',
      imgSrc: '/vectors/operations/form.svg',
      imgAlt: 'Publish Article',
    },
    {
      title: 'Food',
      children:
        'All off-campus vendors will need to complete the Off-Campus Vendor Form to obtain a reservation confirmation (sponsor of event is responsible for completing this).',
      imgSrc: '/vectors/operations/food.svg',
      imgAlt: 'Breakfast',
    },
  ];

  return (
    <Page>
      <Head>
        <title>U-SU Meeting Rooms</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Meeting Rooms, Alhambra Room, San Gabriel Room, Los Angeles Room, Theater Room, Boardroom North, Boardroom South, Attendees, Members, Off Campus Vendors, Food, Operations"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer>
        <Header title="Meeting Rooms">
          Rent out a meeting space at CSULA U-SU. Current locations available to
          book are Los Angeles A/B/C, Theater, Alhambra, San Gabriel, U-SU Plaza
          rooms. We are currently not accepting reservations from off-campus
          sponsors. Click an individual room for more information regarding
          layout, features, and fees.
        </Header>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundColor="greyLightest"
      >
        <Typography as="h2" variant="title">
          Available Spaces
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {meetingRoomsData.map((props: any) => (
            <Card
              key={props.title}
              margin={`${Spaces.sm}`}
              width={isDesktop ? 'calc(75%)' : 'calc(32%)'}
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
