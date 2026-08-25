import type { ReactNode } from 'react';
import { StyledLink, Typography } from 'components';

/**
 * Every string in this file is department-approved language transcribed from
 * the FY 2026–27 handoff. Reword nothing without Recreation's sign-off.
 */

export const APP_STORE_HREF =
  'https://apps.apple.com/us/app/cal-state-la-recreation/';
export const GOOGLE_PLAY_HREF =
  'https://play.google.com/store/apps/details?id=com.innosoftfusiongo.californiastateuniversitylosangeles';
export const RECREATION_HOMEPAGE = 'https://recreation.calstatelausu.org/';
export const COORDINATOR_EMAIL = 'Alepe14@calstatela.edu';
export const DIRECTOR_EMAIL = 'cbalam2@calstatela.edu';

export type MembershipKey = 'student' | 'page' | 'staff' | 'scholar' | 'next';

const AppLinks = () => (
  <>
    Download the Cal State LA Campus Rec app on{' '}
    <StyledLink href={APP_STORE_HREF} isExternalLink>
      iOS
    </StyledLink>{' '}
    or{' '}
    <StyledLink href={GOOGLE_PLAY_HREF} isExternalLink>
      Android
    </StyledLink>
    .
  </>
);

const CoordinatorEmail = () => (
  <StyledLink href={`mailto:${COORDINATOR_EMAIL}`}>
    {COORDINATOR_EMAIL}
  </StyledLink>
);

const SIGN_IN_CAL_STATE =
  'Select the registration icon in the app to be redirected to our registration webpage. On the webpage, select sign-in on the top right corner and sign-in with your Cal State LA credentials.';
const SIGN_IN_COMMUNITY =
  'Select the registration icon in the app to be redirected to our registration webpage. On the webpage, select sign-in on the top right corner and sign-in with the Community login credentials provided to you.';
const ACCEPT_WAIVERS =
  'Once signed in, click the bell icon for the notification to sign and accept Recreation’s facility access waivers.';
const BRING_RECEIPT =
  'After completing the waiver and purchasing a membership, bring your receipt to any Recreation facility to add a membership to your profile.';
const SCAN_BARCODE =
  'Once registered, use the Cal State LA Campus Rec app to access the facility with a mobile device by scanning your barcode ID.';

export interface MembershipType {
  key: MembershipKey;
  /** Label in the picker. */
  optionTitle: string;
  optionSubtitle: string;
  /** Label on the answer card and in the fee table. */
  name: string;
  headline: string;
  priceNote: string;
  verdict: string;
  /** Sentence introducing the numbered steps. */
  registerIntro: string;
  steps: ReactNode[];
  /** Sentences that follow the list. */
  notes: string[];
}

