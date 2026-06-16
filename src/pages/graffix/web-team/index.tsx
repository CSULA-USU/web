import Head from 'next/head';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import {
  Button,
  CountUp,
  FluidContainer,
  Image,
  QuoteBanner,
  Typography,
} from 'components';
import { HeaderWithVideo, Page } from 'modules';
import { Colors, Spaces, media } from 'theme';
import { useBreakpoint } from 'hooks';
import OPSHeroVideo from '/videos/u-krew-header-video.mp4?thumbnailTime=0';
import MobileOPSHeroVideo from '/videos/mobile-u-krew-header-video.mp4?thumbnailTime=0';
import type { WebTeamMember, WebTeamStaffMember, WebTeamTrait } from 'types';
import { PersonCard } from 'modules/graffix/_components/PersonCard';
import { SectionRail } from 'modules/graffix/_components/SectionRail';
import { StaffHighlightCard } from 'modules/graffix/_components/StaffHighlightCard';
import companies from 'data/web-team-company-logos.json';

// ── Data ──────────────────────────────────────────────────────────────────────

const TEAM_STATS = [
  {
    count: 3,
    label: 'Sites launched',
    note: 'Across the U-SU site and Graffix microsites',
  },
  {
    count: 96,
    label: 'Vercel Real Experience Score',
    note: 'p75 across the site · last 30 days',
  },
  {
    count: 100,
    label: 'WAVE accessibility score',
    note: 'Zero errors site-wide',
  },
  {
    count: 6,
    label: 'Student devs trained',
    note: 'Since 2021',
  },
] as const;

const STAFF_MEMBERS: WebTeamStaffMember[] = [
  {
    id: 'john-yasis',
    name: 'John Yasis',
    initials: 'JY',
    badgeLabel: 'Team Supervisor',
    badgeVariant: 'primary',
    title: 'Web Designer · Graffix · U-SU · 2022–present',
    bio: 'John joined the U-SU as a student designer in 2020, grew the Web Team into what it is today, and still writes most of the onboarding docs himself. He runs hiring, code review, and the Wednesday standup.',
    awards: ['2025 U-SU Values Champion', 'U-SET Best in Show'],
    emailHref: 'mailto:jyasis@calstatela.edu',
    phoneHref: 'tel:+13233432465',
    gradientStart: Colors.gold,
    gradientEnd: Colors.greyDarkest,
  },
  {
    id: 'isaiah-villalobos',
    name: 'Isaiah Villalobos',
    initials: 'IV',
    badgeLabel: 'Web Developer',
    badgeVariant: 'muted',
    title: 'Junior Web Developer · Graffix · U-SU',
    bio: 'Isaiah manages the USU, Wingspan and SLE websites. Keeps the team aligned with U-SU brand standards, and partners with John on development.',
    awards: [],
    emailHref: 'mailto:ivilla.devcs@gmail.com',
    gradientStart: Colors.blackMauve,
    gradientEnd: Colors.greyDarker,
  },
];

const TRAITS: WebTeamTrait[] = [
  {
    number: '01',
    title: 'Curiosity',
    icon: '/vectors/about/ideas.svg',
    description:
      'You poke at things. You read source. You ask "what happens if I press this?" and follow the answer all the way down.',
    why: "The web changes weekly. The team's edge is staying interested.",
  },
  {
    number: '02',
    title: 'Craft',
    icon: '/vectors/about/upgrade.svg',
    description:
      'You sweat the details kerning, focus states, the empty state nobody else thought about. Quality is a habit, not a sprint.',
    why: 'Students notice the broken things. Craft is how we earn their trust.',
  },
  {
    number: '03',
    title: 'Collaboration',
    icon: '/vectors/about/teamwork.svg',
    description:
      'You give feedback kindly, ask for it often, and treat code review as the best part of the day instead of the worst.',
    why: 'Every page on the site is shipped by more than one person.',
  },
  {
    number: '04',
    title: 'Ownership',
    icon: '/vectors/about/business-deal.svg',
    description:
      "If something breaks at 4 PM on a Friday, you don't wait until Monday. You write the message, file the bug, ship the fix.",
    why: "The people we serve don't care whose PR introduced the regression.",
  },
  {
    number: '05',
    title: 'Inclusive Mindset',
    icon: '/vectors/about/inclusive.svg',
    description:
      'You design with screen readers, keyboards, and slow networks in front of you not as an afterthought once everything else is done.',
    why: 'The U-SU serves every Golden Eagle. The site has to do the same.',
  },
  {
    number: '06',
    title: 'Growth Mindset',
    icon: '/vectors/about/growth.svg',
    description:
      "You'd rather get good than look good. You take notes in 1:1s, ship things you're not yet great at, and stay coachable.",
    why: 'The team is a training ground. The students who soar are the ones who keep climbing.',
  },
];

