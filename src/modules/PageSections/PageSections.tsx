import { SupaSection } from 'types';
import Sections from 'sections';

export default function PageSections({
  sections,
}: {
  sections: SupaSection[];
}) {
  return (
    <>
      {!!sections?.length &&
        sections.map((section: any) => {
          const SectionComponent =
            Sections[section.name as keyof typeof Sections].Component;
          return (
            <SectionComponent {...section.data} key={section.name}>
              {section.data?.description}
            </SectionComponent>
          );
        })}
    </>
  );
}
