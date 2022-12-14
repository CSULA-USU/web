import Head from 'next/head';
import { Header, Page } from 'modules';
import { FluidContainer, NonBreakingSpan, Card } from 'components';

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
            key={`${props.title}`}
            {...props}
            width="calc(33.33% - 8px)"
            minHeight="280px"
          />
        ))}
      </FluidContainer>
    </Page>
  );
}
