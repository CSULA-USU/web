import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';

import type { GraffixRequest } from 'types';
import { Spaces } from 'theme';
import { ContentBoardColumnProps, KeyValueProps } from './ContentBoardTypes';
import { ContentBoardDetailPanel } from './ContentBoardDetailPanel';
import { ContentBoardGroup } from './ContentBoardGroup';
import { ContentBoardToolbar } from './ContentBoardToolbar';

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.lg};
  width: 100%;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
`;

// One section per status, stacked, rather than a column per status side by
// side: eight 200px columns ran past the 1440px content box into a sideways
// scroll, and the board was read-only (status lives in Notion), so columns
// bought none of the drag-between-statuses a kanban is for.
export const ContentBoard = ({
  columns,
  cellMap,
  selectedDepartment,
  setSelectedDepartment,
  accessibleDepartment,
}: {
  columns: ContentBoardColumnProps[];
  cellMap: KeyValueProps;
  selectedDepartment: string;
  setSelectedDepartment: Dispatch<SetStateAction<string>>;
  accessibleDepartment: string;
}) => {
  const [selectedCellID, setSelectedCellID] = useState<string>('');
  const [filterInput, setFilterInput] = useState<string>('');
  // Only sections the viewer has toggled; the rest fall back to their
  // startsCollapsed default. Keyed by status, so it survives a department
  // switch.
  const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
    {},
  );

  const closeDetails = useCallback(() => setSelectedCellID(''), []);

  // Search narrows each section's rows and count but never opens a closed
  // section, so the page does not jump around while typing; a match in a
  // closed section shows in its count.
  const groups = useMemo(() => {
    const filterWords = filterInput.toLowerCase().split(' ').filter(Boolean);
    return columns.map((column) => ({
      ...column,
      requests: column.columnData
        .filter((cell) =>
          filterWords.every((word) =>
            cell.cellTitle.toLowerCase().includes(word),
          ),
        )
        .map((cell) => cellMap[cell.cellID] as GraffixRequest | undefined)
        .filter((request): request is GraffixRequest => !!request),
    }));
  }, [columns, cellMap, filterInput]);

  return (
    <Board>
      <ContentBoardToolbar
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        accessibleDepartment={accessibleDepartment}
      />
      <Groups>
        {groups.map((group) => {
          const isOpen =
            openOverrides[group.columnTitle] ?? !group.startsCollapsed;
          return (
            <ContentBoardGroup
              key={group.columnTitle}
              title={group.columnTitle}
              color={group.color}
              requests={group.requests}
              isOpen={isOpen}
              onToggle={() =>
                setOpenOverrides((prev) => ({
                  ...prev,
                  [group.columnTitle]: !isOpen,
                }))
              }
              onSelectRequest={setSelectedCellID}
            />
          );
        })}
      </Groups>
      <ContentBoardDetailPanel
        selectedCellID={selectedCellID}
        onClose={closeDetails}
        cellMap={cellMap}
      />
    </Board>
  );
};
