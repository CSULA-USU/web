import { Header } from 'modules';
import { InstagramFeed } from 'components';
import { PageSection } from 'types/Supabase';

const Components = {
  DepartmentHero: Header,
  InstagramFeed: InstagramFeed,
};

export default function PageSections({
  sections,
}: {
  sections: PageSection[];
}) {
  return (
    <>
      {!!sections.length &&
        sections.map((section: any) => {
          const SectionComponent =
            Components[section.section_name as keyof typeof Components];
          return (
            <SectionComponent {...section.data} key={section.section_name}>
              {section.data?.description}
            </SectionComponent>
          );
        })}
    </>
  );
}
