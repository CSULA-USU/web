export interface ContentBoardCellProps {
  cellID: string;
  cellTitle: string;
  cellDescription?: string;
}

export interface ContentBoardColumnProps {
  color: string;
  columnTitle: string;
  columnData: ContentBoardCellProps[];
  /**
   * Starts closed, and its rows are not rendered until it is opened. For the
   * statuses that only grow (Complete passed 75 requests), so the board does
   * not build hundreds of rows nobody asked to see.
   */
  startsCollapsed?: boolean;
}

export interface KeyValueProps {
  [key: string]: any;
}
