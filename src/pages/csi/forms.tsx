import Head from 'next/head';
import { NonBreakingSpan, Typography } from 'components';
import { Header, Page } from 'modules';
import { FormsSection } from 'partials';

const account = [
  {
    title:
      'Student Organization Account Form 1: President, Treasurer, and 1 Advisor',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/d93e0323-b1ce-42ff-b13e-fb91599dcb2e?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 2: President, Treasurer, and 1 Advisor, Plus One Additional Signee',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/be151637-4c37-4907-b350-f17753e7d2cf?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 3: President, Treasurer, 2 Advisors, Are the Only Signees',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/6915f235-1d19-49fe-8f17-8e073b5dc143?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 4: President, Treasurer, 2 Advisors, Plus One Additional Signee',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/171e68a3-6fe2-428c-95e9-3005649e084f?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
];

const banking = [
  {
    title: 'Club Banking Exemption Request Form',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=58b242d4-5b79-4b5e-81d1-0fa72a34f31c&env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&v=2',
    },
  },
  {
    title: 'Payment Advance Procedures',
    children: (
      <Typography>
        Student clubs and organizations may submit a Payment Advance Check
        Requisition (Req) up to $200 to an individual for an event. Payment
        advances follow the same process as a Check Requisition.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/PAYMENT ADVANCE PROCEDURES.pdf',
    },
  },
  {
    title: 'Student Organization Check Requisition',
    children: <Typography>Updated 7/19/22</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Student Organization Check Requisition.pdf',
    },
  },
  {
    title: 'Student Organization Deposit Slip',
    children: <Typography>Updated 7/19/22</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Student Organization Deposit Slip.pdf',
    },
  },
  {
    title: 'Student Organization Sales Receipt Log',
    children: <Typography>Updated 7/28/17</Typography>,
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Appendix 1 Procedure SO Sales receipt log.pdf',
    },
  },
  {
    title: 'Student Clubs and Orgs Event Fundraising Request Form',
    children: (
      <Typography>
        The Office of Annual Giving needs to review and approve all private
        external fund raising events and activities to make sure they met the
        education-exemption criteria and make sure all policies and procedures
        are met.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/10.17.19-Student Clubs and Orgs Event Fund Raising Request Form.pdf',
    },
  },
  {
    title: 'Student Organization External Private Fundraising Approval Form',
    children: (
      <Typography>
        The Office of Annual Giving needs to review and approve all private
        external fund raising events and activities to make sure they met the
        education-exemption criteria and make sure all policies and procedures
        are met.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/10.16.19-Student Clubs and Orgs Corportate Fund Raising Request Form.pdf',
    },
  },
];

export default function CSIForms() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI Forms</title>
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA "
        />
        <meta
          name="keywords"
          content="csula cal state la student union center for student involvement csi u-su university-student forms form"
        />
        <meta
          name="description"
          content="All the forms relevant to the Center for Student Involvement"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Center for Student Involvement Forms"
        backgroundImage="/subtle-background-2.jpg"
      >
        Forms that pertain to the Center for Student Involvement
      </Header>
      <FormsSection forms={account} sectionTitle="Account Update Forms" />
      <FormsSection forms={banking} sectionTitle="Club Banking" />
    </Page>
  );
}