const ALUMNI: WebTeamMember[] = [
  {
    id: 'emily-martinez',
    name: 'Emily Martinez',
    initials: 'EM',
    year: 'Class of 2022',
    role: 'Web Designer · now Supervisor of this very team',
    bio: "Emily was a student dev before he ran the place. Quietly led the Scavenger Hunt, the compliment battle game, and the team's first 100-accessibility page.",
    contributions:
      'Virtual business cards · Compliment Battle game · KaraokeJS DJ tool',
    gradientStart: Colors.greyDark,
    gradientEnd: Colors.greyDarkest,
  },
  {
    id: 'joaquin-reyes',
    name: 'Joaquin Reyes',
    initials: 'JR',
    year: 'Class of 2024',
    role: 'Frontend Developer · now at Snapchat',
    bio: "Built the original events module and was the team's first dedicated frontend specialist. Still answers Slack messages from current devs.",
    contributions:
      'Events module v1 · Carousel · Mentor to 3 current team members',
    gradientStart: Colors.greyDarker,
    gradientEnd: Colors.blackMauve,
  },
  {
    id: 'sarah-kowalski',
    name: 'Sarah Kowalski',
    initials: 'SK',
    year: 'Class of 2024',
    role: 'Full-Stack Engineer · now at Riot Games',
    bio: 'Sarah owned the Notion + Supabase integrations and got the team unblocked from Vercel deploys more times than anyone can count.',
    contributions:
      'Notion API ingestion · Backoffice auth · Sitemap automation',
    gradientStart: Colors.gold,
    gradientEnd: Colors.greyDark,
  },
  {
    id: 'maya-okafor',
    name: 'Maya Okafor',
    initials: 'MO',
    year: 'Class of 2023',
    role: 'Product Engineer · now at FYI',
    bio: 'Maya rebuilt the design system from the ground up and gave the team the typography rules they still use today.',
    contributions:
      'Design tokens · Typography component · Migrated to styled-system',
    gradientStart: Colors.greyDarkest,
    gradientEnd: Colors.nativeBeige,
  },
];

const TECH_STACK = [
  'Next.js 14',
  'TypeScript',
  'React 18',
  'styled-components',
  'Vercel',
  'Vercel Analytics',
  'WAVE · WebAIM',
  'Notion API',
  'Supabase',
  'Mux · next-video',
  'NextAuth',
];

// ── Styled components ─────────────────────────────────────────────────────────

const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: ${Spaces['2xl']};
  ${media('desktop')(`padding: ${Spaces.xl};`)}
  ${media('mobile')(`padding: ${Spaces.md} ${Spaces.md} ${Spaces.xl};`)}
`;

const HeroTextGroup = styled.div`
  max-width: 720px;
`;

const AccentBar = styled.div`
  width: 48px;
  height: 3px;
  background: ${Colors.primary};
  margin-bottom: 16px;
`;

const HeroEyebrow = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${Colors.primary};
  margin: 0 0 10px;
`;

const HeroSubtext = styled.div`
  margin-top: 18px;
  max-width: 640px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

// Stat bar

const StatBar = styled.div`
  background: ${Colors.black};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

const StatCell = styled.div`
  padding: 36px 28px;
  background: ${Colors.black};
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  & + & {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 24px;
      bottom: 24px;
      width: 1px;
      background: ${Colors.greyDarker};
      ${media('mobile')(`display: none;`)}
    }
  }
`;

