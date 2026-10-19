import styled from 'styled-components';
import {
  Eyebrow,
  FilterChip,
  Input,
  Typography,
  VisuallyHidden,
} from 'components';
import { Colors, FontSizes, Spaces } from 'theme';
import { CampusGroupsEvent } from 'types';
import { EventFilterState, getDepartmentOptions } from 'utils/eventFilters';

interface EventFiltersProps {
  /** Every upcoming event, unfiltered — the options are built from these. */
  events: CampusGroupsEvent[];
  filters: EventFilterState;
  onFiltersChange: (filters: EventFilterState) => void;
  onSearchQueryChange: (searchQuery: string) => void;
  /** How many events the current filters leave, announced as it changes. */
  resultCount: number;
}

const DEPARTMENT_LABEL_ID = 'event-filter-department';

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
`;

/* 16px rather than the shared Input's 14px: iOS Safari zooms the whole page
   into any field set smaller than 16px the moment it takes focus. */
const SearchField = styled(Input)`
  max-width: 560px;
  height: 44px;
  padding: 0 ${Spaces.md};
  border: 1px solid ${Colors.greyLighter};
  font-size: ${FontSizes.sm};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
`;

const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Spaces.sm};
`;

const pluralizeEvents = (count: number) =>
  `${count} ${count === 1 ? 'event' : 'events'}`;

export const EventFilters = ({
  events,
  filters,
  onFiltersChange,
  onSearchQueryChange,
  resultCount,
}: EventFiltersProps) => {
  const departmentOptions = getDepartmentOptions(events);

  return (
    <FilterBar role="search" aria-label="Filter events">
      <VisuallyHidden as="label" htmlFor="event-search">
        Search events
      </VisuallyHidden>
      <SearchField
        id="event-search"
        type="search"
        placeholder="Search events"
        autoComplete="off"
        value={filters.searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchQueryChange(e.target.value)
        }
      />

      <FilterGroup>
        <Eyebrow id={DEPARTMENT_LABEL_ID} accent={false} color="greyMid">
          Department
        </Eyebrow>
        <ChipGroup role="group" aria-labelledby={DEPARTMENT_LABEL_ID}>
          {/* "All" leads rather than sorting in: it is the reset, not a peer. */}
          <FilterChip
            selected={!filters.departmentSlug}
            onClick={() =>
              onFiltersChange({ ...filters, departmentSlug: undefined })
            }
          >
            All
          </FilterChip>
          {departmentOptions.map((department) => {
            const isSelected = filters.departmentSlug === department.slug;
            return (
              <FilterChip
                key={department.slug}
                selected={isSelected}
                /* An acronym chip still names the department in full to a
                     screen reader, keeping the visible text in the name. */
                aria-label={
                  department.name.includes(department.shortName)
                    ? undefined
                    : `${department.name} (${department.shortName})`
                }
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    departmentSlug: isSelected ? undefined : department.slug,
                  })
                }
              >
                {department.shortName}
              </FilterChip>
            );
          })}
        </ChipGroup>
      </FilterGroup>

      <div role="status">
        <Typography as="p" variant="copy" color="greyMid" margin="0">
          {pluralizeEvents(resultCount)}
        </Typography>
      </div>
    </FilterBar>
  );
};
