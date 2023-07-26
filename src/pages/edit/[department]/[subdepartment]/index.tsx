import { EditDrawer, EditPage, Header } from 'modules';
import { fetchPageSections } from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InstagramFeed } from 'components';

const Components = {
  DepartmentHero: Header,
  InstagramFeed: InstagramFeed,
};
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
          {page.sections.length &&
            page.sections.map((section: any) => {
              const SectionComponent =
                Components[section.section_name as keyof typeof Components];
              return (
                <SectionComponent {...section.data} key={section.section_name}>
                  {section.data?.description}
                </SectionComponent>
              );
            })}
        </>
      ) : (
        'loading...'
      )}
    </EditPage>
  );
}
