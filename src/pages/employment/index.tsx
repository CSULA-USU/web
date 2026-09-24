import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatusType } from 'atoms';
import { useBreakpoint } from 'hooks';
import { fetchFullTimeJobs } from 'lib/aoaJobFeed';
import { Colors, media, Spaces } from 'theme';
import {
  FluidContainer,
  StyledLink,
  Loading,
  PageMeta,
  Typography,
} from 'components';
import { FullTimeJobModal, Page } from 'modules';
import { AoaJobListing } from 'types';
// import jobs from 'data/employment.json';
// used for static full-time job data for before Auxiliary Organizations Association (AOA) RSS feed was available

/**
 * Spent twice — by the Applications section below and by every job modal — so
 * the two cannot come to disagree about which form is current.
 */
const APPLICATION_FORM_HREF =
  'https://www.dropbox.com/scl/fi/qskkmhqm088sh1zjvnje0/University-Student-Union-at-Cal-State-LA-Full-time-Staff-Employment-Application-Form-2026.pdf?rlkey=cj02qiqj6jg120n3bdspdct48&st=t8lm37ic&raw=1';

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

/**
 * Full-time rows open a modal rather than leaving for csuaoa.org, so the
 * trigger has to be a real button for keyboard and screen-reader users. It is
 * deliberately not the house fill-on-hover: it sits directly beside the
 * student-assistant list, whose rows are StyledLinks, and two adjacent lists of
 * job titles that hover differently read as a bug. Matching `UnderlineHover` in
 * components/Link/StyledLink keeps the pair consistent — change both or
 * neither.
 */
const JobTrigger = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: left;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.3s ease-in-out;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
    text-decoration-color: currentColor;
  }
`;

interface EmploymentProps {
  fullTimeJobs: AoaJobListing[];
  fullTimeStatus: StatusType;
}

/** Matches the feed's own hourly rebuild; a posting runs for weeks. */
const REVALIDATE_SECONDS = 900;

/** Retry sooner than a normal revalidate while AOA is unreachable. */
const REVALIDATE_ON_FAILURE_SECONDS = 300;

/**
 * Full-time postings are rendered server-side rather than fetched on mount, so
 * their titles and the JobPosting JSON-LD are in the initial HTML. Googlebot
 * does run JavaScript, but that happens in a deferred second pass — too slow to
 * be much use for a listing that is only open a few weeks.
 *
 * The student-assistant column still fetches client-side; its Handshake feed is
 * a separate integration and was not part of this change.
 */
export const getStaticProps: GetStaticProps<EmploymentProps> = async () => {
  try {
    const { jobs } = await fetchFullTimeJobs();
    return {
      props: { fullTimeJobs: jobs, fullTimeStatus: 'success' },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch {
    return {
      props: { fullTimeJobs: [], fullTimeStatus: 'failed' },
      revalidate: REVALIDATE_ON_FAILURE_SECONDS,
    };
  }
};

export default function Employment({
  fullTimeJobs,
  fullTimeStatus,
}: EmploymentProps) {
  // const fulltimeJobs = jobs.filter((j) => j.type === 'fulltime');
  // used for static full-time job data for before Auxiliary Organizations Association (AOA) RSS feed was available
  const [studentAssistantloading, setStudentAssistantLoading] = useState(true);

  const [studentJobs, setStudentJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState<AoaJobListing | null>(null);

  const [studentStatus, setStudentStatus] = useState<StatusType>('undefined');

  const { isMobile } = useBreakpoint();
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
  };

  useEffect(() => {
    fetchJobFeed();
  }, []);

  return (
    <Page>
      <PageMeta
        title="U–SU Employment"
        description="Explore work opportunities and job positions at the University-Student Union at Cal State LA, and help contribute to its mission of encouraging broad social, cultural, recreational, and informal educational programming for the university and its surroundings"
        path="/employment"
        socialTitle="Work at the U-SU | Cal State LA"
        socialDescription="On-campus jobs for Golden Eagles. Explore open student and professional positions at the University-Student Union."
      />

      {/* The posting bodies live in a modal, and react-modal mounts nothing
          while closed — so without this, the text Googlebot can reach is just
          the job titles. JobPosting is also the format Google Jobs consumes,
          which the old link-out to csuaoa.org never gave us. `validThrough` is
          absent because the AOA feed carries no closing date; it is optional. */}
      {fullTimeJobs.length >= 1 && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                fullTimeJobs.map((j) => ({
                  '@context': 'https://schema.org',
                  '@type': 'JobPosting',
                  title: j.title,
                  description: j.descriptionHtml,
                  datePosted: j.postedAt,
                  employmentType: 'FULL_TIME',
                  hiringOrganization: {
                    '@type': 'Organization',
                    name: 'University-Student Union at Cal State LA',
                    sameAs: 'https://www.calstatelausu.org',
                  },
                  jobLocation: {
                    '@type': 'Place',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: '5154 State University Dr',
                      addressLocality: 'Los Angeles',
                      addressRegion: 'CA',
                      postalCode: '90032',
                      addressCountry: 'US',
                    },
                  },
                })),
              ),
            }}
          />
        </Head>
      )}

      <FluidContainer backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp">
        <Typography as="h1" variant="pageHeader">
          Employment
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <JobListingContainer>
          <div>
            <Typography
              as="h2"
              variant="title"
              size={isMobile ? 'lg' : '2xl'}
              margin="16px 0 8px"
            >
              Student Assistants
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
                No available student assistant positions.
              </Typography>
            )}
          </div>
          <div>
            <Typography
              as="h2"
              variant="title"
              margin="16px 0 8px"
              size={isMobile ? 'lg' : '2xl'}
            >
              Full&ndash;Time Positions
            </Typography>
            {fullTimeJobs.length >= 1 ? (
              fullTimeJobs.map((j) => (
                <JobItem key={j.id}>
                  <JobTrigger
                    type="button"
                    onClick={() => setSelectedJob(j)}
                    aria-haspopup="dialog"
                    aria-label={`Read the full ${j.title} posting`}
                  >
                    <Typography variant="subheader" size="md" color="black">
                      {j.title}
                    </Typography>
                  </JobTrigger>
                </JobItem>
              ))
            ) : fullTimeStatus == 'failed' ? (
              <Typography variant="subheader" size="md" color="black">
                An error occurred when fetching the jobs. Please try reloading
                your page.
              </Typography>
            ) : (
              <Typography variant="subheader" size="md" color="black">
                No available full&ndash;time positions at this time.
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
        <FluidContainer padding="0">
          <StyledLink
            href={APPLICATION_FORM_HREF}
            aria-label="Open Full-time Professional Appointment Application PDF form in a new tab"
            isInverseUnderlineStyling
          >
            Full&ndash;Time Professional Appointment
          </StyledLink>
        </FluidContainer>
      </FluidContainer>
      <FullTimeJobModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onRequestClose={() => setSelectedJob(null)}
        applicationFormHref={APPLICATION_FORM_HREF}
      />
    </Page>
  );
}
