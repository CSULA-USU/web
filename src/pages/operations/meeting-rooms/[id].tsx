import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Page } from 'modules';
import meetingRoomsData from 'data/meetingRooms.json';
import { useRouter } from 'next/router';
import { FluidContainer, Typography, Image } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import Link from 'next/link';
import { useBreakpoint } from 'hooks';

const EquipmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.gold};
  }
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Table = styled.div`
  text-align: left;

  table {
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1pt solid black;
  }

  th {
    padding: 20px 0 40px 0;
  }

  thead th {
    padding-right: 20px;
  }
  td {
    width: 35%;
  }
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

export default function MeetingRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { isMobile, isDesktop } = useBreakpoint();
  const [selectedRoom, setSelectedRoom] =
    useState<(typeof meetingRoomsData)[number]>();

  useEffect(() => {
    const room = meetingRoomsData.find((room) => room.id === id);
    setSelectedRoom(room);
  }, [id]);

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

  return !selectedRoom ? null : (
    <Page>
      <Head>
        <title>U-SU Meeting Rooms</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Meeting Rooms, Alhambra Room, San Gabriel Room, Los Angeles Room, Theater Room, Boardroom North, Boardroom South, Attendees, Members, Off Campus Vendors, Food, Operations"
          key="keywords"
        />
      </Head>
      <MeetingRoomsNav></MeetingRoomsNav>
      <FluidContainer
        flex
        alignItems="center"
        justifyContent="center"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-1.webp"
      >
        <h1>
          <Image
            borderRadius="12px"
            width="100%"
            src={selectedRoom.headerImage}
            alt={selectedRoom.mainImageAlt || 'banner image'}
          />
        </h1>
      </FluidContainer>

      <FluidContainer>
        <Table>
          <table align="center" vertical-align>
            <thead>
              <tr>
                {!isDesktop && <td aria-label="No value">&nbsp;</td>}
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
                  {
                    <Typography
                      variant="cta"
                      as="h2"
                      size={isMobile ? 'sm' : 'lg'}
                    >
                      Capacity
                    </Typography>
                  }
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

            {selectedRoom.arrangements.map((arrangement) => (
              <tr key={arrangement.setup}>
                {!isDesktop && (
                  <th>
                    {arrangement.image && (
                      <Image
                        borderRadius="12px"
                        width={350}
                        marginRight={Spaces['2xl']}
                        src={arrangement.image}
                        alt={`${arrangement.setup} room example`}
                      />
                    )}
                  </th>
                )}
                <td>
                  <Typography
                    variant="title"
                    weight="400"
                    size={isMobile ? 'xs' : 'md'}
                  >
                    {arrangement.setup}
                  </Typography>
                </td>
                <td>
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
                </td>
                <td>
                  <EquipmentSection>
                    {arrangement.equipment.map((e) => (
                      <Typography
                        key={e}
                        variant="title"
                        weight="400"
                        size={isMobile ? 'xs' : 'md'}
                      >
                        {' '}
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
                  <Typography weight="700" as="h3" margin={`${Spaces.md}0 0 0`}>
                    Fixed Room Features:
                  </Typography>
                  <Typography
                    margin={`0 0 ${Spaces.md}`}
                    size={isMobile ? 'xs' : 'md'}
                  >
                    {selectedRoom.features}
                  </Typography>
                </TextCenter>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <TextCenter>
                  <Typography weight="700" as="h3" margin={`${Spaces.md}0 0 0`}>
                    Meeting Space Rental Fees do not include:
                  </Typography>
                  <Typography
                    margin={`0 0 ${Spaces.md}`}
                    as="p"
                    size={isMobile ? 'xs' : 'md'}
                  >
                    {' '}
                    Personnel fees, equipment fees, cleaning fees, catering
                    fees, and extended hours fees as these are separate charges
                    that vary per room reservation.{' '}
                    <strong>
                      Disclaimer: The fees listed below are subject to change.
                    </strong>
                  </Typography>
                </TextCenter>
              </td>
            </tr>
          </table>
        </Table>
      </FluidContainer>
      <FluidContainer flex justifyContent="center">
        <embed
          type="application/pdf"
          width="80%"
          height={600}
          src="https://www.dropbox.com/scl/fi/ad7ijda4l5i3a8joyf317/meeting-space-capacity-chart.pdf?rlkey=sphutjmwuecebqa7nbl088p6n&e=2&raw=1"
        />
      </FluidContainer>
    </Page>
  );
}
