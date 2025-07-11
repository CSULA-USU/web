import { Colors, FontSizes, media, Spaces } from 'theme';
import {
  BannerItem,
  Button,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  ScrollingContent,
  StyledLink,
  Typography,
} from 'components';
import { Page } from 'modules';
import styled from 'styled-components';

import { GameTypes } from '../../partials/game-types';
import Head from 'next/head';
import { BiChevronRight } from 'react-icons/bi';
import TypingAnimation from 'components/TypingAnimation/TypingAnimation';

import { FaDiscord } from 'react-icons/fa';
import { BiLogoInstagramAlt, BiLogoTwitch } from 'react-icons/bi';
import { IconType } from 'react-icons';
import { useBreakpoint } from 'hooks';
import { ReactNode } from 'react';

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WhiteListItem = styled.li`
  color: white;
`;

interface SocialIconLinkProps {
  Icon: IconType;
  iconLink: string;
  size: string;
  ariaLabel: string;
}

interface GameFontProps {
  size?: keyof typeof FontSizes;
  letterSpacing?: string;
  color?: keyof typeof Colors;
  weight?: '300' | '400' | '600' | '700';
  lineHeight?: keyof typeof FontSizes;
  margin?: string;
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${FontSizes['5xl']};
  position: relative;
  z-index: 98;
  ${() =>
    media('desktop')(`
      gap: ${FontSizes['2xl']};
    `)}
  ${() =>
    media('tablet')(`
      gap: ${FontSizes['md']};
    `)}
  ${() =>
    media('mobile')(`
      gap: ${FontSizes['2xs']};
    `)}
`;

const GameRoomStatsWrapper = styled.div`
  background: radial-gradient(circle at top, rgb(18, 1, 23) 15%, black 85%);
  min-height: 200px;
`;

const GameRoomStats = ({ children }: { children: ReactNode }) => {
  return (
    <GameRoomStatsWrapper>
      <FluidContainer
        flex={true}
        flexDirection="row"
        height="100%"
        flexWrap="wrap"
      >
        {children}
      </FluidContainer>
    </GameRoomStatsWrapper>
  );
};

const GameRoomStatsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 25%;
  ${() =>
    media('tablet')(`
      flex: 1 1 50%;
    `)}
  ${() =>
    media('mobile')(`
      flex: 1 1 100%;
    `)}
    justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;

const GameRoomStatsCard = ({
  quantity,
  title,
}: {
  quantity: String;
  title: String;
}) => {
  return (
    <GameRoomStatsCardWrapper>
      <Typography
        as="h2"
        variant="span"
        size="5xl"
        weight="400"
        lineHeight="5xl"
        color="white"
      >
        {quantity}
      </Typography>
      <Typography
        as="h3"
        variant="span"
        size="md"
        weight="400"
        lineHeight="md"
        color="white"
      >
        {title}
      </Typography>
    </GameRoomStatsCardWrapper>
  );
};

const SocialIconLinkWrapper = styled.a`
  svg {
    color: ${Colors.primary};
    transition: transform 200ms ease;
  }
  svg:hover {
    color: white;
    transform: translateY(-4px);
  }
`;

const SocialIconLink = ({
  Icon,
  iconLink,
  size,
  ariaLabel,
}: SocialIconLinkProps) => {
  return (
    <SocialIconLinkWrapper
      href={iconLink}
      target="_blank"
      aria-label={ariaLabel}
    >
      <Icon size={size} />
    </SocialIconLinkWrapper>
  );
};

const GameFont = styled.h1<GameFontProps>`
  font-family: 'Press Start 2P', system-ui;
  font-size: ${(p) => FontSizes[p.size || 'md']};
  letter-spacing: ${(p) => p.letterSpacing};
  color: ${(p) => Colors[p.color || 'black']};
  font-weight: ${(p) => p.weight};
  line-height: ${(p) => FontSizes[p.lineHeight || 'xl']};
  margin: ${(p) => p.margin || 0};
`;

const TitleScreen = styled.div<{ isDesktop: boolean }>`
  height: ${(p) => (p.isDesktop ? '60vh' : '80vh')};
  position: relative;
  background-color: ${Colors.black};
  background-image: url('/departments/recreation/game-room/game-room_video.gif');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;

const ContactsBarWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0;
  flex-wrap: wrap;

