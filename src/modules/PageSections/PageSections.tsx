import { Header } from 'modules';
import { InstagramFeed } from 'components';
import { PageSection } from 'types/Supabase';
import { CallToAction } from 'sections';

const Components = {
  DepartmentHero: Header,
  InstagramFeed: InstagramFeed,
  CallToAction: CallToAction,
};

export default function PageSections({
  sections,
}: {
  sections: PageSection[];
}) {
  return (
    <>
      {!!sections?.length &&
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
