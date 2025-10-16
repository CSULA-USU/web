'use client';
import { useEffect, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Page } from 'modules';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FluidContainer, Typography } from 'components';

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession(); // 'loading' | 'authenticated' | 'unauthenticated'
  const tried = useRef(false);

  // Wait for the router to be ready so query params exist
  const callbackUrl =
    router.isReady && typeof router.query.callbackUrl === 'string'
      ? router.query.callbackUrl
      : '/backoffice';

  // If already signed in → go directly to callbackUrl
  useEffect(() => {
    if (!router.isReady) return;
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  // Auto-start Azure AD sign-in only when unauthenticated
  useEffect(() => {
    if (!router.isReady) return;
    if (status !== 'unauthenticated' || tried.current) return;
    tried.current = true;
    signIn('azure-ad', { callbackUrl });
  }, [status, callbackUrl, router.isReady]);

  return (
    <Page>
      <Head>
        <title>U&ndash;SU Backoffice Sign In</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Redirecting to sign in…
        </Typography>
        <Typography>Please wait while we connect to Microsoft.</Typography>
      </FluidContainer>
    </Page>
  );
}
