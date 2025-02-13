import { useSession, signIn, signOut } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import Head from 'next/head';

export default function Backoffice() {
  const { data: session } = useSession();

  return (
    <Page>
      <Head>
        <title>U-SU Backoffice</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Hello Backoffice!
        </Typography>
        {session ? (
          <>
            <Typography>Welcome {session?.user?.email}</Typography>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <>
            <Typography>Please Sign in to continue.</Typography>
            <Button onClick={() => signIn()}>Sign in!</Button>
          </>
        )}
      </FluidContainer>
    </Page>
  );
}
