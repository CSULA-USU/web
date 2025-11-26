import { useState, useCallback } from 'react';
import Head from 'next/head';
import { FluidContainer, Typography, Button } from 'components';
import { Page } from 'modules';
import { BackOfficeTemplate } from 'partials/Backoffice';
import { DocumentManager } from 'modules';
import type { Category, BODMeetingDocs } from 'types/Backoffice';
import {
  getMeetingDocuments,
  createMeetingDocument,
  deleteMeetingDocument,
  updateMeetingDocument,
  archiveMeetingDocument,
} from 'api';
import { useToast } from 'context/ToastContext';

function sortByDateAsc(a: BODMeetingDocs, b: BODMeetingDocs) {
  const da = a.date ?? '';
  const db = b.date ?? '';
  return da.localeCompare(db);
}

// Define page props type
interface BoardMeetingsAdminProps {
  initialDocuments: BODMeetingDocs[];
  error?: string | null;
}

export default function BoardMeetingsAdmin({
  initialDocuments,
  error,
}: BoardMeetingsAdminProps) {
  const [documents, setDocuments] = useState<BODMeetingDocs[]>(
    [...initialDocuments].sort(sortByDateAsc),
  );

  const { showToast } = useToast();

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const handleCreate = useCallback(
    async (doc: Omit<BODMeetingDocs, 'id'>) => {
      const newDoc = await createMeetingDocument(doc);
      setDocuments((prev) => [newDoc, ...prev].sort(sortByDateAsc));
      showToast('Document added successfully', 'success');
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
      <BackOfficeTemplate>
        <DocumentManager
          meetingDocs={documents}
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
