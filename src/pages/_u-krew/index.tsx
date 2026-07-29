import Head from 'next/head';
import { Page } from 'modules';

export default function UKrew() {
  return (
    <Page>
      <Head>
        <title>U&ndash;Krew</title>
        <meta
          name="author"
          content="University-Student Union, Cal State LA"
          key="author"
        />
        {/* noindex comes from the draft-route check in _app.tsx */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Page>
  );
}
