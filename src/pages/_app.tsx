import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import { EventsLoader } from 'components';
import Head from 'next/head';

import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
  const router = useRouter();
  return (
    <>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Head>
            <title>University-Student Union</title>
            <meta
              name="author"
              content="The University Student Union"
              key="author"
            />
            <meta
              name="keywords"
              content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, CCC, CSI, ASIPRCS, Graffix, Operations, Recreation"
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
      </SessionProvider>
    </>
  );
}
