import styled from 'styled-components';
import Head from 'next/head';
import {
  Page
} from 'modules';
import {
  Typography
} from 'components';

const CSIContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const CSIHeaderContainer = styled.div`
  background: url(csi-header.png);
  width: 660px;
  height: 258px;
`

const CSIInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 850px;
`

const CSIInnerBody = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 850px;
`



export default function Home() {
  return (
    <Page>
      <Head>
        <title>U-SU CSI</title>
        <meta name="author" content="The University Student Union Center for Student Involvement" />
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
      <CSIContainer>
        <CSIInner>
          <CSIHeaderContainer>
          </CSIHeaderContainer>
          <Typography variant="bodySerif" size="sm">
            The Center for Student Involvement serves as a hub for involvement, recreation
            and leadership, adding to the value of campus life at Cal State LA.
          </Typography>
          <ul>
            <li>
              <Typography variant="bodySerif" size="sm">
                Meet new people! Connect with over 120 student organizations including
                fraternities & sororities.
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm">
                Adventurous? Go on the snowboarding and whitewater rafting trips!
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm">
                Love music? Check out the best new bands right here on campus.
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm">
                Build your resume! Develop leadership skills at our interactive programs.
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm">
                Give back! Participate in a community service experience.
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm">
                Eager to help out at campus events? Join GEEK!
              </Typography>
            </li>
            <li>
              <Typography variant="bodySerif" size="sm" margin="0 0 8px">
                Take charge! Start your own student organization or suggest a new event idea!
              </Typography>
            </li>
          </ul>
          <CSIInnerBody>
            <Typography as="h3" variant="smallHeading" size="md">
              Awards, Scholarships, and Recognition
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
              Applications for the Golden Eagle Awards of Excellence, U-SU Student Involvement Scholarship, and Student Leader Awards.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
            Campus Activities, Programs, and Trips
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Are you curious about fraternity & sorority life? Looking to add some fun to your university experience? Interested in helping others through community service? Take some time to check out these
unique organizations.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Fraternities & Sororities
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Bands, comedians, movie nights, arts & crafts, Zumba classes, snow skiing, white water rafting, community service experiences, and major events…new programs are added every quarter!
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Golden Eagle Handbook: Statement of Student Rights and Responsibilities
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Important information about your rights and responsibilities as a student at Cal State LA.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Leadership Academy
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Were you a leader in high school or your community college? Are you interested in developing the skills you need to be a stand-out in a tough job market? Explore the opportunities we have for all students regardless of the level of leadership experience they have.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Leadership Library
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            The Center for Student Involvement maintains a Leadership Library with information on retreat planning, team builders, enhancing communication skills, officer transitions, and tips for running a successful meeting. All recognized student organization members can access the information either within the Center or at their leisure through the book/video loan program. The Center staff will frequently add more books and videos to the library to address additional organization topics
and interests.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              GEEK
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            By helping out behind the scenes of CSI programs and activities, you will be able to get more involved on campus, meet lots of other students, and get some event planning experience. A great addition to your resume!
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Student Organizations
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Cal State LA is home to over 120 student organizations that represent academic, cultural, political, professional, service, social, spiritual, and recreational interests.
            </Typography>
            <Typography as="h3" variant="smallHeading" size="md">
              Student Organization Handbook, Forms, and Policies
            </Typography>
            <Typography variant="bodySerif" size="sm" margin="0 0 24px">
            Student organization members will find the documents they need to guide their groups to success.
            </Typography>
          </CSIInnerBody>
        </CSIInner>
      </CSIContainer>
    </Page>
  );
}
