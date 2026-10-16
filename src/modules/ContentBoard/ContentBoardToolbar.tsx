import styled from 'styled-components';

import { Select } from 'components/Select';
import departmentsData from 'data/departments.json';
import { Colors, FontSizes, Radii, Spaces } from 'theme';

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${Spaces.md} ${Spaces.lg};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

const FieldLabel = styled.label`
  font-size: ${FontSizes.xs};
  font-weight: 600;
`;

const SearchInput = styled.input`
  width: min(360px, 100%);
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: ${FontSizes.sm};
  border: 1px solid ${Colors.greyLighter};
  border-radius: ${Radii.control};

  &:focus-visible {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

type Props = {
  filterInput: string;
  setFilterInput: (value: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
  /** A department id, or "all" for viewers who can see every department. */
  accessibleDepartment: string;
};

export const ContentBoardToolbar = ({
  filterInput,
  setFilterInput,
  selectedDepartment,
  setSelectedDepartment,
  accessibleDepartment,
}: Props) => {
  // Only departments the viewer can open: Select has no disabled items, and a
  // list of options that cannot be picked is noise anyway.
  const departmentItems = departmentsData
    .filter(
      (department) =>
        accessibleDepartment === 'all' ||
        department.id === accessibleDepartment,
    )
    .map((department) => ({ label: department.title, value: department.id }));

  return (
    <Toolbar>
      <Field>
        <FieldLabel htmlFor="graffix-department">Department</FieldLabel>
        <Select
          id="graffix-department"
          ariaLabel="Department"
          items={departmentItems}
          value={selectedDepartment}
          onValueChange={setSelectedDepartment}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="graffix-search">Search titles</FieldLabel>
        <SearchInput
          id="graffix-search"
          type="search"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </Field>
    </Toolbar>
  );
};
