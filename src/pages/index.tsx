import Head from 'next/head';
import {
  HomeHeader,
  UpcomingEvents,
  BoardOfDirectorsCTA,
  Page,
  CallToAction,
} from 'modules';
import { Typography } from 'components';

export default function Home() {
  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs, "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeHeader />
      <UpcomingEvents />
      <CallToAction
        buttonText="View Opportunities"
        text="Catalyze your professional development and building your network by
          becoming a valued member of the U-SU."
        href="/employment"
      >
        <Typography
          as="h2"
          variant="title"
          size="3xl"
          weight="400"
          lineHeight="1"
        >
          Join the <br />
          <strong>U-Krew!</strong>
        </Typography>
      </CallToAction>
      <BoardOfDirectorsCTA />
    </Page>
  );
}
