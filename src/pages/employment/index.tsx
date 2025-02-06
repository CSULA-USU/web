import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Page } from 'modules';
import { FluidContainer, StyledLink, Loading, Typography } from 'components';
import styled from 'styled-components';
import { Colors, media, Spaces } from 'theme';
import Link from 'next/link';
import { StatusType } from 'atoms';
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

  const [studentStatus, setStudentStatus] = useState<StatusType>('undefined');
  const [fullTimeStatus, setFullTimeStatus] = useState<StatusType>('undefined');

  const fetchJobFeed = async () => {
    await fetch('/api/employment')
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Failed to receive a valid response from student assistant employment API.',
          );
        }
        return res.json();
      })
      .then((feed) => {
        const partTimeResults = feed.items.filter(
          (item: any) => !item.contentSnippet.includes('5/40'),
        );
        setStudentJobs(partTimeResults);
        setStudentStatus('success');
      })
      .catch(() => {
        setStudentStatus('failed');
      })
      .finally(() => {
        setStudentAssistantLoading(false);
      });

    // RSS feed API for full-time jobs
    await fetch('/api/fullTimeEmployment')
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Failed to receive a valid response from fullTimeEmployment API.',
          );
        }
        return res.json();
      })
      .then((fullTimeFeed) => {
        const jobsFiltered = fullTimeFeed?.items.filter((job: any) => {
          const jobDesc: String = job['content:encodedSnippet'];
          return (
            jobDesc.toLowerCase().includes('university-student union') ||
            jobDesc.toLowerCase().includes('university student union')
          );
        });
        setFullTimeJobs(jobsFiltered);
        setFullTimeStatus('success');
      })
      .catch(() => {
        setFullTimeStatus('failed');
      })
      .finally(() => {
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
        <meta
          name="keywords"
          content="hiring, hire, opportunity, apply, The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Student, Organizations, Employment Opportunities, Board of Directors, Jobs, Full-time Positions, Student Assistant Positions, Administration, Applications"
          key="keywords"
        />
        <meta
          name="description"
          content="Explore work opportunities and job positions at the University-Student Union at Cal State LA, and help contribute to its mission of encouraging broad social, cultural, recreational, and informal educational programming for the university and its surroundings"
          key="description"
        />
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
                  <Typography variant="subheader" size="md" color="black">
                    <StyledLink isExternalLink href={j.link || ''}>
                      {j.title}
                    </StyledLink>
                  </Typography>
                </JobItem>
              ))
            ) : studentStatus == 'failed' ? (
              <Typography variant="subheader" size="md" color="black">
                An error occurred when fetching the jobs. Please try reloading
                your page.
              </Typography>
            ) : (
              <Typography variant="subheader" size="md" color="black">
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
                  <Typography variant="subheader" size="md" color="black">
                    <StyledLink isExternalLink href={j.link}>
                      {j.title}
                    </StyledLink>
                  </Typography>
                </JobItem>
              ))
            ) : fullTimeStatus == 'failed' ? (
              <Typography variant="subheader" size="md" color="black">
                An error occurred when fetching the jobs. Please try reloading
                your page.
              </Typography>
            ) : (
              <Typography variant="subheader" size="md" color="black">
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
