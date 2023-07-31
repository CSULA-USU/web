import { Input, Label, Select } from 'components';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

interface SectionFormComponentProps {
  sectionName: string;
  propertySchema: any[];
  defaultValue: any;
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
    string: Input,
    number: (props: any) => <Input type="number" {...props} />,
    boolean: Checkbox,
    enum: (props: any) => (
      <Select
        ariaLabel={property}
        items={items}
        placeholder={`Select a ${property}`}
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
  sectionName,
  propertySchema,
  defaultValue,
}: SectionFormComponentProps) => {
  const [property, definition] = propertySchema;

  const FormComponent = getFormComponent(definition, property);
  return (
    <Label htmlFor={`${sectionName}_${property}`}>
      {property}: <br />
      <FormComponent name={property} defaultValue={defaultValue} />
      <br />
    </Label>
  );
};
