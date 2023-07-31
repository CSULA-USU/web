import _ from 'lodash';
import React from 'react';
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
  const sectionSchema =
    schema.definitions[`${name as keyof typeof sections}Props`];
  const sectionProperties =
    sectionSchema && Object.entries(sectionSchema.properties);

  return (
    <SectionItem>
      <h2>{name}</h2>
      {sectionProperties?.map((propertySchema) => (
        <SectionFormComponent
          key={propertySchema[0]}
          sectionName={name}
          propertySchema={propertySchema}
          defaultValue={data[propertySchema[0]]}
        />
      ))}
    </SectionItem>
  );
};
