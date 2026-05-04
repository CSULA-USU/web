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
import rawTableData from 'data/meetingRoomRates.json';
import { TableData } from 'types';
import { Table as FlexibleTable } from 'components';

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
  display: flex;
  flex-direction: column;
`;

const Table = styled.div`
  width: 100%;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  /* Desktop Styles */
  @media (min-width: 1156px) {
    th,
    td {
      padding: ${Spaces.lg} 0;
      padding-right: ${Spaces.md};
      text-align: center;
      vertical-align: middle;
      border-bottom: 1pt solid black;
    }
    .setup-column {
      width: 20%;
    }
    .capacity-column {
      width: 40%;
    }
  }

  /* Hide Table on Mobile */
  @media (max-width: 1155px) {
    display: none;
  }
`;

const MobileCardContainer = styled.div`
  display: none;

  @media (max-width: 1155px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Spaces.xl};
    width: 100%;
  }
`;

const MobileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${Spaces.xl};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 24px;
  background-color: ${Colors.white};
  box-sizing: border-box;

  @media (max-width: 580px) {
    padding: ${Spaces.md};
  }
`;

const StyledSectionCard = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: ${Spaces.xl} auto 0 auto;
  padding: ${Spaces.xl};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 24px;
  background-color: ${Colors.white};
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 580px) {
    padding: ${Spaces.md};
    border-radius: 16px;
  }
`;

const ExpandableMediaWrap = styled.div`
  width: 250px;
  aspect-ratio: 350 / 197;

  @media (min-width: 405px) {
    width: 350px;
    aspect-ratio: 350 / 200;
  }

  @media (min-width: 700px) {
    width: 548px;
    aspect-ratio: 350 / 200;
  }

  @media (min-width: 855px) {
    width: 700px;
    aspect-ratio: 350 / 200;
  }

  @media (min-width: 1156px) {
    width: 500px;
    aspect-ratio: 350 / 200;
  }
`;

const BannerSkeletonBox = styled.div`
  width: 100%;
  aspect-ratio: 1124 / 439;
  margin: 0 0 20px 0;
`;

const ButtonContainer = styled.div`
  margin-top: ${Spaces.md};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.sm};
`;

const MobileImageWrapper = styled.div`
  margin-bottom: ${Spaces.md};
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MobileDataContent = styled.div`
  width: 100%;
  max-width: 325px;
`;

const LabelWrapper = styled.div`
  width: 140px;
  flex-shrink: 0;
`;

const ValueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

