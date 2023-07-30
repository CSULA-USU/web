import { SupaSection } from 'types';
import { sections } from 'sections';

export default function PageSections({
  pageSections,
}: {
  pageSections: SupaSection[];
}) {
  return (
    <>
      {!!pageSections?.length &&
        pageSections.map((section: any) => {
          const SectionComponent =
            sections[section.name as keyof typeof sections].Component;
          return (
            <SectionComponent {...section.data} key={section.name}>
              {section.data?.description}
            </SectionComponent>
          );
        })}
    </>
  );
}
