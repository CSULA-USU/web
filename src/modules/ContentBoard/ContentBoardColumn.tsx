import styled from 'styled-components';
import { Typography } from 'components';
import { ContentBoardColumnProps } from './ContentBoardTypes';
import { ContentBoardCell } from './ContentBoardCell';

const ContentBoardColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentBoardColumnHeaderContainer = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
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
      <Typography style={{ borderBottom: `1px solid ${color}` }}>
        {columnTitle}
      </Typography>
    </ContentBoardColumnHeaderContainer>
  );
};

export const ContentBoardColumn = ({
  column,
}: {
  column: ContentBoardColumnProps;
}) => {
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
          />
        );
      })}
    </ContentBoardColumnContainer>
  );
};
