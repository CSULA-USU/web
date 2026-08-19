import type { BarRow } from 'modules/KeepTheUOpen/BarChart';
import type { PieSegment } from 'components';
import type { TrendSeries } from 'modules/KeepTheUOpen/TrendChart';
import type { GridGalleryItem, Source, Testimonial } from 'components';
import type { TableData } from 'types';
import type { IconType } from 'react-icons';
import {
  MdEvent,
  MdFitnessCenter,
  MdGroups,
  MdKitchen,
  MdMenuBook,
  MdWorkOutline,
} from 'react-icons/md';
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
  actionVerb: 'shape',
  beforeHeading: 'Get informed',
  /* The closing strip. Informational mode asks for one thing the page cannot
     get on its own — the reader's own view — so the primary action is the
     contact form and the secondary points back at the two channels the page
     has already named. On the flip, the heading carries the ask, the primary
     action becomes the ballot, and the feedback form takes the secondary slot;
     the JSX does not change. */
  finalHeading: 'Being informed is only half of the story',
  finalBody:
    "You've seen the U-SU budget, the shortfall, and what $90 a semester will get you. Now is the time to act. Every piece of feedback and suggestion is a vote for your vision of a better campus.",
  finalCtaLabel: 'Share Your Thoughts',
  finalCtaHref: '/contact',
  finalSecondaryLabel: 'Other Ways To Take Part',
  finalSecondaryHref: '#before-you-decide',
};

export const heroEyebrow = `${campaignMode.actionVerb} what matters`;

/* Every label here is the heading of the section it lands on, word for word.
   A nav that renames its destinations makes a reader check whether they
   arrived somewhere else. */
export const anchorLinks = [
  { label: 'Why It Matters', href: '#why' },
  { label: 'The Numbers', href: '#numbers' },
  { label: 'What Can Change', href: '#what-can-change' },
  { label: 'Before You Make a Decision', href: '#before-you-decide' },
];

export const heroFigures = [
  { value: '$137.25', label: 'Per semester today' },
  { value: '+$90.00', label: 'Proposed increase', highlight: true },
  { value: '$227.25', label: 'Per semester after' },
];

/* No quote ships without a named student and a signed release. The four v1
   quotes were invented and are deleted; the grid renders its empty state. */
export const testimonials: Testimonial[] = [];

/**
 * Layout preview only — NOT CONTENT.
 *
 * Four cards' worth of bracketed scaffolding, so the grid can be seen at the
 * lengths real quotes will run to. Every field is a visible `[…]` placeholder
 * on purpose: no sentence here can be mistaken for something a student said,
 * and no name here can be mistaken for a student. Do not replace these strings
 * in place — a real quote goes into `testimonials` above, with its release on
 * file, and this array and the page flag that renders it both get deleted.
 *
 * `isAwaitingPhoto` holds the portrait's footprint on every card. A real face
 * is what tells a reader these are students rather than composed copy, so the
 * slot is reserved now and the cards are already the height they will be once
 * the photography lands. No stand-in image goes in it: a borrowed face beside
 * a fabricated quote is the exact failure the empty state exists to prevent.
 * Each portrait needs the same written release as its quote.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      '[SAMPLE — one long quote, about three lines, where a student says which part of the building they use and what they would do without it. Sets the tallest card in the row.]',
    name: '[Student name]',
    detail: '[Major] · [Class year]',
    isAwaitingPhoto: true,
  },
  {
    quote:
      '[SAMPLE — one short quote, a single sentence. Shows how the grid handles an uneven row.]',
    name: '[Student name]',
    detail: '[Major] · [Class year]',
    isAwaitingPhoto: true,
  },
  {
    quote:
      '[SAMPLE — a medium quote of two lines, from a student employee, about the job rather than the space.]',
    name: '[Student name]',
    detail: '[Position] · [Class year]',
    isAwaitingPhoto: true,
  },
  {
    quote:
      '[SAMPLE — a medium quote of two lines, from a commuter student, about the hours between classes.]',
    name: '[Student name]',
    detail: '[Major] · [Class year]',
    isAwaitingPhoto: true,
  },
];

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
  {
    id: '7',
    label: 'Cal State San Marcos referendum results, 2024',
    note: 'Both referendum votes on the recreation facility fee: the April rejection and the October approval on revised terms.',
    href: 'https://news.csusm.edu/student-led-referendum-achieves-success-for-a-new-wellness--recreation-facility-for-csusm/',
    linkText: 'news.csusm.edu',
  },
  {
    id: '8',
    label:
      'SDSU Campus Fee Advisory Committee, Fall 2025 alternative consultation',
    note: 'The alternative-consultation process for the Instructionally Related Activities fee, overseen by a student-majority committee.',
    href: 'https://budget.sdsu.edu/committees/cfac/fall-2025-alternative-consultation',
    linkText: 'budget.sdsu.edu',
  },
  {
    id: '9',
    label:
      'Cal State East Bay presidential message on proposed athletics fee, April 2026',
    note: 'The proposed athletics fee and the alternative consultation still under way.',
    href: 'https://www.csueastbay.edu/administration/sandeen-messages/2026/athletics-fee-proposed-increase.html',
    linkText: 'csueastbay.edu',
  },
  {
    id: '10',
    label: 'CSUSB Student Financial Services, Category II fee adjustment',
    note: 'Category II fees indexed to HEPI with a 4% annual cap, and the 2025-26 adjustment.',
    href: 'https://www.csusb.edu/student-financial-services/tuition-and-fees',
    linkText: 'csusb.edu',
  },
];

/**
 * The repo's citation scheme is positional: `SourceList` renders `source.id`
 * as the visible numeral and `CitationMarker` links to `#source-{id}`, so an
 * id has to stay a numeral. These names carry the readable handle from the
 * brief through to the numeral the components need, so a row references the
 * source it means rather than a magic string.
 */
