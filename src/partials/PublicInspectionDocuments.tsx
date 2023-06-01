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
      href: 'https://www.dropbox.com/s/6p9cw7epbpcj4ff/annual-registration-renewal.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/kje616wz6jy9dab/articles-of-incorporation.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/egirk9clsotm7fc/auxiliary-operating-agreement.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/kky5hcwdvvues1u/code-of-procedures.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/c8uyei4lbhxa923/conflict-of-interest-policy.pdf?dl=0',
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/s/19vmf0cryq32xi1/form-990-199-fy21-22.pdf?dl=0',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/s/m7nm6yh9mxnml0z/form-990-199-fy20-21.pdf?dl=0',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/s/d6wvalv3pem1aoj/form-990-199-fy19-20.pdf?dl=0',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/s/6g4ki72vxgadr6z/form-990-199-fy18-19.pdf?dl=0',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/goj6ouitf3m70te/form-990-199-fy17-18.pdf?dl=0',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/5y4k2g8pcfe5x3p/form-990-199-fy16-17.pdf?dl=0',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: '',
      variant: 'black',
    },
  },
  {
    title: 'Latest Audited Financial Statements',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/s/9jyug3bcr31qiri/afs-fy21-22.pdf?dl=0',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/s/9cppkh14klau2u9/afs-fy20-21.pdf?dl=0',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/s/qif2otjgz2pigr9/afs-fy19-20.pdf?dl=0',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/s/6gfq5mg9fbhvlfl/afs-fy18-19.pdf?dl=0',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/4nx64g8yerc7oc1/afs-fy17-18.pdf?dl=0',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/dc1xyxw5epnbxpv/afs-fy16-17.pdf?dl=0',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: '',
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
      href: '/https://www.dropbox.com/s/7yunk42xvdvhpx7/statement-of-information.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/6i500mjzltccfao/bylaws.pdf?dl=0',
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
