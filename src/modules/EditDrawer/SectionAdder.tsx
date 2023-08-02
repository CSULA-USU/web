import { Expandable, Typography } from 'components';
import styled from 'styled-components';
import { sections } from 'sections';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';

const Container = styled.div``;

export const SectionAdder = ({ pageId }: { pageId: number }) => {
  const [page, setPage] = useRecoilState(editorPageState);

  const handleAddSection = (sectionName: string) => {
    if (!page) return;
    const newSection = {
      page_id: pageId,
      name: sectionName,
      data: sections[sectionName as keyof typeof sections].defaultProps,
      order: page?.sections.length,
    };
    setPage({
      ...page,
      sections: [...page.sections, newSection],
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
