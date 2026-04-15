import { Page, Header } from 'modules';
import Head from 'next/head';
import { Card, FluidContainer, Image, Skeleton, Typography } from 'components';
import { media, Spaces } from 'theme';
import Link from 'next/link';
import meetingRoomsData from 'data/meetingRooms.json';
import styled from 'styled-components';
import { useImageLoading } from 'hooks';

const RoomCard = styled(Card)`
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
  display: block;
`;

const DynamicRatioBox = styled.div<{ ratio: number }>`
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
  overflow: hidden;
  display: block;
`;

const meetingRoomButtons = [
  {
    text: 'Make Room Reservation',
    href: 'https://form.jotform.com/221578153228053',
    isExternal: true,
  },
];

function MeetingRoomCardImage({ src, alt }: { src: string; alt: string }) {
  const loading = useImageLoading(src);

  return (
    <>
      {loading ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <CardImage src={src} alt={alt} />
      )}
    </>
  );
}

export default function MeetingRooms() {
  return (
    <Page>
      <Head>
        <title>
          Event & Conference Room Rentals | U&ndash;SU at Cal State LA
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Operations Department at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Rent conference and event venues at Cal State LA U-SU in Los Angeles. Indoor and outdoor spaces for meetings, conferences, and private events. View capacity, pricing, and request a reservation."
          key="description"
        />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Event & Conference Room Rentals | U-SU at Cal State LA"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Rent conference and event venues at Cal State LA U-SU in Los Angeles. Indoor and outdoor spaces for meetings, conferences, and private events. View capacity, pricing, and request a reservation."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/operations/meeting-rooms"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
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
          content="Event & Conference Room Rentals | U-SU at Cal State LA"
        />
        <meta
          name="twitter:description"
          content="Rent conference and event venues at Cal State LA U-SU in Los Angeles. Indoor and outdoor spaces for meetings, conferences, and private events. View capacity, pricing, and request a reservation."
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
              '@type': 'EventVenue',
              '@id':
                'https://www.calstatelausu.org/operations/meeting-rooms#event-venue',
              name: 'Meeting Rooms at the University-Student Union at Cal State LA',
              description:
                'Professional meeting and event spaces for rent at the University-Student Union at Cal State LA.',
              email: 'USUReservationsDesk@calstatela.edu',
              url: 'https://www.calstatelausu.org/operations/meeting-rooms',
              telephone: '+1-323-343-2465',
              hasMap:
                'https://www.google.com/maps/search/?api=1&query=5154+State+University+Dr,+Los+Angeles,+CA+90032',
              image:
                'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg',
              mainEntityOfPage:
                'https://www.calstatelausu.org/operations/meeting-rooms',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5154 State University Dr.',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
                addressCountry: 'US',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  availableLanguage: ['en'],
                  contactType: 'reservations',
                  email: 'USUReservationsDesk@calstatela.edu',
                  telephone: '+1-323-343-2465',
                },
              ],
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 34.0683,
                longitude: -118.1553,
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Alhambra',
                },
                {
                  '@type': 'City',
                  name: 'El Monte',
                },
                {
                  '@type': 'City',
                  name: 'Los Angeles',
                },
                {
                  '@type': 'City',
                  name: 'Montebello',
                },
                {
                  '@type': 'City',
                  name: 'Pasadena',
                },
                {
                  '@type': 'City',
                  name: 'San Gabriel',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'East Los Angeles',
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'San Gabriel Valley',
                },
              ],
              parentOrganization: {
                '@type': 'Organization',
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
      <Header
        title="Event & Conference Room Rentals"
        buttons={meetingRoomButtons}
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
      >
        Create a reservation to rent out event and conference spaces at the
        U&ndash;SU at Cal State LA. Current locations available to book are
        Alhambra, Board Room North/South, Los Angeles A/B/C, Montebello,
        Pasadena, San Gabriel, Theater, and the U&ndash;SU Plaza Space. Click an
        individual room for more information regarding layout, features, and
        fees.
      </Header>
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
          justifyContent="flex-start"
          gap="1.5rem"
          padding="0"
          margin={`${Spaces.xl} 0 0 0`}
        >
          {meetingRoomsData.map((props: any) => (
            <RoomCard key={props.title} title={props.title}>
              <Link href={'./meeting-rooms/' + props.id}>
                <DynamicRatioBox ratio={props.aspect ?? 4 / 3}>
                  <MeetingRoomCardImage
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
