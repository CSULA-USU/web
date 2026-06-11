import { useState } from 'react';
import styled from 'styled-components';
import {
  FluidContainer,
  Typography,
  Select,
  Button,
  StyledLink,
  Table as FlexibleTable,
} from 'components';
import type { Document, Category } from 'types/Backoffice';
import {
  DocumentModal,
  ArchiveConfirmDialog,
  DeleteConfirmDialog,
} from 'modules';
import { IoMdDownload } from 'react-icons/io';
import { IoDocumentSharp } from 'react-icons/io5';
import { TableColumn, TableData } from 'types';
import { formatDate } from 'utils/dates';

interface DocumentManagerProps {
  documents: Document[];
  onCreate: (doc: Omit<Document, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Document>) => void;
  onDelete: (id: string) => void;
  onArchive: (category: Category) => void;
}

function getCurrentFiscalYearLabel(): string {
  const now = new Date();
  const y = now.getFullYear() % 100;
  const isAfterJune = now.getMonth() >= 6;
  const start = isAfterJune ? y : (y + 99) % 100;
  const end = (start + 1) % 100;
  return `Fiscal Year ${String(start).padStart(2, '0')}-${String(end).padStart(
    2,
    '0',
  )}`;
}

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const categoryIcons: Record<Category, string> = {
  Calendar: '📅',
  Agenda: '🗂️',
  Minutes: '📝',
};

export const categoryLabels: Record<Category, string> = {
  Agenda: `Agenda (${getCurrentFiscalYearLabel()})`,
  Minutes: `Minutes (${getCurrentFiscalYearLabel()})`,
  Calendar: `Meeting Calendar (${getCurrentFiscalYearLabel()})`,
};

