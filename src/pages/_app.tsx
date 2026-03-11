import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useRef } from 'react'; // Added useRef
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import { SessionProvider } from 'next-auth/react';
import { EventsLoader } from 'components';
import ToastProvider from 'context/ToastContext';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  // Refs to prevent double-firing in Strict Mode
  const initialized = useRef(false);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
    if (!GA_ID) return;

    // 1. Initialize GA only once
    if (!initialized.current) {
      ReactGA.initialize(GA_ID);
      initialized.current = true;
    }

    // 2. Track pageview, ensuring we don't track the same path twice in the same render cycle
    if (lastTrackedPath.current !== router.asPath) {
      ReactGA.send({ hitType: 'pageview', page: router.asPath });
      lastTrackedPath.current = router.asPath;
    }
  }, [router.asPath]);

  return (
    <>
      <SessionProvider session={session}>
        <ToastProvider>
          <RecoilRoot>
            <Head>
              <title>University&ndash;Student Union</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                name="author"
                content="University-Student Union at Cal State LA"
                key="author"
              />
              <meta
                name="description"
                content="The hub for connection and growth at Cal State LA."
                key="description"
              />
              <meta
                property="og:title"
                content="University-Student Union | Cal State LA"
                key="og-title"
              />
              <meta
                property="og:description"
                content="The hub for connection and growth at Cal State LA."
                key="og-desc"
              />
              <meta property="og:type" content="website" key="og-type" />
              <meta
                property="og:image"
                content="https://www.calstatelausu.org/about/calstatela-hero.jpeg"
                key="og-image"
              />
            </Head>

            <EventsLoader />
            <Component {...pageProps} />

            <SpeedInsights route={router.pathname} />
            <Analytics />
          </RecoilRoot>
        </ToastProvider>
      </SessionProvider>
    </>
  );
}