export const membershipTypes: MembershipType[] = [
  {
    key: 'student',
    optionTitle: 'Enrolled student',
    optionSubtitle: 'Any units at Cal State LA',
    name: 'Student',
    headline: 'Already paid',
    priceNote: 'Included in your “Student Union” campus fee',
    verdict:
      'You are enrolled in units at Cal State LA, so there is nothing to buy. Register in the app, sign the facility access waiver, and finish at any Recreation front desk.',
    registerIntro:
      'If you are eligible for the Student membership, the membership fee is included in your “Student Union” campus fee. To obtain the Student membership, students must:',
    steps: [
      <AppLinks key="app" />,
      SIGN_IN_CAL_STATE,
      ACCEPT_WAIVERS,
      'After signing, visit any of Recreation’s front desks to complete the registration process.',
    ],
    notes: [
      'Under 18 years of age? Please visit one of our Front Desk for additional information.',
      SCAN_BARCODE,
    ],
  },
  {
    key: 'page',
    optionTitle: 'Enrolled through PaGE',
    optionSubtitle: 'College of Professional and Global Education',
    name: 'PaGE Student',
    headline: 'Check first',
    priceNote: '$75 Fall or Spring · $45 Summer · only if non-fee paying',
    verdict:
      'Not all Cal State LA Students enrolled through PaGE pay the “Student Union” campus fee. Look at your billing statement — if the fee is not there, purchase a term membership in U-SU room 306.',
    registerIntro: 'To obtain the Student membership, students must:',
    steps: [
      <AppLinks key="app" />,
      SIGN_IN_CAL_STATE,
      ACCEPT_WAIVERS,
      'After signing, visit any of Recreation’s front desks to complete the registration process.',
      'If non-fee paying, memberships can be purchased on the 3rd floor of the U-SU in room 306 from 8 AM to 4:30 PM. Please note that memberships are CASH ONLY. Student Fall and Spring $75. Student Summer $45.',
      'Bring your receipt to any Recreation facility to add a membership to your profile.',
    ],
    notes: [SCAN_BARCODE],
  },
  {
    key: 'staff',
    optionTitle: 'Faculty or staff',
    optionSubtitle: 'Administrator, faculty, or staff member',
    name: 'Faculty/Staff',
    headline: 'Purchase required',
    priceNote: '$100 Fall or Spring · $60 Summer',
    verdict:
      'Faculty and Staff do not pay the “Student Union” fee, so a term membership is required to use the Recreation Fitness Center, programs, and services.',
    registerIntro: 'To obtain the Faculty/Staff membership, individuals must:',
    steps: [
      <AppLinks key="app" />,
      SIGN_IN_CAL_STATE,
      ACCEPT_WAIVERS,
      'Purchase a membership on the 3rd floor of the U-SU in room 306 from 8 AM to 4:30 PM. Please note that memberships are CASH ONLY. Faculty/Staff Fall and Spring $100. Faculty/Staff Summer $60.',
      BRING_RECEIPT,
    ],
    notes: [
      'Each Faculty and Staff must know their Cal State LA user ID, Cal State LA CIN number and password to register. ' +
        SCAN_BARCODE,
    ],
  },
  {
    key: 'scholar',
    optionTitle: 'Visiting scholar',
    optionSubtitle: 'Here through a recognized international program',
    name: 'Visiting Scholar',
    headline: 'Purchase required',
    priceNote: '$75 Fall or Spring · $45 Summer',
    verdict:
      'Visiting Scholars do not pay the “Student Union” campus fee. Start by emailing the Recreation Coordinator — a faculty sponsorship from your recognized program is required for approval.',
    registerIntro: 'To obtain the Visiting Scholar membership, students must:',
    steps: [
      <span key="email">
        Email Recreation Coordinator, Ashley Lepe, at <CoordinatorEmail /> to
        begin the membership process. Indicate that you are a visiting scholar
        and interested in accessing Recreation facilities. A faculty sponsorship
        from your recognized program is required for your membership approval.
      </span>,
      'Purchase a membership on the 3rd floor of the U-SU in room 306 from 8 AM to 4:30 PM. Please note that memberships are CASH ONLY. Visiting Scholar Fall and Spring $75. Visiting Scholar Summer $45.',
      <AppLinks key="app" />,
      SIGN_IN_COMMUNITY,
      ACCEPT_WAIVERS,
      BRING_RECEIPT,
    ],
    notes: [
      'Visiting Scholars must use the community login credentials provided by the Recreation Coordinator. Please have this information ready when registering. ' +
        SCAN_BARCODE,
    ],
  },
  {
    key: 'next',
    optionTitle: 'LA NEXT student',
    optionSubtitle: 'LACCD student in Cal State LA housing',
    name: 'LA NEXT Student',
    headline: 'Already paid',
    priceNote: 'Included in your “Student Union” campus fee',
    verdict:
      'Your membership fee is included in your campus fee. Email the Recreation Coordinator to begin the process and receive your community login credentials.',
    registerIntro:
      'If you are eligible for the LA NEXT membership, the membership fee is included in your “Student Union” campus fee. To obtain the LA NEXT Student membership, students must:',
    steps: [
      <span key="email">
        Email Recreation Coordinator, Ashley Lepe, at <CoordinatorEmail /> to
        begin the membership process. Indicate that you are an LA NEXT student
        and interested in accessing Recreation facilities.
      </span>,
      <AppLinks key="app" />,
      SIGN_IN_COMMUNITY,
      ACCEPT_WAIVERS,
      'After completing the waiver, bring your receipt to any Recreation facility to add a membership to your profile.',
    ],
    notes: [
      'LA NEXT students must use the community login credentials provided by the Recreation Coordinator. Please have this information ready when registering. ' +
        SCAN_BARCODE,
    ],
  },
];

