import React, { Fragment } from 'react';
import { Typography } from 'components';
import { TableData, TableColumn, TableRow } from 'types';
import {
  DesktopScroll,
  HeaderCellInner,
  HeaderImage,
  MobileCard,
  MobileCardBody,
  MobileCardHeader,
  MobileCards,
  MobileFieldLabel,
  MobileFieldRow,
  MobileFieldValue,
  MobileMergedField,
  StyledTable,
  TableBodyHeaderCell,
  TableCellContent,
  TableDataCell,
  TableHeadingWrap,
  TableNoteWrap,
  TableSection,
  TableTitleWrap,
  TableHeadCell,
  VisuallyHiddenCaption,
} from 'styles/Table.styles';

interface TableProps {
  data: TableData;
  className?: string;
}

interface MobileField {
  column: TableColumn;
  value: string;
}

const getDisplayValue = (row: TableRow, columnId: string): string => {
  return row.values[columnId] || '';
};

const getPrimaryMobileColumn = (columns: TableColumn[]): TableColumn => {
  if (columns.length > 1) {
    return columns[1];
  }

  return columns[0];
};

const renderHeaderLabel = (
  column: TableColumn,
  headerTextColor: TableData['headerColors']['textColor'],
) => {
  return (
    <HeaderCellInner>
      {column.headerImage ? (
        <HeaderImage
          src={column.headerImage.src}
          alt={column.headerImage.alt}
          loading="lazy"
        />
      ) : null}

      <Typography as="span" variant="labelTitle" color={headerTextColor}>
        {column.label}
      </Typography>
    </HeaderCellInner>
  );
};

const renderBodyCellText = (
  value: string,
  textColor: TableColumn['textColor'],
): React.ReactNode => {
  return (
    <TableCellContent>
      <Typography as="span" variant="copy" color={textColor} weight="700">
        {value}
      </Typography>
    </TableCellContent>
  );
};

export const Table = ({ data, className }: TableProps) => {
  const primaryMobileColumn = getPrimaryMobileColumn(data.columns);
  const mergedColumns = data.columns.filter((column) => column.mergedValue);

  return (
    <TableSection
      aria-label={data.ariaLabel}
      className={className}
      id={data.id}
      itemScope
      itemType="https://schema.org/Table"
    >
      {(data.title || data.note) && (
        <TableHeadingWrap>
          {data.title ? (
            <TableTitleWrap>
              <Typography as="h2" variant="title">
                {data.title}
              </Typography>
            </TableTitleWrap>
          ) : null}

          {data.note ? (
            <TableNoteWrap
              $backgroundColor={data.headerColors.backgroundColor}
              $textColor={data.headerColors.textColor}
            >
              <Typography
                as="p"
                variant="labelTitle"
                color={data.headerColors.textColor}
              >
                {data.note}
              </Typography>
            </TableNoteWrap>
          ) : null}
        </TableHeadingWrap>
      )}

      <DesktopScroll>
        <StyledTable>
          <VisuallyHiddenCaption>{data.caption}</VisuallyHiddenCaption>

          <thead>
            <tr>
              {data.columns.map((column) => (
                <TableHeadCell
                  key={column.id}
                  scope="col"
                  $backgroundColor={data.headerColors.backgroundColor}
                  $textColor={data.headerColors.textColor}
                >
                  {renderHeaderLabel(column, data.headerColors.textColor)}
                </TableHeadCell>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {data.columns.map((column, columnIndex) => {
                  const value = getDisplayValue(row, column.id);
                  const mergedValue = column.mergedValue;

                  if (mergedValue) {
                    if (rowIndex > 0) {
                      return null;
                    }

                    return (
                      <TableDataCell
                        key={`${row.id}-${column.id}`}
                        rowSpan={Math.min(
                          mergedValue.rowSpan,
                          data.rows.length,
                        )}
                        $backgroundColor={column.backgroundColor}
                        $textColor={column.textColor}
                      >
                        {renderBodyCellText(mergedValue.text, column.textColor)}
                      </TableDataCell>
                    );
                  }

                  if (columnIndex === 0) {
                    return (
                      <TableBodyHeaderCell
                        key={`${row.id}-${column.id}`}
                        scope="row"
                        $backgroundColor={column.backgroundColor}
                        $textColor={column.textColor}
                      >
                        {renderBodyCellText(value, column.textColor)}
                      </TableBodyHeaderCell>
                    );
                  }

                  return (
                    <TableDataCell
                      key={`${row.id}-${column.id}`}
                      $backgroundColor={column.backgroundColor}
                      $textColor={column.textColor}
                    >
                      {renderBodyCellText(value, column.textColor)}
                    </TableDataCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </DesktopScroll>

      <MobileCards>
        {data.rows.map((row) => {
          const primaryValue = getDisplayValue(row, primaryMobileColumn.id);

          const mobileFields: MobileField[] = data.columns
            .filter(
              (column) =>
                column.id !== primaryMobileColumn.id && !column.mergedValue,
            )
            .map((column) => ({
              column,
              value: getDisplayValue(row, column.id),
            }));

          return (
            <MobileCard key={`${data.id}-${row.id}`}>
              <MobileCardHeader
                $backgroundColor={primaryMobileColumn.backgroundColor}
                $textColor={primaryMobileColumn.textColor}
              >
                <Typography
                  as="h3"
                  variant="labelTitle"
                  color={primaryMobileColumn.textColor}
                >
                  {primaryValue}
                </Typography>
              </MobileCardHeader>

              <MobileCardBody>
                {mobileFields.map(({ column, value }) => (
                  <MobileFieldRow key={`${row.id}-${column.id}`}>
                    <MobileFieldLabel>
                      <Typography as="span" variant="labelTitleSmall">
                        {column.label}
                      </Typography>
                    </MobileFieldLabel>

                    <MobileFieldValue
                      $backgroundColor={column.backgroundColor}
                      $textColor={column.textColor}
                    >
                      <Typography
                        as="span"
                        variant="copy"
                        color={column.textColor}
                      >
                        {value}
                      </Typography>
                    </MobileFieldValue>
                  </MobileFieldRow>
                ))}

                {mergedColumns.map((column) =>
                  column.mergedValue ? (
                    <Fragment key={`${row.id}-${column.id}-merged`}>
                      <MobileFieldRow>
                        <MobileFieldLabel>
                          <Typography as="span" variant="labelTitleSmall">
                            {column.label}
                          </Typography>
                        </MobileFieldLabel>

                        <MobileMergedField
                          $backgroundColor={column.backgroundColor}
                          $textColor={column.textColor}
                        >
                          <Typography
                            as="span"
                            variant="labelTitle"
                            color={column.textColor}
                          >
                            {column.mergedValue.text}
                          </Typography>
                        </MobileMergedField>
                      </MobileFieldRow>
                    </Fragment>
                  ) : null,
                )}
              </MobileCardBody>
            </MobileCard>
          );
        })}
      </MobileCards>
    </TableSection>
  );
};

export default Table;
