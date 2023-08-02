import { Popover, Typography } from 'components';
import { sections } from 'sections';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { BiSolidPlusSquare } from 'react-icons/bi';
import styled from 'styled-components';
import { Colors } from 'theme';

const SectionButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 4px;
  width: 100%;

  &:hover p {
    color: ${Colors.grey};
  }
`;

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
    <Popover
      noCloseButton
      trigger={
        <button>
          <BiSolidPlusSquare size={40} />
        </button>
      }
    >
      {sectionNames.length &&
        sectionNames.map((sectionName) => (
          <SectionButton
            key={`AddSection:${sectionName}`}
            onClick={() => handleAddSection(sectionName)}
          >
            <Typography variant="labelTitle">{sectionName}</Typography>
          </SectionButton>
        ))}
    </Popover>
  );
};
