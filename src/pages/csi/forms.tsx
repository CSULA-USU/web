import Head from 'next/head';
import { NonBreakingSpan, Typography } from 'components';
import { Header, Page } from 'modules';
import { FormsSection } from 'partials';

const banking = [
  {
    title: 'Tax Exemption Application (Form 1023)',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>Request Access</NonBreakingSpan>,
      disabled: true,
    },
  },
];

export default function CSIForms() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI Forms</title>
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA "
        />
        <meta
          name="keywords"
          content="csula cal state la student union center for student involvement csi u-su university-student forms form"
        />
        <meta
          name="description"
          content="All the forms relevant to the Center for Student Involvement"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="Center for Student Involvement Forms"
        backgroundImage="/subtle-background-2.jpg"
      >
        Forms that pertain to the Center for Student Involvement
      </Header>
      <FormsSection forms={banking} sectionTitle="whateverhere" />
    </Page>
  );
}
