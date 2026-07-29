import { PageMeta } from 'components';
import { Header, Page } from 'modules';
import {
  GeneralInformation,
  GovernanceFooter,
  PublicInspectionDocuments,
} from 'partials';

export default function PublicDocuments() {
  return (
    <Page>
      <PageMeta
        title="U–SU Public Docs"
        description="Public inspection documents for the University-Student Union at Cal State LA, including audited financial statements, budgets, and governing documents."
        path="/board-of-directors/public-documents"
        socialTitle="U-SU Public Documents | Cal State LA"
        socialDescription="Audited financials, budgets, bylaws, and other public inspection documents for the University-Student Union."
      />
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
