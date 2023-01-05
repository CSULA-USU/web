import Head from 'next/head';
import { Page, DepartmentHeader } from 'modules';

export default function CSI() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI</title>
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
      <DepartmentHeader title="Center for Student Involvement">
        test
      </DepartmentHeader>
    </Page>
  );
}
