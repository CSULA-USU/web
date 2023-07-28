import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { PageSection } from 'types/Supabase';

interface SectionEditorProps {
  section: PageSection;
}

const SectionItem = styled.div`
  * {
    text-wrap: wrap;
  }
`;

export const SectionEditor = ({ section }: SectionEditorProps) => {
  const { section_name, data } = section;

  return (
    <SectionItem>
      <h2>{section_name}</h2>
      <pre>{JSON.stringify(data)}</pre>
    </SectionItem>
  );
};
