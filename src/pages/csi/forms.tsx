import Head from 'next/head';
import { NonBreakingSpan, Typography } from 'components';
import { Header, Page } from 'modules';
import { FormsSection } from 'partials';

const account = [
  {
    title:
      'Student Organization Account Form 1: President, Treasurer, and 1 Advisor',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the DocuSign Power form. Each signer
        will receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/d93e0323-b1ce-42ff-b13e-fb91599dcb2e?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 2: President, Treasurer, 1 Advisor, and 1 Additional Signee',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the DocuSign Power form. Each signer
        will receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/be151637-4c37-4907-b350-f17753e7d2cf?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 3: President, Treasurer, and 2 Advisors',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the DocuSign Power form. Each signer
        will receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/6915f235-1d19-49fe-8f17-8e073b5dc143?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title:
      'Student Organization Account Form 4: President, Treasurer, 2 Advisors, and 1 Additional Signee',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the DocuSign Power form. Each signer
        will receive the form directly.
      </Typography>
    ),
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
    children: (
      <Typography as="p">
        All clubs and organizations must bank with the on-campus entity, but
        depending on if your club/organization qualifies to be exempt from this
        mandate, use this form.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=58b242d4-5b79-4b5e-81d1-0fa72a34f31c&env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&v=2',
    },
  },
  {
    title: 'Payment Advance Procedures',
    children: (
      <Typography as="p">
        Student clubs and organizations may submit a Payment Advance Check
        Requisition (Req) up to $200 to an individual for an event. Payment
        advances follow the same process as a check requisition.
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
    children: (
      <Typography as="p">
        Check requisitions are forms completed to pay vendors, reimburse
        individuals, and to pay for services. <br />
        Updated 7/19/22
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Student Organization Check Requisition.pdf',
    },
  },
  {
    title: 'Student Organization Deposit Slip',
    children: (
      <Typography as="p">
        As student clubs and organizations, cash and/or checks must be kept in a
        secure location at all times. Use this form to deposit money safely into
        your organization&apos;s bank account.
        <br />
        Updated 7/19/22
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Student Organization Deposit Slip.pdf',
    },
  },
  {
    title: 'Student Organization Sales Receipt Log',
    children: (
      <Typography as="p">
        In circumstances where it is not practical to process a receipt (e.g.
        club bake sales, ticket sales), other mitigating controls must be
        implemented. <br />
        Updated 7/28/17
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.calstatelausu.org/usuforms/csi/Forms/Appendix 1 Procedure SO Sales receipt log.pdf',
    },
  },
  {
    title: 'Student Clubs and Orgs Event Fundraising Request Form',
    children: (
      <Typography as="p">
        The Office of Annual Giving needs to review and approve all private
        external fundraising events and activities to make sure they meet the
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
      <Typography as="p">
        The Office of Annual Giving needs to review and approve all private
        external fundraising events and activities to make sure they meet the
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

const event = [
  {
    title: 'Amplified Sound Request',
    children: (
      <Typography as="p">
        Amplified Sound Request (On-Campus Departments Only & Off-Campus
        Organizations only).
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/bb01a878-4b07-41a4-8a4f-b1e3cbfcdcc6?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
    },
  },
  {
    title: 'Event Registration',
    children: (
      <Typography as="p">
        Student organization event registrations are subject to all necessary
        requirements before they can be approved.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.presence.io/form/event-registration',
    },
  },
  {
    title: 'Student Organization Temporary Food Permit Form',
    children: (
      <Typography as="p">
        Please ensure you have all required information in order to apply for a
        temporary food permit.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://powerforms.docusign.net/5d3218e7-f550-4d3a-bf4b-8537bf931f19?env=na2&acct=7891c003-1b6a-4447-a52d-e722502ecfaa&accountId=7891c003-1b6a-4447-a52d-e722502ecfaa',
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
          content="CSULA, Cal State LA Student Union, Center for Student Involvement, CSI, USU, University Student, Forms, Form, Student Organization Form, Student Organization, Club Banking, Payment Advance Check Requisition, Payment Advance Procedures, Student Organization Check Requisition, Student Orgnization Deposit Slip, Student Organization Sale Receipt Log, Student Clubs and Orgs Event Fundraising Request Form, Student Organization External Private Fundraising Approval Formm, Amplified Sound Request, Event Registration, Student Organization Temporary Food Permit"
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
      <FormsSection forms={event} sectionTitle="Event" />
    </Page>
  );
}
