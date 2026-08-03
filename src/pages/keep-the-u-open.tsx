import Head from 'next/head';
import { BarChart, Page, ShareChart, TrendChart } from 'modules';
import type { BarRow, ShareSegment, TrendSeries } from 'modules';
import type { TableData } from 'types';
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
import type { Source, Testimonial } from 'components';
import { Colors, Spaces } from 'theme';
import { BiPlus } from 'react-icons/bi';

/**
 * Every mode-dependent string on this page lives here. The page ships
 * informational and flips to advocacy later, never the reverse; flipping is a
 * change to these strings only, with no JSX edits. Nothing outside this object
 * contains "vote yes," "ballot," or a date.
 */
export const campaignMode = {
  mode: 'informational',
  ctaLabel: 'See the Budget',
  ctaHref: '#numbers',
  heroPrimaryCta: 'See the Numbers',
  heroSecondaryCta: 'What This Costs You',
  finalHeading: 'The math, in one place.',
  actionNoun: 'proposal',
  voteDate: null as string | null,
  beforeHeading: 'Before you weigh in',
  finalBody:
    'Every figure on this page is traced to the April 10 2026 Fiscal Committee presentation or the CSU’s published fee tables. Both are listed in Sources.',
};

const heroEyebrow = `A ${campaignMode.actionNoun} for the University-Student Union`;

/* Fluid section padding, applied at every breakpoint so the clamp() — not
   FluidContainer's own responsive defaults — governs. */
const SECTION_PADDING = 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 36px)';
const BAND_PADDING = 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 36px)';

const sectionShell = {
  padding: SECTION_PADDING,
  paddingDesktop: SECTION_PADDING,
  paddingMobile: SECTION_PADDING,
  innerMaxWidth: '1200px',
  scrollMarginTop: '84px',
} as const;

