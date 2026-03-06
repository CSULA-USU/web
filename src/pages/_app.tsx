import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
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

  // Initialize GA once on mount
  useEffect(() => {
    const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
    if (GA_ID) {
      ReactGA.initialize(GA_ID);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: router.pathname });
  }, [router.pathname]);

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
                name="keywords"
                content="U-SU, Cal State LA, Student Union, CSULA, Student Organizations, Campus Life"
                key="keywords"
              />
              <meta
                name="description"
                content="The hub for connection and growth at Cal State LA. Providing social, cultural, and recreational opportunities for Golden Eagles."
                key="description"
              />
              <meta
                property="og:image"
                content="https://www.calstatelausu.org/about/calstatela-hero.jpeg"
                key="image"
              />
              <meta property="og:type" content="website" key="type" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <EventsLoader />
            <Component {...pageProps} />

            {/* Vercel Performance Tools */}
            <SpeedInsights route={router.pathname} />
            <Analytics />
          </RecoilRoot>
        </ToastProvider>
      </SessionProvider>
    </>
  );
}
