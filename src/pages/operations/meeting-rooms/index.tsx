import { Page, Header, ImageAndCard } from 'modules';
import Head from 'next/head';
import { Card, FluidContainer, Image, Typography } from 'components';
import { media, Spaces } from 'theme';
import Link from 'next/link';
import meetingRoomsData from 'data/meetingRooms.json';
import styled from 'styled-components';

const RoomCard = styled(Card)`
  margin: ${Spaces.sm};
  width: 400px; /* desktop & up */

  ${media('tablet')(`
    width: 100%;
  `)}

  ${media('mobile')(`
    width: 100%;
  `)}
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* avoid inline-img whitespace wiggles */
`;

const DynamicRatioBox = styled.div<{ ratio: number }>`
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
  overflow: hidden;
  display: block;
`;

const TopSection = styled(FluidContainer)`
  min-height: 240px; /* reserve enough space to avoid jump */
`;

const meetingRoomButtons = [
  {
    text: 'Make Room Reservation',
    href: 'https://form.jotform.com/221578153228053',
    isExternal: true,
  },
];

export default function MeetingRooms() {
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
        <title>U&ndash;SU Meeting Rooms</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Meeting Rooms, Alhambra Room, San Gabriel Room, Los Angeles Room, Theater Room, Boardroom North, Boardroom South, Attendees, Members, Off Campus Vendors, Food, Operations"
          key="keywords"
        />
      </Head>
      <TopSection>
        <Header
          title="Meeting Rooms"
          buttons={meetingRoomButtons}
          backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
        >
          Rent out a meeting space at CSULA U&ndash;SU. Current locations
          available to book are Los Angeles A/B/C, Theater, Alhambra, San
          Gabriel, U&ndash;SU Plaza Space. Click an individual room for more
          information regarding layout, features, and fees.
        </Header>
      </TopSection>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundColor="greyLightest"
      >
        <Typography as="h2" variant="title">
          Available Spaces
        </Typography>
        <FluidContainer
          flex
          flexWrap="wrap"
          justifyContent="center"
          margin="18px 0 0 0"
          padding="0"
        >
          {meetingRoomsData.map((props: any) => (
            <RoomCard key={props.title} title={props.title}>
              <Link href={'./meeting-rooms/' + props.id}>
                <DynamicRatioBox ratio={props.aspect ?? 4 / 3}>
                  <CardImage
                    src={props.mainImageSrc}
                    alt={props.mainImageAlt}
                  />
                </DynamicRatioBox>
              </Link>
            </RoomCard>
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
