import Head from 'next/head';
import { Page, Header } from 'modules';

export default function UKrew() {
  return (
    <Page>
      <Head>
        <title>U-Krew</title>
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="Cal State LA, CSULA, U-SU, University-Student Union, Staff, Directors, Administration, Center for Student Involvement, CSI, Cross Cultural Centers, CCC, Graffix, Operations, Recreation, Coordinator, Dean, Technician, Assistant, Web Designer, Executive, Employee"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="U-Krew"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
      >
        u-krew page filler
      </Header>
    </Page>
  );
}
