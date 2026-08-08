import Head from 'next/head';
import { BarChart, Page, ShareChart, TrendChart } from 'modules';
import {
  anchorLinks,
  bandStats,
  barRows,
  beforeYouWeighInCards,
  CAL_STATE_LA_ROW_ID,
  campaignMode,
  facultyItems,
  feeMath,
  FISCAL_YEARS,
  heroEyebrow,
  heroFigures,
  proposedSpaces,
  reserveCallouts,
  services,
  shareSegments,
  sources,
  testimonials,
  thesisCards,
  todayFacts,
  trendSeries,
  trendTable,
} from 'modules/KeepTheUOpen/content';
import { faq } from 'modules/KeepTheUOpen/faq';
import {
  AnchorNav,
  AutoGrid,
  Button,
  Card,
  CitationMarker,
  CitedStat,
  Divider,
  Expandable,
  FluidContainer,
  Panel,
  PlaceholderMarker,
  SourceList,
  StyledLink,
  TestimonialCard,
  Typography,
} from 'components';
import { Spaces } from 'theme';
import { BiPlus } from 'react-icons/bi';

/* Fluid section padding, applied at every breakpoint so the clamp() — not
   FluidContainer's own responsive defaults — governs. */
const SECTION_PADDING = 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 36px)';
const BAND_PADDING = 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 36px)';

/* Matches FluidContainer's own default, and so the rest of the site. Set here
   rather than left implicit because the anchor nav has to line its items up
   with the sections below it, and it needs the value to do that. Running text
   is capped separately by its own measure, so widening this only gives the
   charts and card grids more room. */
const CONTENT_MAX_WIDTH = '1440px';

const sectionShell = {
  padding: SECTION_PADDING,
  paddingDesktop: SECTION_PADDING,
  paddingMobile: SECTION_PADDING,
  innerMaxWidth: CONTENT_MAX_WIDTH,
  scrollMarginTop: '84px',
  revealOnScroll: true,
} as const;

const bandShell = {
  padding: BAND_PADDING,
  paddingDesktop: BAND_PADDING,
  paddingMobile: BAND_PADDING,
  innerMaxWidth: CONTENT_MAX_WIDTH,
  scrollMarginTop: '84px',
  revealOnScroll: true,
} as const;

/* FAQ and Sources read at a narrower measure than the rest of the page. */
const proseShell = { ...sectionShell, innerMaxWidth: '900px' } as const;

const FLUID_H1 = 'clamp(42px, 6.4vw, 76px)';
const FLUID_H2 = 'clamp(30px, 3.8vw, 46px)';
const FLUID_H3 = 'clamp(24px, 2.6vw, 32px)';
const FLUID_HERO_BODY = 'clamp(17px, 1.6vw, 21px)';

/**
 * Chart animation. All of it is optional and fires once, on first scroll into
 * view. `prefers-reduced-motion: reduce` short-circuits every one of them and
 * paints the charts at their final state, counted figures included.
 */
const chartAnimation = {
  animateTrend: true,
  animateBars: true,
  shareAnimation: 'sweep',
  donutVariant: 'donut',
  animationDuration: 1400,
} as const;

