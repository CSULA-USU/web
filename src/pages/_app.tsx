import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { EventsLoader, IGRefresher } from 'components';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <EventsLoader />
      <IGRefresher />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
