import { useState, useCallback } from 'react';
import Head from 'next/head';
import { FluidContainer, Typography, Button } from 'components';
import { Page } from 'modules';
import { BackOfficeTemplate } from 'partials/Backoffice';
import { DocumentManager } from 'modules';
import type { Category, Document } from 'types/Backoffice';
import { getMeetingDocuments } from 'api/bod';
import { useToast } from 'context/ToastContext';
import { hasPermission } from 'lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getUserFromSupabaseByEmail } from 'pages/api/user';

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

  const handleCreate = useCallback(
    async (doc: Omit<Document, 'id'>) => {
      try {
        const res = await fetch('/api/bod/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ doc }),
        });

        const payload = await res.json();
        if (!res.ok)
          throw new Error(payload?.error ?? 'Failed to create document');

        const newDoc = payload as Document;
        setDocuments((prev) => [newDoc, ...prev].sort(sortByDateAsc));
        showToast('Document added successfully', 'success');
      } catch (err) {
        console.error('create failed', err);
        showToast('Failed to add document', 'error');
      }
    },
    [showToast],
  );

  const handleUpdate = useCallback(
    async (id: string, updates: Partial<Document>) => {
      try {
        const res = await fetch('/api/bod/update', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, updates }),
        });

        const payload = await res.json();
        if (!res.ok)
          throw new Error(payload?.error ?? 'Failed to update document');

        const updated = payload as Document;
        setDocuments((prev) =>
          prev.map((d) => (d.id === id ? updated : d)).sort(sortByDateAsc),
        );
        showToast('Document updated successfully', 'success');
      } catch (err) {
        console.error('update failed', err);
        showToast('Failed to update document', 'error');
      }
    },
    [showToast],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const res = await fetch('/api/bod/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        const payload = await res.json();
        if (!res.ok)
          throw new Error(payload?.error ?? 'Failed to delete document');

        setDocuments((prev) => prev.filter((d) => d.id !== id));
        showToast('Document deleted successfully', 'success');
      } catch (err) {
        console.error('delete failed', err);
        showToast('Failed to delete document', 'error');
      }
    },
    [showToast],
  );

  const handleArchive = useCallback(
    async (category: Category) => {
      try {
        const res = await fetch('/api/bod/archive', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category }),
        });

        const payload = await res.json();
        if (!res.ok)
          throw new Error(payload?.error ?? 'Failed to archive documents');

        // refresh list
        const rows = await getMeetingDocuments({
          isArchived: false,
          order: 'asc',
        });
        setDocuments(rows.sort(sortByDateAsc));

        showToast('Documents archived successfully', 'success');
      } catch (err) {
        console.error('archive failed', err);
        showToast('Failed to archive documents', 'error');
      }
    },
    [showToast],
  );

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

export async function getServerSideProps(ctx: any) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/backoffice/signin?callbackUrl=${encodeURIComponent(
          ctx.resolvedUrl,
        )}`,
        permanent: false,
      },
    };
  }

  const { userData, error } = await getUserFromSupabaseByEmail(
    session.user?.email,
  );

  if (error || !userData) {
    return {
      props: { initialDocuments: [], error: 'Unauthorized' },
    };
  }

  if (!hasPermission(userData, 'siteContent:edit:meetingDocuments')) {
    return {
      redirect: {
        destination: '/backoffice?error=unauthorized',
        permanent: false,
      },
    };
  }

  const initialDocuments = await getMeetingDocuments({
    isArchived: false,
    order: 'asc',
  });

  return { props: { initialDocuments } };
}
