import Head from 'next/head';
import { Page } from 'modules';
// import { useRouter } from 'next/router';

import { FluidContainer, Typography } from 'components';
import Link from 'next/link';

export default function GraphicsRequests() {
  // const router = useRouter();

  return (
    <Page>
      <Head>
        <title>Graphics Requests</title>
      </Head>
      <FluidContainer>
        <Typography as="h2" variant="titleLarge">
          Hi! This page has been moved to:
        </Typography>
        <Link
          href={`/backoffice/graffix-requests`}
          style={{
            textDecoration: 'underline',
            marginTop: '1rem',
            display: 'block',
          }}
        >
          https://www.calstatela.edu/backoffice/graffix-requests
        </Link>
      </FluidContainer>
    </Page>
  );
}
