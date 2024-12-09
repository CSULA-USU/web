import { Colors, FontSizes, media, Spaces } from 'theme';
import {
  Button,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import { Page } from 'modules';
import styled from 'styled-components';

import { ScrollingContent, BannerItem } from './scrolling-content';
import { GameTypes } from './game-types';
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

      <FluidContainer
        // height="660px"
        height={isDesktop ? '60vh' : '80vh'}
        backgroundImage="/gameroom/gameroom_video.gif"
        backgroundColor="transparent"
      >
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

            <Button style={{ borderRadius: '4px' }}>Join a Tournament</Button>

            <HorizontalContainer style={{ gap: Spaces.md }}>
              <SocialIconLink
                Icon={FaDiscord}
                iconLink="https://discord.gg"
                size="40px"
                ariaLabel="visit recreation game room's discord"
              />
              <SocialIconLink
                Icon={BiLogoInstagramAlt}
                iconLink="https://instagram.com"
                size="40px"
                ariaLabel="visit recreation game room's instagram"
              />
              <SocialIconLink
                Icon={BiLogoTwitch}
                iconLink="https://twitch.tv"
                size="40px"
                ariaLabel="visit recreation game room's twitch"
              />
            </HorizontalContainer>
          </VerticalContainer>
        </TitleContainer>
      </FluidContainer>

      <ContactsBar>
        <li>
          <Image
            alt=""
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
            alt=""
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
            alt=""
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
            alt=""
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
        <GameRoomStatsCard quantity="3" title="Weekly Tournaments" />
        <GameRoomStatsCard quantity="1" title="School Champion" />
      </GameRoomStats>

      <ScrollingContent height="50px">
        <BannerItem>
          <Image alt="" src="/gameroom/icons/paddle.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/disk.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/ball.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/controller.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/soccer.svg"></Image>
          <Typography variant="cta" color="black">
            Activities
          </Typography>
        </BannerItem>
      </ScrollingContent>

      <GameTypes />

      <ScrollingContent height="50px">
        <BannerItem>
          <Image alt="" src="/gameroom/icons/paddle.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/disk.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/ball.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/controller.svg"></Image>
          <Typography variant="cta" color="black">
            Tournaments
          </Typography>
        </BannerItem>
        <BannerItem>
          <Image alt="" src="/gameroom/icons/soccer.svg"></Image>
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
          <Typography as="h3" color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea magni
            quos velit, nobis repellendus dolor aliquam. Dolor tempore
            laudantium error veniam sed quas laborum ex, asperiores quasi
            necessitatibus earum aperiam at ad iusto, cupiditate consequuntur
            veritatis aliquam quis voluptatibus, dignissimos et impedit modi.
            Incidunt minus totam vel ullam, tempore sint.
          </Typography>
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
          <Typography as="h3" color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea magni
            quos velit, nobis repellendus dolor aliquam. Dolor tempore
            laudantium error veniam sed quas laborum ex, asperiores quasi
            necessitatibus earum aperiam at ad iusto, cupiditate consequuntur
            veritatis aliquam quis voluptatibus, dignissimos et impedit modi.
            Incidunt minus totam vel ullam, tempore sint.
          </Typography>
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
                50$ U-SU Giftcard
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                Street cred
              </Typography>
            </WhiteListItem>
            <WhiteListItem>
              <Typography as="h3" color="white">
                A house and lot
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
