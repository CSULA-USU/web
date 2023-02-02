import Head from 'next/head';
import { Header, Page } from 'modules';
import {
  FluidContainer,
  NonBreakingSpan,
  Card,
  Typography,
  Tabs,
  Button,
} from 'components';
import { MdGroups } from 'react-icons/md';
import styled from 'styled-components';
import { Spaces } from 'theme';
import { AiOutlineFileText } from 'react-icons/ai';
import { GovernanceFooter } from 'partials';

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
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
export default function Governance() {
  const buttons = [
    {
      text: 'Meet the Board of Directors',
      href: 'governance/board-of-directors',
    },
    { text: 'Be a Student Leader', href: 'governance/student-leaders' },
  ];

  const cards = [
    {
      title: 'Elections',
      children:
        "The University-Student Union's Board of Directors is the governing board of the Union.",
      linkText: 'Learn More',
      href: '#',
    },
    {
      title: 'Student Leadership',
      children:
        "The University-Student Union's Board of Directors is the governing board of the Union.",
      linkText: 'Learn More',
      href: '#',
    },
    {
      title: 'Learn How to Vote',
      children:
        'The University-Student Union Board of Directors is the governing board for the Student Union comprised of faculty, staff, and eight elected student leaders.',
      linkText: 'Learn More',
      href: '#',
    },
  ];

  const AuditTab = () => (
    <TabContent>
      The Audit Committee recommends to the Board of Directors the retention and
      termination of independent auditors; negotiating the independent
      auditors&apos; compensation; conferring with the auditors to satisfy
      committee members that the financial affairs of the Corporation are in
      order; reviewing and determining whether to accept the audit; assuring
      that any non-audit services performed by the auditing firm conform with
      the standards for auditor independence set forth in the latest revision of
      the Government Auditing Standards issued by the Comptroller General of the
      United States; and approving performance of non-audit services by the
      auditing firm. The committee shall have seven (7) members; five (5)
      voting, and two (2) non-voting. The voting members shall be three (3)
      students, one of whom shall be a student voting member of the Board and
      shall chair the committee. The two (2) non-voting members shall be the
      University-Student Union Executive Director or designee and a
      representative from the organization contracted to provide financial
      services to the University-Student Union.
      <ol>
        <li>Voting - Five (5) voting, and two (2) non-voting.</li>
        <li>
          Voting - Three (3) students, one of whom shall be a student-voting
          member of the Board and shall chair the committee.
        </li>
        <li>Liaisons - U-SU Executive Director or designee.</li>
        <li>
          Liaisons - Representative from the organization contracted to provide
          financial services to the U-SU.
        </li>
      </ol>
    </TabContent>
  );
  const Fiscal = () => (
    <TabContent>
      The Fiscal Committee shall recommend to the Board policies regarding
      fiscal matters, including but not limited to operations, support, review
      of its budget and budget modifications. The committee shall be responsible
      for alladministrative actions under the Retirement Plans and implementing
      actions approved by the Board related to fiduciary responsibilities as
      required by law or contemplated in the U-SU&apos;s 403 (b) Plan documents
      (including annual approval of 403 (b) plan viability). The Committee shall
      also approve the annual budget process and make recommendations to the
      Board regarding the annual budget. The Committee shall have eight (8)
      members; five (5) voting, and three (3) non-voting. The voting shall
      include three (3) students, one of whom shall be a student-voting member
      of the Board and shall chair the committee. The last two voting members
      may be students at large who are regular members of Associated Students
      Incorporated as defined in Article I of the Associated Students Inc.
      bylaws, or any University- Student Union board member who is not a
      student. The nonvoting members shall be the University-Student Union
      Executive Director or designee, Chair of the Board of Directors of the
      University-Student Union or designee, and a representative from the
      organization contracted to provide financial services to the
      University-Student Union. If a tie occurs, the Chair of the Fiscal
      Committee will have the deciding vote.
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
  const Nomination = () => (
    <TabContent>
      The Nominating Committee shall interview eligible candidates and nominate
      a replacement student member to the Board. A Nominating Committee shall be
      appointed by the Board of Directors to review all qualified applicants.
      The composition of the Committee shall be up to five (5) student directors
      one of whom shall be an ASI member (if there is not an ASI member on the
      BOD to fill this position, ASI shall appoint a student committee member)
      and up to two (2) advisors and shall be Dean of Students/or designee and
      University-Student Union Executive Director.
    </TabContent>
  );
  const Personnel = () => (
    <TabContent>
      The Personnel Committee shall develop and recommend to the Board policies
      regarding personnel such as hiring, termination, evaluations, salaries,
      grievances, employee benefits of full and part-time staff and student
      assistants. The committee shall have nine (9) members; five (5) voting,
      and four (4) non-voting. The voting members shall be five (5) members of
      the Board, three (3) of whom shall be students. The four (4) non-voting
      members are the University-Student Union Executive Director/designee, the
      Chair of the Board of Directors of the University-Student Union, the Dean
      of Students and a representative from the organization contracted to
      provide Human Resource services to the University-Student Union. The
      committee shall be cochaired by the Chair of the Board and the Dean of
      Students. Voting - Five (5) members of the Board. One (1) shall be a
      student board member and will chair the committee. Liaisons - U-SU
      Executive Director or designee Liaisons - A representative from the
      organization contracted to provide Human Resource services to the U-SU.
    </TabContent>
  );

  const tabItems = [
    { title: 'Audit', children: <AuditTab /> },
    { title: 'Fiscal', children: <Fiscal /> },
    { title: 'Nomination', children: <Nomination /> },
    { title: 'Personnel', children: <Personnel /> },
  ];

  const LinkInner = styled.div`
    display: flex;
    align-items: center;
    padding: ${Spaces.md};
    svg {
      margin-right: ${Spaces.sm};
    }
  `;

  return (
    <Page>
      <Head>
        <title>University-Student Union</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, student, leader, asi "
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Governance"
        buttons={buttons}
        backgroundImage="/subtle-background-2.jpg"
        extra={
          <Button variant="outline" href="/governance/public-documents">
            <LinkInner>
              <AiOutlineFileText size="24px" /> Public Documents
            </LinkInner>
          </Button>
        }
      >
        The University-Student Union&apos;s Board of Directors is the governing
        board of the Union. The purpose of the Board is to establish policy for
        the Union as a student body center for the benefit of students, faculty,
        staff and alumni at{' '}
        <NonBreakingSpan>Cal State Los Angeles</NonBreakingSpan>.
      </Header>
      <FluidContainer flex justifyContent="space-between">
        {cards.map((props) => (
          <Card
            topBorder
            key={`${props.title}`}
            {...props}
            width="calc(33.33% - 8px)"
            minHeight="280px"
          />
        ))}
      </FluidContainer>
      <FluidContainer backgroundColor="greyLightest">
        <IconHeading>
          <MdGroups size="48px" />
          <Typography as="h4" variant="labelTitle">
            Committees
          </Typography>
        </IconHeading>
        <Tabs items={tabItems} minHeight="320px" />
      </FluidContainer>
      <GovernanceFooter />
    </Page>
  );
}
