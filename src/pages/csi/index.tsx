import Head from 'next/head';
import { Page, DepartmentHeader } from 'modules';
import { DescriptionCard, FluidContainer, Card, Divider } from 'components';

export default function CSI() {
  const descriptionCards = [
    {
      imgSrc: 'icons/connecting-people-icon.png',
      imgAlt: 'connecting people',
      children:
        'Meet new people! Connect with over 120 student organizations including fraternities & sororities.',
    },
    {
      imgSrc: 'icons/tent-icon-0.png',
      imgAlt: 'tent',
      children:
        'Adventurous? Go on the snowboarding and whitewater rafting trips!',
    },
    {
      imgSrc: 'icons/music-icon.png',
      imgAlt: 'music',
      children:
        'Love music? Check out the best new bands right here on campus.',
    },
    {
      imgSrc: 'icons/resume-icon.png',
      imgAlt: 'resume',
      children:
        'Build your resume! Develop leadership skills at our interactive programs.',
    },
    {
      imgSrc: 'icons/giving-hand-icon.png',
      imgAlt: 'giving hand',
      children:
        'Build your resume! Develop leadership skills at our interactive programs.',
    },
    {
      imgSrc: 'icons/calendar-icon.png',
      imgAlt: 'calendar',
      children: 'Eager to help out at campus events? Join GEEK!',
    },
    {
      imgSrc: 'icons/tent-icon-1.png',
      imgAlt: 'tent',
      children:
        'Take charge! Start your own student organization or suggest a new event idea!',
    },
  ];
  const clubCards = [
    {
      title: 'Awards, Scholarships, and Recognition',
      linkText: 'Read More',
      children:
        'Applications for the Golden Eagle Awards of Excellence, U-SU Student Involvement Scholarship, and Student Leader Awards.',
    },
    {
      title: 'Campus Activities, Programs, and Trips',
      linkText: 'Read More',
      children:
        'Bands, comedians, movie nights, arts & crafts, Zumba classes, snow skiing, white water rafting, community service experiences, and major events…new programs are added every quarter!',
    },
    {
      title: 'Fraternities & Sororities',
      linkText: 'Read More',
      children:
        'Are you curious about fraternity & sorority life? Looking to add some fun to your university experience? Interested in helping others through community service? Take some time to check out these unique organizations.',
    },
    {
      title: 'Leadership Academy',
      linkText: 'Read More',
      children:
        'Were you a leader in high school or your community college? Are you interested in developing the skills you need to be a stand-out in a tough job market? Explore the opportunities we have for all students regardless of the level of leadership experience they have.',
    },
    {
      title: 'Leadership Library',
      linkText: 'Read More',
      children:
        'The Center for Student Involvement maintains a Leadership Library with information on retreat planning, team builders, enhancing communication skills, officer transitions, and tips for running a successful meeting. All recognized student organization members can access the information either within the Center or at their leisure through the book/video loan program. The Center staff will frequently add more books and videos to the library to address additional organization topics and interests.',
    },
    {
      title: 'GEEK',
      linkText: 'Read More',
      children:
        'By helping out behind the scenes of CSI programs and activities, you will be able to get more involved on campus, meet lots of other students, and get some event planning experience. A great addition to your resume!',
    },
    {
      title: 'Student Organizations',
      linkText: 'Read More',
      children:
        'Cal State LA is home to over 120 student organizations that represent academic, cultural, political, professional, service, social, spiritual, and recreational interests.',
    },
    {
      title: 'Student Organization Handbook, Forms, and Policies',
      linkText: 'Read More',
      children:
        'Student organization members will find the documents they need to guide their groups to success.',
    },
  ];

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
        The Center for Student Involvement serves as a hub for involvement,
        recreation and leadership, adding to the value of campus life at Cal
        State LA.
      </DepartmentHeader>
      <FluidContainer
        backgroundColor="greyLightest"
        flex
        flexWrap="wrap"
        justifyContent="center"
      >
        {descriptionCards.map((props) => (
          <DescriptionCard
            rounded
            hoverable
            margin="24px 8px"
            key={`${props.children}`}
            width="calc(25% - 24px)"
            minHeight="280px"
            {...props}
          ></DescriptionCard>
        ))}
      </FluidContainer>

      {clubCards.map((props) => (
        <FluidContainer key={`${props.children}`}>
          <Card hoverable width="100%" minHeight="160px" {...props}></Card>
          <Divider color="grey" />
        </FluidContainer>
      ))}
    </Page>
  );
}