const StatLabel = styled.p`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${Colors.greyLighter};
  margin: 0;
`;

const StatNote = styled.p`
  font-size: 13px;
  color: ${Colors.greyLighter};
  opacity: 0.85;
  margin: 0;
`;

// Alumni companies section

const SectionHead = styled.div`
  max-width: 720px;
  margin: 0 auto 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const SectionKicker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin-bottom: 16px;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 28px;
    height: 2px;
    background: ${Colors.primary};
  }
`;

const OutcomesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${Spaces.xl};
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

const OutcomeItem = styled.div`
  padding: 28px;
  border-left: 5px solid ${Colors.primary};
`;

const OutcomeLabel = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin: 8px 0;
`;

// Team section

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${Spaces.lg};
  margin-bottom: ${Spaces['2xl']};
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

// Built With section

const BuiltWithGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spaces['2xl']};
  max-width: 1440px;
  margin: 0 auto;
  ${media('tablet')(`grid-template-columns: 1fr;`)}
`;

const BuiltWithLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const BuiltWithRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatCard = styled.div`
  background: ${Colors.greyDarker};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatCardTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const StatCardKicker = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.primary};
`;

const StatCardTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.white};
  margin: 0;
`;

const GaugeRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
`;

const GaugeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const GaugeLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
  opacity: 0.7;
`;

const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
`;

const AccessBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 60px;
`;

const AccessBoxNum = styled.span`
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
`;

const AccessBoxLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
  opacity: 0.7;
`;

const BuiltWithKicker = styled.span`
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.primary};
  margin-bottom: 14px;
`;

const TechPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: ${Spaces.lg};
`;

const TechPill = styled.span`
  padding: 10px 16px;
  background: ${Colors.greyDarker};
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: ${Colors.greyLighter};
`;

// What We Look For section

const TraitCard = styled.article`
  background: ${Colors.greyLightest};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    background: ${Colors.white};
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }
`;

const TraitsSection = styled.section`
  background: ${Colors.white};
  padding: 96px 72px;
  ${media('desktop')(`padding: 64px 36px;`)}
  ${media('mobile')(`padding: 48px 18px;`)}
`;

const TraitsInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const TraitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

const TraitTitleRow = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: var(--font-bitter), serif;
  font-weight: 700;
  font-size: 26px;
  color: ${Colors.black};
`;

const TraitIconBlock = styled.div`
  height: 120px;
  background: ${Colors.white};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  ${TraitCard}:hover & {
    background: ${Colors.greyLightest};
  }
`;

const TraitNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.white};
  border: 1px solid ${Colors.greyLighter};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: 800;
  color: ${Colors.gold};
  flex-shrink: 0;
  transition: background 0.2s ease-in-out, border-color 0.2s ease-in-out;

  ${TraitCard}:hover & {
    background: ${Colors.primary};
    border-color: ${Colors.primary};
    color: ${Colors.black};
  }
`;

const TraitWhy = styled.p`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;
  color: ${Colors.greyDark};
  border-top: 1px solid ${Colors.greyLighter};
  padding-top: 14px;
  margin: auto 0 0;
`;

// Alumni section (reuses MemberGrid)

const AlumniGrid = styled(MemberGrid)`
  opacity: 0.85;
`;

// Marquee

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-25%); }
`;

const InlineMarqueeOuter = styled.div`
  overflow: hidden;
  width: 100%;
  margin: ${Spaces.xl} 0;
`;

const InlineMarqueeTrack = styled.div`
  display: flex;
  width: fit-content;
  min-width: 200%;
  animation: ${marqueeScroll} 20s linear infinite;
  will-change: transform;
`;

const MarqueeLogo = styled.img`
  height: 100px;
  width: auto;
  flex-shrink: 0;
  margin: 0 40px;
  object-fit: contain;
`;

// Games section

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  ${media('tablet')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('mobile')(`grid-template-columns: 1fr;`)}
`;

const GameCard = styled.article`
  border-radius: 12px;
  overflow: hidden;
  background: ${Colors.greyLightest};
  display: flex;
  flex-direction: column;
