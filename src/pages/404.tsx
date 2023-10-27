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
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, Center For Student Involvement, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, CCC, CSI, ASIPRCS, Graffix, Operations, Recreation"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
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
          src="/vectors/404/lost-road-sign.svg"
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
