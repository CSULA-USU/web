import Head from 'next/head';
import { FluidContainer } from 'components';
import { Page, StudentOrgsHeroSection, StudentOrgsSubHeader } from 'modules';

export default function StudentOrgs() {
  return (
    <Page>
      <Head>
        <title>U-SU Student Organizations</title>
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
      <FluidContainer>
        <StudentOrgsHeroSection />
        <StudentOrgsSubHeader />
      </FluidContainer>
    </Page>
  );
}
