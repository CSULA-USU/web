import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';
import { EventsLoader } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
  const router = useRouter();
  return (
    <>
      <RecoilRoot>
        <EventsLoader />
        <Component {...pageProps} />
        <SpeedInsights route={router.pathname} />
        <Analytics />
      </RecoilRoot>
    </>
  );
}
