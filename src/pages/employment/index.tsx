import Head from 'next/head';
import { Page } from 'modules';
import { FluidContainer, Typography } from 'components';
import jobs from 'data/employment.json';
import styled from 'styled-components';
import { Colors } from 'theme';
import Link from 'next/link';

const JobListingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: calc(50% - 16px);
  }
`;

const JobItem = styled.div`
  border-bottom: 1px solid ${Colors.greyLighter};
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export default function Employment() {
  const fulltimeJobs = jobs.filter((j) => j.type === 'fulltime');
  const studentJobs = jobs.filter((j) => j.type === 'student-assistant');
  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
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

      <FluidContainer backgroundImage="/subtle-background-2.jpg">
        <h1>Employment</h1>
      </FluidContainer>
      <FluidContainer>
        <JobListingContainer>
          <div>
            <Typography as="h2" variant="title" margin="16px 0 8px">
              Full-time Positions
            </Typography>
            {fulltimeJobs.map((j) => (
              <JobItem key={`${j.department}_${j.title}`}>
                <Typography as="h3" variant="titleSmall" color="grey">
                  {j.department}
                </Typography>
                <Link href={j.href} target="_blank">
                  <Typography as="h4" variant="copyLarge">
                    {j.title}
                  </Typography>
                </Link>
              </JobItem>
            ))}
          </div>
          <div>
            <Typography as="h2" variant="title" margin="16px 0 8px">
              Student Assistant Positions
            </Typography>
            {studentJobs.map((j) => (
              <JobItem key={`${j.department}_${j.title}`}>
                <Typography as="h3" variant="titleSmall" color="grey">
                  {j.department}
                </Typography>
                <Link href={j.href} target="_blank">
                  <Typography as="h4" variant="copyLarge">
                    {j.title}
                  </Typography>
                </Link>
              </JobItem>
            ))}
          </div>
        </JobListingContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography as="h3" variant="titleLarge">
          Applications
        </Typography>
        <Link href="/usuforms/u-su/ProfessionalEmployment.pdf">
          Professional Appointment
        </Link>
        <br />
        <Link href="https://form.jotform.com/210416532268047">
          U-SU Board of Directors
        </Link>
      </FluidContainer>
    </Page>
  );
}
