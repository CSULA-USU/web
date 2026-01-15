import { useState, useCallback } from 'react';
import Head from 'next/head';
import { FluidContainer, Typography, Button } from 'components';
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
import BackofficeShell from 'modules/Backoffice/BackofficeShell';

function sortByDateAsc(a: Document, b: Document) {
  const da = a.date ?? '';
  const db = b.date ?? '';
  return da.localeCompare(db);
}

export default function BoardMeetingsAdmin({
  initialDocuments,
  error,
}: {
  initialDocuments: Document[];
  error?: string;
}) {
  const [documents, setDocuments] = useState<Document[]>(
    [...initialDocuments].sort(sortByDateAsc),
  );

  const { showToast } = useToast();

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const handleCreate = useCallback(
    async (doc: Omit<Document, 'id'>) => {
      try {
        const newDoc = await createMeetingDocument(doc);
        setDocuments((prev) => [newDoc, ...prev].sort(sortByDateAsc));
        showToast('Document added successfully', 'success');
      } catch (err) {
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error('archiveMeetingDocument failed', err);
        showToast('Failed to archive documents', 'error');
      }
    },
    [showToast],
  );

  // NOW we can do early return AFTER all hooks
  if (error) {
    return (
      <Page>
        <Head>
          <title>Board Meeting Documents &ndash; Error</title>
        </Head>
        <BackOfficeTemplate>
          <FluidContainer padding="24px">
            <Typography variant="title" size="xl">
              Error Loading Documents
            </Typography>
            <Typography variant="span" size="md" margin="16px 0">
              {error}
            </Typography>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </FluidContainer>
        </BackOfficeTemplate>
      </Page>
    );
  }

  return (
    <Page>
      <Head>
        <title>Board Meeting Documents</title>
      </Head>
      <BackofficeShell
        title={`Board Meeting Documents`}
        subtitle="Manage meeting calendars, agendas, and minutes for the University–Student Union"
      >
        <DocumentManager
          documents={documents}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      </BackofficeShell>
    </Page>
  );
}

export async function getServerSideProps() {
  try {
    const initialDocuments = await getMeetingDocuments({
      isArchived: false,
      order: 'asc',
    });
    return { props: { initialDocuments } };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch documents:', error);
    return {
      props: { initialDocuments: [], error: 'Failed to load documents' },
    };
  }
}
