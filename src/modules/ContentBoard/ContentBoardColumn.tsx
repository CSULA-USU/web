import styled from 'styled-components';
import { Typography } from 'components';
import { ContentBoardColumnProps } from './ContentBoardTypes';
import { ContentBoardCell } from './ContentBoardCell';
import { Dispatch, SetStateAction } from 'react';
import { FontSizes } from 'theme';

const ContentBoardColumnContainer = styled.div`
  height: 70vh;
  width: 240px;
  /* overflow-y: scroll; */
`;

const ContentBoardColumnHeaderContainer = styled.div`
  height: 3rem;
  width: 240px;
  display: flex;
  align-items: center;
  /* padding-left: 0.5rem; */
`;

const ContentBoardColumnHeader = ({
  columnTitle,
  color,
}: {
  columnTitle: string;
  color: string;
}) => {
  return (
    <ContentBoardColumnHeaderContainer>
      <Typography
        as="h2"
        variant="labelTitleSmall"
        weight="400"
        size="md"
        lineHeight={FontSizes['lg']}
        style={{ borderBottom: `2px solid ${color}`, margin: '0 auto' }}
      >
        <strong>{columnTitle}</strong>
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
  if (column?.columnData.length == 0) return <></>;

  return (
    <ContentBoardColumnContainer>
      <ContentBoardColumnHeader
        columnTitle={column.columnTitle}
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
