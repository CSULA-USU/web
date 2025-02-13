import { FluidContainer, Typography, Image } from 'components';
import { Page } from 'modules';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

const StatusButton = styled.button<{ color: string }>`
  text-align: center;
  border: none;
  border-radius: 5px;
  padding: 12px 16px;
  margin: ${Spaces.md};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: #fff;
  box-shadow: 3px 3px 5px ${Colors.greyDarkest};
  background-color: ${({ color }) => color};

  &:hover {
    opacity: 0.7;
  }
`;

export default function GraphicsRequests() {
  return (
    <Page>
      <Head>
        <title>Graphics Requests - 404</title>
      </Head>
      <FluidContainer>
        <FluidContainer flex justifyContent="center" alignItems="center">
          <Typography as="h1" variant="title">
            OOPS! We can&apos;t find the page you&apos;re looking for.
          </Typography>
        </FluidContainer>
        <FluidContainer flex justifyContent="center" alignItems="center">
          <Image
            alt="Eddie the Eagle figuring out what you were thinking"
            src="https://media.giphy.com/media/Ihn3KpMcpCMamJdI30/giphy.gif"
            style={{ width: '70%' }}
          ></Image>
        </FluidContainer>

        <FluidContainer
          flex
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography as="h2" variant="subheader">
            Did you mean:{' '}
          </Typography>
          <Link href="/backoffice/graffix-requests/csi">
            <StatusButton color="blue">CSI</StatusButton>
          </Link>
          <Link href="/backoffice/graffix-requests/ccc">
            <StatusButton color="green">CCC</StatusButton>
          </Link>
          <Link href="/backoffice/graffix-requests/graffix">
            <StatusButton color="orange">Graffix</StatusButton>
          </Link>
          <Link href="/backoffice/graffix-requests/operations">
            <StatusButton color="purple">Operations</StatusButton>
          </Link>
          <Link href="/backoffice/graffix-requests/recreation">
            <StatusButton color="red">Recreation</StatusButton>
          </Link>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
