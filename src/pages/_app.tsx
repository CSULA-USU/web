import 'styles/globals.css';
import type { AppProps } from 'next/app';
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
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
  const router = useRouter();
  return (
    <>
      <SessionProvider session={session}>
        <ToastProvider>
          <RecoilRoot>
            <Head>
              <title>University&ndash;Student Union</title>
              <meta
                name="author"
                content="The University Student Union"
                key="author"
              />
              <meta
                name="keywords"
                content="the university student union, california state university los angeles, student union, csula, cal state la, u-su, usu, student, organizations, cross cultural centers, center for student involvement, fitness center, student orgnizations, calendar, events, gender and sexuality resource center, pan african resource center, asian pacific islander, chicana latina, information and event services, distinguished women awards, cultural graduate celebrations, employment opportunities, board of directors, jobs, ccc, csi, apisrc, graffix, operations, recreation, building hours, building, hours, college, student, union, student union, cal state la, cal state los angeles, cal state, los angeles, university student union, ussu, ussu la, ussu los angeles"
                key="keywords"
              />
              <meta
                name="description"
                content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
                key="description"
              />
              <meta
                name="image"
                property="og:image"
                content="/about/calstatela-hero.jpeg"
                key="image"
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
