import styled from 'styled-components';
import Head from 'next/head';
import { Page } from 'modules';
import { Typography, FluidContainer, Image, Button } from 'components';

const TeaserContainer = styled.div`
  width: 500px;
  height: 520px;
  background: center / contain no-repeat url('/ccc/nuestra-teaser.jpeg');
  border-radius: 12px;
`;
export default function CCC() {
  return (
    <Page>
      <Head>
        <title>Cultural Graduate Celebrations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="csula cal state la student union center for student involvement csi u-su university-student"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer
        backgroundColor="primary"
        flex
        justifyContent="center"
        alignItems="center"
        innerMaxWidth="560px"
      >
        <Image
          src="/ccc/ccc-grad-banner.jpg"
          alt="recreation logo"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundImage="/bod-cta-background.jpg"
      >
        <FluidContainer flex>
          <FluidContainer flex flexDirection="column">
            <TeaserContainer />
            <Typography variant="titleSmall">Nuestra Grad &apos;22</Typography>
          </FluidContainer>
          <FluidContainer>
            <Typography variant="title">
              <u>2023 Cultural Graduate Celebrations</u>
            </Typography>
            <Typography margin="24px 0">
              <strong>Dear Cal State LA Prospective Graduate,</strong>
              <br />
              These ceremonies and celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. The ceremonies are open to all students who
              would like to sign up and participate.
            </Typography>
            <Button variant="black">Apply now</Button>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
