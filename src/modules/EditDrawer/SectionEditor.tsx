import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { SupaSection } from 'types';

interface SectionEditorProps {
  section: SupaSection;
}

const SectionItem = styled.div`
  * {
    text-wrap: wrap;
  }
`;

export const SectionEditor = ({ section }: SectionEditorProps) => {
  const { name, data } = section;

  return (
    <SectionItem>
      <h2>{name}</h2>
      <pre>{JSON.stringify(data)}</pre>
    </SectionItem>
  );
};