export const peerSourceIds = {
  csusmReferendum2024: '7',
  sdsuConsultation2025: '8',
  csuebAthleticsFee2026: '9',
  csusbHepi: '10',
} as const;

export type SourceId = (typeof peerSourceIds)[keyof typeof peerSourceIds];

export const thesisCards = [
  {
    number: '01',
    title: 'The hours between classes',
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
      ' alongside 29 full-time staff—the largest student employer on campus, with schedules built around class times.',
    citation: '4',
  },
];

/**
 * `Icon` holds the component itself, not rendered JSX, so this module stays a
 * `.ts` file. The page renders it. Vector icons replaced the 64px PNGs the
 * section used to load, which went soft on any display above 1x.
 */
export const services: {
  title: string;
  Icon: IconType;
  body: string;
}[] = [
  {
    title: 'Events & Activities',
    Icon: MdEvent,
    body: 'Event programming run by students, for students.',
  },
  {
    title: 'Study & Rest',
    Icon: MdMenuBook,
    body: 'Quiet floors, group rooms, nap pods and somewhere to be between a 10 AM and a 2 PM class.',
  },
  {
    title: 'Play & Recreation',
    Icon: MdFitnessCenter,
    body: 'The fitness center, the Game Room and the GENE program included; no membership required.',
  },
  {
    title: 'Cultural Centers',
    Icon: MdGroups,
    body: 'The APISRC, CLSRC, GSRC and PASRC: staffed centers, open doors, and Cultural Grads.',
  },
  {
    title: 'Jobs & Leadership',
    Icon: MdWorkOutline,
    body: 'U-Krew employment, the Board of Directors, and paid roles that fit around a class schedule.',
  },
  {
    title: 'Essentials',
    Icon: MdKitchen,
    body: 'Food pantry, microwaves, lockers and the small things that make a long commuter day workable.',
  },
];

/**
 * Photographs for the building section.
 *
 * WEIGHTING — when real photography arrives, weight this set toward ordinary
 * weekday use: study rooms occupied, the fitness center, a club meeting, the
 * food pantry, the cultural graduations. Concerts and festivals stay a
 * minority. Event-night photographs are the most photogenic and the least
 * persuasive to a commuter being asked for money; a picture of a Tuesday
 * afternoon is the argument.
 *
 * CAPTIONS — every caption states what it is, how many, and what it costs a
 * student. Facts, never adjectives. A caption with no verifiable fact in it
 * is not finished. Nothing in the register of "students enjoying the vibrant
 * atmosphere" ships.
 *
 * ALT TEXT — describes the scene, never the individuals. No names.
 *
 * TODO — RELEASES REQUIRED. This is a public advocacy page. Every photograph
 * of an identifiable student needs a signed release on file before it
 * replaces a placeholder here. Drop the `isAwaitingPhotography` line on an
 * item only once its image exists and its release is signed.
 */
/* Photographs already published elsewhere on this site. The ones in Supabase
   storage are served by next/image, whose allowlist already carries this host
   — see `images.domains` in next.config.js. */
const SUPABASE_PAGES =
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages';

