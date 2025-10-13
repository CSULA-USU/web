'use client';
import { useEffect, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Page } from 'modules';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FluidContainer, Typography } from 'components';

export default function SignIn() {
  const router = useRouter();
  const { status } = useSession();
  const tried = useRef(false);

  // 1) If already signed in, go to destination (once)
  useEffect(() => {
    if (status !== 'authenticated') return;
    const dest = (router.query.callbackUrl as string) || '/backoffice';
    router.replace(dest);
  }, [status, router, router.query.callbackUrl]);

  // 2) If NOT signed in, start Azure flow (once)
  useEffect(() => {
    if (status !== 'unauthenticated' || tried.current) return;
    tried.current = true;
    const dest = (router.query.callbackUrl as string) || '/backoffice';
    signIn('azure-ad', { callbackUrl: dest });
  }, [status, router.query.callbackUrl]);

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
