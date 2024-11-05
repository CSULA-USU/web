import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Page } from 'modules';
import { FluidContainer, StyledLink, Loading, Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
import Link from 'next/link';
// import jobs from 'data/employment.json';
// used for static full-time job data for before Auxiliary Organizations Association (AOA) RSS feed was available

const JobListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: calc(50% - 16px);
    ${media('tablet')(`
      width: 100%;
    `)}
  }
`;

const JobItem = styled.div`
  border-bottom: 1px solid ${Colors.greyLighter};
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export default function Employment() {
  // const fulltimeJobs = jobs.filter((j) => j.type === 'fulltime');
  // used for static full-time job data for before Auxiliary Organizations Association (AOA) RSS feed was available
  const [studentAssistantloading, setStudentAssistantLoading] = useState(true);
  const [fullTimeloading, setFullTimeLoading] = useState(true);

  const [studentJobs, setStudentJobs] = useState([]);
  const [fullTimeJobs, setFullTimeJobs] = useState([]);

  const fetchJobFeed = async () => {
    // RSS feed for part-time student jobs
    const data = await fetch('/api/employment');
    await data.json().then((feed) => {
      const partTimeResults = feed.items.filter(
        (item: any) => !item.contentSnippet.includes('5/40'),
      );
      setStudentJobs(partTimeResults);
      setStudentAssistantLoading(false);
    });

    // RSS feed API for full-time jobs
    const fullTimeData = await fetch('/api/fullTimeEmployment');
    await fullTimeData.json().then((fullTimeFeed) => {
      const fullTimeFeedFiltered = fullTimeFeed.items.filter((job: any) => {
        const jobDesc: String = job['content:encodedSnippet'];
        return (
          jobDesc.toLowerCase().includes('university-student union') ||
          jobDesc.toLowerCase().includes('university student union')
        );
      });
      setFullTimeJobs(fullTimeFeedFiltered);
      setFullTimeLoading(false);
    });
  };

  useEffect(() => {
    fetchJobFeed();
  }, []);

  return (
    <Page>
      <Head>
        <title>U-SU Employment</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="hiring, hire, opportunity, apply, The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Employment Opportunities, Board of Directors, Jobs, Full-time Positions, Student Assistant Positions, Administration, Applications"
        />
        <meta
          name="description"
          content="Explore work opportunities and job positions at the University-Student Union at Cal State LA, and help contribute to its mission of encouraging broad social, cultural, recreational, and informal educational programming for the university and its surroundings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FluidContainer backgroundImage="/backgrounds/subtle-background-2.jpg">
        <Typography as="h1" variant="pageHeader">
          Employment
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <JobListingContainer>
          <div>
            <Typography as="h2" variant="title" margin="16px 0 8px">
              Student Assistant Positions
            </Typography>
            {studentAssistantloading ? (
              <Loading load={studentAssistantloading} />
            ) : studentJobs.length >= 1 ? (
              studentJobs.map((j: any) => (
                <JobItem key={`${j.title}`}>
                  <Typography variant="subheader" size="lg" color="black">
                    <StyledLink isExternalLink href={j.link || ''}>
                      {j.title}
                    </StyledLink>
                  </Typography>
                </JobItem>
              ))
            ) : (
              <Typography>
                No available student assistant positions at this time.
              </Typography>
            )}
          </div>
          <div>
            <Typography as="h2" variant="title" margin="16px 0 8px">
              Full-time Positions
            </Typography>
            {fullTimeloading ? (
              <Loading load={fullTimeloading} />
            ) : fullTimeJobs.length >= 1 ? (
              fullTimeJobs.map((j: any) => (
                <JobItem key={`${j.title}`}>
                  <Typography variant="subheader" size="lg" color="black">
                    <StyledLink isExternalLink href={j.link}>
                      {j.title}
                    </StyledLink>
                  </Typography>
                </JobItem>
              ))
            ) : (
              <Typography>
                No available full-time positions at this time.
              </Typography>
            )}
          </div>
        </JobListingContainer>
      </FluidContainer>
      <FluidContainer flex flexDirection="column">
        <Typography
          as="h2"
          variant="titleLarge"
          margin={`0 0 ${Spaces.md}`}
          size="2xl"
        >
          Applications
        </Typography>
        <Link
          href="/employment/forms/University-Student Union at Cal State LA Full-time Staff Employment Application (2023).pdf"
          target="_blank"
        >
          Full-time Professional Appointment
        </Link>
      </FluidContainer>
    </Page>
  );
}
