import { insertPageSection } from 'api';
import { Expandable, Typography } from 'components';
import styled from 'styled-components';
import { sections } from 'sections';

const Container = styled.div``;

export const SectionAdder = ({
  pageId,
  sectionCount,
}: {
  pageId: number;
  sectionCount: number;
}) => {
  const handleAddSection = (sectionName: string) => {
    insertPageSection({
      page_id: pageId,
      name: sectionName,
      data: sections[sectionName as keyof typeof sections].defaultProps,
      order: sectionCount,
    });
  };

  const sectionNames = Object.keys(sections);
  return (
    <Container>
      <Expandable
        header={<Typography variant="label">+ Add Section</Typography>}
      >
        {sectionNames.length &&
          sectionNames.map((sectionName) => (
            <button
              key={sectionName}
              onClick={() => handleAddSection(sectionName)}
            >
              <Typography variant="labelTitle">{sectionName}</Typography>
            </button>
          ))}
      </Expandable>
    </Container>
  );
};
