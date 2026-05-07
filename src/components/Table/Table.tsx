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
  TableCellContent,
  TableDataCell,
  TableHeadingWrap,
  TableNoteWrap,
  TableSection,
  TableTitleWrap,
  TableHeadCell,
  VisuallyHiddenCaption,
  HeaderText,
  MobileFieldImage,
  MobileFieldLabelInner,
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

const getRowHeaderColumn = (columns: TableColumn[]): TableColumn => {
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

      <HeaderText>
        <Typography
          as="span"
          variant="labelTitle"
          color={headerTextColor}
          size="sm"
        >
          {column.label}
        </Typography>
      </HeaderText>
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
  const rowHeaderColumn = getRowHeaderColumn(data.columns);
  const mergedColumns = data.columns.filter((column) => column.mergedValue);
  const mobileColors = data.mobileColors ?? {
    labelBackgroundColor: data.headerColors.backgroundColor,
    labelTextColor: data.headerColors.textColor,
    valueBackgroundColor: 'white',
    valueTextColor: 'black',
  };

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
                  $width={column.minWidth}
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
                  const content = column.render ? (
                    <TableCellContent>{column.render(row)}</TableCellContent>
                  ) : (
                    renderBodyCellText(value, column.textColor)
                  );
                  const mergedValue = column.mergedValue;
                  const isRowHeader = columnIndex === 0;

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
                        $backgroundColor="white"
                        $textColor="black"
                        $width={column.minWidth}
                      >
                        {renderBodyCellText(mergedValue.text, 'black')}
                      </TableDataCell>
                    );
                  }

                  return (
                    <TableDataCell
                      as={isRowHeader ? 'th' : 'td'}
                      key={`${row.id}-${column.id}`}
                      scope={isRowHeader ? 'row' : undefined}
                      $backgroundColor={column.backgroundColor}
                      $textColor={column.textColor}
                      $width={column.minWidth}
                    >
                      {content}
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
          const rowHeaderValue = getDisplayValue(row, rowHeaderColumn.id);

          const mobileFields: MobileField[] = data.columns
            .filter(
              (column) =>
                column.id !== rowHeaderColumn.id && !column.mergedValue,
            )
            .map((column) => ({
              column,
              value: getDisplayValue(row, column.id),
            }));

          return (
            <MobileCard key={`${data.id}-${row.id}`}>
              <MobileCardHeader
                $backgroundColor={data.headerColors.backgroundColor}
                $textColor={data.headerColors.textColor}
              >
                <Typography
                  as="h3"
                  variant="labelTitle"
                  color={data.headerColors.textColor}
                >
                  {rowHeaderValue}
                </Typography>
              </MobileCardHeader>

              <MobileCardBody>
                {mobileFields.map(({ column, value }) => (
                  <MobileFieldRow key={`${row.id}-${column.id}`}>
                    <MobileFieldLabel
                      $backgroundColor={mobileColors.labelBackgroundColor}
                      $textColor={mobileColors.labelTextColor}
                    >
                      <MobileFieldLabelInner>
                        {column.headerImage ? (
                          <MobileFieldImage
                            src={column.headerImage.src}
                            alt={column.headerImage.alt}
                            loading="lazy"
                          />
                        ) : null}

                        <Typography
                          as="span"
                          variant="labelTitleSmall"
                          color={mobileColors.labelTextColor}
                        >
                          {column.label}
                        </Typography>
                      </MobileFieldLabelInner>
                    </MobileFieldLabel>

                    <MobileFieldValue
                      $backgroundColor={mobileColors.valueBackgroundColor}
                      $textColor={mobileColors.valueTextColor}
                    >
                      {column.render ? (
                        column.render(row)
                      ) : (
                        <Typography
                          as="span"
                          variant="copy"
                          color={mobileColors.valueTextColor}
                        >
                          {value}
                        </Typography>
                      )}
                    </MobileFieldValue>
                  </MobileFieldRow>
                ))}

                {mergedColumns.map((column) =>
                  column.mergedValue ? (
                    <Fragment key={`${row.id}-${column.id}-merged`}>
                      <MobileFieldRow>
                        <MobileFieldLabel
                          $backgroundColor={mobileColors.labelBackgroundColor}
                          $textColor={mobileColors.labelTextColor}
                        >
                          <MobileFieldLabelInner>
                            {column.headerImage ? (
                              <MobileFieldImage
                                src={column.headerImage.src}
                                alt={column.headerImage.alt}
                                loading="lazy"
                              />
                            ) : null}

                            <Typography
                              as="span"
                              variant="labelTitleSmall"
                              color={mobileColors.labelTextColor}
                            >
                              {column.label}
                            </Typography>
                          </MobileFieldLabelInner>
                        </MobileFieldLabel>

                        <MobileMergedField
                          $backgroundColor={column.backgroundColor || 'white'}
                          $textColor={column.textColor || 'black'}
                        >
                          <Typography
                            as="span"
                            variant="copy"
                            color={column.textColor || 'black'}
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
