import Head from 'next/head';
import { Header, Page } from 'modules';
import { NonBreakingSpan } from 'components';
import {
  BODDownloads,
  GeneralInformation,
  GovernanceFooter,
  StudentOrganizationCategories,
} from 'partials';

export default function Governance() {
  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, student, leader, asi "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Public Documents"
        backgroundImage="/subtle-background-2.jpg"
      >
        As a Tax-Exempt Organization the University-Student Union(U-SU) must
        make the appropriate organizational documents available for inspection
        online or for copying at the organization&apos;s main office during
        normal business hours. We have made our best effort to ensure that the
        documents posted on the web site are the most recent versions of the
        aforementioned documents.
        <NonBreakingSpan>Cal State Los Angeles</NonBreakingSpan>.
      </Header>
      <StudentOrganizationCategories />
      <GeneralInformation />
      <BODDownloads />
      <GovernanceFooter />
    </Page>
  );
}
