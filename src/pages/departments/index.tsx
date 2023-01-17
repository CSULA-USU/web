import Head from 'next/head';
import { Header, Page } from 'modules';
import { FluidContainer, Divider, Card, Image } from 'components';

export default function Departments() {
  const cards = [
    {
      title: 'Center for Student Involvement (CSI)',
      children:
        'The Center for Student Involvement serves as a hub for involvement, recreation, and leadership, adding to the excitement of campus life at Cal State LA. Visit CSI to connect with student organizations, join one of our leadership development opportunities including the Leader Project, or participate in a thrilling campus activity! Getting involved on campus is the best decision you can make to set yourself up for success at Cal State LA & into your future! We look forward to meeting you soon!',
      imgSrc: '/departments/logos/csi-icon.svg',
      imgAlt: 'CSI Icon',
      linkText: 'Learn More',
      href: '/csi',
    },
    {
      title: 'Cross Cultural Centers (CCC)',
      children:
        'The Cross Cultural Centers provide an inclusive and friendly space that allows students to be themselves. The Centers are open to individuals from all ethnic and gender backgrounds. Please stop by to find out more information or to relax and meet with friends.',
      imgSrc: '/departments/logos/ccc-icon.svg',
      imgAlt: 'CCC Icon',
      linkText: 'Learn More',
      href: '/ccc',
    },
    {
      title: 'Graffix',
      children:
        'The U-SU Graphics Department is responsible for promoting events and programs coordinated by the U-SU Programming Units through print materials and the U-SU website. We establish and maintain an identity for the U-SU through consistent publicity campaigns and promotions.',
      imgSrc: '/departments/logos/graffix-icon.svg',
      imgAlt: 'graffix Icon',
      linkText: 'Learn More',
      href: '/graffix',
    },
    {
      title: 'Operations',
      children:
        'The Operations Team consists of five departments: Building Maintenance, Building Services, Custodial Services, Media Services, and Information & Event Services.',
      imgSrc: '/departments/logos/operations-icon.svg',
      imgAlt: 'Operations Icon',
      imgWidth: '20px',
      linkText: 'Learn More',
      href: '/operations',
    },
    {
      title: 'Recreation',
      children:
        'Recreation is comprised of the Recreation Fitness Center and Recreation Esports. The Recreation Fitness Center is located on the basement level of the U-SU, and is open to all students, staff and faculty.',
      imgSrc: '/departments/logos/recreation-icon.svg',
      imgAlt: 'Recreations Icon',
      linkText: 'Learn More',
      href: '/recreation',
    },
  ];
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
        {cards.map((props) => (
          <FluidContainer flex alignItems="center" key={`${props.children}`}>
            <Image
              src={`${props.imgSrc}`}
              alt={`${props.imgAlt}`}
              width="150px"
              marginRight="48px"
            ></Image>
            <Card hoverable width="100%" minHeight="160px" {...props}></Card>
            <Divider color="grey" />
          </FluidContainer>
        ))}
      </FluidContainer>
    </Page>
  );
}
