import Head from 'next/head';
import { NonBreakingSpan, Typography } from 'components';
import { Header, Page } from 'modules';
import { FormsSection } from 'partials';

const event = [
  {
    title: 'Amplified Sound Request',
    children: (
      <Typography as="p">
        Amplified Sound Request (On-Campus Departments Only & Off-Campus
        Organizations only).
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDAzVdPgaKb3-l5UdrlKWTqEjIf6WVAJ-JKCU-ewQQZxwFKbmlrarVXUOkjudlo04Q*',
    },
  },
  {
    title: 'Event Registration',
    children: (
      <Typography as="p">
        Student organization event registrations are subject to all necessary
        requirements before they can be approved.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.presence.io/form/event-registration',
    },
  },
  {
    title: 'Student Organization Temporary Food Permit Form',
    children: (
      <Typography as="p">
        Please ensure you have all required information in order to apply for a
        temporary food permit.
      </Typography>
    ),
    button: {
      children: <NonBreakingSpan>View</NonBreakingSpan>,
      disabled: false,
      href: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBClO-FUQqabMLYlp_HmZ1jd1qpIfLnT9oqbwpC5uGDrT0xEXkxeOEtpj1gQZ0xDHs*',
    },
  },
];

const CSIFormsButton = [
  {
    text: 'Club Banking Forms',
    href: 'https://asicalstatela.org/student-org-banking',
  },
];

export default function CSIForms() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI Forms</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="The University-Student Union Center for Student Involvement at Cal State LA"
          key="author"
        />
        <meta
          name="description"
          content="Access essential forms for Cal State LA student organizations, including event registration, temporary food permits, and amplified sound requests."
          key="description"
        />
        <meta
          name="keywords"
          content="CSI Forms, Student Organization Forms, Cal State LA Event Registration, Temporary Food Permit CSULA, Amplified Sound Request, Student Club Banking, CSI Resources, U-SU CSI"
          key="keywords"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Student Organization Forms | Center for Student Involvement | Cal State LA"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Everything you need to register events and manage your student organization at Cal State LA."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/csi/forms"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
          key="og-image"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.calstatelausu.org/csi/forms" />

        {/* Structured Data for Forms and Resources */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'CSI Student Organization Forms',
              description:
                'A collection of official forms for student organizations at California State University, Los Angeles.',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Amplified Sound Request',
                  url: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDAzVdPgaKb3-l5UdrlKWTqEjIf6WVAJ-JKCU-ewQQZxwFKbmlrarVXUOkjudlo04Q*',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Event Registration',
                  url: 'https://calstatela.presence.io/form/event-registration',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Temporary Food Permit Form',
                  url: 'https://calstatela.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBClO-FUQqabMLYlp_HmZ1jd1qpIfLnT9oqbwpC5uGDrT0xEXkxeOEtpj1gQZ0xDHs*',
                },
              ],
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://www.calstatelausu.org/csi/forms',
              },
            }),
          }}
        />
      </Head>
      <Header
        title="Center for Student Involvement Forms"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
        buttons={CSIFormsButton}
      >
        Forms that pertain to the Center for Student Involvement. Recognized
        Student Organization banking forms have been moved to the Associated
        Students Inc. website.
      </Header>
      {/* <FormsSection forms={account} sectionTitle="Account Update Forms" /> */}
      {/* <FormsSection forms={banking} sectionTitle="Club Banking" /> */}
      <FormsSection forms={event} sectionTitle="Event" />
    </Page>
  );
}
