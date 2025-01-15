import Head from 'next/head';
import { NonBreakingSpan, Typography } from 'components';
import { Header, Page } from 'modules';
import { FormsSection } from 'partials';

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
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDAzVdPgaKb3-l5UdrlKWTqEjIf6WVAJ-JKCU-ewQQZxwFKbmlrarVXUOkjudlo04Q*',
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
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBClO-FUQqabMLYlp_HmZ1jd1qpIfLnT9oqbwpC5uGDrT0xEXkxeOEtpj1gQZ0xDHs*',
    },
  },
];

const CSIFormsButton = [
  {
    text: 'Club Banking Forms',
    href: 'https://asicalstatela.org/student-org-banking',
  },
];

export default function CSIForms() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI Forms</title>
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, Center for Student Involvement, CSI, USU, University Student, Forms, Form, Student Organization Form, Student Organization, Club Banking, Payment Advance Check Requisition, Payment Advance Procedures, Student Organization Check Requisition, Student Orgnization Deposit Slip, Student Organization Sale Receipt Log, Student Clubs and Orgs Event Fundraising Request Form, Student Organization External Private Fundraising Approval Formm, Amplified Sound Request, Event Registration, Student Organization Temporary Food Permit"
          key="keywords"
        />
        <meta
          name="description"
          content="All the forms relevant to the Center for Student Involvement"
          key="description"
        />
      </Head>
      <Header
        title="Center for Student Involvement Forms"
        backgroundImage="/subtle-background-2.jpg"
        buttons={CSIFormsButton}
      >
        Forms that pertain to the Center for Student Involvement. Recognized
        Student Organization banking forms have been moved to the Associated
        Students Inc. website.
      </Header>
      {/* <FormsSection forms={account} sectionTitle="Account Update Forms" /> */}
      {/* <FormsSection forms={banking} sectionTitle="Club Banking" /> */}
      <FormsSection forms={event} sectionTitle="Event" />
    </Page>
  );
}