export default function KeepTheUOpen() {
  return (
    <Page>
      <Head>
        <title>Keep the U Open | Cal State LA U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="What the proposed $90-per-semester University-Student Union fee would cost, where the money goes, and what the U-SU budget projection shows. Every figure is sourced."
          key="description"
        />
        <meta
          property="og:title"
          content="Keep the U Open | University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="The U-SU fee hasn't changed since 2007. Here's the proposal, the budget projection behind it, and every source."
          key="og-desc"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/keep-the-u-open"
        />
        <meta property="og:image" content="/usu-front.jpg" key="og-image" />
        <meta
          property="og:image:alt"
          content="The University-Student Union building at Cal State LA"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://www.calstatelausu.org/keep-the-u-open"
        />
      </Head>

      {/* 1 · AnchorNav — hidden ≤768px */}
      <AnchorNav
        title="Keep the U Open"
        links={anchorLinks}
        ctaLabel={campaignMode.ctaLabel}
        ctaHref={campaignMode.ctaHref}
        contentMaxWidth={sectionShell.innerMaxWidth}
      />

      {/* 2 · Hero */}
      <FluidContainer
        backgroundImage="/usu-front.jpg"
        backgroundOverlay="rgba(0, 0, 0, 0.66)"
        padding="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingDesktop="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingMobile="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        innerMaxWidth={CONTENT_MAX_WIDTH}
      >
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.14em"
          color="primary"
          margin={`0 0 ${Spaces.md}`}
        >
          {heroEyebrow}
        </Typography>
        <Typography
          as="h1"
          variant="pageHeader"
          fluidSize={FLUID_H1}
          lineHeight="1.05"
          color="white"
        >
          Change Starts With U
        </Typography>
        <Typography
          as="p"
          variant="copy"
          fluidSize={FLUID_HERO_BODY}
          lineHeight="1.6"
          color="greyLightest"
          margin={`${Spaces.lg} 0 0`}
          style={{ maxWidth: '62ch' }}
        >
          The University-Student Union runs on a student fee that hasn&apos;t
          changed since 2007.
          <br />
          On the current budget, the reserves will dry up by{' '}
          <Typography
            as="span"
            variant="copy"
            fluidSize={FLUID_HERO_BODY}
            weight="700"
            color="white"
          >
            FY 2030-31
          </Typography>
          .
          <br />
          The proposal:{' '}
          <Typography
            as="span"
            variant="copy"
            fluidSize={FLUID_HERO_BODY}
            weight="700"
            color="white"
          >
            $90 more per semester,
          </Typography>{' '}
          or $5.63 a week to expand our programs.
        </Typography>
        <div>
          <Button
            variant="primary"
            href="#numbers"
            margin={`${Spaces.lg} ${Spaces.md} 0 0`}
          >
            {campaignMode.heroPrimaryCta}
          </Button>
          <Button
            variant="whiteOutline"
            href="#cost"
            margin={`${Spaces.lg} 0 0`}
          >
            {campaignMode.heroSecondaryCta}
          </Button>
        </div>
        {campaignMode.voteDate && (
          <Typography
            as="p"
            variant="span"
            size="xs"
            weight="700"
            color="primary"
            margin={`${Spaces.md} 0 0`}
          >
            {campaignMode.voteDate}
          </Typography>
        )}
        <Divider
          color="greyDark"
          size="1px"
          margin={`${Spaces.xl} 0 ${Spaces.lg}`}
        />
        <AutoGrid minColumnWidth="200px" gap={Spaces.lg}>
          {heroFigures.map((figure) => (
            <CitedStat
              key={figure.label}
              variant="onDark"
              value={figure.value}
              label={figure.label}
              highlightValue={figure.highlight}
            />
          ))}
        </AutoGrid>
      </FluidContainer>

      {/* 3 · Thesis */}
      <FluidContainer {...sectionShell} id="why" backgroundColor="white">
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="gold"
          margin={`0 0 ${Spaces.md}`}
        >
          Why it matters
        </Typography>
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
        >
          You already paid for this building. Here&apos;s what you own.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.md} 0 ${Spaces.xl}`}
          style={{ maxWidth: '68ch' }}
        >
          Most Cal State LA students commute. The U-SU is the part of campus
          that is useful whether or not you have class in the next hour and
          it&apos;s already included in what you pay.
        </Typography>
        <AutoGrid minColumnWidth="280px">
          {thesisCards.map((card) => (
            <Panel
              key={card.number}
              border="greyLighter"
              shadow="none"
              borderRadius="16px"
              padding="28px"
            >
              <div>
                <Typography
                  as="p"
                  variant="span"
                  size="2xs"
                  weight="800"
                  color="gold"
                  tabularNums
                  letterSpacing="0.08em"
                  margin={`0 0 ${Spaces.md}`}
                >
                  {card.number}
                </Typography>
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size="lg"
                  weight="700"
                  lineHeight="1.25"
                >
                  {card.title}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="sm"
                  lineHeight="1.6"
                  margin={`${Spaces.md} 0 0`}
                >
                  {card.body}
                  {card.citation && <CitationMarker sourceId={card.citation} />}
                  {card.bodyAfterCitation}
                </Typography>
              </div>
            </Panel>
          ))}
        </AutoGrid>
        {/* Solidarity bridge — sits after the cards, not as the opening frame */}
        <Panel
          shadow="none"
          padding={`0 0 0 ${Spaces.lg}`}
          margin={`${Spaces.xl} 0 0`}
          backgroundColor="transparent"
        >
          <Typography
            as="p"
            variant="copy"
            fluidSize="clamp(17px, 1.6vw, 20px)"
            lineHeight="1.6"
            style={{ maxWidth: '68ch' }}
          >
            And if you&apos;re one of the students who never comes in, someone
            you know does. The pantry, the quiet floor and the cultural
            graduations are load-bearing for people who don&apos;t advertise
            that they need them.
          </Typography>
        </Panel>
      </FluidContainer>

      {/* 4 · Services */}
      <FluidContainer {...sectionShell} backgroundColor="greyLightest">
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          What&apos;s inside the building
        </Typography>
        <AutoGrid minColumnWidth="280px">
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              iconSrc={service.iconSrc}
              iconAlt=""
              iconWidth="64px"
              iconHeight="64px"
              borderRadius="16px"
              shadow="soft"
            >
              <Typography as="p" variant="copy" size="sm" lineHeight="1.6">
                {service.body}
              </Typography>
            </Card>
          ))}
        </AutoGrid>
      </FluidContainer>

      {/* 5 · Event-photo band */}
      <FluidContainer
        backgroundImage="/about/calstatela-hero.jpeg"
        backgroundPosition="center 40%"
        backgroundColor="greyDarkest"
        height="clamp(260px, 30vw, 420px)"
        padding="clamp(20px, 4vw, 36px)"
        paddingDesktop="clamp(20px, 4vw, 36px)"
        paddingMobile="clamp(20px, 4vw, 36px)"
        outerAlignItems="flex-end"
        innerMaxWidth={CONTENT_MAX_WIDTH}
        revealOnScroll
      >
        <Panel
          backgroundColor="greyDarkest"
          shadow="none"
          borderRadius="8px"
          padding="8px 14px"
        >
          <Typography
            as="p"
            variant="span"
            size="2xs"
            weight="700"
            letterSpacing="0.06em"
            color="primary"
          >
            [PLACEHOLDER PHOTOGRAPHY — real U-SU event photography required
            before launch]
          </Typography>
        </Panel>
      </FluidContainer>

      {/* 6 · StatBand — black on yellow only, never white */}
      <FluidContainer {...bandShell} backgroundColor="primary">
        <AutoGrid minColumnWidth="240px" gap="clamp(24px, 4vw, 56px)">
          {bandStats.map((stat) => (
            <CitedStat
              key={stat.value}
              variant="onPrimary"
              value={stat.value}
              label={stat.label}
              sourceId={stat.citation}
            />
          ))}
        </AutoGrid>
      </FluidContainer>

      {/* 7 · The Numbers */}
      <FluidContainer {...sectionShell} id="numbers" backgroundColor="white">
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="gold"
          margin={`0 0 ${Spaces.md}`}
        >
          The numbers
        </Typography>
        <br />
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          What it costs, where it goes, what the budget says.
        </Typography>

        {/* 7.1 · Fee math — the hero's secondary-CTA target */}
        <div id="cost">
          <Typography
            as="h3"
            variant="pageHeader"
            fluidSize={FLUID_H3}
            lineHeight="1.2"
            margin={`0 0 ${Spaces.lg}`}
          >
            What this costs you
          </Typography>
          <AutoGrid minColumnWidth="240px">
            {feeMath.map((column) => (
              <CitedStat
                key={column.heading}
                variant="onLight"
                eyebrow={column.heading}
                value={column.value}
                label={column.detail}
                sourceId={column.citation}
                accentColor={column.accentColor}
              />
            ))}
          </AutoGrid>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.lg} 0 0`}
            style={{ maxWidth: '68ch' }}
          >
            The $5.63 is per week across a 16-week semester. The fee was last
            set in 2007
            <CitationMarker sourceId="2" /> and hasn&apos;t moved ever since.
            The proposed contract language also includes an annual inflation
            adjustment capped at 3%.
            <CitationMarker sourceId="2" />
          </Typography>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
            style={{ maxWidth: '68ch' }}
          >
            Cal State LA has the lowest student center fee of any CSU campus:
            $275 a year, unchanged since 2007.
            <CitationMarker sourceId="1" />
          </Typography>
        </div>

        {/* 7.2 · TrendChart */}
        <Divider
          color="greyLighter"
          size="1px"
          margin={`clamp(48px, 6vw, 80px) 0 ${Spaces.xl}`}
        />
        <Panel
          border="greyLighter"
          shadow="none"
          borderRadius="16px"
          padding="clamp(16px, 2vw, 28px)"
          width="100%"
        >
          <div>
            <Typography
              as="h3"
              variant="pageHeader"
              fluidSize={FLUID_H3}
              lineHeight="1.2"
            >
              Revenue and expenses, if nothing changes
            </Typography>
            <Typography
              as="p"
              variant="span"
              size="xs"
              color="greyDark"
              margin={`${Spaces.sm} 0 ${Spaces.lg}`}
            >
              U-SU Fiscal Committee, &ldquo;DO NOTHING&rdquo; projection, April
              10 2026
              <CitationMarker sourceId="2" />
            </Typography>
            <TrendChart
              fiscalYears={FISCAL_YEARS}
              series={trendSeries}
              markers={[
                {
                  seriesId: 'reserve',
                  label: 'Reserve reaches $0',
                  /* Below and left of the ring: above it would sit on the
                     FY 29-30 reserve figure. */
                  labelPosition: { dx: -8, dy: 26, anchor: 'end' },
                },
              ]}
              shadeBetween={['expenses', 'revenue']}
              ariaLabel="Line chart of the U-SU DO NOTHING projection. Expenses rise from $5,760,109 in FY 2025-26 to $6,677,545 in FY 2030-31 while revenue falls from $4,876,638 to $4,337,325. The reserve falls from $8,364,353 in FY 2024-25 to $274,702 in FY 2029-30 and to negative $2,065,518 in FY 2030-31, crossing zero during FY 2029-30."
              caption="Plotted points are published figures. Revenue and expenses are published for FY 2025-26 and FY 2030-31 only, and the reserve for FY 2024-25, FY 2029-30 and FY 2030-31. The lines between them are trajectories, not year-by-year data."
              table={trendTable}
              animate={chartAnimation.animateTrend}
              animationDuration={chartAnimation.animationDuration}
            />
            <AutoGrid minColumnWidth="200px" margin="clamp(16px, 2vw, 28px)">
              {reserveCallouts.map((callout) => (
                <CitedStat
                  key={callout.eyebrow}
                  variant="onLight"
                  eyebrow={callout.eyebrow}
                  value={callout.value}
                />
              ))}
            </AutoGrid>
            <Typography
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              margin={`${Spaces.lg} 0 0`}
            >
              Figures are from the Fiscal Committee&apos;s April 10 2026
              &ldquo;DO NOTHING&rdquo; projection: the model in which the fee
              stays at $137.25. $2,000,000 was cut across FY 2024-25 and FY
              2025-26, 25% of the operating budget. An annual bond payment of
              about $1,920,000, roughly a third of the operating budget, runs
              through 2038.
            </Typography>
          </div>
        </Panel>

        {/* 7.3 · ShareChart */}
        <Divider
          color="greyLighter"
          size="1px"
          margin={`clamp(48px, 6vw, 80px) 0 ${Spaces.xl}`}
        />
        <Panel
          border="greyLighter"
          shadow="none"
          borderRadius="16px"
          padding="clamp(16px, 2vw, 28px)"
          width="100%"
        >
          <div>
            <Typography
              as="h3"
              variant="pageHeader"
              fluidSize={FLUID_H3}
              lineHeight="1.2"
            >
              Where your $227.25 goes
            </Typography>
            <Typography
              as="p"
              variant="span"
              size="xs"
              color="greyDark"
              margin={`${Spaces.sm} 0 ${Spaces.lg}`}
            >
              Share of the U-SU operating budget, applied to the proposed
              semester fee
            </Typography>
            <ShareChart
              segments={shareSegments}
              total="$227.25"
              totalLabel="per semester"
              variant={chartAnimation.donutVariant}
              animation={chartAnimation.shareAnimation}
              animationDuration={chartAnimation.animationDuration}
              ariaLabel="Donut chart of the proposed $227.25 semester fee. The bond payment on the building is 33%, or $75.00. Everything else, including operations, staffing, programs and maintenance, is 67%, or $152.25."
            />
          </div>
        </Panel>

        {/* 7.4 · BarChart */}
        <Divider
          color="greyLighter"
          size="1px"
          margin={`clamp(48px, 6vw, 80px) 0 ${Spaces.xl}`}
        />
        <Panel
          border="greyLighter"
          shadow="none"
          borderRadius="16px"
          padding="clamp(16px, 2vw, 28px)"
          width="100%"
        >
          <div>
            <Typography
              as="h3"
              variant="pageHeader"
              fluidSize={FLUID_H3}
              lineHeight="1.2"
            >
              Even after this passes, Cal State LA is still the second most
              affordable university in the CSU.
            </Typography>
            <Typography
              as="p"
              variant="span"
              size="xs"
              color="greyDark"
              margin={`${Spaces.sm} 0 ${Spaces.lg}`}
            >
              Total campus mandatory fees per year, 2025-26, across the
              CSU&apos;s 22 campuses
              <CitationMarker sourceId="1" />
            </Typography>
            <BarChart
              rows={barRows}
              cap={3000}
              median={{ value: 1946, label: 'CSU median $1,946' }}
              highlightId={CAL_STATE_LA_ROW_ID}
              animate={chartAnimation.animateBars}
              animationDuration={chartAnimation.animationDuration}
              ariaLabel="Bar chart of total annual campus mandatory fees across the CSU's 22 campuses for 2025-26. Cal State LA is $1,084 today and $1,264 as proposed, the second lowest after Channel Islands at $1,146. Every campus figure is listed in the value column beside its bar."
            />
            <Typography
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              margin={`${Spaces.lg} 0 0`}
            >
              Value axis is capped at $3,000 for easier viewing. San Luis
              Obispo&apos;s true figure is $7,000 and its bar is drawn at the
              cap.
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              margin={`${Spaces.sm} 0 0`}
            >
              CSU median $1,946; mean $2,161. The median is used here because
              the mean is pulled up by a single outlier.
              <CitationMarker sourceId="1" />
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              margin={`${Spaces.sm} 0 0`}
            >
              22 campuses. The 2025-26 table lists 23; Maritime merged
              administratively with Cal Poly on July 1 2025 and moves to Cal
              Poly&apos;s fee structure in fall 2026.
              <CitationMarker sourceId="6" />
            </Typography>
          </div>
        </Panel>

        {/* 7.5 · Inflation gap */}
        <Divider
          color="greyLighter"
          size="1px"
          margin={`clamp(48px, 6vw, 80px) 0 ${Spaces.xl}`}
        />
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
          lineHeight="1.2"
        >
          The part that doesn&apos;t add up on its own
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.md} 0 0`}
          style={{ maxWidth: '68ch' }}
        >
          If the 2007 fee had only kept pace with inflation, it would be{' '}
          <strong>$215.30 a semester</strong> today.
          <CitationMarker sourceId="5" /> The proposal is{' '}
          <strong>$227.25</strong>; $11.95 more than inflation alone would
          explain. That difference is real, and it&apos;s there because catching
          up on inflation does not close a shortfall that&apos;s also driven by
          enrollment decline.
          <CitationMarker sourceId="3" /> Student fees currently cover 67% of
          what the U-SU costs to run; the sustainable range is 80–85%.
          <CitationMarker sourceId="2" />
        </Typography>
      </FluidContainer>

      {/* 7.9 · What opens up if this passes */}
      <FluidContainer
        {...sectionShell}
        id="if-it-passes"
        backgroundColor="white"
      >
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="gold"
          margin={`0 0 ${Spaces.md}`}
        >
          If it passes
        </Typography>
        <br />
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.md}`}
        >
          What opens up if this passes
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          color="greyDark"
          margin={`0 0 ${Spaces.xl}`}
          style={{ maxWidth: '68ch' }}
        >
          These are the spaces the U-SU has identified to add or convert. They
          are described here only as far as they have been described — nothing
          below is scheduled, costed, or final.{' '}
          <PlaceholderMarker>
            [NEEDS COPY — timeline and phasing]
          </PlaceholderMarker>
        </Typography>
        <AutoGrid minColumnWidth="280px">
          {proposedSpaces.map((space) => (
            <Card
              key={space.title}
              title={space.title}
              borderRadius="16px"
              shadow="soft"
            >
              <Typography as="p" variant="copy" size="sm" lineHeight="1.6">
                {space.body}
                {space.marker && (
                  <>
                    {' '}
                    <PlaceholderMarker>{space.marker}</PlaceholderMarker>
                  </>
                )}
              </Typography>
            </Card>
          ))}
        </AutoGrid>
        <Panel
          border="greyLighter"
          borderStyle="dashed"
          borderRadius="16px"
          shadow="none"
          padding="clamp(20px, 3vw, 32px)"
          margin={`${Spaces.xl} 0 0`}
        >
          <div>
            <Typography
              as="p"
              variant="span"
              size="xs"
              weight="800"
              letterSpacing="0.06em"
              color="gold"
            >
              [AWAITING RENDERINGS — 6 spaces]
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="sm"
              lineHeight="1.6"
              color="greyDark"
              margin={`${Spaces.md} 0 0`}
              style={{ maxWidth: '56ch' }}
            >
              This section is the one place on the page where a picture would do
              more than a sentence. Nothing ships here until there is a real
              rendering or photograph of each space.
            </Typography>
          </div>
        </Panel>
      </FluidContainer>

      {/* 8 · What changes if this doesn't pass */}
      <FluidContainer
        {...sectionShell}
        id="if-it-fails"
        backgroundColor="greyLightest"
      >
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="gold"
          margin={`0 0 ${Spaces.md}`}
        >
          If it doesn&apos;t pass
        </Typography>
        <br />
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          What changes if this doesn&apos;t pass
        </Typography>
        <AutoGrid minColumnWidth="320px">
          <Panel
            border="greyLighter"
            shadow="none"
            borderRadius="16px"
            padding="clamp(20px, 3vw, 32px)"
          >
            <div>
              <Typography
                as="p"
                variant="span"
                size="2xs"
                weight="700"
                uppercase
                letterSpacing="0.08em"
                color="greyDark"
                margin={`0 0 ${Spaces.md}`}
              >
                Today, funded by the current fee
              </Typography>
              {todayFacts.map((fact, index) => (
                <div key={fact.label}>
                  {index > 0 && (
                    <Divider
                      color="greyLighter"
                      size="1px"
                      margin={`${Spaces.md} 0`}
                    />
                  )}
                  <Typography as="p" variant="span" size="sm" weight="700">
                    {fact.label}
                  </Typography>
                  <Typography
                    as="p"
                    variant="copy"
                    size="sm"
                    lineHeight="1.6"
                    margin={`${Spaces.xs} 0 0`}
                  >
                    {fact.body}
                    {fact.marker && (
                      <>
                        {' '}
                        <PlaceholderMarker>{fact.marker}</PlaceholderMarker>
                      </>
                    )}
                  </Typography>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            backgroundColor="greyDarkest"
            shadow="none"
            borderRadius="16px"
            padding="clamp(20px, 3vw, 32px)"
          >
            <div>
              <Typography
                as="p"
                variant="span"
                size="2xs"
                weight="700"
                uppercase
                letterSpacing="0.08em"
                color="primary"
                margin={`0 0 ${Spaces.md}`}
              >
                After FY 2030-31, on the current fee
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                color="white"
                tabularNums
              >
                In the DO NOTHING projection, FY 2030-31 expenses of $6,677,545
                run $2,340,220 past revenue — 35% of that year&apos;s spending —
                and the reserve closes the year at −$2,065,518. The bond payment
                of about $1,920,000 continues through 2038 and cannot be
                reduced.
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                color="greyLighter"
                margin={`${Spaces.md} 0 0`}
              >
                Everything in the column beside this one is paid for out of the
                same budget. The U-SU has not decided or published which of them
                it would reduce, and this page will not guess.
              </Typography>
              <Typography as="p" margin={`${Spaces.lg} 0 0`}>
                <PlaceholderMarker variant="block" tone="primary">
                  [NEEDS COPY — service-level impact statement, U-SU Fiscal
                  Committee]
                </PlaceholderMarker>
              </Typography>
            </div>
          </Panel>
        </AutoGrid>
      </FluidContainer>

      {/* 9 · Financial aid */}
      <FluidContainer {...sectionShell} backgroundColor="white">
        <Card
          title="Does financial aid cover the increase?"
          titleAs="h2"
          backgroundColor="greyLightest"
          borderRadius="16px"
          shadow="none"
          padding="clamp(20px, 3vw, 32px)"
        >
          <PlaceholderMarker variant="block">
            [NEEDS COPY — Financial Aid]
          </PlaceholderMarker>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
          >
            This answer has to come from Cal State LA Financial Aid, in their
            words, and it will be published here before anything else on this
            page is finalized. Until then:{' '}
            <StyledLink
              href="https://www.calstatela.edu/financialaid"
              isExternalLink
            >
              Cal State LA Financial Aid
            </StyledLink>
            .
          </Typography>
        </Card>
      </FluidContainer>

      {/* 10 · Testimonials — renders from an empty array */}
      <FluidContainer {...sectionShell} backgroundColor="greyLightest">
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          In students&apos; own words
        </Typography>
        {testimonials.length > 0 ? (
          <AutoGrid minColumnWidth="260px">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </AutoGrid>
        ) : (
          <Panel
            border="greyLighter"
            borderStyle="dashed"
            borderRadius="16px"
            shadow="none"
            padding="clamp(28px, 4vw, 48px)"
          >
            <div>
              <Typography
                as="p"
                variant="span"
                size="xs"
                weight="800"
                letterSpacing="0.06em"
                color="gold"
              >
                [AWAITING REAL QUOTES — 4 needed, with written consent]
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                color="greyDark"
                margin={`${Spaces.md} 0 0`}
                style={{ maxWidth: '56ch' }}
              >
                The TestimonialCard grid renders from an empty array. The four
                quotes in v1 were invented and have been removed. Nothing ships
                here without a named student and a signed release.
              </Typography>
            </div>
          </Panel>
        )}
      </FluidContainer>

      {/* 11 · Before you weigh in */}
      <FluidContainer {...sectionShell} backgroundColor="white">
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          {campaignMode.beforeHeading}
        </Typography>
        <AutoGrid minColumnWidth="260px">
          {beforeYouWeighInCards.map((card) => (
            <Panel
              key={card.title}
              border="greyLighter"
              shadow="none"
              borderRadius="16px"
              padding="28px"
            >
              <div>
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size="lg"
                  weight="700"
                  lineHeight="1.25"
                >
                  {card.title}
                </Typography>
                <Typography
                  as="p"
                  variant="copy"
                  size="sm"
                  lineHeight="1.6"
                  margin={`${Spaces.md} 0 0`}
                >
                  {card.body}
                </Typography>
              </div>
              {card.linkText && card.href && (
                <Typography as="p" variant="span" size="xs" weight="700">
                  <StyledLink href={card.href}>{card.linkText}</StyledLink>
                </Typography>
              )}
              {card.marker && (
                <PlaceholderMarker>{card.marker}</PlaceholderMarker>
              )}
            </Panel>
          ))}
        </AutoGrid>
      </FluidContainer>

      {/* 12 · FAQ */}
      <FluidContainer {...proseShell} id="faq" backgroundColor="greyLightest">
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          Questions
        </Typography>
        {faq.map((item, index) => (
          <div key={item.question}>
            {index > 0 && (
              <Divider
                color="greyLighter"
                size="1px"
                margin={`${Spaces.md} 0`}
              />
            )}
            <Expandable
              indicator={<BiPlus size={24} />}
              indicatorRotation="45deg"
              header={
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size="lg"
                  weight="700"
                  lineHeight="1.3"
                >
                  {item.question}
                </Typography>
              }
            >
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                margin={`${Spaces.sm} 0 0`}
              >
                {item.answer}
              </Typography>
            </Expandable>
          </div>
        ))}
      </FluidContainer>

      {/* 13 · For faculty & staff */}
      <FluidContainer {...bandShell} backgroundColor="greyDarkest">
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="primary"
          margin={`0 0 ${Spaces.lg}`}
        >
          For faculty &amp; staff
        </Typography>
        <AutoGrid minColumnWidth="260px">
          {facultyItems.map((item) => (
            <div key={item.title}>
              <Typography
                as="h3"
                variant="titleSmall"
                size="md"
                weight="700"
                lineHeight="1.3"
                color="white"
              >
                {item.title}
              </Typography>
              <Typography
                as="p"
                variant="copy"
                size="sm"
                lineHeight="1.6"
                color="greyLighter"
                margin={`${Spaces.sm} 0 0`}
              >
                {item.body}
                {item.linkText && item.href && (
                  <>
                    {' '}
                    <StyledLink href={item.href}>{item.linkText}</StyledLink>
                  </>
                )}
              </Typography>
            </div>
          ))}
        </AutoGrid>
      </FluidContainer>

      {/* 14 · Sources — SourceList pending; ids must stay #source-1…6 */}
      <FluidContainer {...proseShell} id="sources" backgroundColor="white">
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.12em"
          color="gold"
          margin={`0 0 ${Spaces.md}`}
        >
          Sources
        </Typography>
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
        >
          Every number and where it came from
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.md} 0 ${Spaces.lg}`}
        >
          The superscript markers throughout this page link here. If a figure on
          this page is not traceable to one of these documents, it is marked as
          missing rather than estimated.
        </Typography>
        <SourceList sources={sources} />
      </FluidContainer>

      {/* 15 · Final CTA */}
      <FluidContainer {...bandShell} backgroundColor="primary">
        <Typography
          as="h2"
          variant="pageHeader"
          fluidSize={FLUID_H2}
          lineHeight="1.15"
          color="black"
        >
          {campaignMode.finalHeading}
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          color="black"
          margin={`${Spaces.md} 0 ${Spaces.lg}`}
          style={{ maxWidth: '68ch' }}
        >
          {campaignMode.finalBody}
        </Typography>
        <div>
          <Button
            variant="black"
            href={campaignMode.ctaHref}
            margin={`0 ${Spaces.md} 0 0`}
          >
            {campaignMode.ctaLabel}
          </Button>
          <Button variant="outline" href="#faq">
            Read the FAQ
          </Button>
        </div>
      </FluidContainer>

      {/* 16 · Disclaimer strip */}
      <FluidContainer
        backgroundColor="greyLightest"
        border="greyLighter"
        padding={`${Spaces.lg} clamp(20px, 4vw, 36px)`}
        paddingDesktop={`${Spaces.lg} clamp(20px, 4vw, 36px)`}
        paddingMobile={`${Spaces.lg} clamp(20px, 4vw, 36px)`}
        innerMaxWidth={CONTENT_MAX_WIDTH}
      >
        <Typography as="p" variant="span" size="2xs" color="greyDark">
          Prototype for review — not a published U-SU communication. This page
          describes a {campaignMode.actionVerb} that has not been finalized.
          Items marked [NEEDS FIGURE], [NEEDS COPY] or [NEEDS LINK] are
          unresolved and must be confirmed before launch; photography is
          placeholder.
        </Typography>
      </FluidContainer>
    </Page>
  );
}
