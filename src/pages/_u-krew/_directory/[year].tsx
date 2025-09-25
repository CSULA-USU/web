import Head from 'next/head';
import { Page, Header } from 'modules';

export default function UKrewYear() {
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
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-1.webp"
      >
        Union: An act or instance of uniting or joining two or more things into
        one. Something that is made one : something formed by a combination or
        coalition of parts or members. A confederation of independent
        individuals for some common purpose.
      </Header>
    </Page>
  );
}
