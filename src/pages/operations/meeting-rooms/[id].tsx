import Head from 'next/head';
import { CallToAction, Page } from 'modules';
import meetingRoomsData from 'data/meetingRooms.json';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Button,
  FluidContainer,
  Typography,
  Image,
  Skeleton,
} from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import Link from 'next/link';
import { useBreakpoint, useImageLoading } from 'hooks';

const EquipmentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.sm};

  @media (max-width: 1024px) {
    align-items: flex-start;
  }
`;

const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.primary};
  }
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Table = styled.div`
  display: flex;
  width: 100%;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 1pt solid black;
  }

  @media (min-width: 1025px) {
    th,
    td {
      padding: ${Spaces.lg} 0;
      text-align: center;
      padding-right: ${Spaces.md};
      vertical-align: middle;
    }
    .setup-column {
      width: 20%;
    }
    .capacity-column {
      width: 20%;
    }
    td {
      vertical-align: middle;
    }
  }

  @media (max-width: 1024px) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      padding: ${Spaces.lg} 0;
      text-align: center;
    }

    td,
    th {
      display: flex;
      width: 100%;
      padding: ${Spaces.xs} 0;
      align-items: center;
    }

    td[data-label]::before {
      content: attr(data-label);
      width: 120px;
      min-width: 120px;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: ${Colors.greyDark};
      display: inline-block;
    }
  }
`;

const ExpandableSkeletonBox = styled.div`
  width: 350px;
  aspect-ratio: 350 / 197;

  @media (max-width: 1024px) {
    width: 250px;
  }
`;

const BannerSkeletonBox = styled.div`
  width: 100%;
  aspect-ratio: 1124 / 439;
  margin: 0 0 20px 0;
