import type { ReactNode } from 'react';
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

export interface TableRowValues {
  [columnId: string]: string | undefined;
}

export interface TableRow<TOriginal = unknown> {
  id: string;
  values: TableRowValues;
  original?: TOriginal;
}

export interface TableColumn<TOriginal = unknown> {
  id: string;
  label: string;
  backgroundColor: TableColorKey;
  textColor: TableColorKey;
  headerImage?: TableHeaderImage;
  mergedValue?: TableColumnMergedValue;
  minWidth?: string;
  render?: (row: TableRow<TOriginal>) => ReactNode;
  /**
   * Overrides the stacked mobile card's header, which is otherwise the first
   * column's plain string value. Only read from the first column. Separate
   * from `render` so that adding a custom desktop cell does not silently
   * restyle the mobile header — existing tables keep the heading they have.
   */
  renderRowHeader?: (row: TableRow<TOriginal>) => ReactNode;
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

export interface TableData<TOriginal = unknown> {
  id: string;
  ariaLabel: string;
  caption: string;
  title?: string;
  note?: string;
  headerColors: TableHeaderColors;
  columns: TableColumn<TOriginal>[];
  rows: TableRow<TOriginal>[];
  mobileColors?: MobileColors;
}
