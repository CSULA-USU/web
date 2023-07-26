import { addPageSection, fetchSections } from 'api';
import { Expandable, Typography } from 'components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SectionComponent } from 'types/Supabase';

const Container = styled.div``;

export const AddSection = ({
  pageId,
  sectionCount,
}: {
  pageId: number;
  sectionCount: number;
}) => {
  const [sections, setSections] = useState<SectionComponent[]>([]);

  const getSections = async () => {
    const data = await fetchSections();
    setSections(data);
  };

  useEffect(() => {
    getSections();
  }, []);

  const handleAddSection = (sectionName: string) => {
    addPageSection({
      page_id: pageId,
      section_name: sectionName,
      order: sectionCount,
    });
  };

  return (
    <Container>
      <Expandable
        header={<Typography variant="label">+ Add Section</Typography>}
      >
        {sections.length &&
          sections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleAddSection(section.name)}
            >
              <Typography variant="labelTitle">{section.name}</Typography>
            </div>
          ))}
      </Expandable>
    </Container>
  );
};
