import Head from 'next/head';
import { ShadedImageHeader, Page } from 'modules';
import {
  FluidContainer,
  Image,
  NonBreakingSpan,
  Card,
  Typography,
  Tabs,
} from 'components';
import { MdGroups } from 'react-icons/md';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { GovernanceFooter } from 'partials';
import { useBreakpoint } from 'hooks';

interface CardProps {
  screenSize: boolean;
}

const CenteredContainer = styled.div<{ screenSize?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.screenSize ? '100%' : '50%')};
`;

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '✓';
    color: #ffd700;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const TabContent = styled(Typography)`
  &,
  * {
    line-height: 2;
  }
  ol {
    margin-top: 12px;
  }
`;

const cards = [
  {
    title: 'Meet the Board of Directors',
    children:
      "Learn more about the University Student Union's Board of Directors!",
    linkText: 'Learn More',
    href: 'board-of-directors/roster',
  },
  {
    title: 'Be a Student Leader',
    children:
      'See how the elections are going and check out the upcoming events!',
    linkText: 'Learn More',
    href: 'https://www.csulaelections.org/usu',
  },
  {
    title: 'Learn How to Vote',
    children:
      'Confused or uncertain on how to vote for your favorite candidates? Click below for instructions!',
    linkText: 'Learn More',
    href: 'https://www.csulaelections.org/vote',
  },
];

const ResponsibilitiesAndRequirements = (props: CardProps) => (
  <FluidContainer
    padding="0 0 24px 0"
    flex
    justifyContent="space-between"
    flexDirection={props.screenSize ? 'column-reverse' : 'row'}
  >
    <List>
      <ListItem>
        <Typography>
          Be available to meet in person every Friday during the semester from
          1:00 p.m. &ndash; 4:00 p.m.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Attend monthly Board of Director meetings and Committees
          (2&ndash;3x/month)
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Attend Board Orientation (August prior to class starting) and monthly
          trainings (1&ndash;2x/month)
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>Serve on at least two assigned sub-committees</Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Run for Chair and/or Vice Chair (meet weekly with the Executive
          Director)
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          As an undergraduate member, you must maintain a 2.0 GPA each semester
          of each term
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          As a graduate member, you must maintain a 3.0 GPA each semester of
          each term
        </Typography>
      </ListItem>
    </List>
    <CenteredContainer screenSize={props.screenSize}>
      <Image
        src="vectors/board-of-directors/completed-tasks.svg"
        alt=""
        height="256px"
        width="auto"
      />
    </CenteredContainer>
  </FluidContainer>
);

const BenefitsOfServing = (props: CardProps) => (
  <FluidContainer
    padding="0 0 24px 0"
    flex
    justifyContent="space-between"
    flexDirection={props.screenSize ? 'column-reverse' : 'row'}
  >
    <List>
      <ListItem>
        <Typography>Develop leadership and career skills</Typography>
      </ListItem>
      <ListItem>
        <Typography>Build your academic and professional resume</Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Network with peers, faculty, and staff members who also serve on the
          Board
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Influence the future of the U-SU by providing opinions on existing
          programs, services, and policies
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>Sponsorships to professional conferences</Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Semesterly reimbursement for educational expenses
        </Typography>
        <ul>
          <li>
            <Typography>$295 per semester for the Board Chair</Typography>
          </li>
          <li>
            <Typography>
              $250 per semester for all other Student Directors
            </Typography>
          </li>
        </ul>
      </ListItem>
    </List>
    <CenteredContainer screenSize={props.screenSize}>
      <Image
        src="vectors/board-of-directors/career-progress.svg"
        alt=""
        height="256px"
        width="auto"
      />
    </CenteredContainer>
  </FluidContainer>
);

const AuditTab = () => (
  <TabContent>
    The Audit Committee recommends to the Board of Directors the retention and
    termination of independent auditors; negotiating the independent
    auditors&apos; compensation; conferring with the auditors to satisfy
    committee members that the financial affairs of the Corporation are in
    order; reviewing and determining whether to accept the audit; assuring that
    any non-audit services performed by the auditing firm conform with the
    standards for auditor independence set forth in the latest revision of the
    Government Auditing Standards issued by the Comptroller General of the
    United States; and approving performance of non-audit services by the
    auditing firm. The committee shall have seven (7) members; five (5) voting,
    and two (2) non-voting. The voting members shall be three (3) students, one
    of whom shall be a student voting member of the Board and shall chair the
    committee. The two (2) non-voting members shall be the University-Student
    Union Executive Director or designee and a representative from the
    organization contracted to provide financial services to the
    University-Student Union.
    <ol>
      <li>Voting &ndash; Five (5) voting, and two (2) non&ndash;voting.</li>
      <li>
        Voting &ndash; Three (3) students, one of whom shall be a
        student&ndash;voting member of the Board and shall chair the committee.
      </li>
      <li>Liaisons &ndash; U&ndash;SU Executive Director or designee.</li>
      <li>
        Liaisons &ndash; Representative from the organization contracted to
        provide financial services to the U-SU.
      </li>
    </ol>
  </TabContent>
);

const Fiscal = () => (
  <TabContent>
    The Fiscal Committee shall recommend to the Board policies regarding fiscal
    matters, including but not limited to operations, support, review of its
    budget and budget modifications. The committee shall be responsible for all
    administrative actions under the Retirement Plans and implementing actions
    approved by the Board related to fiduciary responsibilities as required by
    law or contemplated in the U-SU&apos;s 403 (b) Plan documents (including
    annual approval of 403 (b) plan viability). The Committee shall also approve
    the annual budget process and make recommendations to the Board regarding
    the annual budget. The Committee shall have eight (8) members; five (5)
    voting, and three (3) non-voting. The voting shall include three (3)
    students, one of whom shall be a student-voting member of the Board and
    shall chair the committee. The last two voting members may be students at
    large who are regular members of Associated Students Incorporated as defined
    in Article I of the Associated Students Inc. bylaws, or any
    University-Student Union board member who is not a student. The nonvoting
    members shall be the University-Student Union Executive Director or
    designee, Chair of the Board of Directors of the University-Student Union or
    designee, and a representative from the organization contracted to provide
    financial services to the University-Student Union. If a tie occurs, the
    Chair of the Fiscal Committee will have the deciding vote.
    <ol>
      <li>Voting - Five (5) voting, two (2) non-voting.</li>
      <li>
        Voting - Three (3) students, one (1) of whom shall be a student-voting
        member of the Board and shall chair the committee.
      </li>
      <li>Liaisons - U-SU Executive Director or designee</li>
      <li>
        Liaisons - Representative from the organization contracted to provide
        financial services to the U-SU
      </li>
    </ol>
  </TabContent>
);

const Nominations = () => (
  <TabContent>
    The Nominating Committee shall interview eligible candidates and nominate a
    replacement student member to the Board. A Nominating Committee shall be
    appointed by the Board of Directors to review all qualified applicants. The
    composition of the Committee shall be up to five (5) student directors one
    of whom shall be an ASI member (if there is not an ASI member on the BOD to
    fill this position, ASI shall appoint a student committee member) and up to
    two (2) advisors and shall be Dean of Students/or designee and
    University-Student Union Executive Director.
  </TabContent>
);

const Personnel = () => (
  <TabContent>
    The Personnel Committee shall develop and recommend to the Board policies
    regarding personnel such as hiring, termination, evaluations, salaries,
    grievances, employee benefits of full and part-time staff and student
    assistants. The committee shall have nine (9) members; five (5) voting, and
    four (4) non-voting. The voting members shall be five (5) members of the
    Board, three (3) of whom shall be students. The four (4) non-voting members
    are the University-Student Union Executive Director/designee, the Chair of
    the Board of Directors of the University-Student Union, the Dean of Students
    and a representative from the organization contracted to provide Human
    Resource services to the University-Student Union. The committee shall be
    cochaired by the Chair of the Board and the Dean of Students. Voting - Five
    (5) members of the Board. One (1) shall be a student board member and will
    chair the committee. Liaisons - U-SU Executive Director or designee Liaisons
    - A representative from the organization contracted to provide Human
    Resource services to the U-SU.
  </TabContent>
);

const AdHoc = () => (
  <TabContent>
    The Board may establish ad&ndash;hoc committees at its discretion, upon the
    approval of a majority of the members present and voting. The Chair of the
    Board of Directors of the University-Student Union will assign the
    membership of an ad&ndash;hoc committee. Ad&ndash;hoc committees may make
    recommendations to the Board, but may not take action for the Board. The
    Vice&ndash;Chair or designee shall chair ad&ndash;hoc committees.
    Ad&ndash;hoc committees may incluude: Bylaws, Programs and Student Services
    (PASS), Space Allocation and Building Use (SABU), and, Retirement Plan
    committees.
  </TabContent>
);

const tabItems = [
  { title: 'Audit', children: <AuditTab /> },
  { title: 'Fiscal', children: <Fiscal /> },
  { title: 'Personnel', children: <Personnel /> },
  { title: 'Nominations', children: <Nominations /> },
  { title: 'Ad Hoc', children: <AdHoc /> },
];

export default function BoardOfDirectors() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Board of Directors</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Vote, Committees, Audit, Fiscal, Nomination."
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShadedImageHeader
        title="Board of Directors"
        backgroundImage="https://www.dropbox.com/scl/fi/82dsw2a92skpb14t1jbc1/BODGroup2_2024.jpg?rlkey=gh60f6n5b4z3y4hh5xj8qionb&st=gfn7ty85&raw=1"
        buttons={[
          {
            text: 'Meeting Schedule',
            href: 'https://www.dropbox.com/scl/fi/01d4zzbyz3s2bpqq14uqf/2024-2025-meeting-schedule.zip?rlkey=98tk7cyfh3c16xud89juth7hr&st=6upmmwc8&raw=1',
          },
          {
            text: 'Public Documents',
            href: '/board-of-directors/public-documents',
          },
          {
            text: 'Archives',
            href: '/board-of-directors/public-document-archives',
          },
        ]}
      >
        <Typography>
          The Board of Directors is the governing board for the{' '}
          <NonBreakingSpan>University-Student Union</NonBreakingSpan>,
          consisting of 8 student directors and 11
          faculty/staff/administrator/alumni members who help shape policy,
          structure and are responsible for all financial & legal
          responsibilities of running a non-profit organization. Directors are
          expected to serve on the board for one academic year
          (Fall&ndash;Spring).
        </Typography>
      </ShadedImageHeader>

      <FluidContainer padding={isDesktop ? '0 36px' : '36px 72px 0'}>
        <Typography
          as="h2"
          variant="title"
          lineHeight="1"
          margin="0 0 18px 0"
          size={isMobile ? 'lg' : '2xl'}
        >
          Student Leadership
        </Typography>
        <FluidContainer
          flex
          justifyContent="space-between"
          flexWrap="wrap"
          padding={`0 0 ${Spaces.lg} 0`}
        >
          {cards.map((props) => (
            <Card
              topBorder
              key={`${props.title}`}
              {...props}
              width={isDesktop ? '100%' : 'calc(33.33% - 24px)'}
              minHeight="280px"
              margin={`${Spaces.md} 0`}
            />
          ))}
        </FluidContainer>
        <Typography
          as="h2"
          variant="title"
          lineHeight="1"
          size={isMobile ? 'lg' : '2xl'}
          margin={isMobile ? '0 0 24px 0' : ''}
        >
          Responsibilities and Requirements
        </Typography>
        <ResponsibilitiesAndRequirements screenSize={isMobile} />
        <Typography
          as="h2"
          variant="title"
          lineHeight="1"
          size={isMobile ? 'lg' : '2xl'}
          margin={isMobile ? '0 0 24px 0' : ''}
        >
          Benefits of Serving
        </Typography>
        <BenefitsOfServing screenSize={isMobile} />
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        <IconHeading>
          <MdGroups size="48px" />
          <Typography as="h2" variant="labelTitle" margin="0px 8px">
            Committees
          </Typography>
        </IconHeading>
        <Tabs items={tabItems} minHeight="320px" />
      </FluidContainer>
      <GovernanceFooter />
    </Page>
  );
}
