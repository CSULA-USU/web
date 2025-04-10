import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SupaSection } from 'types';
import { schema, sections } from 'sections';
import { SectionFormComponent } from './SectionFormComponent';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { Expandable, Typography } from 'components';
import { BiChevronRight } from 'react-icons/bi';
import { Colors } from 'theme';

interface SectionFormProps {
  section: SupaSection;
}

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button<{ stagedDelete?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${(p) => (p.stagedDelete ? Colors.greyDarker : 'red')};
  margin-left: ${(p) => (p.stagedDelete ? '-16px' : 0)};
  transition: 0.3s ease;
  > svg {
    transition: 0.3s ease;
    transform: rotate(${(p) => (p.stagedDelete ? '-315deg' : '0deg')});
    &:hover {
      scale: 1.2;
      color: ${(p) => (p.stagedDelete ? 'green' : 'orange')};
    }
  }
`;

const SectionItem = styled.div`
  margin-bottom: 8px;
`;
const SectionFormContainer = styled.div`
  padding: 8px 4px;
  margin-bottom: 8px;
  > * {
    display: block;
    margin-bottom: 8px;
  }
`;

export const SectionForm = ({ section }: SectionFormProps) => {
  const [page, setPage] = useRecoilState(editorPageState);
  const { name, data, order, stagedDelete } = section;

  const sectionProperties = useMemo(() => {
    const sectionSchema =
      schema.definitions[`${name as keyof typeof sections}Props`];

    return sectionSchema && Object.entries(sectionSchema.properties);
  }, [name]);

  const handleDelete = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (!page) return;
      const sections = page.sections.map((sectionItem) => {
        return sectionItem.order === order
          ? {
              ...sectionItem,
              stagedDelete: !sectionItem.stagedDelete,
            }
          : sectionItem;
      });
      setPage({ ...page, sections });
    },
    [page, setPage, order],
  );

  const SectionFormHeader = useMemo(
    () => (
      <SectionHeader>
        <DeleteButton onClick={handleDelete} stagedDelete={stagedDelete}>
          <RiCloseCircleFill size={24} />
        </DeleteButton>
        <Typography
          as="span"
          color={stagedDelete ? 'grey' : 'black'}
          style={{
            textDecoration: stagedDelete ? 'line-through' : 'none',
          }}
          variant="labelTitle"
        >
          {`\u{00A0}\u{00A0}${name}\u{00A0}\u{00A0}`}
          {section.id ? '' : '*'}
        </Typography>
        <Typography
          as="span"
          color="gold"
          variant="labelTitleSmall"
        ></Typography>
      </SectionHeader>
    ),
    [handleDelete, name, stagedDelete, section.id],
  );

  return (
    <SectionItem>
      <Expandable
        indicator={<BiChevronRight size={24} />}
        header={SectionFormHeader}
      >
        <SectionFormContainer>
          {sectionProperties.map((propertySchema) => (
            <SectionFormComponent
              key={`SectionFormComponent:${order}:${name}:${propertySchema[0]}`}
              section={section}
              propertySchema={propertySchema}
              value={data[propertySchema[0]]}
            />
          ))}
        </SectionFormContainer>
      </Expandable>
    </SectionItem>
  );
};