const bandShell = {
  padding: BAND_PADDING,
  paddingDesktop: BAND_PADDING,
  paddingMobile: BAND_PADDING,
  innerMaxWidth: '1200px',
  scrollMarginTop: '84px',
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

const anchorLinks = [
  { label: 'Why It Matters', href: '#why' },
  { label: 'The Numbers', href: '#numbers' },
  { label: 'If It Fails', href: '#if-it-fails' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Sources', href: '#sources' },
];

const heroFigures = [
  { value: '$137.25', label: 'Per semester today' },
  { value: '+$90.00', label: 'Proposed increase', highlight: true },
  { value: '$227.25', label: 'Per semester after' },
];

/* No quote ships without a named student and a signed release. The four v1
   quotes were invented and are deleted; the grid renders its empty state. */
const testimonials: Testimonial[] = [];

const sources: Source[] = [
  {
    id: '1',
    label: 'CSU campus mandatory fees table, 2025-26',
    note: 'Fee comparison, median and mean, campus rankings, and the student center fee figures.',
    href: 'https://www.calstate.edu',
    linkText: 'calstate.edu',
    marker: '[NEEDS LINK — direct table URL]',
  },
  {
    id: '2',
    label: 'U-SU Fiscal Committee budget presentation, April 10 2026',
    note: 'All budget, reserve, bond, fee-coverage and “DO NOTHING” projection figures, and the 2007 approval date.',
    marker: '[NEEDS LINK — public posting of the deck]',
  },
  {
    id: '3',
    label: 'Cal State LA institutional Fact Book',
    note: 'Enrollment trend and student demographics.',
    marker: '[NEEDS LINK]',
  },
  {
    id: '4',
    label: 'U-SU operating budget / annual report',
    note: 'Staffing, student employment, building size, services and the cultural graduation ceremonies.',
    marker: '[NEEDS LINK]',
  },
  {
    id: '5',
    label: 'BLS CPI inflation calculator',
    note: 'The $215.30 CPI-adjusted equivalent of the 2007 fee.',
    href: 'https://data.bls.gov/cgi-bin/cpicalc.pl',
    linkText: 'data.bls.gov',
  },
  {
    id: '6',
    label: "CSU Chancellor's Office, Cal Poly–Maritime integration",
    note: 'Administrative merger effective July 1 2025, academic integration in fall 2026 — the basis for comparing 22 campuses rather than 23.',
    marker: '[NEEDS LINK]',
  },
];

const thesisCards = [
  {
    number: '01',
    title: 'The four hours between your classes',
    body: "A commuter's day has holes in it. This is where you sit them out: lounges, study rooms, nap pods, microwaves, outlets, and a chair that isn't the front seat of your car.",
  },
  {
    number: '02',
    title: "The things you'd otherwise pay for",
    body: 'The fitness center, the food pantry and everyday essentials are covered by the fee you already pay. No membership, no per-visit charge, no sign-up.',
  },
  {
    number: '03',
    title: 'Nearly 100 student jobs',
    body: 'Between 90 and 100 students work here',
    bodyAfterCitation:
      ' alongside 29 full-time staff — the largest student employer on campus, with schedules built around class times.',
    citation: '4',
  },
];

const services = [
  {
    title: 'Events & Activities',
    iconSrc: '/icons/calendar-icon.png',
    body: 'Programming run by students, for students — from noon concerts to the five cultural graduation ceremonies.',
  },
  {
    title: 'Study & Rest Spaces',
    iconSrc: '/icons/book-icon.png',
    body: 'Quiet floors, group rooms, nap pods and somewhere to be between a 10 AM and a 2 PM class.',
  },
  {
    title: 'Play & Recreation',
    iconSrc: '/icons/music-icon.png',
    body: 'The fitness center, the Game Room and the GENE program — included, no membership.',
  },
  {
    title: 'Cross Cultural Centers',
    iconSrc: '/icons/connecting-people-icon.png',
    body: 'APISRC, CLSRC, GSRC and PASRC — staffed centers, open doors, and the Cultural Grads ceremonies.',
  },
  {
    title: 'Jobs & Leadership',
    iconSrc: '/icons/resume-icon.png',
    body: 'U-Krew employment, the Board of Directors, and paid roles that fit around a class schedule.',
  },
  {
    title: 'Everyday Essentials',
    iconSrc: '/icons/fridge-icon.png',
    body: 'Food pantry, microwaves, lockers and the small things that make a long commuter day workable.',
  },
];

const bandStats = [
  {
    value: '2007',
    citation: '2',
    label:
      'The last time students approved a change to this fee. That vote paid for the building.',
  },
  {
    value: '90–100',
    citation: '4',
    label:
      'Student employees — the largest student employer on campus, alongside 29 full-time staff.',
  },
  {
    value: '5',
    citation: '4',
    label:
      'Cultural graduation ceremonies a year, free to about 800 graduating students and their families.',
  },
];

const feeMath: {
  heading: string;
  value: string;
  detail: string;
  citation?: string;
  accentColor: keyof typeof Colors;
}[] = [
  {
    heading: 'Today',
    value: '$137.25',
    detail: '$274.50 a year',
    citation: '1',
    accentColor: 'greyLighter',
  },
  {
    heading: 'Increase',
    value: '+$90.00',
    detail: '+$180 a year · $5.63 a week',
    accentColor: 'primary',
  },
  {
    heading: 'Proposed',
    value: '$227.25',
    detail: '$454.50 a year',
    accentColor: 'black',
  },
];

/* Only published figures are plotted. The lines between them are trajectories,
   and both the caption and the hidden table say so. */
const FISCAL_YEARS = [
  'FY 24-25',
  'FY 25-26',
  'FY 26-27',
  'FY 27-28',
  'FY 28-29',
  'FY 29-30',
  'FY 30-31',
];

const trendSeries: TrendSeries[] = [
  {
    id: 'expenses',
    label: 'Expenses',
    color: 'greyDarkest',
    strokeWidth: 3,
    dashed: true,
    labelSide: 'above',
    points: [
      { yearIndex: 1, value: 5760109 },
      { yearIndex: 6, value: 6677545 },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue',
    color: 'greyDark',
    strokeWidth: 3,
    dashed: true,
    labelSide: 'below',
    points: [
      { yearIndex: 1, value: 4876638 },
      { yearIndex: 6, value: 4337325 },
    ],
  },
  {
    id: 'reserve',
    label: 'Reserve',
    color: 'gold',
    strokeWidth: 3.5,
    labelSide: 'above',
    points: [
      { yearIndex: 0, value: 8364353 },
      { yearIndex: 5, value: 274702 },
      { yearIndex: 6, value: -2065518 },
    ],
  },
];

const NOT_PUBLISHED = 'Not published';

const trendTable: TableData = {
  id: 'trend-figures',
  ariaLabel: 'U-SU DO NOTHING projection, April 10 2026',
  caption: 'U-SU DO NOTHING projection, April 10 2026',
  headerColors: { backgroundColor: 'greyDarkest', textColor: 'white' },
  columns: [
    {
      id: 'year',
      label: 'Fiscal year',
      backgroundColor: 'white',
      textColor: 'black',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      backgroundColor: 'white',
      textColor: 'black',
    },
    {
      id: 'expenses',
      label: 'Expenses',
      backgroundColor: 'white',
      textColor: 'black',
    },
    {
      id: 'reserve',
      label: 'Reserve',
      backgroundColor: 'white',
      textColor: 'black',
    },
  ],
  rows: [
    {
      id: 'fy-2024-25',
      values: {
        year: 'FY 2024-25',
        revenue: NOT_PUBLISHED,
        expenses: NOT_PUBLISHED,
        reserve: '$8,364,353',
      },
    },
    {
      id: 'fy-2025-26',
      values: {
        year: 'FY 2025-26',
        revenue: '$4,876,638',
        expenses: '$5,760,109',
        reserve: NOT_PUBLISHED,
      },
    },
    {
      id: 'fy-2029-30',
      values: {
        year: 'FY 2029-30',
        revenue: NOT_PUBLISHED,
        expenses: NOT_PUBLISHED,
        reserve: '$274,702',
      },
    },
    {
      id: 'fy-2030-31',
      values: {
        year: 'FY 2030-31',
        revenue: '$4,337,325',
        expenses: '$6,677,545',
        reserve: '−$2,065,518',
      },
    },
  ],
};

const reserveCallouts = [
  { eyebrow: 'Reserve, FY 2024-25', value: '$8,364,353' },
  { eyebrow: 'Reserve, FY 2029-30', value: '$274,702' },
  { eyebrow: 'Reserve, FY 2030-31', value: '−$2,065,518' },
];

/* Only the bond share is published. Amounts come from the source rather than
   being recomputed here. */
const shareSegments: ShareSegment[] = [
  {
    id: 'bond',
    label: 'Bond payment on the building',
    percentage: 33,
    amount: '$75.00',
    color: 'primary',
    labelPosition: { x: 312, y: 138 },
    detail:
      'About $1,920,000 a year, through 2038. The 2007 vote built the building; this is what paying for it costs.',
    sourceId: '2',
  },
  {
    id: 'everything-else',
    label: 'Everything else',
    percentage: 67,
    amount: '$152.25',
    color: 'greyLighter',
    labelPosition: { x: 88, y: 272 },
    detail: 'Operations, staffing, programs and maintenance.',
    marker: '[NEEDS FIGURE — category split of the remaining 67%]',
  },
];

const CAL_STATE_LA_ROW_ID = 'cal-state-la';

const otherCampusFees: [string, number][] = [
  ['Northridge', 1400],
  ['Dominguez Hills', 1408],
  ['Fullerton', 1514],
  ['East Bay', 1539],
  ['Monterey Bay', 1695],
  ['Pomona', 1697],
  ['Fresno', 1774],
  ['San Francisco', 1874],
  ['Long Beach', 1888],
  ['San Marcos', 2004],
  ['Bakersfield', 2046],
  ['San Bernardino', 2117],
  ['Stanislaus', 2240],
  ['Humboldt', 2374],
  ['San Jose', 2396],
  ['Chico', 2446],
  ['Sacramento', 2564],
  ['Sonoma', 2612],
  ['San Diego', 2730],
];

const barRows: BarRow[] = [
  {
    id: CAL_STATE_LA_ROW_ID,
    campus: 'Cal State LA',
    value: 1084,
    proposedValue: 1264,
    segmentLabels: { base: 'today', extension: 'proposed' },
    color: 'primary',
  },
  {
    id: 'channel-islands',
    campus: 'Channel Islands',
    value: 1146,
    color: 'greyDark',
    annotation: 'lowest after the increase',
  },
  ...otherCampusFees.map(([campus, value]) => ({
    id: campus.toLowerCase().replace(/\s+/g, '-'),
    campus,
    value,
  })),
  {
    id: 'san-luis-obispo',
    campus: 'San Luis Obispo',
    value: 7000,
    offScale: true,
    annotation: 'off scale ›',
  },
];

const todayFacts = [
  {
    label: 'Fitness center access',
    body: 'Included with enrollment. No membership charge, no per-visit fee.',
  },
  {
    label: 'Signature events',
    body: 'Programmed and paid for out of the operating budget.',
    marker: '[NEEDS FIGURE — events per year]',
  },
  {
    label: 'Cultural graduation ceremonies',
    body: 'Five a year, free to graduates and families, about 800 students.',
  },
  {
    label: 'Room reservations for student orgs',
    body: 'Meeting and event space in a 93,000 sq ft building, reservable by registered student organizations.',
    marker: '[NEEDS FIGURE — weekly club meetings]',
  },
  {
    label: 'Student employment',
    body: '90–100 student positions, the largest student employer on campus.',
  },
  {
    label: 'Building hours',
    body: 'Mon–Thu 7 AM to 10 PM · Fri 7 AM to 8 PM · Sat 7 AM to 3 PM.',
  },
];

const beforeYouWeighInCards = [
  {
    title: 'Read the budget yourself',
    body: 'The April 10 2026 Fiscal Committee presentation is the source for every budget figure on this page.',
    linkText: 'Go to Sources →',
    href: '#sources',
  },
  {
    title: 'Come to an info session',
    body: 'Open sessions in the U-SU where you can ask staff and board members directly.',
    marker: '[NEEDS FIGURE — dates & locations]',
  },
  {
    title: 'Ask the board',
    body: 'The U-SU Board of Directors is chaired by an elected student and its meetings are open.',
    marker: '[NEEDS FIGURE — meeting schedule]',
  },
];

const faq = [
  {
    question: 'Exactly how much, and when would it start?',
    answer: (
      <>
        $90 more per semester. Your U-SU fee goes from $137.25 to $227.25 a
        semester — $454.50 a year instead of $274.50. Across a 16-week semester
        that is $5.63 a week. The effective term has not been set.{' '}
        <PlaceholderMarker>[NEEDS FIGURE — effective term]</PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'Does my financial aid cover it?',
    answer: (
      <>
        That answer belongs to Cal State LA Financial Aid, not to the U-SU, and
        we are not going to approximate it.{' '}
        <PlaceholderMarker>[NEEDS COPY — Financial Aid]</PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'What is the 3% annual adjustment — is it a blank check?',
    answer:
      'No. The proposed contract language allows the fee to rise by up to 3% a year for inflation. It is a ceiling, not a target, and it sits below the historical average rate of inflation — which is exactly why this page exists: the fee was set in 2007 and has not moved in nineteen years. The adjustment is there so that the U-SU never has to come back and ask for another $90 at once.',
  },
  {
    question: "Why can't tuition or the university cover this?",
    answer:
      "The U-SU is a separate 501(c)(3) nonprofit governed by a board chaired by an elected student. It is not part of the university's operating budget and tuition does not fund it. Student fees cover 67% of what it costs to run today; the sustainable range is 80–85%.",
  },
  {
    question: "What happens if it doesn't pass?",
    answer: (
      <>
        $2,000,000 has already been cut across FY 2024-25 and FY 2025-26 — 25%
        of the operating budget. On the current fee, the reserve falls from
        $8,364,353 in FY 2024-25 to $274,702 in FY 2029-30 and to −$2,065,518 in
        FY 2030-31. What gets reduced after that has not been decided.{' '}
        <StyledLink href="#if-it-fails">See the full section →</StyledLink>
      </>
    ),
  },
  {
    question: 'Who decided the amount?',
    answer: (
      <>
        The U-SU Board of Directors, chaired by an elected student, working from
        the Fiscal Committee&apos;s April 10 2026 budget projection.{' '}
        <PlaceholderMarker>
          [NEEDS COPY — board resolution and vote record]
        </PlaceholderMarker>
      </>
    ),
  },
  {
    question: 'I never use the U-SU — why am I paying?',
    answer:
      'Fair question, and the honest answer has two halves. The first: most of what is in here costs money everywhere else — a gym, a pantry, a microwave, a quiet room, a place to park yourself between classes — and here it is already paid for. The second: the building went up in 2009 on a bond that runs through 2038, about a third of the operating budget every year. That payment does not stop if attendance drops. It is worth getting something back for it.',
  },
  {
    question: 'Where can I see the budget myself?',
    answer: (
      <>
        Every figure on this page is numbered and traced to its document.{' '}
        <StyledLink href="#sources">Sources →</StyledLink>
      </>
    ),
  },
];

const facultyItems = [
  {
    title: 'The largest student employer on campus',
    body: '90–100 student positions and 29 full-time staff. Many of your students are paid by this building.',
  },
  {
    title: 'Space your department can reserve',
    body: '93,000 sq ft, opened in 2009: meeting rooms, event space and the ballroom, bookable through U-SU Operations.',
  },
  {
    title: 'What to tell students who ask',
    body: '$137.25 a semester today, $227.25 proposed, last set in 2007. Every figure here is documented.',
    linkText: 'Sources →',
    href: '#sources',
  },
];

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
          content="The U-SU fee has not changed since 2007. Here is the proposal, the budget projection behind it, and every source."
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
      />

      {/* 2 · Hero */}
      <FluidContainer
        backgroundImage="/usu-front.jpg"
        backgroundOverlay="rgba(0, 0, 0, 0.66)"
        padding="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingDesktop="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        paddingMobile="clamp(72px, 9vw, 128px) clamp(20px, 4vw, 36px)"
        innerMaxWidth="1200px"
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
          Keep the U Open
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
          The University-Student Union runs on a student fee that has not
          changed since 2007. On the current budget its reserve is gone by{' '}
          <Typography
            as="span"
            variant="copy"
            fluidSize={FLUID_HERO_BODY}
            weight="700"
            color="white"
          >
            FY 2030-31
          </Typography>
          . The proposal is{' '}
          <Typography
            as="span"
            variant="copy"
            fluidSize={FLUID_HERO_BODY}
            weight="700"
            color="white"
          >
            $90 more per semester
          </Typography>{' '}
          — $5.63 a week — for the building you already paid to put up.
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
          that is useful whether or not you have class in the next hour — and it
          is already included in what you pay.
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
            And if you are one of the students who never comes in — someone you
            know does. The pantry, the quiet floor and the cultural graduations
            are load-bearing for people who don&apos;t advertise that they need
            them.
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
        innerMaxWidth="1200px"
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
            <CitationMarker sourceId="2" /> and has not moved since. The
            proposed contract language also includes an annual inflation
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
            Cal State LA has the lowest student center fee of any CSU campus —
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
              caption="Plotted points are published figures. Revenue and expenses are published for FY 2025-26 and FY 2030-31 only, and the reserve for FY 2024-25, FY 2029-30 and FY 2030-31; the lines between them are trajectories, not year-by-year data."
              table={trendTable}
              animate={chartAnimation.animateTrend}
              animationDuration={chartAnimation.animationDuration}
            />
            <AutoGrid minColumnWidth="200px">
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
              &ldquo;DO NOTHING&rdquo; projection — the model in which the fee
              stays at $137.25. $2,000,000 was cut across FY 2024-25 and FY
              2025-26, 25% of the operating budget. An annual bond payment of
              about $1,920,000 — roughly a third of the operating budget — runs
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
              ariaLabel="Donut chart of the proposed $227.25 semester fee. The bond payment on the building is 33%, or $75.00. Everything else — operations, staffing, programs and maintenance — is 67%, or $152.25."
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
              Value axis is capped at $3,000. San Luis Obispo&apos;s true figure
              is $7,000 and its bar is drawn at the cap.
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
          <strong>$227.25</strong> — $11.95 more than inflation alone would
          explain. That difference is real, and it is there because catching up
          on inflation does not close a shortfall that is also driven by
          enrollment decline.
          <CitationMarker sourceId="3" /> Student fees currently cover 67% of
          what the U-SU costs to run; the sustainable range is 80–85%.
          <CitationMarker sourceId="2" />
        </Typography>
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
          Every number, and where it came from
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
        innerMaxWidth="1200px"
      >
        <Typography as="p" variant="span" size="2xs" color="greyDark">
          Prototype for review — not a published U-SU communication. This page
          describes a {campaignMode.actionNoun} that has not been finalized.
          Items marked [NEEDS FIGURE], [NEEDS COPY] or [NEEDS LINK] are
          unresolved and must be confirmed before launch; photography is
          placeholder.
        </Typography>
      </FluidContainer>
    </Page>
  );
}
