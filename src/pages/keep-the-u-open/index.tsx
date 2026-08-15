import Head from 'next/head';
import styled from 'styled-components';
import { BarChart, formatDollars, Page, ShareChart, TrendChart } from 'modules';
import {
  anchorLinks,
  bandStats,
  barRows,
  beforeYouWeighInCards,
  buildingGalleryItems,
  CAL_STATE_LA_ROW_ID,
  campaignMode,
  facultyItems,
  feeMath,
  FISCAL_YEARS,
  heroEyebrow,
  heroFigures,
  type PeerOutcome,
  peerOutcomes,
  proposedSpaces,
  reserveCallouts,
  sampleTestimonials,
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
  Eyebrow,
  FluidContainer,
  GridGallery,
  Monogram,
  Panel,
  PlaceholderMarker,
  PrototypeNotice,
  ScrollCue,
  SourceList,
  StyledLink,
  Table,
  Tabs,
  TestimonialCard,
  TextAndImage,
  Typography,
} from 'components';
import { Colors, FontSizes, Spaces } from 'theme';
import type { TableData } from 'types';
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

/* Reading measure for running text. Sections and panels are as wide as their
   charts and grids need; the prose inside them is not. A line much past 75
   characters loses the reader on the return sweep — they land back on the
   line they just finished. Every paragraph on this page is capped here. */
const MEASURE = '68ch';

/* A looser measure for prose sitting under a full-width chart, where the
   default reads mean against all that width. Still short of the ~85 where a
   line stops being comfortably scannable. */
const WIDE_MEASURE = '80ch';

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

/* The FAQ reads at a narrower measure than the rest of the page. */
const proseShell = { ...sectionShell, innerMaxWidth: '900px' } as const;

/* Type scales with the viewport, but both ends of every clamp are real
   FontSizes steps, so no width renders a size that is off the scale. Each
   maximum is the size an existing variant already uses for that level:
   pageHeader (4xl), title (2xl), titleSmall (xl), and one step above body
   copy for the lead paragraphs that open the hero and the solidarity note. */
const FLUID_H1 = `clamp(${FontSizes['2xl']}, 6.4vw, ${FontSizes['4xl']})`;
const FLUID_H2 = `clamp(${FontSizes.xl}, 3.8vw, ${FontSizes['2xl']})`;
const FLUID_H3 = `clamp(${FontSizes.lg}, 2.6vw, ${FontSizes.xl})`;
const FLUID_LEAD = `clamp(${FontSizes.sm}, 1.6vw, ${FontSizes.md})`;

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

/* One illustration per section header. Every one of these is a placeholder
   pulled from vectors already in the repo — chosen to hold the slot, not
   because it is the right drawing. Swap the paths here and nothing else needs
   to change. Charts and sourced figures stay unillustrated on purpose:
   decoration next to a cited number reads as spin. */
const sectionIllustrations = {
  /* u-su-undraw.svg is a 1536×1024 PNG in an SVG wrapper — 1.9MB, no paths —
     so it stays out of the repo. Swap this back to it once it is a real
     vector, or a sized WebP. */
  whyItMatters: '/vectors/about/community.svg',
  whatItCosts: '/vectors/about/data2.svg',
  inflationGap: '/vectors/about/question-answered.svg',
  whatCanChange: '/vectors/about/upgrade.svg',
  beforeYouDecide: '/vectors/about/solution-mindset.svg',
} as const;

/* Height, not width, is what these share. The undraw set mixes landscape and
   portrait artwork, so one max-width leaves the portrait drawings tall and the
   people inside them towering over the people in the landscape ones. Height is
   the dimension that actually governs how big a figure reads, since in all of
   these the figure fills most of the drawing; width is left to follow each
   artwork's own ratio. Each usage still chooses its own side and in-column
   alignment.

   The ceiling is set so that even the widest drawing in the set — upgrade.svg,
   at nearly 2:1 — still fits its column at that height. A wider one would be
   clamped by the column and render shorter than the rest, which is the
   inconsistency this is here to remove. */
const SECTION_ILLUSTRATION_HEIGHT = 'clamp(150px, 15vw, 200px)';
const SECTION_ILLUSTRATION_COLUMN_WIDTH = 'minmax(0, 0.5fr)';

