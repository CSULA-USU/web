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
        for your organizational needs) in the AdobeSign form. Each signer will
        receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBxyoaOgTiKCs3ZkXqxdLmRzDTwS3cnM_x9uZkNd54G-iwAOp939pffiQLyqEKaSE0*',
    },
  },
  {
    title:
      'Student Organization Account Form 2: President, Treasurer, 1 Advisor, and 1 Additional Signee',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the AdobeSign form. Each signer will
        receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC__aUmueIh55IpUci-TWnRzoQ084XFOGEyxGrt8UvZLaIELaL_e03b35kEm4gvFro*',
    },
  },
  {
    title:
      'Student Organization Account Form 3: President, Treasurer, and 2 Advisors',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the AdobeSign form. Each signer will
        receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhB9-vhbt5sNfsWKDeDsbIMuAuLIp-dfGy7IxXkH8I_LSodeAOyJd0qQ2yfDufNn8sk*',
    },
  },
  {
    title:
      'Student Organization Account Form 4: President, Treasurer, 2 Advisors, and 1 Additional Signee',
    children: (
      <Typography as="p">
        Input the names and emails of the signers (based on the list on the left
        for your organizational needs) in the AdobeSign form. Each signer will
        receive the form directly.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhArNhqimsD0dveu63A3dExvu7PbubBtezN8hRgi95AI4u0A1jfLHkn6P0DeVynwSwM*',
    },
  },
];

const banking = [
  {
    title: 'Club Banking At-A-Glance',
    children: (
      <Typography as="p">
        A comprehensive PDF guide for all things club banking.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://www.dropbox.com/scl/fi/xbz7638nr4snihcfte4iu/club-banking-at-a-glance.pdf?rlkey=ipcvhw7qregajytxe9jhyra9y&dl=0',
    },
  },
  {
    title: 'Exception Request Form',
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
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCJ5zNc3nY1740fR3Cl6yh5Z4i5NYYWcFGfsSvYOFvlnheb2sMnqB6QjiegIJOwAjo*',
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
      href: 'https://www.dropbox.com/s/77p267f1qorhnrb/payment-advance-procedures.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/9ytgzwxf80fknsb/student-org-check-req.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/qr0dh47qnk5tqbe/student-org-deposit-slip.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/z28vo02xeezptem/sales-receipt-log.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/nyco2uo1mc32l3h/student-clubs-and-orgs-event-fundraising-approval-form.pdf?dl=0',
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
      href: 'https://www.dropbox.com/s/zc8tq74gzhmjf3o/external-private-fundraising-approval-form.pdf?dl=0',
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
