import Head from 'next/head';
import { Header, Page } from 'modules';
import { FluidContainer, Divider, Card, Image } from 'components';
import { useBreakpoint } from 'hooks';
import departments from 'data/departments.json';

export default function Departments() {
  const { isTablet } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>University-Student Union Departments</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, student, organizations, MORE, Cross Cultural Centers, Center For Student Involvement, Fitness Center, The Pit, The Gameroom, Student orgnizations, Calendar, Events, Gender and sexuality resource center, Pan African resource center, Asian Pacific islander, Chicana Latina, Information and Event Services, Distinguished Women, awards, Cultural Graduate Celebrations, LOUDmouth Zine, S.T.A.R.S. Program, Employment Opportunities, Board of Directors, Jobs"
        />
        <meta
          name="description"
          content="The University-Student Union inc.(U-SU) at California State University, Los Angeles was established in 1975 and provides a unique setting for the encouragement of broad social, cultural, recreational, and informal educational programming for the university and its surroundings."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Departments" backgroundImage="/subtle-background-2.jpg">
        The University-Student Union mission is to provide a unique and friendly
        environment for the campus community to interact informally. Our
        services and facilities departments provide convenience and easy
        availability for on-the-go students.
      </Header>
      <FluidContainer>
        {departments.map((props) => (
          <FluidContainer
            flex
            flexDirection={isTablet ? 'column' : 'row'}
            alignItems="center"
            key={`${props.children}`}
            padding="16px"
          >
            {!isTablet && (
              <Image
                src={`${props.imgSrc}`}
                alt={`${props.imgAlt}`}
                width="150px"
                marginRight="48px"
              ></Image>
            )}
            <Card
              iconSrc={isTablet ? props.imgSrc : undefined}
              iconWidth="120px"
              hoverable
              width="100%"
              minHeight="160px"
              {...props}
            ></Card>
            <Divider color="grey" />
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