export const buildingGalleryItems: GridGalleryItem[] = [
  {
    src: '/departments/ccc/cultural-grads/nuestra-grads-celebrating-onstage.png',
    alt: 'Graduates in caps and stoles cheering with raised arms onstage at a cultural graduation ceremony, a student band playing behind them',
    caption:
      'Cultural graduations. 5 ceremonies a year, about 800 students, free.',
    sourceId: '4',
  },
  {
    src: `${SUPABASE_PAGES}/departments/recreation/rec-treadmill-desktop.webp`,
    alt: 'Two students at a cardio machine in the fitness center, weight racks along the wall behind them',
    caption: 'Fitness center. Gym access for those who paid student fees.',
  },
  {
    src: `${SUPABASE_PAGES}/departments/operations/meeting-rooms/alhambra/conference.webp`,
    alt: 'A bookable room set with tables in a U shape beside a wall of windows',
    caption: 'Study rooms, third floor. Free and reservable.',
  },
  {
    src: '',
    alt: 'Rows of student organization tables with banners along a walkway',
    caption: 'Involvement Fair. Every RSO on campus for one afternoon.',
    isAwaitingImage: true,
  },
  {
    src: `${SUPABASE_PAGES}/about/tenants/Food%20Pantry%201200x600.jpg`,
    alt: 'A student beside refrigerated cases stocked with produce and packaged food under a Cal State LA Food Pantry sign',
    caption: 'Food pantry. Open to any enrolled student.',
  },
  {
    src: `${SUPABASE_PAGES}/departments/operations/meeting-rooms/boardroom/north/room.webp`,
    alt: 'A boardroom set with a long conference table, office chairs and a whiteboard',
    caption: 'Room rental fees waived for registered student organizations.',
  },
];

