import Head from 'next/head';
import { Header, ImageAndCard, Page } from 'modules';
import { FluidContainer, Typography } from 'components';
import departments from 'data/departments.json';

export default function Departments() {
  return (
    <Page>
      <Head>
        <title>U&ndash;SU Departments</title>{' '}
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
          key="description"
        />
      </Head>

      <Header
        title="Departments"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
      >
        The University&ndash;Student Union mission is to provide a unique and
        friendly environment for the campus community to interact informally.
        Our services and facilities departments provide convenience and easy
        availability for on-the-go students.
      </Header>
      <FluidContainer>
        <Typography as="h2" variant="title" lineHeight="1" margin="0 0 18px 0">
          The U&ndash;SU is comprised of:
        </Typography>
        {departments.map((props) => (
          <ImageAndCard key={props.title} {...props} />
        ))}
      </FluidContainer>
    </Page>
  );
}
