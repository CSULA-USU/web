'use client';
import { useSession, signIn } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) router.push('/backoffice');

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Backoffice Sign In</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Welcome to the Backoffice!
        </Typography>

        <>
          <Typography>Please Sign in to continue.</Typography>
          <Button onClick={() => signIn()}>Sign in!</Button>
        </>
      </FluidContainer>
    </Page>
  );
}
