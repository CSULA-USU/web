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
        pageSections
          .filter((s) => s.order > -1)
          .map((section: any) => {
            const Section = sections[section.name as keyof typeof sections];
            const key = `Section:${section.order}:${section.name}`;
            return !Section ? (
              <h1 key={key}>{`Component: [${section.name}] not found.`}</h1>
            ) : (
              <Section.Component {...section.data} key={key}>
                {section.data?.description}
              </Section.Component>
            );
          })}
    </>
  );
}
