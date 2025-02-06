export interface ContentBoardCellProps {
  cellID: string;
  cellTitle: string;
  cellDescription?: string;
}

export interface ContentBoardColumnProps {
  color: string;
  columnTitle: string;
  columnData: ContentBoardCellProps[];
}
