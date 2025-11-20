import { useState } from 'react';
import styled from 'styled-components';
import { FluidContainer, Typography, Select, Button } from 'components';
import type { BODMeetingDocs, Category } from 'types/Backoffice';
import {
  DocumentTable,
  DocumentModal,
  ArchiveConfirmDialog,
  DeleteConfirmDialog,
} from 'modules';
import { IoMdDownload } from 'react-icons/io';
import { IoDocumentSharp } from 'react-icons/io5';

interface DocumentManagerProps {
  meetingDocs: BODMeetingDocs[];
  onCreate: (doc: Omit<BODMeetingDocs, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<BODMeetingDocs>) => void;
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
  Calendar: `Meeting Calendar (${getCurrentFiscalYearLabel()})`,
  Agenda: `Agenda (${getCurrentFiscalYearLabel()})`,
  Minutes: `Minutes (${getCurrentFiscalYearLabel()})`,
};

export function DocumentManager({
  meetingDocs,
  onCreate,
  onUpdate,
  onDelete,
  onArchive,
}: DocumentManagerProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>('Calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<BODMeetingDocs | null>(
    null,
  );
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [archiveConfirm, setArchiveConfirm] = useState<{
    category: Category;
  } | null>(null);

  const filteredDocuments = meetingDocs.filter(
    (doc) => doc.category === selectedCategory && !doc.isDownloadAll,
  );

  const downloadAllLinks = meetingDocs.filter(
    (doc) => doc.isDownloadAll && doc.category === selectedCategory,
  );

  const handleEdit = (doc: BODMeetingDocs) => {
    setEditingDocument(doc);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (doc: BODMeetingDocs) => {
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

  const handleModalSubmit = (data: Omit<BODMeetingDocs, 'id'>) => {
    if (editingDocument) {
      onUpdate(editingDocument.id, data);
    } else {
      onCreate(data);
    }
    handleModalClose();
  };

  // Items for the Radix-based Select
  const categoryItems = [
    { label: 'Meeting Calendar', value: 'Calendar' },
    { label: 'Agenda', value: 'Agenda' },
    { label: 'Minutes', value: 'Minutes' },
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
      <FluidContainer backgroundColor="black">
        <Typography color="white" variant="title" as="h1">
          Board Meeting Documents
        </Typography>
        <Typography color="white" variant="labelTitleSmall">
          Manage meeting calendars, agendas, and minutes for the
          University&ndash;Student Union
        </Typography>
      </FluidContainer>

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
            <Button
              padding="10px 20px"
              fontSize="14px"
              fontWeight="600"
              onClick={() => setIsModalOpen(true)}
              aria-label="Add new document"
            >
              <span aria-hidden="true">+</span> Add New Document
            </Button>
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
            meetingDocs={downloadAllLinks}
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
            meetingDocs={filteredDocuments}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </FluidContainer>
      </FluidContainer>

      {isModalOpen && (
        <DocumentModal
          key={editingDocument ? editingDocument.id : selectedCategory}
          meetingDocs={editingDocument}
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

      <FluidContainer padding="0 0 32px 0" flex justifyContent="flex-end">
        <Button
          variant="outline"
          onClick={handleArchiveClick}
          aria-label={`Archive ${selectedCategory}`}
        >
          Archive All {selectedCategory} Documents
        </Button>
      </FluidContainer>
    </FluidContainer>
  );
}
