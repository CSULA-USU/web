import { EditDrawer, EditPage } from 'modules';
import { fetchPageSections } from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageSections from 'modules/PageSections/PageSections';

export default function DynamicPage() {
  const router = useRouter();
  const { department, subdepartment } = router.query;
  const [page, setPage] = useState<any>(null);

  const getPagesSections = async () => {
    if (department || subdepartment) {
      const slug = subdepartment
        ? `${department}/${subdepartment}`
        : String(department);
      if (!slug) return; //todo: send to 404 page
      const page = await fetchPageSections(slug);
      setPage(page);
    }
  };

  useEffect(() => {
    getPagesSections();
  }, [router.query]);

  return (
    <EditPage title={`USU Editor: ${department || ''}/${subdepartment || ''}`}>
      {!!page ? (
        <>
          <EditDrawer page={page} />
          <PageSections sections={page.sections} />
        </>
      ) : (
        'loading...'
      )}
    </EditPage>
  );
}