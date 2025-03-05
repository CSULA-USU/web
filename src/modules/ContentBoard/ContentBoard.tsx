import styled from 'styled-components';
import { ContentBoardColumn } from './ContentBoardColumn';
import { ContentBoardNav } from './ContentBoardNav';
import { ContentBoardColumnProps, KeyValueProps } from './ContentBoardTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ContentBoardSidebar } from './ContentBoardSidebar';
import { useBreakpoint } from 'hooks';

const deepCopyArray = (arr: any) => {
  return JSON.parse(JSON.stringify(arr));
};

const ContentBoardColumnsContainer = styled.div<{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}>`
  display: flex;
  flex-direction: row;
  height: 75vh;
  overflow-x: auto;
  gap: 1rem;
  justify-content: space-around;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ContentBoard = ({
  title,
  columns,
  cellMap,
  selectedDepartment,
  setSelectedDepartment,
  accessibleDepartment,
}: {
  title: string;
  columns: ContentBoardColumnProps[];
  cellMap: KeyValueProps;
  selectedDepartment: string;
  setSelectedDepartment: Dispatch<SetStateAction<string>>;
  accessibleDepartment: string;
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [selectedCellID, setSelectedCellID] = useState<string>('');
  const [filterInput, setFilterInput] = useState<string>('');
  const [filteredColumns, setFilteredColumns] =
    useState<ContentBoardColumnProps[]>(columns);

  useEffect(() => {
    // Update columns whenever the filter search input is changed.
    if (filterInput.length == 0) {
      setFilteredColumns(columns);
      return;
    }

    const tempColumns: ContentBoardColumnProps[] = deepCopyArray(columns).map(
      (column: ContentBoardColumnProps) => {
        column.columnData = column.columnData.filter((cell) => {
          for (let filterWord of filterInput.split(' ')) {
            if (
              !cell.cellTitle.toLowerCase().includes(filterWord.toLowerCase())
            ) {
              return false;
            }
          }
          return true;
        });
        return column;
      },
    );
    setFilteredColumns(tempColumns);
  }, [filterInput, columns]);

  const ContentBoardContainer = styled.div<{ isTablet: boolean }>`
    position: relative;
    width: ${isTablet ? '100%' : 'calc(100% - 120px)'};
  `;

  return (
    <ContentBoardContainer isTablet={isTablet}>
      <ContentBoardNav
        title={title}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        accessibleDepartment={accessibleDepartment}
      />
      <ContentBoardColumnsContainer
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      >
        {filteredColumns.map((column: ContentBoardColumnProps, idx: number) => {
          return (
            <ContentBoardColumn
              key={idx}
              column={column}
              setSelectedCellID={setSelectedCellID}
            />
          );
        })}
      </ContentBoardColumnsContainer>
      <ContentBoardSidebar
        selectedCellID={selectedCellID}
        setSelectedCellID={setSelectedCellID}
        cellMap={cellMap}
      />
    </ContentBoardContainer>
  );
};
