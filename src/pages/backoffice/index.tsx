'use client';

import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Page } from 'modules';
import BackofficeShell from 'modules/Backoffice/BackofficeShell';

export default function BackofficeHome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading' && !session) router.push('/backoffice/signin');
  }, [session, status, router]);

  const displayName = useMemo(() => {
    const raw = session?.user?.name ?? '';
    if (!raw) return 'Backoffice';

    if (raw.includes(',')) {
      const [last, first] = raw.split(',').map((s) => s.trim());
      return `${first ?? ''} ${last ?? ''}`.trim();
    }
    return raw;
  }, [session]);

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <BackofficeShell title={`Welcome to the Backoffice, ${displayName}!`} />
    </Page>
  );
}
