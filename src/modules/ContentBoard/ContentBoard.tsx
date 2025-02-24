import styled from 'styled-components';
import { ContentBoardColumn } from './ContentBoardColumn';
import { ContentBoardNav } from './ContentBoardNav';
import { ContentBoardColumnProps, KeyValueProps } from './ContentBoardTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ContentBoardSidebar } from './ContentBoardSidebar';

const deepCopyArray = (arr: any) => {
  return JSON.parse(JSON.stringify(arr));
};

const ContentBoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 75vh;
  overflow-x: scroll;
  gap: 1rem;
  justify-content: center;
  width: 100%;

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

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <ContentBoardNav
        title={title}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        accessibleDepartment={accessibleDepartment}
      />
      <ContentBoardContainer>
        {filteredColumns.map((column: ContentBoardColumnProps, idx: number) => {
          return (
            <ContentBoardColumn
              key={idx}
              column={column}
              setSelectedCellID={setSelectedCellID}
            />
          );
        })}
      </ContentBoardContainer>
      <ContentBoardSidebar
        selectedCellID={selectedCellID}
        setSelectedCellID={setSelectedCellID}
        cellMap={cellMap}
      />
    </div>
  );
};
