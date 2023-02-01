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
    },
  },
  {
    title: 'Code of Procedures',
    children: (
      <Typography>
        The policies that govern the operation of the Union as a student body
        center for the benefit of the students, faculty, staff, and Alumni and
        to conform to the policy set forth by the Trustees of the California
        State University system and by California State University, Los Angeles
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
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
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          { href: '#', children: 'FY 18-19' },
          { href: '#', children: 'FY 17-18' },
          { href: '#', children: 'FY 16-17' },
          { href: '#', children: 'FY 15-16' },
          { href: '#', children: 'FY 14-15' },
          { href: '#', children: 'FY 13-14' },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: '#',
      variant: 'black',
    },
  },
  {
    title: 'Latest Audited Financial Statements',
    children: (
      <DocumentLinkContainer
        links={[
          { href: '#', children: 'FY 18-19' },
          { href: '#', children: 'FY 17-18' },
          { href: '#', children: 'FY 16-17' },
          { href: '#', children: 'FY 15-16' },
          { href: '#', children: 'FY 14-15' },
          { href: '#', children: 'FY 13-14' },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: '#',
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
