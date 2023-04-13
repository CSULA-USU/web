import Head from 'next/head';
import { Page } from 'modules';
import { Typography, Image, FluidContainer } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { Spaces } from 'theme';
import { useState, useEffect } from 'react';
import errorImages from '../data/404Images.json';

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${Spaces.md};
  margin-top: ${Spaces.lg};
`;
export default function Custom404() {
  const [src404, setSrc404] = useState('/404/custom404-1.png');

  useEffect(() => {
    let random = Math.floor(Math.random() * errorImages.length);
    setSrc404(errorImages[random].src);
  }, []);
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
      <FluidContainer flex justifyContent="center" flexWrap="wrap">
        <Typography variant="title" margin={`0 0 ${Spaces.md}`}>
          We can’t seem to find the page you’re looking for ¯\_(ツ)_/¯
        </Typography>
        <Image
          src={src404}
          alt="404 message "
          width="90%"
          margin={`0 ${Spaces.md}`}
        ></Image>

        <LinkContainer>
          <Typography variant="cta" size="lg">
            Here are some useful pages:
          </Typography>
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/departments">Departments</Link>
          <Link href="/employment ">Employment</Link>
        </LinkContainer>
      </FluidContainer>
    </Page>
  );
}
