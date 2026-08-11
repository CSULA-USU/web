import type { BarRow } from 'modules/KeepTheUOpen/BarChart';
import type { ShareSegment } from 'modules/KeepTheUOpen/ShareChart';
import type { TrendSeries } from 'modules/KeepTheUOpen/TrendChart';
import type { Source, Testimonial } from 'components';
import type { TableData } from 'types';
import { Colors } from 'theme';

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
  actionVerb: 'shape',
  voteDate: null as string | null,
  beforeHeading: 'Before you weigh in',
  finalBody:
    'Every figure on this page is traced to the April 10 2026 Fiscal Committee presentation or the CSU’s published fee tables. Both are listed in Sources.',
};

export const heroEyebrow = `${campaignMode.actionVerb} what matters`;

export const anchorLinks = [
  { label: 'Why It Matters', href: '#why' },
  { label: 'The Numbers', href: '#numbers' },
  { label: 'If It Passes', href: '#if-it-passes' },
  { label: 'If It Fails', href: '#if-it-fails' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Sources', href: '#sources' },
];

export const heroFigures = [
  { value: '$137.25', label: 'Per semester today' },
  { value: '+$90.00', label: 'Proposed increase', highlight: true },
  { value: '$227.25', label: 'Per semester after' },
];

/* No quote ships without a named student and a signed release. The four v1
   quotes were invented and are deleted; the grid renders its empty state. */
export const testimonials: Testimonial[] = [];

export const sources: Source[] = [
  {
    id: '1',
    label: 'CSU campus mandatory fees table, 2025-26',
    note: 'Fee comparison, median and mean, campus rankings, and the student center fee figures.',
    href: 'https://www.calstate.edu/apply/paying-for-college/csu-costs/tuition-and-fees/campus-mandatory-fees',
    linkText: 'calstate.edu',
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
    href: 'https://www.calstatela.edu/sites/default/files/Fact67.pdf',
    linkText: 'See Cal State LA Fact Book',
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
    href: 'https://www.calstate.edu/csu-system/news/Pages/Explained-The-Integration-of-Cal-Maritime-and-Cal-Poly-at-San-Luis-Obispo.aspx',
    linkText: 'See Cal Poly-Maritime Integration',
  },
];

export const thesisCards = [
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

export const services = [
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

export const bandStats = [
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
      'Student employees: We are the largest student employer on campus, alongside 29 full-time staff.',
  },
  {
    value: '5',
    citation: '4',
    label:
      'Cultural graduation ceremonies a year, free to about 800 graduating students and their families.',
  },
];

export const feeMath: {
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
export const FISCAL_YEARS = [
  'FY 24-25',
  'FY 25-26',
  'FY 26-27',
  'FY 27-28',
  'FY 28-29',
  'FY 29-30',
  'FY 30-31',
];

export const trendSeries: TrendSeries[] = [
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

export const trendTable: TableData = {
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

export const reserveCallouts = [
  { eyebrow: 'Reserve, FY 2024-25', value: '$8,364,353' },
  { eyebrow: 'Reserve, FY 2029-30', value: '$274,702' },
  { eyebrow: 'Reserve, FY 2030-31', value: '−$2,065,518' },
];

/* Only the bond share is published. Amounts come from the source rather than
   being recomputed here. */
export const shareSegments: ShareSegment[] = [
  {
    id: 'bond',
    label: 'Bond payment on the building',
    percentage: 33,
    amount: '$75.00',
    color: 'primary',
    labelPosition: { x: 312, y: 138 },
    detail:
      'About $1,920,000 a year, through 2038. The 2007 vote built the building and this is what paying for it costs.',
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

export const CAL_STATE_LA_ROW_ID = 'cal-state-la';

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

export const barRows: BarRow[] = [
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

export const todayFacts = [
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

/**
 * Spaces the U-SU has identified to add or convert if the increase passes.
 * Described only as far as they have been described to us — no square footage,
 * no cost, no opening date, and no feature nobody has confirmed. Alphabetical,
 * since no phasing order has been published to sequence them by.
 */
export const proposedSpaces = [
  {
    title: 'Downstairs Lounge',
    body: 'The lounge on the lower level, enhanced — more room to sit, study and wait out a gap in your schedule.',
  },
  {
    title: 'Engagement Room',
    body: 'A room set up for productivity.',
    marker: '[NEEDS COPY — what the engagement room is for]',
  },
  {
    title: 'Lounge & Computer Resources',
    body: 'The Game Room’s old second-floor space, renovated into an expanded lounge with computer resources. The Game Room itself has already moved to a larger space on the first floor.',
  },
  {
    title: 'Nature Lounge',
    body: 'An outdoor lounge on the second floor, planned with greenery in mind.',
  },
  {
    title: 'Pub',
    body: 'The current Sbarro space, converted into a pub.',
  },
  {
    title: 'Relaxation Room',
    body: 'A dedicated room for rest, with nap pods — findable, instead of tucked away on the third floor where they are now.',
  },
];

export const beforeYouWeighInCards = [
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
    body: 'The U-SU Board of Directors is chaired by elected students and its meetings are open for anyone to join.',
    href: 'https://www.calstatelausu.org/board-of-directors/meeting-schedule',
    linkText: 'BOD Meeting schedule →',
  },
];

export const facultyItems = [
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
