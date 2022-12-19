import Head from 'next/head';
import { Header, Page } from 'modules';
import {
  FluidContainer,
  NonBreakingSpan,
  Card,
  Typography,
  Tabs,
  Divider,
} from 'components';
import { MdGroups } from 'react-icons/md';
import styled from 'styled-components';
import { Spaces } from 'theme';

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
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
    <Typography>
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
    </Typography>
  );

  const tabItems = [
    { title: 'Audit', children: <AuditTab /> },
    { title: 'Fiscal', children: 'comming soon' },
    { title: 'Nomination', children: 'comming soon' },
    { title: 'Personal', children: 'comming soon' },
  ];

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
          <Typography as="h4" variant="copyLarge">
            Committees
          </Typography>
        </IconHeading>
        <Tabs items={tabItems} minHeight="320px" />
      </FluidContainer>
      <FluidContainer innerMaxWidth="1200px" backgroundColor="greyDarkest">
        <Typography variant="title" color="white">
          The University-Student Union&apos;s Board of Directors is the
          governing board of the Union.{' '}
          <Typography as="span" variant="title" color="primary">
            Become a Student Leader
          </Typography>
        </Typography>
        <Divider color="grey" margin={`${Spaces.lg} 0 0`} />
      </FluidContainer>
    </Page>
  );
}
