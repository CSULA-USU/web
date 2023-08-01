import _ from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { SupaSection } from 'types';
import { schema, sections } from 'sections';
import { SectionFormComponent } from './SectionFormComponent';

interface SectionFormProps {
  section: SupaSection;
}

const SectionItem = styled.div`
  * {
    text-wrap: wrap;
  }
`;

export const SectionForm = ({ section }: SectionFormProps) => {
  const { name, data } = section;

  const sectionProperties = useMemo(() => {
    const sectionSchema =
      schema.definitions[`${name as keyof typeof sections}Props`];

    return sectionSchema && Object.entries(sectionSchema.properties);
  }, [name]);

  return (
    <SectionItem>
      <h2>{name}</h2>
      {sectionProperties.map((propertySchema) => (
        <SectionFormComponent
          key={`${section.name}:${section.id}:${propertySchema[0]}`}
          section={section}
          propertySchema={propertySchema}
          value={data[propertySchema[0]]}
        />
      ))}
    </SectionItem>
  );
};
