import { useState } from 'react';
import styled from 'styled-components';
import { FluidContainer, Typography, Select, Button } from 'components';
import type { Document, Category } from 'types/Backoffice';
import {
  DocumentTable,
  DocumentModal,
  ArchiveConfirmDialog,
  DeleteConfirmDialog,
} from 'modules';
import { IoMdDownload } from 'react-icons/io';
import { IoDocumentSharp } from 'react-icons/io5';

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

  return (
    <FluidContainer
      padding="0"
      width="100%"
      innerPadding="0"
      innerMaxWidth="100%"
      flex
      flexDirection="column"
      height="100%"
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
          <DocumentTable
            documents={downloadAllLinks}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            selectedCategory={selectedCategory}
          />
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
          <DocumentTable
            documents={filteredDocuments}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
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
