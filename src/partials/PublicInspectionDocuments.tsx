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
      href: '/governance/public-documents/articles-of-incorporation.pdf',
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
      href: '/governance/public-documents/auxiliary-operating-agreement.pdf',
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
      href: '/governance/public-documents/annual-registration-renewal.pdf',
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
      href: '/governance/public-documents/code-of-procedures.pdf',
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
      href: '/governance/public-documents/conflict-of-interest-policy.pdf',
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy21-22.pdf',
            children: 'FY 21-22',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy20-21.pdf',
            children: 'FY 20-21',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy19-20.pdf',
            children: 'FY 19-20',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy18-19.pdf',
            children: 'FY 18-19',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy17-18.pdf',
            children: 'FY 17-18',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy16-17.pdf',
            children: 'FY 16-17',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy15-16.pdf',
            children: 'FY 15-16',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy14-15.pdf',
            children: 'FY 14-15',
          },
          {
            href: '/governance/public-documents/form-990-199/form-990-199-fy12-13.pdf',
            children: 'FY 12-13',
          },
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
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy18-19.pdf',
            children: 'FY 18-19',
          },
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy17-18.pdf',
            children: 'FY 17-18',
          },
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy16-17.pdf',
            children: 'FY 16-17',
          },
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy15-16.pdf',
            children: 'FY 15-16',
          },
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy14-15.pdf',
            children: 'FY 14-15',
          },
          {
            href: '/governance/public-documents/latest-audited-financial-statements/afs-fy13-14.pdf',
            children: 'FY 13-14',
          },
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
      href: '/governance/public-documents/statement-of-information.pdf',
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
      href: '/governance/public-documents/bylaws.pdf',
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
