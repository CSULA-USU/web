import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { fetchPageSections } from 'api';
import { Page } from 'modules';
import PageSections from 'modules/PageSections/PageSections';
import { SupaPage } from 'types';

export default function DynamicPage() {
  const router = useRouter();
  const { department, subdepartment } = router.query;
  const [page, setPage] = useState<SupaPage | undefined>();

  const getPageSections = async () => {
    if (department || subdepartment) {
      const slug = subdepartment
        ? `${department}/${subdepartment}`
        : String(department);
      if (!slug) return; //todo: send to 404 page
      // const page = await fetchPageSections(slug);
      setPage(page);
    }
  };

  useEffect(() => {
    getPageSections();
  }, [router.query]);

  return !page ? null : (
    <Page>
      <PageSections pageSections={page.sections} />
    </Page>
  );
}
