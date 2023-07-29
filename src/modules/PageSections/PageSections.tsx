import { PageSection } from 'types/Supabase';
import SectionComponents from 'sections';

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
            SectionComponents[
              section.section_name as keyof typeof SectionComponents
            ];
          return (
            <SectionComponent {...section.data} key={section.section_name}>
              {section.data?.description}
            </SectionComponent>
          );
        })}
    </>
  );
}
