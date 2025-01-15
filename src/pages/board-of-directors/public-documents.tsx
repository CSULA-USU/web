import Head from 'next/head';
import { Header, Page } from 'modules';
import {
  GeneralInformation,
  GovernanceFooter,
  PublicInspectionDocuments,
} from 'partials';

export default function PublicDocuments() {
  return (
    <Page>
      <Head>
        <title>U-SU Public Docs</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Documents, Public, Tax Exemption Application, Form 1023, IRS Determination Letter, Articles of Incorporation, Annual Registration Renewal, RRF-1, Code of Procedures, Conflict of Interest Policy, Form 990, Form 199, Audited Financial Statements, Statement of Information, SI-100, U-SU Bylaws, Statement, Finance, Financial, Bylaw, Records, Public, Agenda, Minutes, Meetings, Fiscal Year"
          key="keywords"
        />
      </Head>
      <Header
        title="Public Documents"
        backgroundImage="/backgrounds/subtle-background-2.jpg"
      >
        As a tax-exempt organization, the University-Student Union (U-SU) must
        make the appropriate organizational documents available for inspection
        online or for copying at the organization&apos;s main office during
        normal business hours. We have made our best effort to ensure that the
        documents posted on the website are the most recent versions of the
        aforementioned documents.
      </Header>
      <PublicInspectionDocuments />
      <GeneralInformation />
      <GovernanceFooter />
    </Page>
  );
}
