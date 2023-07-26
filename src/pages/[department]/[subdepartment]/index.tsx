import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPageSections } from 'api';
import { Page } from 'modules';
import PageSections from 'modules/PageSections/PageSections';

export default function DynamicPage() {
  const router = useRouter();
  const { department, subdepartment } = router.query;
  const [sections, setSections] = useState<any>([]);

  const getPagesSections = async () => {
    if (department || subdepartment) {
      const slug = subdepartment
        ? `${department}/${subdepartment}`
        : String(department);
      if (!slug) return; //todo: send to 404 page
      const { pages_sections } = await fetchPageSections(slug);
      setSections(pages_sections);
    }
  };

  useEffect(() => {
    getPagesSections();
  }, [router.query]);

  return (
    <Page>
      <PageSections sections={sections} />
    </Page>
  );
}
