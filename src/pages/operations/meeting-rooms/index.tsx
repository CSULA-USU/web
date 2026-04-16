import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';
import meetingRoomsData from 'data/meetingRooms.json';
import { media, Spaces } from 'theme';
import { useBreakpoint, useImageLoading } from 'hooks';
import {
  Card,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  Skeleton,
  Typography,
} from 'components';
import { Page, Header } from 'modules';

const RoomCard = styled(Card)`
  flex: 1 1 360px;

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

const faqs = [
  {
    question: 'How do I reserve a meeting room at the Cal State LA U-SU?',
    answer:
      'Submit a reservation request online via our Events Request Form. You can also contact the reservations desk by phone at (323) 343-2465 or by email at USUReservationsDesk@calstatela.edu.',
  },
  {
    question:
      'Are meeting rooms at the Cal State LA U-SU open to the public for reservations?',
    answer:
      'Yes, meeting and event spaces at the University-Student Union are available to reserve for community members, Cal State LA students, faculty, and staff. Please contact the reservations desk for pricing and availability.',
  },
  {
    question: 'What is the largest event space available at the U-SU?',
    answer:
      'The Los Angeles Room (A + B + C combined) provides over 3,200 square feet of space and accommodates up to 200 guests in theater layout. The U-SU Theater also seats 200 guests including 8 ADA seats.',
  },
  {
    question: 'Where is the University-Student Union at Cal State LA located?',
    answer:
      'The University-Student Union is located at 5154 State University Dr., Los Angeles, CA 90032, on the Cal State LA campus in East Los Angeles near the San Gabriel Valley.',
  },
  {
    question: 'What equipment is included in meeting room rentals?',
    answer:
      'Most meeting rooms include tables and chairs, but additional media equipment is available for additional pricing. Equipment varies by room. Please visit individual room pages for full details.',
  },
  {
    question: 'What room setup options are available?',
    answer:
      'Meeting rooms can be arranged in Classroom, Theater, Reception, Discussion Circle, Conference, and Banquet layouts depending on your event needs. Please visit individual room pages for examples of different room layouts and capacities.',
  },
  {
    question: 'How do I pay?',
    answer:
      'For off-campus reservations, the U-SU only accepts payment by cash or checks. For on-campus reservations, please provide the appropriate information in the Chartfield section of the reservation form.',
  },
  {
    question: 'When, at the latest, can I make changes to my reservation?',
    answer:
      'Reservations should be finalized no later than two days in advance. Changes made within 48 hours of the event may not be accommodated. Please contact the reservations desk as soon as possible if you need to make changes to your reservation.',
  },
];

const meetingRoomButtons = [
  {
    text: 'Make Room Reservation',
    href: 'https://form.jotform.com/221578153228053',
    isExternal: true,
  },
  {
    text: 'Policies',
    href: 'https://www.dropbox.com/scl/fi/ap2nhg75x69zf4hrkriff/POLICIES-PROCEDURES-Updated-07.25.docx?rlkey=qqz8pa269bm3e1yc14vdsgwwo&st=n456ua3l&dl=1',
    isExternal: false,
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
  const { isMobile } = useBreakpoint();

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

        {/* FAQ Structured Data for featured snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
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
      <FluidContainer backgroundColor="black">
        <Typography as="h2" variant="title" color="primary">
          Frequently Asked Questions
        </Typography>
        {faqs.map((e, i) => (
          <React.Fragment key={i}>
            <Expandable
              indicator={<BiChevronRight color="white" size={48} />}
              header={
                <Typography
                  variant="label"
                  size={isMobile ? 'md' : 'lg'}
                  color="white"
                  as="h3"
                  margin={`${Spaces.sm} 0`}
                >
                  {e.question}
                </Typography>
              }
            >
              <Typography color="white" as="p">
                {Array.isArray(e.answer) ? (
                  <>
                    <ul>
                      {e.answer.map((e, answerKey) => (
                        <li key={`answer-${answerKey}`}>{e}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <> {e.answer}</>
                )}
              </Typography>
            </Expandable>
            <Divider color="gold" />
          </React.Fragment>
        ))}
      </FluidContainer>
    </Page>
  );
}
