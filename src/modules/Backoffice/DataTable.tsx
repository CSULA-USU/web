import React from 'react';
import styled from 'styled-components';
import { Typography } from 'components';
import { Colors, Spaces } from 'theme';

type DataTableColumn<T> = {
  id: string;
  label: string;
  width?: string;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  emptyMessage?: string;
};

const MOBILE_BREAKPOINT = '768px';

const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
`;

const TableHead = styled.thead`
  background: ${Colors.black};
`;

const TableHeadCell = styled.th<{ $width?: string }>`
  width: ${({ $width }) => $width || 'auto'};
  padding: ${Spaces.md};
  text-align: left;
  vertical-align: top;
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid ${Colors.grey};
`;

const TableDataCell = styled.td`
  padding: ${Spaces.md};
  vertical-align: top;
`;

const MobileCards = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: grid;
    gap: ${Spaces.md};
  }
`;

const MobileCard = styled.article`
  border: 1px solid ${Colors.grey};
  background: ${Colors.white};
`;

const MobileCardHeader = styled.div`
  padding: ${Spaces.md};
  background: ${Colors.black};
`;

const MobileCardBody = styled.div`
  display: grid;
`;

const MobileField = styled.div`
  display: grid;
  gap: ${Spaces.xs};
  padding: ${Spaces.md};
  border-bottom: 1px solid ${Colors.grey};

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyState = styled.div`
  padding: ${Spaces.lg};
  border: 1px solid ${Colors.grey};
`;

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <EmptyState>
        <Typography as="p" variant="copy">
          {emptyMessage}
        </Typography>
      </EmptyState>
    );
  }

  return (
    <>
      <TableWrap>
        <StyledTable>
          <TableHead>
            <tr>
              {columns.map((column) => (
                <TableHeadCell key={column.id} $width={column.width}>
                  <Typography
                    as="span"
                    variant="labelTitle"
                    color="primary"
                    size="sm"
                  >
                    {column.label}
                  </Typography>
                </TableHeadCell>
              ))}
            </tr>
          </TableHead>

          <tbody>
            {rows.map((row) => (
              <TableBodyRow key={getRowId(row)}>
                {columns.map((column) => (
                  <TableDataCell key={`${getRowId(row)}-${column.id}`}>
                    {column.render(row)}
                  </TableDataCell>
                ))}
              </TableBodyRow>
            ))}
          </tbody>
        </StyledTable>
      </TableWrap>

      <MobileCards>
        {rows.map((row) => {
          const rowId = getRowId(row);
          const headerColumn = columns[0];

          return (
            <MobileCard key={rowId}>
              <MobileCardHeader>
                <Typography as="h3" variant="labelTitle" color="white">
                  {headerColumn.render(row)}
                </Typography>
              </MobileCardHeader>

              <MobileCardBody>
                {columns.slice(1).map((column) => (
                  <MobileField key={`${rowId}-${column.id}`}>
                    <Typography as="span" variant="label">
                      {column.label}
                    </Typography>

                    <Typography variant="copy">{column.render(row)}</Typography>
                  </MobileField>
                ))}
              </MobileCardBody>
            </MobileCard>
          );
        })}
      </MobileCards>
    </>
  );
}

export default DataTable;
