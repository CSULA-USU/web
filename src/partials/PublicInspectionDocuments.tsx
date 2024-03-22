import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
  Typography,
} from 'components';
import {
  DocumentLinkContainer,
  DownloadSection,
  DownloadSectionProps,
} from 'modules';
import { Spaces } from 'theme';

const downloads: DownloadSectionProps[] = [
  {
    title: 'Tax Exemption Application (Form 1023)',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>Request Access</NonBreakingSpan>,
      disabled: true,
    },
  },
  {
    title: 'IRS Determination Letter',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>Request Access</NonBreakingSpan>,
      disabled: true,
    },
  },
  {
    title: 'Annual Registration Renewal (RRF-1)',
    children: (
      <Typography>
        The purpose of the Annual Registration Renewal Fee Report (Form RRF-1)
        is to assist the Attorney General&apos;s Office with early detection of
        charity fiscal mismanagement and unlawful diversion of charitable
        assets.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/6anfz5imlh1db6b/annual-registration-renewal.pdf?dl=0',
    },
  },
  {
    title: 'Articles of Incorporation',
    children: (
      <Typography>
        This legal document contains general information about the U-SU such as
        its name, location, legal structure, and purpose.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/jtwieg84tieqe2m/articles-of-incorporation.pdf?dl=0',
    },
  },
  {
    title: 'Auxiliary Operating Agreement',
    children: (
      <Typography>
        This agreement is made and entered into by and between the Trustees of
        the California State University by their duly qualified Chancellor (CSU)
        and the University-Student Union Board (Auxiliary) serving California
        State University Los Angeles (Campus).
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/cj7f7q9r9tde4gr/auxiliary-operating-agreement.pdf?dl=0',
    },
  },
  {
    title: 'Code of Procedures',
    children: (
      <Typography>
        The policies that govern the operation of the Union as a student body
        center for the benefit of the students, faculty, staff, and Alumni and
        to conform to the policy set forth by the Trustees of the California
        State University system and by California State University, Los Angeles.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/eacdospdxu4pzv8/code-of-procedures.pdf?dl=0',
    },
  },
  {
    title: 'Conflict of Interest Policy',
    children: (
      <Typography>
        The conflict of interest policy is to protect the exclusive right and
        integrity of information, services, and various interests of the CSULA
        University-Student Union, Board (U-SU).
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/ccvwpkpjxa2h1en/conflict-of-interest-policy.pdf?dl=0',
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/s/1eu3uo97x0p2ju6/form-990-199-fy21-22.pdf?dl=0',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/s/svt4v48qeu703dy/form-990-199-fy20-21.pdf?dl=0',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/s/kqt1gjaxki4vwrm/form-990-199-fy19-20.pdf?dl=0',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/s/fi0uvb8qh4c7u27/form-990-199-fy18-19.pdf?dl=0',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/ap7awrqiirta8wh/form-990-199-fy17-18.pdf?dl=0',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/cacuqvr5yebuqql/form-990-199-fy16-17.pdf?dl=0',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/s/t0tcybhjci4pidn/form-990-199.zip?dl=0',
      variant: 'black',
    },
  },
  {
    title: 'Latest Audited Financial Statements',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/1qzdfqm68bevcmiq1qucb/afs-fy22-23.pdf?rlkey=8hsnljmm05i1iw4rtr8gqzvlf&dl=0',
            children: 'FY 22-23',
          },
          {
            href: 'https://www.dropbox.com/s/w40fdl6mfubqhi2/afs-fy21-22.pdf?dl=0',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/s/oll492lymogf4gc/afs-fy20-21.pdf?dl=0',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/s/d18g9fj3rg9renj/afs-fy19-20.pdf?dl=0',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/s/y78g0kk0j1rah7i/afs-fy18-19.pdf?dl=0',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/zgu7wmwc5w7wey4/afs-fy17-18.pdf?dl=0',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/r2n7u5tksebsmiy/afs-fy16-17.pdf?dl=0',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/s/je8s9qtmtaoavip/latest-audited-financial-statements.zip?dl=0',
      variant: 'black',
    },
  },
  {
    title: 'Statement of Information (SI-100)',
    children: (
      <Typography>
        Filed to divulge the U-SU&apos;s activities over the prior year.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/eoqbdugnic8y3ut/statement-of-information.pdf?dl=0',
    },
  },
  {
    title: 'U-SU Bylaws',
    children: (
      <Typography>
        Nonprofit bylaws are mandated by state law and are available to the
        public to increase accountability and trust with constituents.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/s/5adaiwdjcy7hned/bylaws.pdf?dl=0',
    },
  },
];

export const PublicInspectionDocuments = () => (
  <FluidContainer>
    <Typography variant="titleSmall" as="h2">
      Public Inspection Of University-Student Union (U-SU) Documents
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {downloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
  </FluidContainer>
);