function getMaxCapacity(arrangements: Room['arrangements']): number {
  return Math.max(
    ...arrangements.flatMap((a) =>
      a.capacity.map((c) => {
        if (typeof c === 'number') return c;
        const nums = String(c).match(/\d+/g)?.map(Number) ?? [0];
        return nums.reduce((sum, n) => sum + n, 0);
      }),
    ),
  );
}

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

  return (
    <>
      {loading ? (
        isExpandable ? (
          <ExpandableMediaWrap>
            <Skeleton width="100%" height="100%" borderRadius="12px" />
          </ExpandableMediaWrap>
        ) : (
          <BannerSkeletonBox>
            <Skeleton width="100%" height="100%" borderRadius="12px" />
          </BannerSkeletonBox>
        )
      ) : isExpandable ? (
        <ExpandableMediaWrap>
          <Image
            borderRadius="12px"
            width="100%"
            src={src}
            fullSizeSrc={fullSizeSrc}
            alt={alt}
            isExpandable
          />
        </ExpandableMediaWrap>
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
  const tableData = rawTableData as { tables: TableData[] };

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
              maximumAttendeeCapacity: getMaxCapacity(room.arrangements),
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
        <ButtonContainer>
          <Button
            href="https://form.jotform.com/221578153228053"
            isExternalLink
            aria-label="Events Request Form - opens in new tab on Jotform website"
          >
            Events Request Form
          </Button>
          <Button
            href="/operations/meeting-rooms"
            aria-label="View all meeting rooms available for reservation"
            variant="black"
          >
            View All Rooms
          </Button>
          <Button
            href="https://www.dropbox.com/scl/fi/ad7ijda4l5i3a8joyf317/meeting-space-capacity-chart.pdf?rlkey=sphutjmwuecebqa7nbl088p6n&e=2&raw=1"
            aria-label="Meeting Room Rental Info - opens in dropbox"
            isExternalLink
            variant="black"
          >
            Rental Info
          </Button>
        </ButtonContainer>
      </FluidContainer>

      <FluidContainer>
        <Table>
          <table>
            <thead>
              <tr>
                <th className="setup-column">
                  <Typography variant="cta" as="h2">
                    Room View
                  </Typography>
                </th>
                <th>
                  <Typography variant="cta" as="h2">
                    Setup
                  </Typography>
                </th>
                <th>
                  <Typography variant="cta" as="h2">
                    Capacity
                  </Typography>
                </th>
                <th>
                  <Typography variant="cta" as="h2">
                    Equipment
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {room.arrangements.map((arrangement) => (
                <tr key={arrangement.setup}>
                  <td className="setup-column">
                    {arrangement.image && (
                      <ImageWithSkeleton
                        src={arrangement.image}
                        fullSizeSrc={arrangement.imageExpanded}
                        alt={arrangement.setup}
                        isExpandable
                      />
                    )}
                  </td>
                  <td>
                    <Typography size="md">{arrangement.setup}</Typography>
                  </td>
                  <td>
                    {arrangement.capacity.map((c) => (
                      <Typography key={c} size="md">
                        {c}
                      </Typography>
                    ))}
                  </td>
                  <td>
                    <EquipmentSection>
                      {arrangement.equipment.map((e) => (
                        <Typography key={e} size="md">
                          {e}
                        </Typography>
                      ))}
                    </EquipmentSection>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>

        <MobileCardContainer>
          {room.arrangements.map((arrangement) => (
            <MobileCard key={arrangement.setup}>
              <MobileImageWrapper>
                {arrangement.image && (
                  <ImageWithSkeleton
                    src={arrangement.image}
                    fullSizeSrc={arrangement.imageExpanded}
                    alt={arrangement.setup}
                    isExpandable
                  />
                )}
              </MobileImageWrapper>

              <FluidContainer
                flex
                flexDirection="column"
                alignItems="center"
                width="100%"
                padding="0"
              >
                <MobileDataContent>
                  <FluidContainer
                    flex
                    flexDirection="row"
                    gap="16px"
                    padding="6px 0"
                  >
                    <LabelWrapper>
                      <Typography
                        variant="labelTitleSmall"
                        color="greyDark"
                        size={isMobile ? 'sm' : 'md'}
                      >
                        Setup
                      </Typography>
                    </LabelWrapper>
                    <Typography size={isMobile ? 'sm' : 'md'}>
                      {arrangement.setup}
                    </Typography>
                  </FluidContainer>

                  <FluidContainer
                    flex
                    flexDirection="row"
                    gap="16px"
                    padding="6px 0"
                  >
                    <LabelWrapper>
                      <Typography
                        variant="labelTitleSmall"
                        color="greyDark"
                        size={isMobile ? 'sm' : 'md'}
                      >
                        Capacity
                      </Typography>
                    </LabelWrapper>
                    <ValueListWrapper>
                      {arrangement.capacity.map((c) => (
                        <Typography key={c} size={isMobile ? 'sm' : 'md'}>
                          {c}
                        </Typography>
                      ))}
                    </ValueListWrapper>
                  </FluidContainer>

                  <FluidContainer
                    flex
                    flexDirection="row"
                    gap="16px"
                    padding="6px 0"
                  >
                    <LabelWrapper>
                      <Typography
                        variant="labelTitleSmall"
                        color="greyDark"
                        size={isMobile ? 'sm' : 'md'}
                      >
                        Equipment
                      </Typography>
                    </LabelWrapper>
                    <ValueListWrapper>
                      {arrangement.equipment.map((e) => (
                        <Typography key={e} size={isMobile ? 'sm' : 'md'}>
                          {e}
                        </Typography>
                      ))}
                    </ValueListWrapper>
                  </FluidContainer>
                </MobileDataContent>
              </FluidContainer>
            </MobileCard>
          ))}
        </MobileCardContainer>

        <StyledSectionCard>
          <TextCenter>
            <Typography weight="700" as="h3" margin={`0 0 ${Spaces.sm} 0`}>
              Fixed Room Features:
            </Typography>
            <Typography
              as="p"
              margin={`0 0 ${Spaces.lg}`}
              size={isMobile ? 'xs' : 'md'}
            >
              {room.features}
            </Typography>
          </TextCenter>

          <TextCenter>
            <Typography weight="700" as="h3" margin={`${Spaces.md} 0 0 0`}>
              Meeting Space Rental Fees do not include:
            </Typography>
            <Typography
              margin={`0 0 ${Spaces.md}`}
              as="p"
              size={isMobile ? 'xs' : 'md'}
            >
              Personnel fees, equipment fees, cleaning fees, catering fees, and
              extended hours fees.
            </Typography>
            <Typography size="xs" color="greyDark">
              <strong>
                Disclaimer: The fees listed below are subject to change.
              </strong>
            </Typography>
          </TextCenter>
        </StyledSectionCard>
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        gap={Spaces.lg}
      >
        {tableData.tables.map((table) => (
          <FlexibleTable key={table.id} data={table} />
        ))}
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
