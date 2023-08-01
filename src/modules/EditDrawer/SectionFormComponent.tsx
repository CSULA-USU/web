import { Input, Label, Select } from 'components';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { editorPageState } from 'atoms/EditorAtom';
import { SupaSection } from 'types';

interface SectionFormComponentProps {
  section: SupaSection;
  propertySchema: any[];
  value: any;
}

const Checkbox = styled.input``;

const getFormComponent = (
  definition: { type: string; enum?: string[] },
  property: string,
) => {
  let type;
  let items: { label: string; value: string }[];

  if (definition.hasOwnProperty('enum')) {
    type = 'enum';
    items = definition.enum!.map((item) => ({ label: item, value: item }));
  } else {
    type = definition.type;
  }

  const formComponentMap = {
    string: (props: any) => (
      <Input {...props} onChange={(e: any) => props.onChange(e.target.value)} />
    ),
    number: (props: any) => <Input type="number" {...props} />,
    boolean: Checkbox,
    enum: (props: any) => (
      <Select
        ariaLabel={property}
        items={items}
        placeholder={`Select a ${property}`}
        onValueChange={props.onChange}
        {...props}
      />
    ),
  };

  return (
    formComponentMap[type as keyof typeof formComponentMap] ||
    (() => <Input disabled placeholder="Not implemented" />)
  );
};

export const SectionFormComponent = ({
  section,
  propertySchema,
  value,
}: SectionFormComponentProps) => {
  const [page, setPage] = useRecoilState(editorPageState);
  const [property, definition] = propertySchema;

  const FormComponent = useMemo(
    () => getFormComponent(definition, property),
    [definition, property],
  );

  const handleChange = useCallback(
    async (newValue: any) => {
      if (!page) return;
      const sections = page.sections.map((sectionItem) => {
        return sectionItem.id === section.id
          ? {
              ...sectionItem,
              data: {
                ...sectionItem.data,
                [property]: newValue,
              },
            }
          : sectionItem;
      });
      setPage({ ...page, sections });
    },
    [page, setPage, section, property],
  );

  return (
    <Label htmlFor={`${section.name}_${section.name}_${property}`}>
      {property}: <br />
      <FormComponent name={property} value={value} onChange={handleChange} />
      <br />
    </Label>
  );
};
