import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SupaSection } from 'types';
import { schema, sections } from 'sections';
import { SectionFormComponent } from './SectionFormComponent';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { Expandable, Typography } from 'components';
import { BiChevronRight } from 'react-icons/bi';

interface SectionFormProps {
  section: SupaSection;
}

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: red;
  > svg {
    &:hover {
      color: orange;
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
  const { name, data } = section;

  const sectionProperties = useMemo(() => {
    const sectionSchema =
      schema.definitions[`${name as keyof typeof sections}Props`];

    return sectionSchema && Object.entries(sectionSchema.properties);
  }, [name]);

  const handleDelete = useCallback(async () => {
    if (!page) return;
    const sections = page.sections.map((sectionItem) => {
      return sectionItem.order === section.order
        ? {
            ...sectionItem,
            order: -1,
          }
        : sectionItem;
    });
    setPage({ ...page, sections });
  }, [page, setPage, section]);

  return (
    <SectionItem>
      <Expandable
        indicator={<BiChevronRight size={24} />}
        header={
          <SectionHeader>
            <DeleteButton onClick={handleDelete}>
              <RiCloseCircleLine size={24} />
            </DeleteButton>
            <Typography variant="labelTitle">{name}</Typography>
          </SectionHeader>
        }
      >
        <SectionFormContainer>
          {sectionProperties.map((propertySchema) => (
            <SectionFormComponent
              key={`SectionFormComponent:${section.order}:${section.name}:${propertySchema[0]}`}
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
