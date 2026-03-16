import { useEffect, useState } from 'react';
import Head from 'next/head';
import { CallToAction, Page } from 'modules';
import meetingRoomsData from 'data/meetingRooms.json';
import { useRouter } from 'next/router';
import { Button, FluidContainer, Typography, Image } from 'components';
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
  width: 100%;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr {
    border-bottom: 1pt solid black;
  }

  @media (min-width: 1025px) {
    /* Padding for top and bottom of rows */
    th,
    td {
      padding: ${Spaces.lg} 0;
      text-align: left;
    }

    /* Column Widths */
    .setup-column {
      width: 45%;
    }
    .capacity-column {
      width: 25%;
    }
    .equipment-column {
      width: 30%;
    }

    td {
      vertical-align: top;
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
      width: 100% !important;
      padding: ${Spaces.xs} 0;
      align-items: center;
    }

    td:not(:first-child)::before {
      content: attr(data-label);
      width: 120px;
      min-width: 120px;
      text-align: left;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: ${Colors.greyDark};
    }
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
        <title>U&ndash;SU Meeting Rooms</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Meeting Rooms, Alhambra Room, San Gabriel Room, Los Angeles Room, Theater Room, Boardroom North, Boardroom South, Attendees, Members, Off Campus Vendors, Food, Operations"
          key="keywords"
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
        <h1>
          <Image
            borderRadius="12px"
            width="100%"
            src={selectedRoom.headerImage}
            alt={selectedRoom.mainImageAlt || 'banner image'}
          />
        </h1>
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
                <th></th>
                <td>
                  <Typography
                    variant="cta"
                    as="h2"
                    size={isMobile ? 'sm' : 'lg'}
                  >
                    Setup
                  </Typography>
                </td>
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
                {/* Combined Setup Column: Image + Text */}
                <th className="setup-column">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    {arrangement.image && (
                      <Image
                        borderRadius="12px"
                        width={isDesktop ? 250 : 350}
                        src={arrangement.image}
                        fullSizeSrc={arrangement.imageExpanded}
                        alt={`${arrangement.setup} room example`}
                        isExpandable
                      />
                    )}
                    <Typography
                      variant="title"
                      weight="700"
                      size={isMobile ? 'xs' : 'md'}
                      margin="20px 0 0 0"
                    >
                      {arrangement.setup}
                    </Typography>
                  </div>
                </th>

                {/* Capacity Column */}
                <td className="capacity-column" data-label="Capacity">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  </div>
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
