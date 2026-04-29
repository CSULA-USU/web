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
}

export interface TableRowValues {
  [columnId: string]: string | undefined;
}

export interface TableRow {
  id: string;
  values: TableRowValues;
}

export interface TableHeaderColors {
  backgroundColor: TableColorKey;
  textColor: TableColorKey;
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
}
