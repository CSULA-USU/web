import Head from 'next/head';
import { Page } from 'modules';
import { FluidContainer, Image, Typography } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { Spaces } from 'theme';

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${Spaces.md};
  margin-top: ${Spaces.lg};
`;
export default function Custom404() {
  return (
    <Page>
      <Head>
        <title>University&ndash;Student Union</title>
      </Head>
      <FluidContainer
        flex
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="title" margin={`0 0 ${Spaces.md}`}>
          Sorry! We can’t seem to find the page you’re looking for.
        </Typography>
        <br />
        <Image
          src="https://media0.giphy.com/media/hqOIyGbkgZoQB7h3Pd/giphy.gif"
          style={{
            maxHeight: '200px',
          }}
          alt="lost person searching at crossroads"
        />
        <LinkContainer>
          <Typography variant="cta" size="lg">
            Suggested pages:
          </Typography>
          <Link href="/">Home</Link>
          <Link href="/departments">Departments</Link>
          <Link href="/events">Events</Link>
          <Link href="/employment">Employment</Link>
          <Link href="/search">Search</Link>
        </LinkContainer>
      </FluidContainer>
    </Page>
  );
}
