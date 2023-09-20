import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import { EventsLoader } from 'components';

export default function App({ Component, pageProps }: AppProps) {
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
  return (
    <RecoilRoot>
      <EventsLoader />
      <Component {...pageProps} />
      <Analytics />
    </RecoilRoot>
  );
}
