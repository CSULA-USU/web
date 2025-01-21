import Head from 'next/head';
import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';
import { Spaces } from 'theme';
import { CallToAction, Page } from 'modules';
import {
  Divider,
  Expandable,
  FluidContainer,
  Typography,
  Image,
} from 'components';
import { Fragment } from 'react';
import { useBreakpoint } from 'hooks/useBreakpoint';

interface studentOrganizationAwardsProps {
  title: string;
  description: {
    text: string;
    values: string[];
  };
  eligibility: {
    text?: string;
    values: string[];
  };
  award: {
    text?: string;
    values: string[];
  };
}

type PastAwardKeys =
  | 'Student Organization of the Year'
  | 'Outstanding Student Organization Advisor(s)'
  | 'Community Service Award'
  | 'Outstanding New Student Organization'
  | 'Commitment to Social Justice'
  | 'Program of the Year'
  | 'Collaborative Program Award'
  | 'Outstanding Student Leader(s)'
  | 'Creative Marketing Award'
  | 'Greek Member of the Year'
  | 'Greek Chapter of the Year';

type PastAwardsHashMap = {
  [_ in PastAwardKeys]: string;
};

interface pastAwardsProps {
  year: number;
  awards: PastAwardsHashMap;
}

const studentOrganizationAwards: studentOrganizationAwardsProps[] = [
  {
    title: 'Student Organization of the Year',
    description: {
      text: 'This award recognizes an organization that exemplifies the following:',
      values: [
        'Outstanding commitment to its mission',
        'Exceptional leadership and innovation',
        'Fosters a sense of community',
        'Significantly contributes to the campus experience',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
      ],
    },
    award: {
      text: '',
      values: [
        'Acrylic/Glass trophy',
        "Org name on 'Student Organization of the Year' plaque in CSI office",
        '$500 toward student organization banking account',
      ],
    },
  },
  {
    title: 'Outstanding Student Organization Advisor(s)',
    description: {
      text: 'This award recognizes an exceptional advisor who has demonstrated unwavering support, guidance, and commitment to their members. This individual exemplifies the following:',
      values: [
        'Fosters a positive environment for students to learn and grow',
        'Committed to the organization’s mission and its members',
        'Embodies the spirit of collaboration and excellence',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The advisor must be listed as the organization’s advisor on Presence',
        'Advisors may not nominate themselves for this award',
      ],
    },
    award: {
      text: '',
      values: [
        'Acrylic/Glass trophy',
        "Advisor name on 'Student Organization of the Year' plaque in CSI office",
      ],
    },
  },
  {
    title: 'Community Service Award',
    description: {
      text: 'This award recognizes an organization that exemplifies outstanding commitment to community service. This award recognizes a group that has:',
      values: [
        'Made significant contributions to local initiatives, community service, or philanthropy programs (on or off campus)',
        'Demonstrated leadership and collaboration',
        'Created positive change and inspired others to engage in service, embodying the spirit of civic responsibility and social awareness',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Outstanding New Student Organization',
    description: {
      text: 'This award recognizes an organization established within the last 2 academic years (no earlier than Fall 2022) that has demonstrated the following:',
      values: [
        'Committed to the organization’s mission and its members',
        'Quickly becoming a vital part of the university community',
        'Addressed or met a need on campus',
        'Demonstrates sustainable and successful leadership practices',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The organization must have been newly established no earlier than Fall 2022',
      ],
    },
    award: {
      text: '',
      values: [
        'Acrylic/Glass trophy',
        '$250 toward student organization banking account',
      ],
    },
  },
  {
    title: 'Commitment to Social Justice',
    description: {
      text: 'This award recognizes an organization that has demonstrated the following:',
      values: [
        'Exceptional dedication to promoting social justice, equity, and inclusivity within the campus community and beyond',
        'Initiated, led, or participated in community efforts to advance social justice (through programs, education, advocacy)',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Program of the Year',
    description: {
      text: 'This award recognizes an organization that has demonstrated exceptional commitment to enriching the college experience through innovative and impactful programming. This award honors a program that has effectively:',
      values: [
        'Enhanced student engagement and made a positive contribution to the university',
        'Promoted personal and professional development',
        'Exemplify creativity and inclusivity',
        'Was successful in attendance/participation',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The program must have occurred in the 2024-2025 academic year',
        'Programs may be single/one-time events or a series of events',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Collaborative Program Award',
    description: {
      text: 'This award recognizes outstanding teamwork and partnership between organizations that have come together to create a meaningful event. This award honors a program that:',
      values: [
        'Enhanced student engagement and made a positive contribution to the university',
        'Demonstrated careful planning and collaboration',
        'Was successful in attendance/participation',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The program must have occurred in the 2024-2025 academic year',
        'Programs may be single/one-time events or a series of events',
        'The program must be a collaboration between 2 or more organizations',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy', 'Framed certificate per organization'],
    },
  },
  {
    title: 'Outstanding Student Leader(s)',
    description: {
      text: 'This award recognizes exceptional student officers who demonstrate exemplary leadership, dedication, and commitment to their organization and the broader campus community. This award celebrates individuals who have:',
      values: [
        'Advanced the mission of their student organization',
        'Challenged and encouraged their members to engage in their organization, on campus, and the community',
        'Pursued growth and development opportunities for themselves and other members',
        'Demonstrated leadership qualities (conflict management, leadership transitions, time management, event management, planning, etc)',
        'Has made a lasting impact within their organization and across campus and beyond',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The student leader must be an active member listed on the organization’s roster on Presence',
        'Student leaders may not nominate themselves',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Creative Marketing Award',
    description: {
      text: 'This award recognizes an organization that has demonstrated outstanding creativity and innovation in marketing their program or organization. The recipient has effectively achieved the following:',
      values: [
        'Promoted their organization or programs to attract new members',
        'Engaged their target audience through a combination of strategic planning, creative content, and impactful campaigns',
        'Leveraged diverse platforms, including social media, on-campus events, and community outreach to successfully increase visibility, participation, and overall brand awareness',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'Nominees may submit flyers, campaigns, videos, images, or other materials to demonstrate the success in marketing',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Greek Member of the Year',
    description: {
      text: 'This award recognizes an individual(s) who has gone above and beyond in their commitment to fraternity and sorority life. The Greek Member of the Year is someone who exemplifies the following:',
      values: [
        'Represents the core values of their organization and CSULA',
        'Displays exceptional leadership',
        'Demonstrates impactful community service and philanthropy',
        'Strong academic achievement',
        'Dedicates and fosters a positive and inclusive Greek community',
        'Serves as a role model and inspires others to lead with integrity and purpose',
        'Has made a lasting impact within their chapter and across campus and beyond',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
        'The student leader must be an active member listed on the organization’s roster on Presence',
        'Student leaders may not nominate themselves',
      ],
    },
    award: {
      text: '',
      values: ['Acrylic/Glass trophy'],
    },
  },
  {
    title: 'Greek Chapter of the Year',
    description: {
      text: 'This award recognizes a Greek chapter that has exemplified outstanding achievement in all aspects of fraternity and sorority life. The recognized chapter has demonstrated:',
      values: [
        'Excellence in leadership and academic success',
        'Dedication to community service and philanthropy',
        'Positive brotherhood/sisterhood events and programming',
        'Upholds the values of Fraternity and Sorority Life and CSULA',
        'Fosters a strong, inclusive, and supportive environment both within and outside the FSL community',
        'Lasting positive impact on both its members and the broader community',
      ],
    },
    eligibility: {
      text: '',
      values: [
        'The student organization must be recognized by CSI in the 2024-2025 academic year',
      ],
    },
    award: {
      text: '',
      values: [
        'Acrylic/Glass trophy',
        '$250 toward student organization bank account',
      ],
    },
  },
];

const pastAwards: pastAwardsProps[] = [
  {
    year: 2024,
    awards: {
      'Student Organization of the Year': 'Graffix',
      'Outstanding Student Organization Advisor(s)': 'CSI',
      'Community Service Award': 'CCC',
      'Outstanding New Student Organization': 'Recreation',
      'Commitment to Social Justice': 'Graffix',
      'Program of the Year': 'CSI',
      'Collaborative Program Award': 'CCC',
      'Outstanding Student Leader(s)': 'Recreation',
      'Creative Marketing Award': 'Graffix',
      'Greek Member of the Year': 'CSI',
      'Greek Chapter of the Year': 'CCC',
    },
  },
  {
    year: 2023,
    awards: {
      'Student Organization of the Year': 'CSI',
      'Outstanding Student Organization Advisor(s)': 'Recreation',
      'Community Service Award': 'Graffix',
      'Outstanding New Student Organization': 'Recreation',
      'Commitment to Social Justice': 'Graffix',
      'Program of the Year': 'CSI',
      'Collaborative Program Award': 'Recreation',
      'Outstanding Student Leader(s)': 'Recreation',
      'Creative Marketing Award': 'CSI',
      'Greek Member of the Year': 'Graffix',
      'Greek Chapter of the Year': 'Recreation',
    },
  },
];

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const capitalize = (s: string) => {
  if (s.length > 0) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return '';
};

export default function StudentOrganizationAwards() {
  const { isMini, isMobile, isTablet, isDesktop } = useBreakpoint();
  const sortAwardsByYear = () => {
    pastAwards.sort((a, b) => b.year - a.year);
  };
  sortAwardsByYear();

  return (
    <Page>
      <Head>
        <title>Student Organization Awards</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, U-SU, Center for Student Involvement, CSI, University Student, Fraternity, Sorority, Co-Ed, Greek Life, FSL, IFC Recruitment, MGC Membership Intake, NPHC Membership Intake, Panhellenic Recruitment"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Title section */}
      <FluidContainer
        flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          as="h1"
          variant="pageHeader"
          margin="0 0 16px"
          size={isMobile ? '2xl' : '4xl'}
          style={{ textAlign: 'center' }}
        >
          Golden Eagle Awards
        </Typography>
        <Typography
          as="p"
          variant="copy"
          style={{ maxWidth: '80ch', textAlign: 'center', margin: '0 0 8px' }}
        >
          The Golden Eagle Awards celebrate excellence by recognizing the top
          student organizations at CalStateLA. These awards honor outstanding
          achievements, leadership, and contributions that enhance campus life
          and foster community engagement. Join us in applauding the remarkable
          efforts of student groups driving innovation, inclusivity, and
          positive change!
        </Typography>
        <Typography as="p" variant="copy" margin="0 0 8px">
          <strong>
            Applications open on January 1st and close on December 30th.
          </strong>
        </Typography>

        <Image
          src="/departments/csi/csi-student-organization-awards.png"
          alt="CSI Student Organization Awards California State University Los Angeles"
          maxWidth={isTablet ? '100%' : isDesktop ? '700px' : '800px'}
        />
      </FluidContainer>

      {/* Yellow Banner - Looking to join a Student Organization */}
      <CallToAction
        href="https://calstatela.presence.io/organizations"
        buttonText="Learn More"
        text=""
      >
        <Typography variant="titleLarge" size={isMobile ? 'xl' : '2xl'}>
          Looking to join a Student Organization?
        </Typography>
      </CallToAction>

      {/* Golden Eagle Awards section */}
      <FluidContainer>
        <Typography
          as="h2"
          variant="title"
          size={isMini ? 'lg' : isMobile ? 'xl' : '2xl'}
        >
          Golden Eagle Awards:
        </Typography>

        {studentOrganizationAwards.map(
          (award: studentOrganizationAwardsProps) => {
            return (
              <Fragment key={award.title}>
                <Expandable
                  indicator={<BiChevronRight size={36} />}
                  header={
                    <Typography variant="labelTitle" as="h2">
                      {award.title}
                    </Typography>
                  }
                >
                  {Object.entries(award).map(([key, val], idx) => {
                    if (key == 'title') return;
                    if (typeof val === 'string') {
                      return (
                        <Typography
                          as="h3"
                          variant="copy"
                          key={`${key}-${idx}`}
                        >
                          <strong>{capitalize(key)}</strong>: {val}
                        </Typography>
                      );
                    } else if (typeof val === 'object') {
                      return (
                        <VerticalContainer key={`${key}-${idx}`}>
                          <Typography as="h3" variant="copy">
                            <strong>{capitalize(key)}</strong>: {val.text}
                          </Typography>
                          <ul style={{ margin: '0 0 16px' }}>
                            {val.values?.length > 0 ? (
                              val.values.map((item: string, idx: number) => {
                                return (
                                  <li key={idx}>
                                    <Typography variant="copy">
                                      {item}
                                    </Typography>
                                  </li>
                                );
                              })
                            ) : (
                              <li>
                                <Typography variant="copy">N/A</Typography>
                              </li>
                            )}
                          </ul>
                        </VerticalContainer>
                      );
                    }
                  })}
                </Expandable>
                <Divider margin={`${Spaces.sm} 0`} />
              </Fragment>
            );
          },
        )}
      </FluidContainer>

      {/* Yellow Banner - Looking to join a Student Organization */}
      <div style={{ textOverflow: 'ellipsis' }}>
        <CallToAction href="" buttonText="Apply Now" text="">
          <Typography variant="titleLarge" size={isMobile ? 'xl' : '2xl'}>
            Think you deserve a Golden Eagle Award?
          </Typography>
        </CallToAction>
      </div>

      {/* Past Golden Eagles section */}
      <FluidContainer>
        <Typography
          as="h2"
          variant="title"
          size={isMini ? 'lg' : isMobile ? 'xl' : '2xl'}
        >
          Past Golden Eagles:
        </Typography>
        {pastAwards.map((award) => {
          return (
            <>
              <Expandable
                indicator={<BiChevronRight size={36} />}
                header={
                  <Typography variant="labelTitle" as="h2">
                    {award.year}
                  </Typography>
                }
              >
                <VerticalContainer>
                  {Object.entries(award.awards).map(([title, organization]) => {
                    return (
                      <Typography
                        margin={`${Spaces.xs} 0 `}
                        variant="copy"
                        key={title}
                      >
                        <strong>{title}:</strong> {organization}
                      </Typography>
                    );
                  })}
                </VerticalContainer>
              </Expandable>
              <Divider margin={`${Spaces.sm} 0`} />
            </>
          );
        })}
      </FluidContainer>
    </Page>
  );
}
