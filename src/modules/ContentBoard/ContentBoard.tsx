import styled from 'styled-components';
import { ContentBoardColumn } from './ContentBoardColumn';
import { ContentBoardNav } from './ContentBoardNav';
import { ContentBoardColumnProps } from './ContentBoardTypes';

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  height: 80vh;
  background-color: grey;
`;

export const ContentBoard = ({
  columns,
}: {
  columns: ContentBoardColumnProps[];
}) => {
  return (
    <>
      <ContentBoardNav />
      <ColumnsContainer>
        {columns.map((column: ContentBoardColumnProps, idx: number) => {
          return <ContentBoardColumn key={idx} column={column} />;
        })}
      </ColumnsContainer>
    </>
  );
};
