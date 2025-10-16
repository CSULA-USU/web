'use client';
import { useSession, signIn } from 'next-auth/react';

import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession(); // 'loading' | 'authenticated' | 'unauthenticated'
  const tried = useRef(false);

  // Extract callbackUrl from query string or default to /backoffice
  const callbackUrl = (router.query.callbackUrl as string) || '/backoffice';

  // If already signed in → go directly to callbackUrl
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  // Auto-start Azure AD sign-in only when unauthenticated
  useEffect(() => {
    if (status !== 'unauthenticated' || tried.current) return;
    tried.current = true;
    signIn('azure-ad', { callbackUrl });
  }, [status, callbackUrl]);

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