export function DocumentManager({
  documents,
  onCreate,
  onUpdate,
  onDelete,
  onArchive,
}: DocumentManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Agenda');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [archiveConfirm, setArchiveConfirm] = useState<{
    category: Category;
  } | null>(null);

  const filteredDocuments = documents.filter(
    (doc) => doc.category === selectedCategory && !doc.is_download_all,
  );

  const calendars = documents.filter((doc) => doc.category === 'Calendar');

  const downloadAllLinks = documents.filter(
    (doc) => doc.is_download_all && doc.category === selectedCategory,
  );

  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (doc: Document) => {
    setDeleteConfirm({ id: doc.id, title: doc.title });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleArchiveClick = () => {
    setArchiveConfirm({ category: selectedCategory });
  };

  const handleArchiveConfirm = () => {
    if (archiveConfirm) {
      onArchive(archiveConfirm.category);
      setArchiveConfirm(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDocument(null);
  };

  const handleModalSubmit = (data: Omit<Document, 'id'>) => {
    if (editingDocument) {
      onUpdate(editingDocument.id, data);
    } else {
      onCreate(data);
    }
    handleModalClose();
  };

  // Items for the Radix-based Select
  const categoryItems = [
    { label: 'Agenda', value: 'Agenda' },
    { label: 'Minutes', value: 'Minutes' },
    { label: 'Meeting Calendar', value: 'Calendar' },
  ];

  const createDocumentTableData = (
    tableId: string,
    tableDocuments: Document[],
  ): TableData => {
    const showDateColumn = tableDocuments.some((doc) => !!doc.date);

    const columns: TableColumn[] = [
      {
        id: 'title',
        label: 'Title',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '220px',
        render: (row: any) => (
          <Typography as="span" variant="label" size="sm" weight="600">
            {row.original.title}
          </Typography>
        ),
      },
      {
        id: 'url',
        label: 'URL',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '320px',
        render: (row: any) => (
          <Typography color="gold">
            <StyledLink
              href={row.original.url}
              aria-label={`Open ${row.original.title} in new tab`}
              isExternalLink
            >
              {row.original.url.length > 40
                ? `${row.original.url.slice(0, 40)}…`
                : row.original.url}
            </StyledLink>
          </Typography>
        ),
      },
    ];

    if (showDateColumn) {
      columns.push({
        id: 'date',
        label: 'Meeting Date',
        backgroundColor: 'white',
        textColor: 'black',
        minWidth: '180px',
        render: (row: any) =>
          row.original.date ? (
            <time dateTime={row.original.date}>
              {formatDate(row.original.date)}
            </time>
          ) : (
            <Typography as="span" variant="label" size="sm">
              —
            </Typography>
          ),
      });
    }

    columns.push({
      id: 'actions',
      label: 'Actions',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '180px',
      render: (row: any) => (
        <FluidContainer padding="0" flex gap="8px">
          <Button
            type="button"
            variant="edit"
            onClick={() => handleEdit(row.original)}
            aria-label={`Edit ${row.original.title}`}
          >
            Edit
          </Button>

          {!row.original.is_download_all &&
            row.original.category !== 'Calendar' && (
              <Button
                type="button"
                variant="delete"
                onClick={() => handleDeleteClick(row.original)}
                aria-label={`Delete ${row.original.title}`}
              >
                Delete
              </Button>
            )}
        </FluidContainer>
      ),
    });

    return {
      id: tableId,
      ariaLabel: `${tableId} table`,
      caption: tableId,
      headerColors: {
        backgroundColor: 'greyLightest',
        textColor: 'black',
      },
      columns,
      rows: tableDocuments.map((doc) => ({
        id: String(doc.id),
        values: {
          title: doc.title,
        },
        original: doc,
      })),
    };
  };

  return (
    <FluidContainer
      padding="0"
      width="100%"
      innerPadding="0"
      innerMaxWidth="100%"
      flex
      flexDirection="column"
      outerAlignItems="stretch"
      outerJustifyContent="flex-start"
    >
      <FluidContainer>
        <SectionHeader>
          <SectionTitle>
            {categoryIcons[selectedCategory]} {categoryLabels[selectedCategory]}
          </SectionTitle>

          <Controls>
            <Select
              ariaLabel="Filter by category"
              placeholder="Choose category"
              items={categoryItems}
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v as Category)}
            />
            {calendars && selectedCategory === 'Calendar' ? null : (
              <Button
                padding="10px 20px"
                fontSize="14px"
                fontWeight="600"
                onClick={() => setIsModalOpen(true)}
                aria-label="Add new document"
              >
                <span aria-hidden="true">+</span> Add New Document
              </Button>
            )}
          </Controls>
        </SectionHeader>
        <FluidContainer padding="0" flex flexDirection="column" gap="24px">
          <FluidContainer
            padding="0"
            flex
            flexDirection="row"
            alignItems="center"
            gap="8px"
          >
            <IoMdDownload />
            <Typography variant="labelTitle" weight="600" as="h3">
              Download All Links
            </Typography>
          </FluidContainer>
          {downloadAllLinks.length > 0 ? (
            <FlexibleTable
              data={createDocumentTableData(
                'download-all-links',
                downloadAllLinks,
              )}
            />
          ) : (
            <Typography as="p" variant="label" size="sm">
              No download all links found.
            </Typography>
          )}
          <FluidContainer
            padding="0"
            flex
            flexDirection="row"
            alignItems="center"
            gap="8px"
          >
            <IoDocumentSharp />
            <Typography variant="labelTitle" weight="600" as="h3">
              Documents
            </Typography>
          </FluidContainer>
          {filteredDocuments.length > 0 ? (
            <FlexibleTable
              data={createDocumentTableData('documents', filteredDocuments)}
            />
          ) : (
            <Typography as="p" variant="label" size="sm">
              No documents found. Click &quot;Add New Document&quot; to create
              one.
            </Typography>
          )}
          <FluidContainer padding="0" flex justifyContent="flex-end">
            <Button
              variant="outline"
              onClick={() => handleArchiveClick()}
              aria-label={`Archive ${selectedCategory}`}
            >
              Archive All {selectedCategory} Documents
            </Button>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>

      {isModalOpen && (
        <DocumentModal
          key={editingDocument ? editingDocument.id : selectedCategory}
          document={editingDocument}
          initialCategory={selectedCategory}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmDialog
          title={deleteConfirm.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {archiveConfirm && (
        <ArchiveConfirmDialog
          title={archiveConfirm.category}
          onConfirm={handleArchiveConfirm}
          onCancel={() => setArchiveConfirm(null)}
        />
      )}
    </FluidContainer>
  );
}
