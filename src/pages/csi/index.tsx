import Head from 'next/head';
import { Page, DepartmentHeader, OfficeHours } from 'modules';
import {
  DescriptionCard,
  FluidContainer,
  Card,
  Divider,
  Image,
} from 'components';

export default function CSI() {
  const descriptionCards = [
    {
      imgSrc: 'icons/connecting-people-icon.png',
      imgAlt: 'connecting people',
      children:
        'Meet new people! Connect with over 120 student organizations including fraternities & sororities.',
    },
    {
      imgSrc: 'icons/resume-icon.png',
      imgAlt: 'resume',
      children: 'Attend events on and off campus! ',
    },
    {
      imgSrc: 'icons/giving-hand-icon.png',
      imgAlt: 'giving hand',
      children:
        'Develop your leadership potential by attending an interactive workshop!',
    },
    {
      imgSrc: 'icons/calendar-icon.png',
      imgAlt: 'calendar',
      children:
        'Interested in helping during CSI events? Sign up for the Golden Eagle Event Krew (GEEK)!',
    },
  ];
  const clubCards = [
    {
      title: 'On Campus and Off Campus Programs',
      children:
        'Join us for events on campus like movie nights, arts and crafts, leadership workshops, pet therapy and off campus for musical theater trips, theme park visits, and leadership retreats. New events are hosted each semester!',
      imgSrc: '/vectors/csi/trip.svg',
      imgAlt: 'trip image',
      href: '#',
    },
    {
      title: 'Fraternities & Sororities',
      children:
        'Are you curious about fraternity & sorority life? Looking to add some fun to your university experience? Interested in helping others through community service? Take some time to check out these unique organizations.',
      imgSrc: '/vectors/csi/fraternities.svg',
      imgAlt: 'fraternities image',
      href: '#',
    },
    {
      title: 'LEAD (Leadership Enrichment Advocacy & Development)',
      children:
        'Are you interested in developing the skills you need to be a stand-out in a tough job market? Explore the opportunities we have for all students regardless of the level of leadership experience they have. See our events calendar for upcoming opportunities.',
      imgSrc: '/vectors/csi/education.svg',
      imgAlt: 'trip image',
      href: '#',
    },
    {
      title: 'Leadership Library',
      children:
        'CSI maintains a Leadership Library with books on retreat planning, team builders, enhancing communication skills, officer transitions, and tips for running a successful meeting. All recognized student organization members can check out the books from our office in the U-SU.',
      imgSrc: '/vectors/csi/meeting.svg',
      imgAlt: 'trip image',
      href: '#',
    },
    {
      title: 'GEEK (Golden Eagle Event Krew',
      children:
        'GEEK is an opportunity for Cal State LA students to get involved behind the scenes, helping with event programming and/or marketing for CSI events. The volunteer program offers many opportunities to develop professional and leadership skills in a fun, fast-paced environment by working with vendors, campus administrators and CSI staff to make events come to life!',
      imgSrc: '/vectors/csi/friends.svg',
      imgAlt: 'friends image',
      href: '#',
    },
    {
      title: 'Student Organizations',
      children:
        'Cal State LA is home to over 120 student organizations that represent academic, cultural, political, professional, service, social, spiritual, and recreational interests. Learn about the organizations or find information about the Student Org Handbook and policies and procedures!',
      imgSrc: '/vectors/csi/academic.svg',
      imgAlt: 'academic image',
      href: 'https://calstatelausu.org',
    },
  ];

  const hours = [
    {
      title: 'Office Hours',
      times: [
        'Monday - Friday: 9:00 AM - 5:00 PM',
        'Saturday - Sunday: CLOSED',
      ],
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
      <DepartmentHeader
        title="Center for Student Involvement"
        infoSection={
          <OfficeHours
            address="5154 State University Drive Los Angeles, CA 90032 Room 204, 2nd Floor, U-SU"
            phoneNumber="323-343-5110"
            hours={hours}
          />
        }
      >
        The Center for Student Involvement empowers Golden Eagles to engage in
        transformative opportunities, build community, and create positive
        change.
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
    </Page>
  );
}
