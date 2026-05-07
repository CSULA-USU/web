import { Colors } from 'theme';

export type TableColorKey = keyof typeof Colors;

export interface TableHeaderImage {
  src: string;
  alt: string;
}

export interface TableColumnMergedValue {
  text: string;
  rowSpan: number;
}

export interface TableColumn {
  id: string;
  label: string;
  backgroundColor: TableColorKey;
  textColor: TableColorKey;
  headerImage?: TableHeaderImage;
  mergedValue?: TableColumnMergedValue;
  minWidth?: string;
  render?: (row: TableRow) => React.ReactNode;
}

export interface TableRowValues {
  [columnId: string]: string | undefined;
}

export interface TableRow {
  id: string;
  values: TableRowValues;
  original?: any;
}

export interface TableHeaderColors {
  backgroundColor: TableColorKey;
  textColor: TableColorKey;
}

export interface MobileColors {
  labelBackgroundColor: TableColorKey;
  labelTextColor: TableColorKey;
  valueBackgroundColor: TableColorKey;
  valueTextColor: TableColorKey;
}

export interface TableData {
  id: string;
  ariaLabel: string;
  caption: string;
  title?: string;
  note?: string;
  headerColors: TableHeaderColors;
  columns: TableColumn[];
  rows: TableRow[];
  mobileColors?: MobileColors;
}
