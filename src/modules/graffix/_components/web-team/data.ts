import { Colors } from 'theme';
import type { WebTeamMember, WebTeamStaffMember, WebTeamTrait } from 'types';

export const TEAM_STATS = [
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

export const STAFF_MEMBERS: WebTeamStaffMember[] = [
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
    portfolioHref: 'https://www.ivilla.dev/',
    linkedInHref: 'https://www.linkedin.com/in/isaiah-villalobos/',
    gradientStart: Colors.blackMauve,
    gradientEnd: Colors.greyDarker,
  },
];

export const TRAITS: WebTeamTrait[] = [
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

export const ALUMNI: WebTeamMember[] = [
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

export const TECH_STACK = [
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
