import { Typography } from 'components';
import styled from 'styled-components';
import { ContentBoardCellProps } from './ContentBoardTypes';
import { Dispatch, SetStateAction } from 'react';
import { FontSizes } from 'theme';

const ContentBoardCellContainer = styled.div<{ color: string }>`
  width: 200px;
  max-width: 240px;
  border-top: 16px solid ${(p) => p.color};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  & > :first-child {
    height: 20%;
    width: 100%;
    padding: 0.5rem 0.5rem 0 0.5rem;
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
  setSelectedCellID,
}: {
  cell: ContentBoardCellProps;
  color: string;
  setSelectedCellID: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ContentBoardCellContainer
      color={color}
      onClick={() => {
        setSelectedCellID(cell.cellID);
      }}
    >
      <div>
        <Typography
          as="h2"
          variant="labelTitle"
          weight="400"
          size="sm"
          lineHeight={FontSizes['lg']}
        >
          {cell.cellTitle}
        </Typography>
      </div>
      <div>
        {cell.cellDescription && (
          <Typography as="h3">{cell.cellDescription}</Typography>
        )}
      </div>
    </ContentBoardCellContainer>
  );
};
