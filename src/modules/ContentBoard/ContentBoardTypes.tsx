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

export interface KeyValueProps {
  [key: string]: any;
}