  ${() =>
    media('tablet')(`
          width: 300px;
          margin: 0 auto;
        `)}

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
    ${() =>
      media('desktop')(`
            justify-content: center;
            flex: 1 1 50%;
          `)}
    ${() =>
      media('tablet')(`
            justify-content: start;
            flex: 1 1 100%;
          `)}
  }
`;

interface ContactsBarProps {
  children: ReactNode;
  isMobile: boolean;
  isDesktop: boolean;
}

const ContactsBar = ({ children, isMobile, isDesktop }: ContactsBarProps) => {
  return (
    <FluidContainer
      backgroundColor="primary"
      padding={isMobile ? '0 16px' : isDesktop ? '0 36px' : '12px 72px'}
    >
      <ContactsBarWrapper>{children}</ContactsBarWrapper>
    </FluidContainer>
  );
};

export default function Gameroom() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Recreation Game Room</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>

      <TitleScreen isDesktop={isDesktop}>
        <FluidContainer height="100%">
          <TitleContainer>
            <VerticalContainer>
              <GameFont
                size={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                letterSpacing={isMobile ? '2px' : isTablet ? '8px' : '12px'}
                lineHeight={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                weight="400"
                color="white"
              >
                Recreation
              </GameFont>
              <GameFont
                size={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                letterSpacing={isMobile ? '2px' : isTablet ? '8px' : '12px'}
                lineHeight={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                weight="400"
                color="primary"
              >
                Game Room
              </GameFont>
            </VerticalContainer>
            <VerticalContainer
              style={{ gap: FontSizes['xs'], alignItems: 'flex-start' }}
            >
              <Typography
                as="h2"
                variant="title"
                weight="400"
                size={
                  isMobile ? 'md' : isTablet ? 'lg' : isDesktop ? 'xl' : '2xl'
                }
                lineHeight="2xl"
                color="white"
              >
                Do you have what it takes to&nbsp;
                <TypingAnimation
                  as="h2"
                  variant="title"
                  weight="600"
                  size={
                    isMobile ? 'md' : isTablet ? 'lg' : isDesktop ? 'xl' : '2xl'
                  }
                  lineHeight="2xl"
                  color="white"
                  words={[
                    'win?',
                    'prevail?',
                    'conquer?',
                    'triumph?',
                    'overcome?',
                    'succeed?',
                  ]}
                />
              </Typography>

              <Button style={{ display: 'none', borderRadius: '4px' }}>
                Join a Tournament
              </Button>

              <HorizontalContainer style={{ gap: Spaces.md }}>
                <SocialIconLink
                  Icon={FaDiscord}
                  iconLink="https://discord.gg/W5JM6vrbAa"
                  size="40px"
                  ariaLabel="visit recreation game room's discord"
                />
                <SocialIconLink
                  Icon={BiLogoInstagramAlt}
                  iconLink="https://www.instagram.com/calstatela_recreation"
                  size="40px"
                  ariaLabel="visit recreation game room's instagram"
                />
                <SocialIconLink
                  Icon={BiLogoTwitch}
                  iconLink="https://www.twitch.tv/calstatela_recreation"
                  size="40px"
                  ariaLabel="visit recreation game room's twitch"
                />
              </HorizontalContainer>
            </VerticalContainer>
          </TitleContainer>
        </FluidContainer>
      </TitleScreen>

      <ContactsBar isMobile={isMobile} isDesktop={isDesktop}>
        {/* <li>
          <StyledLink
            href="gamesroom@calstatela.edu"
            isInverseUnderlineStyling
          >
            <Image
              alt="Envelope icon for game room's email address."
              src="/departments/recreation/game-room/icons/envelope.svg"
              height="18px"
              width="18px"
            />
            <Typography variant="cta" color="black">
              gamesroom@calstatela.edu
            </Typography>
          </StyledLink>
        </li> */}
        <li>
          <Image
            alt="Flag icon for game room's room number."
            src="/departments/recreation/game-room/icons/flag.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            U-SU 2nd floor, Room 201
          </Typography>
        </li>
        <li>
          <Image
            alt="Phone icon for game room's phone number."
            src="/departments/recreation/game-room/icons/phone.svg"
            height="18px"
            width="18px"
          />
          <StyledLink href="tel:13233436909">
            <Typography variant="cta" color="black">
              (323) 343-6909
            </Typography>
          </StyledLink>
        </li>
        <li>
          <Image
            alt="Calendar icon for game room's availability time."
            src="/departments/recreation/game-room/icons/calendar.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            Summer Hours &mdash; Closed
          </Typography>
        </li>
      </ContactsBar>

      <GameRoomStats>
        <GameRoomStatsCard quantity="50+" title="Daily Visitors" />
        <GameRoomStatsCard quantity="4" title="Days of Fun" />
        <GameRoomStatsCard quantity="1" title="School Champion" />
      </GameRoomStats>

      <ScrollingContent height="50px" direction="right">
        <BannerItem>
          <Image
            alt="paddle svg icon"
            src="/departments/recreation/game-room/icons/paddle.svg"
          />
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="disk svg icon"
            src="/departments/recreation/game-room/icons/disk.svg"
          />
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="ball svg icon"
            src="/departments/recreation/game-room/icons/ball.svg"
          />
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="controller svg icon"
            src="/departments/recreation/game-room/icons/controller.svg"
          />
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="soccer svg icon"
            src="/departments/recreation/game-room/icons/soccer.svg"
          />
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
      </ScrollingContent>

      <GameTypes />

      <ScrollingContent height="50px">
        <BannerItem>
          <Image
            alt="paddle svg icon"
            src="/departments/recreation/game-room/icons/paddle.svg"
          />
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="disk svg icon"
            src="/departments/recreation/game-room/icons/disk.svg"
          />
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="ball svg icon"
            src="/departments/recreation/game-room/icons/ball.svg"
          />
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="controller svg icon"
            src="/departments/recreation/game-room/icons/controller.svg"
          />
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="soccer svg icon"
            src="/departments/recreation/game-room/icons/soccer.svg"
          />
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
      </ScrollingContent>

      {/* Get events data from API and show events */}

      <FluidContainer backgroundColor="black">
        <Typography
          as="h2"
          variant="title"
          color="gold"
          margin={`${Spaces.lg} 0`}
        >
          Rules and Regulations
        </Typography>

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              General rules and guidelines
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">
                Be courteous to fellow players. Take turns and share the
                equipment fairly
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Treat all game room equipment gently to ensure its longevity for
                everyone&apos;s enjoyment
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Avoid rough play or running in the game room for safety reasons
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Notify staff immediately if equipment is damaged or not
                functioning properly
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Only use equipment provided by the game room unless authorized
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Tidy up after yourself and ensure the space is ready for the
                next user
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Hygiene expectations
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">
                Sanitize hands before and after using game equipment
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                No food or drinks near gaming stations or tables
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Wipe down equipment (e.g., controllers, paddles, cues) after use
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Wear clean footwear; no bare feet allowed
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Dispose of trash in designated bins to maintain cleanliness
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Requirements and procedures for Game Room equipment
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">
                Has the guest filled out the semester waiver?
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Has the guest filled out the daily sign-in?
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Has the guest requested what equipment to use?
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Has the guest provided a Golden Eagle ONE card? (Only 1 game
                controller per ONE card)
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Does the guest know how to use the facility properly?
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Tournament prizes as of Fall 2024
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">
                Duffel Bag (1st Place winner only)
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">Towels</Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">Hot/Cold Pack</Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">Notebook</Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">Pens</Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">Camper Hat</Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Procedure for reservations
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">Same-day request only</Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Show proof of Golden Eagle ONE card
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Only one student can reserve one hour at a time
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Can only reserve one hour before reservation
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Can I bring a friend?
            </Typography>
          }
        >
          <Typography color="white">
            The Games Room is open to all Cal State LA students, staff, and
            faculty. Proof of ONE card will be needed for all equipment usage.
            Friends not enrolled in Cal State LA cannot use the Games Room
          </Typography>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h3" variant="label" color="white">
              Can I bring my own stuff?
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography color="white">
                You can bring your own device to stream onto the TV with the
                HDMI cable
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Rooms are &quot;first come, first served&quot;
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Based on demand and total usage, we may ask for long sessions to
                conclude to accommodate waiting guests.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography color="white">
                Can only reserve one hour before reservation
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
      </FluidContainer>
    </Page>
  );
}
