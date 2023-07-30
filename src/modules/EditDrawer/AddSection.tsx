import { addPageSection } from 'api';
import { Expandable, Typography } from 'components';
import styled from 'styled-components';
import { sections } from 'sections';

const Container = styled.div``;

export const AddSection = ({
  pageId,
  sectionCount,
}: {
  pageId: number;
  sectionCount: number;
}) => {
  const handleAddSection = (sectionName: string) => {
    addPageSection({
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
            <div
              key={sectionName}
              onClick={() => handleAddSection(sectionName)}
            >
              <Typography variant="labelTitle">{sectionName}</Typography>
            </div>
          ))}
      </Expandable>
    </Container>
  );
};
