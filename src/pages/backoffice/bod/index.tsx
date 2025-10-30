import { useState, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Page } from 'modules';
import { BackOfficeTemplate } from 'partials/Backoffice';
import { DocumentManager, Toast } from 'modules';
import type { Category, Document, ToastMessage } from 'types/Backoffice';
import {
  getMeetingDocuments,
  createMeetingDocument,
  deleteMeetingDocument,
  updateMeetingDocument,
  archiveMeetingDocument,
} from 'api';

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
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error') => {
      setToast({ message, type });
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToast(null), 4000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleCreate = useCallback(
    async (doc: Omit<Document, 'id'>) => {
      const newDoc = await createMeetingDocument(doc);
      setDocuments((prev) => [newDoc, ...prev].sort(sortByDateAsc));
      showToast('Document added successfully', 'success');
    },
    [showToast],
  );

  const handleUpdate = useCallback(
    async (id: string, updates: Partial<Document>) => {
      const updated = await updateMeetingDocument(id, updates);
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? updated : d)).sort(sortByDateAsc),
      );
    },
    [showToast],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteMeetingDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      showToast('Document deleted successfully', 'success');
    },
    [showToast],
  );

  const handleArchive = useCallback(
    async (category: Category) => {
      await archiveMeetingDocument(category);
      const rows = await getMeetingDocuments({ isArchived: false });
      setDocuments(rows);
      showToast('Documents archived successfully', 'success');
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
      {toast && <Toast message={toast.message} type={toast.type} />}
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
