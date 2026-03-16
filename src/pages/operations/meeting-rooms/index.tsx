import { Page, Header } from 'modules';
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
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Meeting Rooms</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Operations Department at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Rent meeting spaces at Cal State LA U-SU. Available rooms: Los Angeles A/B/C, Theater, Alhambra, San Gabriel, and Plaza Space. View layouts, features, and rental fees."
          key="description"
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Meeting Rooms & Event Spaces | Cal State LA U-SU"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Book your next event at the University-Student Union. Explore our variety of indoor and outdoor spaces designed for student organizations and campus partners."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/operations/meeting-rooms"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Cal State LA University-Student Union Meeting Rooms"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="U-SU Meeting Room Rentals | Cal State LA"
        />
        <meta
          name="twitter:description"
          content="Check room availability, layout features, and rental fees for all U-SU meeting spaces."
        />

        <link
          rel="canonical"
          href="https://www.calstatelausu.org/operations/meeting-rooms"
        />

        {/* Structured Data for Google/AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CivicStructure',
              name: 'U-SU Meeting Rooms',
              url: 'https://www.calstatelausu.org/operations/meeting-rooms',
              description:
                'Professional meeting and event spaces available for rent at the California State University, Los Angeles Student Union.',
              parentOrganization: {
                '@type': 'NonprofitOrganization',
                name: 'University-Student Union at Cal State LA',
              },
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Los Angeles Room A/B/C',
                  value: 'Large Event Space',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'U-SU Theater',
                  value: 'Performance Space',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Alhambra Room',
                  value: 'Meeting Room',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'San Gabriel Room',
                  value: 'Meeting Room',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'U-SU Plaza Space',
                  value: 'Outdoor Event Space',
                },
              ],
              potentialAction: {
                '@type': 'ReserveAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://form.jotform.com/221578153228053',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                  ],
                },
                result: {
                  '@type': 'Reservation',
                  name: 'Room Reservation',
                },
              },
            }),
          }}
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
    </Page>
  );
}
