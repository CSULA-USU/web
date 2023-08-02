import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SupaSection } from 'types';
import { schema, sections } from 'sections';
import { SectionFormComponent } from './SectionFormComponent';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';

interface SectionFormProps {
  section: SupaSection;
}

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  > svg {
    &:hover {
      color: red;
    }
  }
`;

const SectionItem = styled.div``;

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
      <SectionHeader>
        <h2>{name}</h2>
        <DeleteButton onClick={handleDelete}>
          <AiOutlineClose size={36} />{' '}
        </DeleteButton>
      </SectionHeader>
      {sectionProperties.map((propertySchema) => (
        <SectionFormComponent
          key={`SectionFormComponent:${section.order}:${section.name}:${propertySchema[0]}`}
          section={section}
          propertySchema={propertySchema}
          value={data[propertySchema[0]]}
        />
      ))}
    </SectionItem>
  );
};
