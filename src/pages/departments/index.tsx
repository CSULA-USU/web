import Head from 'next/head';
import { Header, ImageAndCard, Page } from 'modules';
import { FluidContainer, Typography } from 'components';
import departments from 'data/departments.json';

export default function Departments() {
  return (
    <Page>
      <Head>
        <title>U-SU Departments</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Cross Cultural Centers, CCC, Center For Student Involvement, CSI, Fitness Center, Student Orgnizations, Calendar, Events, Gender and Sexuality Resource Center, Pan African Resource Center, Asian Pacific Islander Resource Center, APISRC, Chicana, Chicano, Latina, Latino, Latinx, Information and Event Services, Distinguished Women Awards, Cultural Graduate Celebrations, Employment Opportunities, Board of Directors, Jobs, Graffix, Operations, Recreation"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Departments"
        backgroundImage="/backgrounds/subtle-background-2.jpg"
      >
        The University-Student Union mission is to provide a unique and friendly
        environment for the campus community to interact informally. Our
        services and facilities departments provide convenience and easy
        availability for on-the-go students.
      </Header>
      <FluidContainer>
        <Typography as="h2" variant="title" lineHeight="1" margin="0 0 18px 0">
          The U-SU is comprised of:
        </Typography>
        {departments.map((props) => (
          <ImageAndCard key={props.title} {...props} />
        ))}
      </FluidContainer>
    </Page>
  );
}
