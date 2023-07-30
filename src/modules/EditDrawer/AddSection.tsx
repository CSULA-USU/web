import { addPageSection } from 'api';
import { Expandable, Typography } from 'components';
import styled from 'styled-components';
import Sections from 'sections';

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
      data: Sections[sectionName as keyof typeof Sections].defaultProps,
      order: sectionCount,
    });
  };

  const sectionNames = Object.keys(Sections);
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
