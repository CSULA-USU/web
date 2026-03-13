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
        <title>U&ndash;SU Public Docs</title>
      </Head>
      <Header
        title="Public Documents"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
      >
        As a tax&ndash;exempt organization, the University-Student Union
        (U&ndash;SU) must make the appropriate organizational documents
        available for inspection online or for copying at the
        organization&apos;s main office during normal business hours. We have
        made our best effort to ensure that the documents posted on the website
        are the most recent versions of the aforementioned documents.
      </Header>
      <PublicInspectionDocuments />
      <GeneralInformation />
      <GovernanceFooter />
    </Page>
  );
}