export interface PaidTrack {
  name: string;
  termPrice: string;
  summerPrice: string;
  body: string;
  /** Opens this type's answer in the picker. */
  pickerKey: MembershipKey;
}

/** Cards under "Purchase by Term", in fee order. */
export const paidTracks: PaidTrack[] = [
  {
    pickerKey: 'page',
    name: 'PaGE Student',
    termPrice: '$75',
    summerPrice: '$45',
    body: 'A PaGE College Student is defined as a person who is enrolled in classes through PaGE at Cal State LA. Not all Cal State LA Students enrolled through PaGE pay the “Student Union” campus fee, so check your statement before you buy.',
  },
  {
    pickerKey: 'staff',
    name: 'Faculty/Staff',
    termPrice: '$100',
    summerPrice: '$60',
    body: 'A Faculty/Staff member is defined as a person who is currently employed as an administrator, faculty, or staff member at Cal State LA. Faculty and Staff do not pay the “Student Union” fee.',
  },
  {
    pickerKey: 'scholar',
    name: 'Visiting Scholar',
    termPrice: '$75',
    summerPrice: '$45',
    body: 'A Visiting Scholar is defined as a student visiting Cal State LA under a recognized program listed on the Cal State LA International Programs webpage. A faculty sponsorship from your recognized program is required for approval.',
  },
];

/** The sample statement's line items, in the order a real one prints them. */
export const sampleStatementRows = [
  { item: 'Stdnt Involvement Rep Fee Spr', amount: '2.00' },
  { item: 'Health Facilities Spring', amount: '3.00' },
  { item: 'Assoc Student Body Spring', amount: '26.88' },
  { item: 'Athletics Fee Spring', amount: '37.04' },
  { item: 'Student Success Fee-Spring', amount: '148.96' },
  { item: 'Stud Hlth Svcs Spring', amount: '156.05' },
  { item: 'Tuition Fee Spring', amount: '3,225.00' },
];

/** Sits between "Athletics Fee Spring" and "Student Success Fee-Spring". */
export const HIGHLIGHT_AFTER_INDEX = 3;

/* The two terms a reader is scanning their own statement for are set in bold,
   so the instruction and the thing to look for are not the same weight. */
const Term = ({ children }: { children: string }) => (
  <Typography
    as="span"
    variant="copy"
    size="md"
    weight="700"
    color="white"
    inline
  >
    {children}
  </Typography>
);

export const statementSteps: { id: string; body: ReactNode }[] = [
  {
    id: 'sign-in',
    body: 'Sign in to your Cal State LA student account and open your university billing statement for the current term.',
  },
  {
    id: 'invoice-items',
    body: (
      <>
        Scroll to the <Term>Invoice Items</Term> table and read down the Item
        column.
      </>
    ),
  },
  {
    id: 'student-union',
    body: (
      <>
        Look for <Term>Student Union</Term> followed by your term. Found it?
        Your membership is paid — go register. Missing? Purchase a term
        membership.
      </>
    ),
  },
];

export const feeFootnotes = [
  '* If you are eligible for this membership, the membership fee is included in your “Student Union” campus fee.',
  '** Not all Cal State LA Students enrolled through PaGE pay the “Student Union” campus fee, which includes the Recreation Fitness Center membership access fee. Therefore, some PaGE College students must purchase a membership to utilize the Recreation Fitness Center, programs, and services.',
  'Memberships are sold by term, expire on the term end date above, and are non-transferable. Rates do not include all programs and services; certain fees may be charged when applicable.',
];

export const eligibilityContacts = [
  {
    name: 'Ashley Lepe',
    role: 'Recreation Coordinator',
    email: COORDINATOR_EMAIL,
  },
  {
    name: 'Chris Balam',
    role: 'Director of Recreation',
    email: DIRECTOR_EMAIL,
  },
];

export const footerLocations = [
  {
    name: 'Recreation 1',
    building: 'U-SU Basement',
    phone: '(323) 343–7546',
  },
  {
    name: 'Recreation 2',
    building: 'U-SU Basement',
    phone: '(323) 343–2520',
  },
  {
    name: 'South Village Wellness Zone',
    building: 'South Village Housing',
    phone: '(323) 343–4856',
  },
  {
    name: 'Game Room',
    building: 'U-SU First Floor',
    phone: '(323) 343–6909',
  },
];
