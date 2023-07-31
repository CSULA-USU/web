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
          const Section = sections[section.name as keyof typeof sections];
          return !Section ? (
            <h1
              key={section.id}
            >{`Component: [${section.name}] not found.`}</h1>
          ) : (
            <Section.Component {...section.data} key={section.id}>
              {section.data?.description}
            </Section.Component>
          );
        })}
    </>
  );
}