/* Renders `sampleTestimonials` under the empty state, so the grid can be seen
   at the lengths real quotes will run to. Those cards are bracketed
   scaffolding, not copy — see the array's comment in `content.ts`. Flip to
   false to preview the empty state alone; delete this flag, the array, and the
   block that reads them once real quotes land. */
const PREVIEW_TESTIMONIAL_LAYOUT = true;

/* Vector, so it stays sharp at any density — the PNGs this replaced were
   64px and softened on every retina display. Gold rather than the brand
   yellow because yellow on a white card is barely visible; these are
   decorative, but a decoration nobody can see is just noise. */
const SERVICE_ICON_SIZE = 44;

/* The campus cell pairs a Monogram with the name. No CSU seals or logos exist
   in this repo, and borrowing a real one would imply that campus endorses our
   fee. Lettered tiles carry the weight without borrowing anyone's mark. */
const CampusCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spaces.md};
  min-width: 0;
`;

const sourceHrefById = new Map(
  sources.map((source) => [source.id, source.href]),
);

const renderCampusCell = (outcome: PeerOutcome) => (
  <CampusCell>
    <Monogram
      label={outcome.monogram}
      shape="rounded"
      size="34px"
      isDecorative
    />
    <Typography as="span" variant="labelTitle" size="sm" weight="700">
      {outcome.campus}
    </Typography>
  </CampusCell>
);

/* Built here rather than in `content.ts` because these cells render links,
   monograms and citation markers, and that module is a `.ts` file with no
   JSX. The copy still lives in `peerOutcomes`; this only wires it to the
   shared Table, which already gives a semantic <table> above 768px and
   stacked blocks below it. */
const peerOutcomeTable: TableData<PeerOutcome> = {
  id: 'peer-outcomes',
  ariaLabel: 'Recent CSU student fee proposals and how each was decided',
  caption:
    'Recent CSU student fee proposals, when each was decided, the terms proposed, and the outcome. Every row links to its source.',
  headerColors: { backgroundColor: 'greyDarkest', textColor: 'white' },
  columns: [
    {
      id: 'campus',
      label: 'Campus',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '22%',
      render: (row) => (row.original ? renderCampusCell(row.original) : null),
      renderRowHeader: (row) =>
        row.original ? renderCampusCell(row.original) : null,
    },
    {
      id: 'date',
      label: 'Decided',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '13%',
      render: (row) =>
        row.values.date?.startsWith('[') ? (
          <PlaceholderMarker>{row.values.date}</PlaceholderMarker>
        ) : (
          <Typography as="span" variant="copy" size="sm">
            {row.values.date}
          </Typography>
        ),
    },
    {
      id: 'proposal',
      label: 'Proposal',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '35%',
      /* Rendered rather than left to the default cell, which hardcodes
         weight 700 for every table in the repo. Only the campus column
         should carry that weight here. */
      render: (row) => (
        <Typography as="span" variant="copy" size="sm" lineHeight="1.5">
          {row.values.proposal}
        </Typography>
      ),
    },
    {
      id: 'outcome',
      label: 'Outcome',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '30%',
      render: (row) => {
        const href = row.original && sourceHrefById.get(row.original.sourceId);

        /* No wrapper: the shared table cell already centers its content, and a
           flex column pinned to flex-start left the outcomes ranged against
           the cell's edge while every other column sat centered. */
        return (
          <Typography as="span" variant="copy" size="sm" lineHeight="1.5">
            {row.original && href && (
              <StyledLink href={href} isExternalLink isInverseUnderlineStyling>
                {row.values.outcome}
              </StyledLink>
            )}
          </Typography>
        );
      },
    },
  ],
  rows: peerOutcomes.map((outcome) => ({
    id: outcome.id,
    values: {
      campus: outcome.campus,
      date: outcome.date,
      proposal: outcome.proposal,
      outcome: outcome.outcome,
    },
    original: outcome,
  })),
};

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
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
        backgroundOverlay="rgba(0, 0, 0, 0.75)"
        backgroundBlur="2px"
        padding="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingDesktop="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingMobile="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        innerMaxWidth={CONTENT_MAX_WIDTH}
        innerMinHeight="min(72svh, 680px)"
        flex
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
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
          fluidSize={FLUID_LEAD}
          lineHeight="1.6"
          color="greyLightest"
          margin={`${Spaces.md} 0 0`}
        >
          The rooms your clubs meet in. The free gym. The food pantry. Study
          rooms. Places to nap.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          fluidSize={FLUID_LEAD}
          lineHeight="1.6"
          color="greyLightest"
        >
          You already pay for the U-SU: $137.25 a semester, unchanged since
          2007.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          fluidSize={FLUID_LEAD}
          lineHeight="1.6"
          color="greyLightest"
        >
          However, costs have risen for nineteen years while enrollment fell.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          fluidSize={FLUID_LEAD}
          lineHeight="1.6"
          color="greyLightest"
        >
          By FY 2030-31, the reserves covering the deficit are gone, leaving 40%
          less for everything else.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          fluidSize={FLUID_LEAD}
          lineHeight="1.6"
          color="greyLightest"
        >
          The proposal is $90 more a semester: $50 for the building & $40 for
          improvements.
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
        <ScrollCue
          lineStyle="solid"
          animation="trickle"
          color="white"
          thickness="0.25px"
          height="100px"
          fadeLength="32px"
          duration="2600ms"
          margin={`${Spaces.xl} auto 0`}
        />
      </FluidContainer>

      {/* 3 · Thesis */}
      <FluidContainer {...sectionShell} id="why" backgroundColor="white">
        <TextAndImage
          src={sectionIllustrations.whyItMatters}
          imagePosition="right"
          imageColumnWidth={SECTION_ILLUSTRATION_COLUMN_WIDTH}
          imageHeight={`clamp('150px, 15vw, 300px')`}
          /* Hard against its column's left edge, so it sits close to the copy
             rather than stranded against the section padding. */
          imageAlign="start"
          margin={`0 0 ${Spaces.xl}`}
        >
          <Eyebrow margin={`0 0 ${Spaces.md}`}>Why it matters</Eyebrow>
          <Typography
            as="h2"
            variant="pageHeader"
            fluidSize={FLUID_H2}
            lineHeight="1.15"
          >
            You and the University-Student Union
          </Typography>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
            style={{ maxWidth: MEASURE }}
          >
            Most Cal State LA students commute. The U-SU is the part of campus
            that is useful whether or not you have class the next hour and
            it&apos;s already included in what you pay.
          </Typography>
        </TextAndImage>
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
          margin={`${Spaces.xl} 0 0`}
          backgroundColor="transparent"
          padding="0"
        >
          <Typography
            as="p"
            variant="copy"
            style={{ maxWidth: MEASURE }}
            lineHeight="1.6"
          >
            And if you&apos;re one of the students who never comes in, someone
            you know does. The food pantry, the sensory room, a safe place for
            commuters to hang out at night, and the cultural graduation
            celebrations are essentials to students who don&apos;t advertise
            that they need them.
          </Typography>
        </Panel>
      </FluidContainer>

      {/* 4 · Services */}
      <FluidContainer {...sectionShell} backgroundColor="greyLightest">
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          Inside the building
        </Typography>
        <AutoGrid minColumnWidth="280px">
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              iconElement={
                <service.Icon
                  size={SERVICE_ICON_SIZE}
                  color={Colors.gold}
                  aria-hidden
                />
              }
              borderRadius="16px"
              shadow="soft"
            >
              <Typography as="p" variant="copy" size="sm" lineHeight="1.6">
                {service.body}
              </Typography>
            </Card>
          ))}
        </AutoGrid>

        {/* 4.1 · GridGallery — sits inside the building section, before
            any of the argument. Its job is discovery: showing what this place
            is to a student who has never used it. That only works ahead of the
            budget case, never appended to the bottom of the page. */}
        <Divider
          color="greyLighter"
          size="1px"
          margin={`clamp(48px, 6vw, 80px) 0 ${Spaces.xl}`}
        />
        <GridGallery
          items={buildingGalleryItems}
          columns={3}
          ariaLabel="Photographs of the University-Student Union and the services inside it"
          emptyLabel="[GALLERY — awaiting photography and releases]"
          pendingLabel="[PHOTO PENDING]"
        />
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
        <TextAndImage
          src={sectionIllustrations.whatItCosts}
          imagePosition="right"
          imageColumnWidth={SECTION_ILLUSTRATION_COLUMN_WIDTH}
          imageHeight={SECTION_ILLUSTRATION_HEIGHT}
          imageAlign="start"
          margin={`0 0 ${Spaces.xl}`}
        >
          <Eyebrow margin={`0 0 ${Spaces.md}`}>The numbers</Eyebrow>
          <Typography
            as="h2"
            variant="pageHeader"
            fluidSize={FLUID_H2}
            lineHeight="1.15"
          >
            What it Costs
          </Typography>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
            style={{ maxWidth: MEASURE }}
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
            margin={`${Spaces.lg} 0 0`}
            style={{ maxWidth: MEASURE }}
          >
            As of August 2026, Cal State LA has the lowest student center fee of
            any CSU campus: $275 a year, unchanged since 2007.
            <CitationMarker sourceId="1" />
          </Typography>
        </TextAndImage>

        {/* 7.1 · Fee math — the hero's secondary-CTA target */}
        <div id="cost">
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
              captionMaxWidth={WIDE_MEASURE}
              table={trendTable}
              animate={chartAnimation.animateTrend}
              animationDuration={chartAnimation.animationDuration}
            />
            <AutoGrid
              minColumnWidth="200px"
              justifyItems="center"
              margin="clamp(16px, 2vw, 28px)"
            >
              {reserveCallouts.map((callout) => (
                <CitedStat
                  key={callout.eyebrow}
                  variant="onLight"
                  eyebrow={callout.eyebrow}
                  value={callout.value}
                  countTo={callout.amount}
                  formatValue={formatDollars}
                  /* The year the reserve goes negative is the one figure on
                     this page that is bad news on its own terms. Red ties it
                     to the reserve line in the chart above. */
                  valueColor={callout.amount < 0 ? 'redDark' : undefined}
                />
              ))}
            </AutoGrid>
            <Typography
              as="p"
              variant="copy"
              size="xs"
              lineHeight="1.6"
              color="greyDark"
              /* Centered block, text still ranged left — see the chart's own
                 caption above it. */
              margin={`${Spaces.lg} auto 0`}
              style={{ maxWidth: WIDE_MEASURE }}
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
              affordable university in the CSU
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
        <TextAndImage
          src={sectionIllustrations.inflationGap}
          imagePosition="left"
          imageColumnWidth={SECTION_ILLUSTRATION_COLUMN_WIDTH}
          imageHeight={SECTION_ILLUSTRATION_HEIGHT}
          /* Stated rather than left to the default, which used to resolve to
             this and now resolves to `center`. */
          imageAlign="end"
        >
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
            style={{ maxWidth: MEASURE }}
          >
            If the 2007 fee had only kept pace with inflation, it would be{' '}
            <strong>$215.30 a semester</strong> today.
            <CitationMarker sourceId="5" /> The proposal is{' '}
            <strong>$227.25</strong>; $11.95 more than inflation alone would
            explain. That difference is real, and it&apos;s there because
            catching up on inflation does not close a shortfall that&apos;s also
            driven by enrollment decline.
            <CitationMarker sourceId="3" /> Student fees currently cover 67% of
            what the U-SU costs to run; the sustainable range is 80–85%.
            <CitationMarker sourceId="2" />
          </Typography>
        </TextAndImage>
      </FluidContainer>

      {/* 7.9 / 8 · Both outcomes, as tabs. Opens on the passing case. The
          second tab keeps its own `if-it-fails` id — the FAQ links straight
          to it, which scrolls here and switches the tab in one click — but it
          is no longer an anchor-nav destination, since a nav item pointing at
          a panel the reader cannot see until they click is a dead end. */}
      <FluidContainer
        {...sectionShell}
        id="what-can-change"
        backgroundColor="white"
      >
        <TextAndImage
          src={sectionIllustrations.whatCanChange}
          imagePosition="right"
          imageColumnWidth={SECTION_ILLUSTRATION_COLUMN_WIDTH}
          imageHeight={SECTION_ILLUSTRATION_HEIGHT}
          imageAlign="start"
          margin={`0 0 ${Spaces.xl}`}
        >
          <Eyebrow margin={`0 0 ${Spaces.md}`}>What&apos;s at stake</Eyebrow>
          <Typography
            as="h2"
            variant="pageHeader"
            fluidSize={FLUID_H2}
            lineHeight="1.15"
          >
            What Can Change
          </Typography>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
            style={{ maxWidth: MEASURE }}
          >
            Both outcomes are below: the spaces the U-SU has identified to add
            or convert if the fee passes, and what changes about the building
            and its services if it doesn&apos;t.
          </Typography>
        </TextAndImage>
        <Tabs
          variant="folder"
          label="What happens to the U-SU under each outcome"
          scrollMarginTop="84px"
          items={[
            {
              title: 'If it passes',
              children: (
                <>
                  <Typography
                    as="p"
                    variant="copy"
                    size="sm"
                    lineHeight="1.6"
                    color="greyDark"
                    margin={`0 0 ${Spaces.xl}`}
                    style={{ maxWidth: MEASURE }}
                  >
                    These are the spaces the U-SU has identified to add or
                    convert. They are described here only as far as they have
                    been described — nothing below is scheduled, costed, or
                    final.{' '}
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
                        <Typography
                          as="p"
                          variant="copy"
                          size="sm"
                          lineHeight="1.6"
                        >
                          {space.body}
                          {space.marker && (
                            <>
                              {' '}
                              <PlaceholderMarker>
                                {space.marker}
                              </PlaceholderMarker>
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
                        This section is the one place on the page where a
                        picture would do more than a sentence. Nothing ships
                        here until there is a real rendering or photograph of
                        each space.
                      </Typography>
                    </div>
                  </Panel>
                </>
              ),
            },
            {
              id: 'if-it-fails',
              title: "If it doesn't pass",
              children: (
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
                          <Typography
                            as="p"
                            variant="span"
                            size="sm"
                            weight="700"
                          >
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
                                <PlaceholderMarker>
                                  {fact.marker}
                                </PlaceholderMarker>
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
                        In the DO NOTHING projection, FY 2030-31 expenses of
                        $6,677,545 run $2,340,220 past revenue — 35% of that
                        year&apos;s spending — and the reserve closes the year
                        at −$2,065,518. The bond payment of about $1,920,000
                        continues through 2038 and cannot be reduced.
                      </Typography>
                      <Typography
                        as="p"
                        variant="copy"
                        size="sm"
                        lineHeight="1.6"
                        color="greyLighter"
                        margin={`${Spaces.md} 0 0`}
                      >
                        Everything in the column beside this one is paid for out
                        of the same budget. The U-SU has not decided or
                        published which of them it would reduce, and this page
                        will not guess.
                      </Typography>
                      <Typography as="p" margin={`${Spaces.lg} 0 0`}>
                        <PlaceholderMarker variant="block" tone="primary">
                          [NEEDS COPY — service-level impact statement, U-SU
                          Fiscal Committee]
                        </PlaceholderMarker>
                      </Typography>
                    </div>
                  </Panel>
                </AutoGrid>
              ),
            },
          ]}
        />
      </FluidContainer>

      {/* 11 · Get informed. The eyebrow keeps the mode-dependent string, so
          flipping to advocacy still only touches `campaignMode`. */}
      <FluidContainer
        {...sectionShell}
        id="before-you-decide"
        backgroundColor="greyLightest"
      >
        <TextAndImage
          src={sectionIllustrations.beforeYouDecide}
          imagePosition="right"
          imageColumnWidth={SECTION_ILLUSTRATION_COLUMN_WIDTH}
          imageHeight={SECTION_ILLUSTRATION_HEIGHT}
          imageAlign="start"
          margin={`0 0 ${Spaces.xl}`}
        >
          <Eyebrow margin={`0 0 ${Spaces.md}`}>
            {campaignMode.beforeHeading}
          </Eyebrow>
          <Typography
            as="h2"
            variant="pageHeader"
            fluidSize={FLUID_H2}
            lineHeight="1.15"
          >
            Before You Make a Decision
          </Typography>
          <Typography
            as="p"
            variant="copy"
            size="sm"
            lineHeight="1.6"
            margin={`${Spaces.md} 0 0`}
            style={{ maxWidth: MEASURE }}
          >
            Three ways to check any of this for yourself: read the budget the
            figures come from, bring your questions to an info session, or take
            them to the board directly.
          </Typography>
        </TextAndImage>
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

      {/* 11.1 · How other campuses decided — directly after the participation
          section, because it is the answer to "why bother." The frame is
          outcomes, including the rejection; it is never "fee increases are
          normal." */}
      <FluidContainer
        {...sectionShell}
        id="other-campuses"
        backgroundColor="white"
      >
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
          lineHeight="1.15"
        >
          How other campuses decide
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.md} 0 ${Spaces.xl}`}
          style={{ maxWidth: MEASURE }}
        >
          Fee proposals move through the CSUs regularly, and students don&apos;t
          always approve them.
          <br />
          Here are some recent ones:
        </Typography>
        <Table data={peerOutcomeTable} />
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.xl} 0 0`}
          style={{ maxWidth: MEASURE }}
        >
          San Marcos is the one worth understanding. Students rejected the first
          proposal, partly because it would have charged them a year before the
          building opened. The campus came back with a cheaper proposal on
          different terms, and students approved it.
        </Typography>
        <Typography
          as="p"
          variant="copy"
          size="sm"
          lineHeight="1.6"
          margin={`${Spaces.md} 0 0`}
          style={{ maxWidth: MEASURE }}
        >
          That&apos;s what participation does. Not just approve or reject —
          change what gets proposed.
        </Typography>
      </FluidContainer>

      {/* 11.2 · Testimonials — renders from an empty array */}
      <FluidContainer {...sectionShell} backgroundColor="greyLightest">
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
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
          <>
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
                  quotes in v1 were invented and have been removed. Nothing
                  ships here without a named student and a signed release. Each
                  card reserves a slot for the student&apos;s portrait; the
                  photograph needs the same release as the quote.
                </Typography>
              </div>
            </Panel>
            {PREVIEW_TESTIMONIAL_LAYOUT && (
              <>
                <Typography as="p" margin={`${Spaces.xl} 0 ${Spaces.md}`}>
                  <PlaceholderMarker>
                    [SAMPLE LAYOUT — placeholder cards, not student quotes]
                  </PlaceholderMarker>
                </Typography>
                <AutoGrid minColumnWidth="260px">
                  {sampleTestimonials.map((sample) => (
                    <TestimonialCard key={sample.quote} {...sample} />
                  ))}
                </AutoGrid>
              </>
            )}
          </>
        )}
      </FluidContainer>

      {/* 12 · FAQ */}
      <FluidContainer {...proseShell} id="faq" backgroundColor="white">
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.xl}`}
        >
          Frequently asked questions
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
        {/* No accent rule: the rule marks the top of a section, and this
            label sits over a band rather than heading one. */}
        <Eyebrow color="primary" accent={false} margin={`0 0 ${Spaces.lg}`}>
          For faculty &amp; staff
        </Eyebrow>
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
      {/* Full width, not the prose measure: two columns of sources need the
          room, and the running text here is capped by its own measure. */}
      <FluidContainer {...sectionShell} id="sources" backgroundColor="white">
        <Typography
          as="h3"
          variant="pageHeader"
          fluidSize={FLUID_H3}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.lg}`}
        >
          Every number and where it came from
        </Typography>
        <SourceList sources={sources} columns={2} />
      </FluidContainer>

      {/* 16 · Disclaimer strip */}
      <PrototypeNotice contentMaxWidth={CONTENT_MAX_WIDTH}>
        Prototype for review — not a published U-SU communication. This page
        describes a {campaignMode.actionVerb} that has not been finalized. Items
        marked [NEEDS FIGURE], [NEEDS COPY] or [NEEDS LINK] are unresolved and
        must be confirmed before launch; photography is placeholder.
      </PrototypeNotice>
    </Page>
  );
}
