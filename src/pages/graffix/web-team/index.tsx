import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  CountUp,
  FluidContainer,
  Image,
  QuoteBanner,
  Typography,
} from 'components';
import { Colors } from 'theme';
import { useBreakpoint } from 'hooks';
import OPSHeroVideo from '/videos/u-krew-header-video.mp4?thumbnailTime=0';
import MobileOPSHeroVideo from '/videos/mobile-u-krew-header-video.mp4?thumbnailTime=0';
import {
  StaffHighlightCard,
  SectionRail,
  PersonCard,
  HeaderWithVideo,
  Page,
  ALUMNI,
  STAFF_MEMBERS,
  TEAM_STATS,
  TECH_STACK,
  TRAITS,
  AccentBar,
  AccessBox,
  AccessBoxLabel,
  AccessBoxNum,
  AlumniGrid,
  BoxRow,
  BuiltWithGrid,
  BuiltWithKicker,
  BuiltWithLeft,
  BuiltWithRight,
  GameBody,
  GameCard,
  GameLink,
  GamePlayBtn,
  GamesGrid,
  GameThumbnail,
  GameTitle,
  GaugeItem,
  GaugeLabel,
  GaugeRow,
  HeroButtons,
  HeroContentWrapper,
  HeroEyebrow,
  HeroSubtext,
  HeroTextGroup,
  InlineMarqueeOuter,
  InlineMarqueeTrack,
  JoinCtaButtons,
  JoinCtaInner,
  JoinCtaLeft,
  JoinCtaSection,
  MarqueeLogo,
  OutcomeItem,
  OutcomeLabel,
  OutcomesGrid,
  SectionHead,
  SectionKicker,
  StaffGrid,
  StatBar,
  StatCard,
  StatCardKicker,
  StatCardTitle,
  StatCardTopRow,
  StatCell,
  StatLabel,
  StatNote,
  TechPill,
  TechPills,
  TraitCard,
  TraitIconBlock,
  TraitNum,
  TraitsGrid,
  TraitsInner,
  TraitsSection,
  TraitTitleRow,
  TraitWhy,
} from 'modules';
import companies from 'data/web-team-company-logos.json';

export default function WebTeam() {
  const { isMobile } = useBreakpoint();

  return (
    <Page>
      <SectionRail />
      <Head>
        <title>Graffix Web Team | U&ndash;SU</title>
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
          key="og-url"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/graffix-hero.webp"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Design work by the U-SU Graffix department at Cal State LA"
          key="og-image-alt"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/graffix/web-team"
          key="canonical"
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
                We are the student web developers and designers behind the
                U&ndash;SU websites including{' '}
                <strong>
                  calstatelausu.org, www.wingspanla.org, and slelections.org
                </strong>
                . We build, ship, and audit the site every Golden Eagle relies
                on and we train each other to leave it better than we found it.
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

        <FluidContainer padding="72px 0 0">
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
