import styled from 'styled-components';
import { StyledLink, Typography } from 'components';
import type { Document } from 'types/Backoffice';
import { formatDate } from 'utils/dates';
import { useBreakpoint } from 'hooks';

interface DocumentTableProps {
  documents: Document[];
  onEdit: (doc: Document) => void;
  onDelete: (doc: Document) => void;
  selectedCategory?: string;
}

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const TableHead = styled.thead`
  background-color: #f8f8f8;
  border-bottom: 2px solid #e0e0e0;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #333333;
  white-space: nowrap;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

interface TableDataCellProps {
  width?: string;
}

const TableDataCell = styled.td<TableDataCellProps>`
  padding: 16px;
  color: #333333;
  vertical-align: middle;
  width: ${({ width }) => width ?? 'auto'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 6px 12px;
  border: 1px solid ${(p) => (p.variant === 'delete' ? '#dc3545' : '#0066cc')};
  background-color: transparent;
  color: ${(p) => (p.variant === 'delete' ? '#dc3545' : '#0066cc')};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(p) =>
      p.variant === 'delete' ? '#dc3545' : '#0066cc'};
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${(p) =>
        p.variant === 'delete'
          ? 'rgba(220, 53, 69, 0.3)'
          : 'rgba(0, 102, 204, 0.3)'};
  }
`;

const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #666666;
  font-size: 14px;
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const DocGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  @media (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LabelCell = styled.div`
  background: #f8f8f8;
  font-weight: 600;
  color: #333;
  padding: 12px 16px;
  border-right: 2px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const ValueCell = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  word-break: break-word;
`;

export function DocumentTable({
  documents,
  onEdit,
  onDelete,
  selectedCategory,
}: DocumentTableProps) {
  const { isDesktop, isWidescreen } = useBreakpoint();
  if (documents.length === 0) {
    const hasCalendarDownloadAll =
      selectedCategory === 'Calendar' &&
      documents.some(
        (doc) => doc.category === 'Calendar' && doc.is_download_all,
      );

    if (selectedCategory !== 'Calendar' || !hasCalendarDownloadAll) {
      return (
        <EmptyState>
          No documents found. Click &quot;Add New Document&quot; to create one.
        </EmptyState>
      );
    } else {
      return null;
    }
  }
  const showDateColumn = documents.some((doc) => !!doc.date);
  return (
    <TableContainer>
      <DesktopOnly>
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell scope="col">Title</TableHeaderCell>
              <TableHeaderCell scope="col">URL</TableHeaderCell>
              {showDateColumn && (
                <TableHeaderCell scope="col">Meeting Date</TableHeaderCell>
              )}
              <TableHeaderCell scope="col">Actions</TableHeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableDataCell
                  width={isWidescreen ? (isDesktop ? '22%' : '21%') : '35%'}
                >
                  {doc.title}
                </TableDataCell>
                <TableDataCell>
                  <Typography color="gold">
                    <StyledLink
                      href={doc.url}
                      aria-label={`Open ${doc.title} in new tab`}
                    >
                      {doc.url.length > 40
                        ? isDesktop
                          ? `${doc.url.slice(0, 20)}…`
                          : `${doc.url.slice(0, 40)}…`
                        : doc.url}
                    </StyledLink>
                  </Typography>
                </TableDataCell>
                {showDateColumn && (
                  <TableDataCell>
                    {doc.date ? (
                      <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                    ) : (
                      '—'
                    )}
                  </TableDataCell>
                )}
                <TableDataCell>
                  <ActionButtons>
                    <ActionButton
                      onClick={() => onEdit(doc)}
                      aria-label={`Edit ${doc.title}`}
                    >
                      Edit
                    </ActionButton>
                    {!doc.is_download_all && doc.category !== 'Calendar' && (
                      <ActionButton
                        variant="delete"
                        onClick={() => onDelete(doc)}
                        aria-label={`Delete ${doc.title}`}
                      >
                        Delete
                      </ActionButton>
                    )}
                  </ActionButtons>
                </TableDataCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </DesktopOnly>

      <MobileOnly>
        {documents.map((doc) => (
          <DocGrid key={doc.id}>
            <LabelCell>Title</LabelCell>
            <ValueCell>{doc.title}</ValueCell>

            <LabelCell>URL</LabelCell>
            <ValueCell>
              <Typography color="gold">
                <StyledLink href={doc.url}>
                  {doc.url.length > 40 ? `${doc.url.slice(0, 40)}…` : doc.url}
                </StyledLink>
              </Typography>
            </ValueCell>

            {showDateColumn && (
              <>
                <LabelCell>Meeting Date</LabelCell>
                <ValueCell>{doc.date ? formatDate(doc.date) : '—'}</ValueCell>
              </>
            )}

            <LabelCell>Actions</LabelCell>
            <ValueCell>
              <ActionButtons>
                <ActionButton type="button" onClick={() => onEdit(doc)}>
                  Edit
                </ActionButton>
                {!doc.is_download_all && doc.category !== 'Calendar' && (
                  <ActionButton
                    type="button"
                    variant="delete"
                    onClick={() => onDelete(doc)}
                  >
                    Delete
                  </ActionButton>
                )}
              </ActionButtons>
            </ValueCell>
          </DocGrid>
        ))}
      </MobileOnly>
    </TableContainer>
  );
}
