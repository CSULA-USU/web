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
      href: 'https://www.dropbox.com/s/6anfz5imlh1db6b/annual-registration-renewal.pdf?raw=1',
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
      href: 'https://www.dropbox.com/s/jtwieg84tieqe2m/articles-of-incorporation.pdf?raw=1',
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
      href: 'https://www.dropbox.com/s/cj7f7q9r9tde4gr/auxiliary-operating-agreement.pdf?raw=1',
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
      href: 'https://www.dropbox.com/s/eacdospdxu4pzv8/code-of-procedures.pdf?raw=1',
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
      href: 'https://www.dropbox.com/s/ccvwpkpjxa2h1en/conflict-of-interest-policy.pdf?raw=1',
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/4k4iacs81u8gnvkxgpjuj/form-990-199-fy22-23.pdf?rlkey=5yqetxj3y6tq1nqb51vrkk8le&st=gxspheul&raw=1',
            children: 'FY 22-23',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/ltytq9mxfyebip5bqunb2/form-990-199-fy21-22.pdf?rlkey=a8ur6q3xopokyyztqdlm1dm60&st=eenp0m83&raw=1',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/d0sfu9emywcmcyoy5a4rg/form-990-199-fy20-21.pdf?rlkey=hvgnwe64y5xvq0vquunwb8ggw&st=y8kj4vhi&raw=1',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/88pbigkpbdkijm2i6v4h0/form-990-199-fy19-20.pdf?rlkey=jhoxy0vvfcpqnygkuhzkp2ic7&st=s8urwwmv&raw=1',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/495yh6ccvw6rjpkja8a9a/form-990-199-fy18-19.pdf?rlkey=9tp8jkif2d3nkgoz0blyion2j&st=tn2px8y2&raw=1',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/ap7awrqiirta8wh/form-990-199-fy17-18.pdf?raw=1',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/cacuqvr5yebuqql/form-990-199-fy16-17.pdf?raw=1',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/scl/fi/bqu5cs6p22q2uekj9l94w/form-990-2012-2023.zip?rlkey=qytabxucqw2cn9bubnxsr611y&st=08f0ui0t&raw=1',
      variant: 'black',
    },
  },
  {
    title: 'Latest Audited Financial Statements',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/1p777gxi7ml8x711zbjws/afs-fy-23-24.zip?rlkey=tmsu2vwfpbkc0uub2zw81hir3&st=hzdjqpla&raw=1',
            children: 'FY 23-24',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/1qzdfqm68bevcmiq1qucb/afs-fy22-23.pdf?rlkey=8hsnljmm05i1iw4rtr8gqzvlf&raw=1',
            children: 'FY 22-23',
          },
          {
            href: 'https://www.dropbox.com/s/w40fdl6mfubqhi2/afs-fy21-22.pdf?raw=1',
            children: 'FY 21-22',
          },
          {
            href: 'https://www.dropbox.com/s/oll492lymogf4gc/afs-fy20-21.pdf?raw=1',
            children: 'FY 20-21',
          },
          {
            href: 'https://www.dropbox.com/s/d18g9fj3rg9renj/afs-fy19-20.pdf?raw=1',
            children: 'FY 19-20',
          },
          {
            href: 'https://www.dropbox.com/s/y78g0kk0j1rah7i/afs-fy18-19.pdf?raw=1',
            children: 'FY 18-19',
          },
          {
            href: 'https://www.dropbox.com/s/zgu7wmwc5w7wey4/afs-fy17-18.pdf?raw=1',
            children: 'FY 17-18',
          },
          {
            href: 'https://www.dropbox.com/s/r2n7u5tksebsmiy/afs-fy16-17.pdf?raw=1',
            children: 'FY 16-17',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/scl/fi/rim4pmvso9job81yqxfkr/latest-audited-financial-statements.zip?rlkey=d1a1re9xltqljw1me8qa8f8xe&st=81bf23pw&raw=1',
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
      href: 'https://www.dropbox.com/s/eoqbdugnic8y3ut/statement-of-information.pdf?raw=1',
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
      href: 'https://www.dropbox.com/s/5adaiwdjcy7hned/bylaws.pdf?raw=1',
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
