import { Header, Page } from 'modules';
import { fetchPagesSections } from 'api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InstagramFeed } from 'components';

const Components = {
  hero: Header,
  InstagramFeed: InstagramFeed,
};

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
      const { pages_sections } = await fetchPagesSections(slug);
      setSections(pages_sections);
    }
  };

  useEffect(() => {
    getPagesSections();
  }, [router.query]);

  return (
    <Page>
      {!!sections.length &&
        sections.map((section: any) => {
          const SectionComponent =
            Components[section.sections.name as keyof typeof Components];
          return (
            <SectionComponent {...section.data} key={section.sections.name}>
              {section.data.description}
            </SectionComponent>
          );
        })}
    </Page>
  );
}
