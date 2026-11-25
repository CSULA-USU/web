import { useMemo } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, Typography } from 'components';
import { media, Spaces } from 'theme';
import type { V2UserRow } from './types';
import {
  EMPTY_USER_FILTERS,
  getDepartmentFilterOptions,
  getRoleFilterOptions,
  isUserFilterActive,
  type UserFilterState,
} from './userFilters';

interface AccessManagementUserFiltersProps {
  /** Every user, unfiltered — the menus are built from these. */
  users: V2UserRow[];
  filters: UserFilterState;
  onChange: (filters: UserFilterState) => void;
  activeCount: number;
  deactivatedCount: number;
}

const Bar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) auto;
  align-items: center;
  gap: ${Spaces.sm};

  ${media('tablet')`
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    > :first-child {
      grid-column: 1 / -1;
    }
  `}
`;

/* Reserves its line whether or not filters are on, so the tabs below never
   jump as the summary appears and disappears. */
const Summary = styled.div`
  min-height: 1.5em;
  margin: ${Spaces.sm} 0 ${Spaces.md};
`;

export const AccessManagementUserFilters = ({
  users,
  filters,
  onChange,
  activeCount,
  deactivatedCount,
}: AccessManagementUserFiltersProps) => {
  const departmentOptions = useMemo(
    () => getDepartmentFilterOptions(users),
    [users],
  );
  const roleOptions = useMemo(() => getRoleFilterOptions(users), [users]);
  const isFiltering = isUserFilterActive(filters);

  return (
    <div>
      <Bar>
        <Input
          type="search"
          aria-label="Search users by email, department, or role"
          placeholder="Search users"
          value={filters.query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...filters, query: event.target.value })
          }
        />
        <Select
          ariaLabel="Filter by department"
          items={departmentOptions}
          value={filters.departmentId}
          onValueChange={(departmentId) =>
            onChange({ ...filters, departmentId })
          }
        />
        <Select
          ariaLabel="Filter by role"
          items={roleOptions}
          value={filters.roleId}
          onValueChange={(roleId) => onChange({ ...filters, roleId })}
        />
        {isFiltering && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onChange(EMPTY_USER_FILTERS)}
          >
            Clear
          </Button>
        )}
      </Bar>

      {/* Counts both tabs, since a match can sit in the one not showing. */}
      <Summary role="status">
        {isFiltering && (
          <Typography as="p" variant="copy" size="xs" color="greyDark">
            {activeCount} active · {deactivatedCount} deactivated
          </Typography>
        )}
      </Summary>
    </div>
  );
};
