import React, { useMemo } from 'react';
import { SupaSection } from 'types';
import { sections } from 'sections';
import EditModeContainer from './EditModeContainer';

export default function PageSections({
  editMode,
  pageSections,
}: {
  editMode?: boolean;
  pageSections: SupaSection[];
}) {
  const Container = useMemo(
    () => (editMode ? EditModeContainer : React.Fragment),
    [editMode],
  );

  return (
    <>
      {!!pageSections?.length &&
        pageSections
          // .filter((s) => !s.stagedDelete)
          .map((section: any) => {
            const Section = sections[section.name as keyof typeof sections];
            const key = `Section:${section.order}:${section.name}`;
            return !Section ? (
              <h1 key={key}>{`Component: [${section.name}] not found.`}</h1>
            ) : (
              <Container hide={section.stagedDelete} key={key}>
                <Section.Component {...section.data}>
                  {section.data?.description}
                </Section.Component>
              </Container>
            );
          })}
    </>
  );
}
