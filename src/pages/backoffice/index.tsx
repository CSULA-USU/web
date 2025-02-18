'use client';
import { useSession, signOut } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import Head from 'next/head';
// import { useRouter } from 'next/router';

export default function Backoffice() {
  // const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    // router.push('/backoffice/signin');
    return <>Please Sign in</>;
  }

  return (
    <Page>
      <Head>
        <title>U-SU Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Welcome {session?.user?.name} to the Backoffice!
        </Typography>
        <>
          <Typography>Clocking out?</Typography>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </>
      </FluidContainer>
    </Page>
  );
}