`;

const GameThumbnail = styled.div<{ gradient: string }>`
  height: 200px;
  border-radius: 12px 12px 0 0;
  background: ${({ gradient }) => gradient};
  position: relative;
`;

const GamePlayBtn = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${Colors.primary};
  color: ${Colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  user-select: none;
`;

const GameBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GameTitle = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: ${Colors.black};
  margin: 0;
`;

const GameLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: ${Colors.gold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Join CTA section

const JoinCtaSection = styled.section`
  background: ${Colors.greyDarkest};
  padding: 72px;
  ${media('mobile')(`padding: 48px 24px;`)}
`;

const JoinCtaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
`;

const JoinCtaLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
`;

const JoinCtaButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function WebTeam() {
  const { isMobile } = useBreakpoint();

  return (
    <Page>
      <SectionRail />
      <Head>
        <title>Graffix Web Team | Cal State LA U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Meet the student web developers and designers who build and maintain calstatelausu.org. Learn about the Graffix Web Team, our tech stack, what we look for in new members, and how alumni have gone on to careers at Microsoft, Snapchat, Riot Games, and more."
          key="description"
        />
        <meta name="robots" content="index,follow" />

        <meta
          property="og:title"
          content="Graffix Web Team | Cal State LA U-SU"
          key="og-title"
        />
        <meta
          property="og:description"
          content="The student developers and designers behind calstatelausu.org. Join us, see our work, and find out where alumni land."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/graffix/web-team"
        />
        <meta property="og:type" content="website" key="og-type" />

        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/graffix/web-team"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Graffix Web Team',
              description:
                'Student web developers and designers at the University-Student Union, Cal State LA.',
              publisher: {
                '@type': 'Organization',
                name: 'University-Student Union at Cal State LA',
                url: 'https://www.calstatelausu.org/',
              },
            }),
          }}
        />
      </Head>

      {/* ── Hero ── */}
      <HeaderWithVideo
        desktopSrc={OPSHeroVideo}
        mobileSrc={MobileOPSHeroVideo}
        thumbnail="https://image.mux.com/5006jkrbON0102GtWswHvULvNts6fBCS1HngiHL011spHuQ/thumbnail.png?time=23&fit_mode=preserve"
      >
        <HeroContentWrapper>
          <HeroTextGroup>
            <AccentBar />
            <HeroEyebrow>Graffix · U-SU</HeroEyebrow>
            <Typography
              as="h1"
              variant="pageHeader"
              color="white"
              size={isMobile ? '4xl' : '5xl'}
              lineHeight="1.02"
            >
              Graffix Web Team
            </Typography>
            <HeroSubtext>
              <Typography
                as="p"
                variant="subheader"
                color="white"
                size={isMobile ? 'sm' : 'md'}
                lineHeight="1.55"
              >
                We are the student web developers and designers behind{' '}
                <strong>calstatelausu.org</strong>. We build, ship, and audit
                the site every Golden Eagle relies on and we train each other to
                leave it better than we found it.
              </Typography>
            </HeroSubtext>
            <HeroButtons>
              <Button href="#team" variant="primary">
                Meet the Team
              </Button>
              <Button href="#games" variant="whiteOutline">
                View Our Work
              </Button>
            </HeroButtons>
          </HeroTextGroup>
        </HeroContentWrapper>
      </HeaderWithVideo>
      <div id="hero-sentinel" />

      {/* ── Stat bar ── */}
      <StatBar aria-label="Team impact at a glance">
        {TEAM_STATS.map((stat) => (
          <StatCell key={stat.label}>
            <CountUp
              end={stat.count}
              duration={1200}
              variant="pageHeader"
              as="span"
              size={isMobile ? '2xl' : '3xl'}
              color="primary"
            />
            <StatLabel>{stat.label}</StatLabel>
            <StatNote>{stat.note}</StatNote>
          </StatCell>
        ))}
      </StatBar>

      {/* ── Where Our Alumni Land ── */}
      <FluidContainer id="alumni-land">
        <SectionHead>
          <SectionKicker>Where Our Alumni Land</SectionKicker>
          <Typography
            as="h2"
            variant="title"
            size={isMobile ? 'xl' : '2xl'}
            margin="0 0 14px"
          >
            Companies &amp; Employment Outcomes
          </Typography>
          <Typography
            as="p"
            variant="subheader"
            size={isMobile ? 'sm' : 'md'}
            color="greyDarkest"
            lineHeight="1.6"
          >
            The Graffix Web Team maintains the U-SU sites. Here is where it
            takes you.
          </Typography>
        </SectionHead>

        <InlineMarqueeOuter aria-hidden="true">
          <InlineMarqueeTrack>
            {[...companies, ...companies, ...companies, ...companies].map(
              (co, i) => (
                <MarqueeLogo key={i} src={co.src} alt={co.alt} />
              ),
            )}
          </InlineMarqueeTrack>
        </InlineMarqueeOuter>

        <FluidContainer padding={`${Spaces['2xl']} 0 0`}>
          <OutcomesGrid>
            <OutcomeItem>
              <FluidContainer
                padding="0"
                flex
                flexDirection="row"
                alignItems="center"
                gap="5px"
              >
                <CountUp
                  end={87}
                  duration={1200}
                  variant="pageHeader"
                  as="span"
                  size={isMobile ? '2xl' : '3xl'}
                  color="black"
                />
                <Typography size="lg" weight="600">
                  %
                </Typography>
              </FluidContainer>
              <OutcomeLabel>Placement rate</OutcomeLabel>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.55"
                color="greyDarkest"
              >
                Alumni working in software or design within 6 months of
                graduation.
              </Typography>
            </OutcomeItem>
            <OutcomeItem>
              <CountUp
                end={5.4}
                duration={1200}
                variant="pageHeader"
                as="span"
                size={isMobile ? '2xl' : '3xl'}
                color="black"
              />
              <OutcomeLabel>Months · time to hire</OutcomeLabel>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.55"
                color="greyDarkest"
              >
                Average time between leaving the team and starting a full-time
                engineering role.
              </Typography>
            </OutcomeItem>
            <OutcomeItem>
              <CountUp
                end={11}
                duration={1200}
                variant="pageHeader"
                as="span"
                size={isMobile ? '2xl' : '3xl'}
                color="black"
              />
              <OutcomeLabel>Alumni · Big Tech</OutcomeLabel>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.55"
                color="greyDarkest"
              >
                At Microsoft, Snap, Riot, and other companies you&apos;ve heard
                of. Plus another 23 at startups you haven&apos;t yet.
              </Typography>
            </OutcomeItem>
          </OutcomesGrid>
        </FluidContainer>
      </FluidContainer>

      {/* ── Current Team ── */}
      <FluidContainer backgroundColor="greyLightest" id="team">
        <SectionHead>
          <SectionKicker>2025 – 2026</SectionKicker>
          <Typography
            as="h2"
            variant="title"
            size={isMobile ? 'xl' : '2xl'}
            margin="0 0 14px"
          >
            Current Team
          </Typography>
          <Typography
            as="p"
            variant="subheader"
            size={isMobile ? 'sm' : 'md'}
            color="greyDarkest"
            lineHeight="1.6"
          >
            One full-time staff and one student working together to maintain and
            update the various U-SU websites.
          </Typography>
        </SectionHead>

        <StaffGrid>
          {STAFF_MEMBERS.map((staffMember) => (
            <StaffHighlightCard
              key={staffMember.id}
              staffMember={staffMember}
            />
          ))}
        </StaffGrid>
      </FluidContainer>

      {/* ── Built With ── */}
      <FluidContainer backgroundColor="greyDarkest" id="built-with">
        <BuiltWithGrid>
          <BuiltWithLeft>
            <BuiltWithKicker>Built With</BuiltWithKicker>
            <Typography
              as="h2"
              variant="title"
              color="white"
              size={isMobile ? 'xl' : '2xl'}
              margin="0 0 16px"
            >
              Tech Stack, Accessibility &amp; Performance
            </Typography>
            <Typography
              as="p"
              variant="copy"
              color="greyLighter"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.65"
              margin="0 0 12px"
            >
              The site is a Next.js 14 app on Vercel, written in TypeScript with
              styled-components. Auth is NextAuth + Azure AD. Content lives in
              Notion and Supabase. Video is Mux through next-video. Every page
              is keyboard-navigable, screen-reader-tested, and audited with WAVE
              before it ships.
            </Typography>
            <Typography
              as="p"
              variant="copy"
              color="greyLighter"
              size={isMobile ? 'sm' : 'md'}
              lineHeight="1.65"
            >
              We treat accessibility as a feature, not a checkbox. The
              team&apos;s standing rule: if a WAVE audit surfaces a single
              error, the PR doesn&apos;t merge.
            </Typography>
            <TechPills aria-label="Tools and frameworks">
              {TECH_STACK.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </TechPills>
          </BuiltWithLeft>
          <BuiltWithRight>
            <StatCard>
              <StatCardTopRow>
                <StatCardKicker>Vercel Analytics</StatCardKicker>
              </StatCardTopRow>
              <StatCardTitle>Real Experience Score</StatCardTitle>
              <GaugeRow>
                {(
                  [
                    { label: 'Overall', score: 96 },
                    { label: 'Desktop', score: 99 },
                    { label: 'Mobile', score: 94 },
                  ] as const
                ).map(({ label, score }) => {
                  const r = 36;
                  const circ = 2 * Math.PI * r;
                  const dash = (score / 100) * circ;
                  return (
                    <GaugeItem key={label}>
                      <svg viewBox="0 0 80 80" width="80" height="80">
                        <circle
                          cx="40"
                          cy="40"
                          r={r}
                          fill="none"
                          stroke={Colors.greyDarkest}
                          strokeWidth="6"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r={r}
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="6"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        />
                        <text
                          x="40"
                          y="45"
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="700"
                        >
                          {score}
                        </text>
                      </svg>
                      <GaugeLabel>{label}</GaugeLabel>
                    </GaugeItem>
                  );
                })}
              </GaugeRow>
            </StatCard>
            <StatCard>
              <StatCardTopRow>
                <StatCardKicker>WAVE · WebAIM</StatCardKicker>
              </StatCardTopRow>
              <StatCardTitle>Accessibility audit</StatCardTitle>
              <BoxRow>
                {(
                  [
                    { num: 0, label: 'Errors' },
                    { num: 0, label: 'Contrast' },
                    { num: 3, label: 'Alerts' },
                    { num: 142, label: 'Features' },
                  ] as const
                ).map(({ num, label }) => (
                  <AccessBox key={label}>
                    <AccessBoxNum
                      style={{ color: num === 0 ? '#22c55e' : Colors.primary }}
                    >
                      {num}
                    </AccessBoxNum>
                    <AccessBoxLabel>{label}</AccessBoxLabel>
                  </AccessBox>
                ))}
              </BoxRow>
            </StatCard>
          </BuiltWithRight>
        </BuiltWithGrid>
      </FluidContainer>

      {/* ── What We Look For ── */}
      <TraitsSection id="what-we-look-for" aria-labelledby="lookfor-title">
        <TraitsInner>
          <SectionHead>
            <SectionKicker>Hiring Compass</SectionKicker>
            <Typography
              as="h2"
              variant="title"
              size={isMobile ? 'xl' : '2xl'}
              margin="0 0 14px"
              id="lookfor-title"
            >
              What We Look For
            </Typography>
            <Typography
              as="p"
              variant="subheader"
              size={isMobile ? 'sm' : 'md'}
              color="greyDarkest"
              lineHeight="1.6"
            >
              You don&apos;t need a perfect portfolio. You need curiosity, the
              patience to learn in public, and a real interest in the students
              who will use what you build.
            </Typography>
          </SectionHead>

          <TraitsGrid>
            {TRAITS.map((trait) => (
              <TraitCard key={trait.number}>
                <TraitIconBlock>
                  <Image src={trait.icon} alt="" width={92} height={92} />
                </TraitIconBlock>
                <TraitTitleRow>
                  <TraitNum>{trait.number}</TraitNum>
                  <span>{trait.title}</span>
                </TraitTitleRow>
                <Typography
                  as="p"
                  variant="copy"
                  size="sm"
                  lineHeight="1.6"
                  color="greyDarkest"
                >
                  {trait.description}
                </Typography>
                <TraitWhy>{trait.why}</TraitWhy>
              </TraitCard>
            ))}
          </TraitsGrid>
        </TraitsInner>
      </TraitsSection>

      {/* ── Pull Quote ── */}
      <QuoteBanner
        variant="yellow"
        quote="The Web Team is the first place I felt like an engineer instead of a student pretending to be one. I shipped to production end to end right away. By the time I graduated I was fully prepared for entering the workforce."
        name="Isaiah Villalobos"
        title="Alumnus · Class of 2026"
      />

      {/* ── Alumni ── */}
      <FluidContainer backgroundColor="greyLightest" id="alumni">
        <SectionHead>
          <SectionKicker>Graduated &amp; Soaring</SectionKicker>
          <Typography
            as="h2"
            variant="title"
            size={isMobile ? 'xl' : '2xl'}
            margin="0 0 14px"
          >
            Alumni
          </Typography>
          <Typography
            as="p"
            variant="subheader"
            size={isMobile ? 'sm' : 'md'}
            color="greyDarkest"
            lineHeight="1.6"
          >
            What our former team members did and where they landed. Every one of
            them remembers what it was like to be where you are, so reach out.
          </Typography>
        </SectionHead>

        <AlumniGrid>
          {ALUMNI.map((member) => (
            <PersonCard key={member.id} member={member} />
          ))}
        </AlumniGrid>
      </FluidContainer>

      {/* ── Games We Built ── */}
      <FluidContainer id="games">
        <SectionHead>
          <SectionKicker>Side Projects</SectionKicker>
          <Typography
            as="h2"
            variant="title"
            size={isMobile ? 'xl' : '2xl'}
            margin="0 0 14px"
          >
            Games We Built
          </Typography>
          <Typography
            as="p"
            variant="subheader"
            size={isMobile ? 'sm' : 'md'}
            color="greyDarkest"
            lineHeight="1.6"
          >
            Every summer break, somebody on the team ships a small browser game.
            They go up on the site, get played at U-SET, and end up in
            portfolios.
          </Typography>
        </SectionHead>

        <GamesGrid>
          <GameCard>
            <Link href="/graffix/web-team/games/hangman">
              <GameThumbnail
                gradient={`linear-gradient(135deg, ${Colors.blackMauve}, ${Colors.greyDarkest})`}
              >
                <GamePlayBtn>&#9654;</GamePlayBtn>
              </GameThumbnail>
            </Link>
            <GameBody>
              <GameTitle>Hangman</GameTitle>
              <GameLink href="/graffix/web-team/games/hangman">Play →</GameLink>
            </GameBody>
          </GameCard>
          <GameCard>
            <Link href="/graffix/web-team/games/tic-tac-toe">
              <GameThumbnail
                gradient={`linear-gradient(135deg, ${Colors.gold}, ${Colors.greyDarkest})`}
              >
                <GamePlayBtn>&#9654;</GamePlayBtn>
              </GameThumbnail>
            </Link>
            <GameBody>
              <GameTitle>Tic-Tac-Toe</GameTitle>
              <GameLink href="/graffix/web-team/games/tic-tac-toe">
                Play →
              </GameLink>
            </GameBody>
          </GameCard>
        </GamesGrid>
      </FluidContainer>

      {/* ── Join CTA ── */}
      <JoinCtaSection>
        <JoinCtaInner>
          <JoinCtaLeft>
            <Typography variant="pageHeader" color="white">
              Join the Web Team.
            </Typography>
            <Typography
              as="p"
              variant="copy"
              color="greyLighter"
              size="md"
              lineHeight="1.65"
            >
              We hire one student every summer. No portfolio required. Bring
              curiosity, kindness, and the will to ship your first commit in
              public.
            </Typography>
          </JoinCtaLeft>
          <JoinCtaButtons>
            <Button variant="primary" href="/employment">
              Apply now
            </Button>
            <Button variant="whiteOutline" href="mailto:jyasis@calstatela.edu">
              Get in touch
            </Button>
          </JoinCtaButtons>
        </JoinCtaInner>
      </JoinCtaSection>
    </Page>
  );
}