`;

const NavItems = [
  {
    header: 'Alhambra',
    id: 'alhambra-room',
  },
  {
    header: 'San Gabriel',
    id: 'san-gabriel-room',
  },
  {
    header: 'Los Angeles',
    id: 'los-angeles-room',
  },
  {
    header: 'Theater Room',
    id: 'theater-room',
  },
  {
    header: 'Boardroom North',
    id: 'boardroom-north',
  },
  {
    header: 'Boardroom South',
    id: 'boardroom-south',
  },
];

type Room = (typeof meetingRoomsData)[number];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = meetingRoomsData.map((room) => ({
    params: { id: room.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ room: Room }> = async ({
  params,
}) => {
  const room = meetingRoomsData.find((r) => r.id === params?.id);
  if (!room) return { notFound: true };
  return { props: { room } };
};

function ImageWithSkeleton({
  src,
  alt,
  fullSizeSrc,
  isExpandable,
}: {
  src: string;
  alt: string;
  isExpandable?: boolean;
  fullSizeSrc?: string;
}) {
  const loading = useImageLoading(src);
  const { isMobile } = useBreakpoint();

  return (
    <>
      {loading ? (
        isExpandable ? (
          <ExpandableSkeletonBox>
            <Skeleton width="100%" height="100%" borderRadius="12px" />
          </ExpandableSkeletonBox>
        ) : (
          <BannerSkeletonBox>
            <Skeleton width="100%" height="100%" borderRadius="12px" />
          </BannerSkeletonBox>
        )
      ) : isExpandable ? (
        <Image
          borderRadius="12px"
          width={isMobile ? 250 : 350}
          src={src}
          fullSizeSrc={fullSizeSrc}
          alt={alt}
          isExpandable
        />
      ) : (
        <Image
          borderRadius="12px"
          width="100%"
          margin={'0 0 20px 0'}
          src={src}
          alt={alt}
        />
      )}
    </>
  );
}

export default function MeetingRoom({ room }: { room: Room }) {
  const { isMobile } = useBreakpoint();

  const MeetingRoomsNav = () => {
    return (
      <FluidContainer
        backgroundColor="greyDarker"
        flex
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {NavItems.map((item) => (
          <NavItemContainer key={item.header}>
            <Link href={'/operations/meeting-rooms/' + item.id}>
              <Typography
                margin={`0 ${Spaces.sm} 0`}
                color="white"
                variant="labelTitleSmall"
              >
                {item.header}
              </Typography>
            </Link>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Head>
        <title>{`${room.title} | Meeting Rooms | Cal State LA U\u2013SU`}</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Operations Department at Cal State LA"
          key="author"
        />

        <meta
          name="description"
          content={`View capacity, equipment, and setup options for the ${room.title} at Cal State LA. Features: ${room.features}.`}
          key="description"
        />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content={`${room.title} | Cal State LA U-SU`}
          key="og-title"
        />
        <meta
          property="og:description"
          content={`Plan your event in the ${room.title}. Check setup types, equipment availability, and rental fees.`}
          key="og-desc"
        />
        <meta property="og:image" content={room.headerImage} key="og-image" />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content={`https://www.calstatelausu.org/operations/meeting-rooms/${room.id}`}
        />
        <link
          rel="canonical"
          href={`https://www.calstatelausu.org/operations/meeting-rooms/${room.id}`}
        />

        {/* Structured Data for the specific room */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['MeetingRoom', 'EventVenue'],
              '@id': `https://www.calstatelausu.org/operations/meeting-rooms/${room.id}#room`,
              name: room.title,
              url: `https://www.calstatelausu.org/operations/meeting-rooms/${room.id}`,
              description: room.features,
              image: room.headerImage,
              containedInPlace: {
                '@id':
                  'https://www.calstatelausu.org/operations/meeting-rooms#event-venue',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5154 State University Dr.',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
              },
              amenityFeature: room.arrangements.map((a) => ({
                '@type': 'LocationFeatureSpecification',
                name: a.setup,
                value: `Capacity: ${a.capacity.join(', ')}`,
              })),
            }),
          }}
        />
      </Head>
      <MeetingRoomsNav />
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp"
      >
        <ImageWithSkeleton
          src={room.headerImage}
          alt={room.mainImageAlt || 'banner image'}
        />
        <Button
          href="https://form.jotform.com/221578153228053"
          isExternalLink
          aria-label="Events Request Form - opens in new tab on Jotform website"
        >
          Events Request Form
        </Button>
      </FluidContainer>

      <FluidContainer>
        <Table>
          <table align="center" vertical-align>
            <thead>
              <tr>
                <th className="setup-column">
                  <Typography
                    variant="cta"
                    as="h2"
                    size={isMobile ? 'sm' : 'lg'}
                  >
                    Room View
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="cta"
                    as="h2"
                    size={isMobile ? 'sm' : 'lg'}
                  >
                    Setup
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="cta"
                    as="h2"
                    size={isMobile ? 'sm' : 'lg'}
                  >
                    Capacity
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="cta"
                    as="h2"
                    size={isMobile ? 'sm' : 'lg'}
                  >
                    Equipment
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {room.arrangements.map((arrangement) => (
                <tr key={arrangement.setup}>
                  <th className="setup-column">
                    <FluidContainer
                      flex
                      flexDirection="column"
                      alignItems="center"
                      padding="0"
                    >
                      {arrangement.image && (
                        <ImageWithSkeleton
                          src={arrangement.image}
                          fullSizeSrc={arrangement.imageExpanded}
                          alt={`${arrangement.setup} room example`}
                          isExpandable
                        />
                      )}
                    </FluidContainer>
                  </th>
                  <td className="setup-column" data-label="Setup">
                    <Typography
                      variant="title"
                      weight="400"
                      size={isMobile ? 'xs' : 'md'}
                    >
                      {arrangement.setup}
                    </Typography>
                  </td>

                  {/* Capacity Column */}
                  <td className="capacity-column" data-label="Capacity">
                    <FluidContainer flex flexDirection="column" padding="0">
                      {arrangement.capacity.map((c) => (
                        <Typography
                          variant="title"
                          weight="400"
                          size={isMobile ? 'xs' : 'md'}
                          key={c}
                        >
                          {c}
                        </Typography>
                      ))}
                    </FluidContainer>
                  </td>

                  {/* Equipment Column */}
                  <td className="equipment-column" data-label="Equipment">
                    <EquipmentSection>
                      {arrangement.equipment.map((e) => (
                        <Typography
                          key={e}
                          variant="title"
                          weight="400"
                          size={isMobile ? 'xs' : 'md'}
                        >
                          {e}
                        </Typography>
                      ))}
                    </EquipmentSection>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  <TextCenter>
                    <Typography
                      weight="700"
                      as="h3"
                      margin={`${Spaces.md}0 0 0`}
                    >
                      Fixed Room Features:
                    </Typography>
                    <Typography
                      margin={`0 0 ${Spaces.md}`}
                      size={isMobile ? 'xs' : 'md'}
                    >
                      {room.features}
                    </Typography>
                  </TextCenter>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <TextCenter>
                    <Typography
                      weight="700"
                      as="h3"
                      margin={`${Spaces.md}0 0 0`}
                    >
                      Meeting Space Rental Fees do not include:
                    </Typography>
                    <Typography
                      margin={`0 0 ${Spaces.md}`}
                      as="p"
                      size={isMobile ? 'xs' : 'md'}
                    >
                      {' '}
                      Personnel fees, equipment fees, cleaning fees, catering
                      fees, and extended hours fees as these are separate
                      charges that vary per room reservation.{' '}
                    </Typography>
                    <Typography>
                      <strong>
                        Disclaimer: The fees listed below are subject to change.
                      </strong>
                    </Typography>
                  </TextCenter>
                </td>
              </tr>
            </tbody>
          </table>
        </Table>
      </FluidContainer>
      <FluidContainer flex flexDirection="column" alignItems="center">
        <embed
          type="application/pdf"
          width="80%"
          height={600}
          src="https://www.dropbox.com/scl/fi/ad7ijda4l5i3a8joyf317/meeting-space-capacity-chart.pdf?rlkey=sphutjmwuecebqa7nbl088p6n&e=2&raw=1"
        />
        <CallToAction
          text="Make a reservation today!"
          buttonText="Events Request Form"
          href="https://form.jotform.com/221578153228053"
          margin={`${Spaces['xl']} 0`}
          isExternalLink
          linkAria="Events Request Form - opens in new tab on Jotform website"
        >
          Ready for your next meeting, event, or workshop?
        </CallToAction>
      </FluidContainer>
    </Page>
  );
}
