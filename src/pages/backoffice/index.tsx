'use client';
import { useSession, signOut } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Backoffice() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) router.push('/backoffice/signin');
  }, []);

  let name = session?.user?.name || 'Undefined, Undefined';
  let [lastName, firstName] = name.split(', ');

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Welcome to the Backoffice, {firstName} {lastName}!
        </Typography>
        <Typography as="h3" variant="label">
          Board Meeting Documents:{' '}
          <Link
            href="/backoffice/bod"
            style={{ textDecoration: 'underline', color: 'blue' }}
          >
            /backoffice/bod
          </Link>
        </Typography>
        <Typography as="h3" variant="label">
          Graphics Requests:{' '}
          <Link
            href="/backoffice/graffix-requests"
            style={{ textDecoration: 'underline', color: 'blue' }}
          >
            /backoffice/graffix&ndash;requests
          </Link>
        </Typography>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </FluidContainer>
    </Page>
  );
}
