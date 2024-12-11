import { Colors, FontSizes, media, Spaces } from 'theme';
import {
  BannerItem,
  Button,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  ScrollingContent,
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
  text: string;
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

const GameRoomStats = ({ children }: { children: ReactNode }) => {
  const GameRoomStatsWrapper = styled.div`
    background: radial-gradient(circle at top, rgb(18, 1, 23) 15%, black 85%);
    /* min-height: 420px; */
    min-height: 200px;
  `;

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

const GameRoomStatsCard = ({
  quantity,
  title,
}: {
  quantity: String;
  title: String;
}) => {
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
    /* flex-wrap: wrap; */
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
  `;
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

const SocialIconLink = ({
  Icon,
  iconLink,
  size,
  ariaLabel,
}: SocialIconLinkProps) => {
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

const GameFont = ({
  text,
  size,
  letterSpacing,
  color,
  weight,
  lineHeight,
  margin,
}: GameFontProps) => {
  const GameFontWrapper = styled.h1`
    font-family: 'Press Start 2P', system-ui;
    font-size: ${FontSizes[size || 'md']};
    letter-spacing: ${letterSpacing};
    color: ${Colors[color || 'black']};
    font-weight: ${weight};
    line-height: ${FontSizes[lineHeight || 'xl']};
    margin: ${margin || 0};
  `;
  return <GameFontWrapper>{text}</GameFontWrapper>;
};

export default function Gameroom() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const TitleScreenWrapper = styled.div`
    display: flex;
    height: ${isDesktop ? '60vh' : '80vh'};
    background-color: ${Colors.black};
    background-image: url('/gameroom/gameroom_video.gif');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
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

  const ContactsBar = ({ children }: { children: ReactNode }) => {
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
    return (
      <FluidContainer
        backgroundColor="primary"
        padding={isMobile ? '0 16px' : isDesktop ? '0 36px' : '12px 72px'}
      >
        <ContactsBarWrapper>{children}</ContactsBarWrapper>
      </FluidContainer>
    );
  };

  return (
    <Page>
      <Head>
        <title>Recreation Game Room</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, CCC, CSI, ASIPRCS, Graffix, Operations, Recreation"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <meta
          name="image"
          property="og:image"
          content="/about/calstatela-hero.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>

      <TitleScreenWrapper>
        <FluidContainer>
          <TitleContainer>
            <VerticalContainer>
              <GameFont
                text="Recreation"
                size={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                letterSpacing={isMobile ? '2px' : isTablet ? '8px' : '12px'}
                lineHeight={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                weight="400"
                color="white"
              />
              <GameFont
                text="Game room"
                size={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                letterSpacing={isMobile ? '2px' : isTablet ? '8px' : '12px'}
                lineHeight={
                  isMobile ? 'xl' : isTablet ? '2xl' : isDesktop ? '3xl' : '5xl'
                }
                weight="400"
                color="primary"
              ></GameFont>
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
                  words={['triumph', 'prevail', 'win', 'conquer']}
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
      </TitleScreenWrapper>

      <ContactsBar>
        <li>
          <Image
            alt="Envelope icon for game room's email address."
            src="/gameroom/icons/envelope.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            gamesroom@calstatela.edu
          </Typography>
        </li>
        <li>
          <Image
            alt="Flag icon for game room's room number."
            src="/gameroom/icons/flag.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            U-SU Room 201
          </Typography>
        </li>
        <li>
          <Image
            alt="Phone icon for game room's phone number."
            src="/gameroom/icons/phone.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            (323) 343-2488
          </Typography>
        </li>
        <li>
          <Image
            alt="Calendar icon for game room's availability time."
            src="/gameroom/icons/calendar.svg"
            height="18px"
            width="18px"
          />
          <Typography variant="cta" color="black">
            Mon - Thurs: 12PM to 6PM
          </Typography>
        </li>
      </ContactsBar>

      <GameRoomStats>
        <GameRoomStatsCard quantity="50+" title="Daily Visitors" />
        <GameRoomStatsCard quantity="12" title="Nintendo Switch Titles" />
        <GameRoomStatsCard quantity="4" title="Days of Fun" />
        <GameRoomStatsCard quantity="1" title="School Champion" />
      </GameRoomStats>

      <ScrollingContent height="50px">
        <BannerItem>
          <Image alt="paddle svg icon" src="/gameroom/icons/paddle.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="disk svg icon" src="/gameroom/icons/disk.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="ball svg icon" src="/gameroom/icons/ball.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="controller svg icon"
            src="/gameroom/icons/controller.svg"
          ></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="soccer svg icon" src="/gameroom/icons/soccer.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
      </ScrollingContent>

      <GameTypes />

      <ScrollingContent height="50px">
        <BannerItem>
          <Image alt="paddle svg icon" src="/gameroom/icons/paddle.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="disk svg icon" src="/gameroom/icons/disk.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="ball svg icon" src="/gameroom/icons/ball.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image
            alt="controller svg icon"
            src="/gameroom/icons/controller.svg"
          ></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="soccer svg icon" src="/gameroom/icons/soccer.svg"></Image>
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
            <Typography as="h2" variant="label" color="white">
              General rules and guidelines
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Be courteous to fellow players. Take turns and share the
                equipment fairly.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Treat all game room equipment gently to ensure its longevity for
                everyone’s enjoyment.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Avoid rough play or running in the game room for safety reasons.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Notify staff immediately if equipment is damaged or not
                functioning properly.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Only use equipment provided by the game room unless authorized.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Tidy up after yourself and ensure the space is ready for the
                next user.
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h2" variant="label" color="white">
              Hygiene expectations
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Sanitize hands before and after using game equipment.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                No food or drinks near gaming stations or tables.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Wipe down equipment (e.g., controllers, paddles, cues) after
                use.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Wear clean footwear; no bare feet allowed.
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Dispose of trash in designated bins to maintain cleanliness.
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h2" variant="label" color="white">
              How do I keep John Y. from destroying me in Smash?
            </Typography>
          }
        >
          <Typography as="h3" color="white">
            Lol git gud.
          </Typography>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h2" variant="label" color="white">
              What can I win at the tournaments?{' '}
            </Typography>
          }
        >
          <ul>
            <WhiteListItem>
              <Typography as="h3" color="white">
                TBD
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                TBD
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                TBD
              </Typography>
            </WhiteListItem>
          </ul>
        </Expandable>
        <Divider color="gold" margin={`${Spaces.md} 0`} />

        <Expandable
          indicator={<BiChevronRight size={36} style={{ color: 'white' }} />}
          header={
            <Typography as="h2" variant="label" color="white">
              I have more questions about competing. Who do I contact?
            </Typography>
          }
        >
          <Typography as="h3" color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea magni
            quos velit, nobis repellendus dolor aliquam. Dolor tempore
            laudantium error veniam sed quas laborum ex, asperiores quasi
            necessitatibus earum aperiam at ad iusto, cupiditate consequuntur
            veritatis aliquam quis voluptatibus, dignissimos et impedit modi.
            Incidunt minus totam vel ullam, tempore sint.
          </Typography>
        </Expandable>
      </FluidContainer>
    </Page>
  );
}
