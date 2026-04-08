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
    title: 'Annual Registration Renewal (RRF-1)',
    children: (
      <Typography>
        The purpose of the Annual Registration Renewal Fee Report (Form
        RRF&ndash;1) is to assist the Attorney General&apos;s Office with early
        detection of charity fiscal mismanagement and unlawful diversion of
        charitable assets.
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
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/s/cj7f7q9r9tde4gr/auxiliary-operating-agreement.pdf?raw=1',
            children: 'Operating Agreement',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/vwl8kn0776p9vp0ri90qs/review-of-auxiliary-organization-operations.pdf?rlkey=l26fp4y5gpxsi1veh7xkdnudc&st=r5zcrlad&raw=1',
            children: 'Review of Auxiliary Organization Operations',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/scl/fi/dv45xzrkmzf17dmo46znc/auxiliary-operating-agreement.zip?rlkey=yxn2z65hu07wt3hjpxd3a6z27&st=rhna9qep&dl=0',
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
        State University system and by California State University, Los Angeles.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/scl/fi/onx9afkwpl0tuklm8ag3s/Approved-Code-of-Procedures-March-2025.pdf?rlkey=t93unfl3rklea6ymd9n10lg0m&st=rp9f91fi&raw=1',
    },
  },
  {
    title: 'Conflict of Interest Policy',
    children: (
      <Typography>
        The conflict of interest policy is to protect the exclusive right and
        integrity of information, services, and various interests of the CSULA
        University&ndash;Student Union, Board (U&ndash;SU).
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      disabled: false,
      variant: 'black',
      href: 'https://www.dropbox.com/scl/fi/ye4sn7isp07f0ydtjfol0/conflict-of-interest-policy-2025?rlkey=gue9qxyv6l68iuauy50d1ffmw&st=4dn7w9tk&dl=1',
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/scl/fi/nt651n6jmqgyvjadf3fxu/form-990-199-fy24-25.pdf?rlkey=3dd5epelbo1ssjhja7atm2210&st=g2zg063y&raw=1',
            children: 'FY 24-25',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/88mvp66ji4m4p50bnfy2k/form-990-199-fy23-24.pdf?rlkey=sscxtogzx6cnun0pp6daorzer&st=2vscvo0h&raw=1',
            children: 'FY 23-24',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/xjd25r7ejygo1urr91q2b/form-990-199-fy22-23.pdf?rlkey=2cidyn6j43gbgz9ht85ssoffl&st=e5t4c4ke&raw=1',
            children: 'FY 22-23',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/scl/fi/11jua102x4swczg0axfs0/form-990-apr-2026.zip?rlkey=5n95xb4kw85djd96jxr089n70&st=mnugdtlb&dl=1',
      variant: 'black',
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
    title: 'Latest Audited Financial Statements',
    children: (
      <DocumentLinkContainer
        links={[
          {
            href: 'https://www.dropbox.com/scl/fo/qn5hish6d4d7xirt8c0lh/ANIRpb_5vaPPQO_T2URzlfE?rlkey=uftek73262lec4ok09lzit0s1&st=dmnoheq5&raw=1',
            children: 'FY 24-25',
          },
          {
            href: 'https://www.dropbox.com/scl/fo/zrd4kg4cxmn580qt187e9/ADZ-TwrwDLzg5uVVPOidRco?rlkey=mskxsc172pw4uiac12up6h177&st=t47d4nvi&raw=1',
            children: 'FY 23-24',
          },
          {
            href: 'https://www.dropbox.com/scl/fi/c4xzmxx7uz58r8qlxg3b0/6-30-24-CSU-LA-University-Student-Union-Financial-Statements-w-Supp.pdf?rlkey=rta56fxafb9il9mdyk0smr6m6&st=d3duub33&raw=1',
            children: 'FY 22-23',
          },
        ]}
      />
    ),
    button: {
      children: (
        <NonBreakingSpan>&nbsp;Download All&nbsp;&nbsp;</NonBreakingSpan>
      ),
      href: 'https://www.dropbox.com/scl/fi/kzi2gzwtk4d09owaozp7i/latest-audited-financial-statements-remediated-download-all.zip?rlkey=om457n2pbebv57d56kwzhqj85&st=9q6vg2ah&raw=1',
      variant: 'black',
    },
  },
  {
    title: 'Statement of Information (SI-100)',
    children: (
      <Typography>
        Filed to divulge the U&ndash;SU&apos;s activities over the prior year.
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
    title: 'Tax Exemption Application (Form 1023)',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>Request Access</NonBreakingSpan>,
      disabled: true,
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
      href: 'https://www.dropbox.com/scl/fi/52mwnnf7rjzv9z5vqd7z2/Approved-U-SU-Bylaws-February-2025.pdf?rlkey=ul39d6egnl0qdab5ay8b23ce8&st=eossc2jo&raw=1',
    },
  },
];

export const PublicInspectionDocuments = () => (
  <FluidContainer>
    <Typography variant="titleSmall" as="h2">
      Public Inspection Of University&ndash;Student Union (U&ndash;SU)
      Docu0ments
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {downloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
  </FluidContainer>
);
