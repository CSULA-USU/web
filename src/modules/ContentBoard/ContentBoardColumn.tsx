import styled from 'styled-components';
import { Typography } from 'components';
import { ContentBoardColumnProps } from './ContentBoardTypes';
import { ContentBoardCell } from './ContentBoardCell';
import { Dispatch, SetStateAction } from 'react';
import { FontSizes } from 'theme';

const ContentBoardColumnContainer = styled.div`
  height: 70vh;
  width: 200px;
  max-width: 240px;
`;

const ContentBoardColumnHeader = ({
  columnTitle,
  columnCellCount,
  color,
}: {
  columnTitle: string;
  columnCellCount: number;
  color: string;
}) => {
  const ContentBoardColumnHeaderContainer = styled.div`
    height: 3rem;
    width: 200px;
    max-width: 240px;
    display: flex;
    align-items: center;
    position: relative;
  `;

  return (
    <ContentBoardColumnHeaderContainer>
      <Typography
        as="h2"
        variant="labelTitleSmall"
        weight="400"
        size="md"
        lineHeight={FontSizes['lg']}
        style={{
          borderBottom: `2px solid ${color}`,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <strong>{columnTitle}</strong>
      </Typography>
      <Typography as="span" margin="0 0 0 0rem">
        {columnCellCount}
      </Typography>
    </ContentBoardColumnHeaderContainer>
  );
};

export const ContentBoardColumn = ({
  column,
  setSelectedCellID,
}: {
  column: ContentBoardColumnProps;
  setSelectedCellID: Dispatch<SetStateAction<string>>;
}) => {
  // if (column?.columnData.length == 0) return <></>;

  return (
    <ContentBoardColumnContainer>
      <ContentBoardColumnHeader
        columnTitle={column.columnTitle}
        columnCellCount={column.columnData.length}
        color={column.color}
      />
      {column?.columnData.map((cell) => {
        return (
          <ContentBoardCell
            key={cell.cellID}
            cell={cell}
            color={column.color}
            setSelectedCellID={setSelectedCellID}
          />
        );
      })}
    </ContentBoardColumnContainer>
  );
};