export const bandStats = [
  {
    value: '2007',
    citation: '2',
    label:
      'The year students last approved a change to this fee. That vote paved the way for the new U-SU building to be built.',
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
    filledPoint: true,
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
    filledPoint: true,
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

/* `amount` drives the count-up; `value` is the same figure as text, and is
   what renders on first paint, without JS, and under reduced motion. The two
   must not drift apart. */
export const reserveCallouts: {
  eyebrow: string;
  value: string;
  amount: number;
}[] = [
  { eyebrow: 'Reserve, FY 2024-25', value: '$8,364,353', amount: 8364353 },
  { eyebrow: 'Reserve, FY 2029-30', value: '$274,702', amount: 274702 },
  { eyebrow: 'Reserve, FY 2030-31', value: '−$2,065,518', amount: -2065518 },
];

/* Only the bond share is published. Amounts come from the source rather than
   being recomputed here. */
export const shareSegments: PieSegment[] = [
  {
    id: 'bond',
    label: 'Bond payment on the building',
    percentage: 33,
    amount: '$44.60',
    color: 'primary',
    detail:
      "Chancellor's Office. Repays the loan that built the U-SU building, a fixed obligation that cannot be reduced or redirected.",
    sourceId: '2',
  },
  {
    id: 'supporting-services',
    label: 'Supporting Services',
    percentage: 43,
    amount: '$59.69',
    color: 'pastelYellow',
    detail:
      'Admin, Operations, and Graffix. Keeps the building open and running: facilities, custodial work, utilities, repairs, staffing,and the in-house design studio.',
    sourceId: '2',
  },
  {
    id: 'programs',
    label: 'Programs',
    percentage: 14,
    amount: '$18.77',
    color: 'nuestraOrange',
    detail:
      'Cross Cultural Center, Center for Student Involvement. Events, leadership development, cultural programming, and support for student organizations.',
    sourceId: '2',
  },
  {
    id: 'fitness-game',
    label: 'Fitness & Game Room',
    percentage: 9,
    amount: '$12.84',
    color: 'recognizedGreen',
    detail:
      'Recreation. Rec 1, 2, and the Game Room. Open to every student, plus the equipment and staff that keep it running',
    sourceId: '2',
  },
  {
    id: 'major-repair',
    label: 'Major Repair Replacement',
    percentage: 1,
    amount: '$1.35',
    color: 'blackMauve',
    detail:
      'Operations. A reserve for big-ticket building repairs and equipment replacement, kept out of day-to-day spending.',
    sourceId: '2',
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
    segmentLabels: {
      base: 'today:',
      extension: 'proposed total with increase:',
    },
    color: 'primary',
  },
  {
    id: 'channel-islands',
    campus: 'Channel Islands',
    value: 1146,
    color: 'greyDark',
    annotation: 'new lowest after our increase',
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

/**
 * How other CSU campuses decided.
 *
 * The frame is outcomes, including rejections — never "fee increases are
 * normal." A reader who concludes that fees rise everywhere is alarmed, not
 * reassured, and it invites the obvious reply that everyone else may be
 * wrong. The San Marcos rejection row is the most important one here: a table
 * showing only approvals would be worthless for this purpose. Nothing in the
 * outcome column editorializes past what is in the cited source.
 *
 * The `render` that attaches each row's citation lives in the page, because
 * this module is a `.ts` file and cannot hold JSX.
 */
export interface PeerOutcome {
  id: string;
  campus: string;
  /**
   * Square campus logo. Each one sits beside a factual row about that
   * campus's own decision, never beside a claim about this proposal, and the
   * page stays in informational mode — no campus here has taken a position on
   * our fee.
   */
  logoSrc?: string;
  /**
   * Letters for the `Monogram` tile, rendered when a row has no `logoSrc`
   * yet. Kept as an explicit string rather than derived from `campus`,
   * because the useful abbreviation is rarely the initials of the name.
   */
  monogram: string;
  /** Split out of `campus` so the table can sort and stack the two. */
  date: string;
  proposal: string;
  outcome: string;
  sourceId: SourceId;
  /**
   * Visible link text for the outcome cell. Names the document it opens, so
   * a reader knows where they are going before they click. A superscript
   * numeral is not a discoverable affordance on its own.
   */
  linkText: string;
}

const CAMPUS_LOGO_BASE =
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/fee-increase/school-logos';

export const peerOutcomes: PeerOutcome[] = [
  {
    id: 'csusm-april-2024',
    campus: 'San Marcos',
    logoSrc: `${CAMPUS_LOGO_BASE}/csusm-logo.jpg`,
    monogram: 'CSUSM',
    date: 'April 2024',
    proposal:
      '$265/semester for a new recreation center, charged starting a year before it opened',
    outcome: 'Rejected. About 60% voted no.',
    sourceId: peerSourceIds.csusmReferendum2024,
    linkText: 'See the referendum results',
  },
  {
    id: 'csusm-october-2024',
    campus: 'San Marcos',
    logoSrc: `${CAMPUS_LOGO_BASE}/csusm-logo.jpg`,
    monogram: 'CSUSM',
    date: 'October 2024',
    proposal:
      'Same facility, reduced to $245/semester, not charged until the year it opens',
    outcome: 'Approved, 64.6% to 35.4%.',
    sourceId: peerSourceIds.csusmReferendum2024,
    linkText: 'See the referendum results',
  },
  {
    id: 'sdsu-fall-2025',
    campus: 'San Diego',
    logoSrc: `${CAMPUS_LOGO_BASE}/sdsu-logo.png`,
    monogram: 'SDSU',
    date: 'Fall 2025',
    proposal: 'Instructionally Related Activities fee increase',
    outcome:
      'Alternative consultation, overseen by a student-majority committee',
    sourceId: peerSourceIds.sdsuConsultation2025,
    linkText: 'See the consultation record',
  },
  {
    id: 'csueb-spring-2026',
    campus: 'East Bay',
    logoSrc: `${CAMPUS_LOGO_BASE}/csueb-logo.png`,
    monogram: 'CSUEB',
    date: 'Spring 2026',
    proposal: 'New athletics fee',
    outcome: 'Alt. consultation in progress',
    sourceId: peerSourceIds.csuebAthleticsFee2026,
    linkText: "Read the president's message",
  },
  {
    id: 'csusb-hepi',
    campus: 'San Bernardino',
    logoSrc: `${CAMPUS_LOGO_BASE}/csusb-logo.jpg`,
    monogram: 'CSUSB',
    /* The sources give the adjustment year, not the date the indexing was
       established. Left as a marker rather than guessed at. */
    date: '[NEEDS FIGURE — date]',
    proposal: 'Category II fees indexed to HEPI, capped at 4% annually',
    outcome:
      'Established by alternative consultation. 3.4% in 2025-26, about $69 for the year.',
    sourceId: peerSourceIds.csusbHepi,
    linkText: 'See the fee schedule',
  },
];

/* `href`/`linkText` are optional and currently unused — no faculty item links
   out. Typed rather than inferred so dropping the last link does not break
   the page's guard, and adding one back needs no type change. */
export const facultyItems: {
  title: string;
  body: string;
  href?: string;
  linkText?: string;
}[] = [
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
    body: '$137.25 a semester today, $227.25 proposed, last set in 2007. Every figure here is documented below.',
  },
];
