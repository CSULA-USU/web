import { useState, useCallback } from 'react';
import Head from 'next/head';
import { Page } from 'modules';
import { BackOfficeTemplate } from 'partials/Backoffice';
import { DocumentManager } from 'modules';
import type { Category, Document } from 'types/Backoffice';
import {
  getMeetingDocuments,
  createMeetingDocument,
  deleteMeetingDocument,
  updateMeetingDocument,
  archiveMeetingDocument,
} from 'api';
import { useToast } from 'context/ToastContext';

function sortByDateAsc(a: Document, b: Document) {
  const da = a.date ?? '';
  const db = b.date ?? '';
  return da.localeCompare(db);
}

export default function BoardMeetingsAdmin({
  initialDocuments,
}: {
  initialDocuments: Document[];
}) {
  const [documents, setDocuments] = useState<Document[]>(
    [...initialDocuments].sort(sortByDateAsc),
  );

  const { showToast } = useToast();

  const handleCreate = useCallback(
    async (doc: Omit<Document, 'id'>) => {
      try {
        const newDoc = await createMeetingDocument(doc);
        setDocuments((prev) => [newDoc, ...prev].sort(sortByDateAsc));
        showToast('Document added successfully', 'success');
      } catch (err) {
        console.error('createMeetingDocument failed', err);
        showToast('Failed to add document', 'error');
      }
    },
    [showToast],
  );

  const handleUpdate = useCallback(
    async (id: string, updates: Partial<Document>) => {
      try {
        const updated = await updateMeetingDocument(id, updates);
        setDocuments((prev) =>
          prev.map((d) => (d.id === id ? updated : d)).sort(sortByDateAsc),
        );
        showToast('Document updated successfully', 'success');
      } catch (err) {
        console.error('updateMeetingDocument failed', err);
        showToast('Failed to update document', 'error');
      }
    },
    [showToast],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteMeetingDocument(id);
        setDocuments((prev) => prev.filter((d) => d.id !== id));
        showToast('Document deleted successfully', 'success');
      } catch (err) {
        console.error('deleteMeetingDocument failed', err);
        showToast('Failed to delete document', 'error');
      }
    },
    [showToast],
  );

  const handleArchive = useCallback(
    async (category: Category) => {
      try {
        await archiveMeetingDocument(category);
        const rows = await getMeetingDocuments({ isArchived: false });
        setDocuments(rows.sort(sortByDateAsc));
        showToast('Documents archived successfully', 'success');
      } catch (err) {
        console.error('archiveMeetingDocument failed', err);
        showToast('Failed to archive documents', 'error');
      }
    },
    [showToast],
  );

  return (
    <Page>
      <Head>
        <title>Board Meeting Documents</title>
      </Head>
      <BackOfficeTemplate>
        <DocumentManager
          documents={documents}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      </BackOfficeTemplate>
    </Page>
  );
}

export async function getServerSideProps() {
  const initialDocuments = await getMeetingDocuments({
    isArchived: false,
    order: 'asc',
  });
  return { props: { initialDocuments } };
}
