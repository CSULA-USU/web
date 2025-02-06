import { Typography } from 'components';
import styled from 'styled-components';
import { ContentBoardCellProps } from './ContentBoardTypes';

const ContentBoardCellContainer = styled.div<{ color: string }>`
  width: 300px;
  height: 200px;
  border: 1px solid black;
  border-top: 16px solid ${(p) => p.color};
  border-radius: 0.5rem;

  & > :first-child {
    height: 20%;
    width: 100%;
    padding: 0 0.5rem;
    border-bottom: 1px solid black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
  }

  & > :nth-child(2) {
    height: 75%;
    width: 100%;
    padding: 0.5rem;
    overflow: hidden;
  }
`;

export const ContentBoardCell = ({
  cell,
  color,
}: {
  cell: ContentBoardCellProps;
  color: string;
}) => {
  return (
    <ContentBoardCellContainer color={color}>
      <div>
        <Typography as="h3">{cell.cellTitle}</Typography>
      </div>
      <div>
        {cell.cellDescription && (
          <Typography as="h3">{cell.cellDescription}</Typography>
        )}
      </div>
    </ContentBoardCellContainer>
  );
};
