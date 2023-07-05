import Head from 'next/head';
import { Header, Page } from 'modules';
import { FluidContainer, NonBreakingSpan, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import boardMembers from 'data/board-members.json';
import { StaffCard } from 'components/StaffCard';
import { GovernanceFooter } from 'partials';

export default function Governance() {
  const { isMobile } = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U-SU Board Members</title>
        <meta name="author" content="The University Student Union" />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Representative, Chair, Alumni, President, Faculty, Apointee, Advisor, Dean"
        />
        <meta
          name="description"
          content="The University-Student Union inc. (U-SU) at California State University, Los Angeles, was established in 1975. With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. We accomplish this by encouraging social, cultural, recreational, and educational programming for the University and broader community. We foster a vibrant and equitable campus climate. Our vision is to be Cal State LA’s hub for connection and growth."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title="Meet the Board  Members"
        backgroundImage="/backgrounds/subtle-background-3.jpg"
      >
        The University-Student Union&apos;s Board of Directors is the governing
        board of the Union. The purpose of the Board is to establish policy for
        the Union as a student body center for the benefit of students, faculty,
        staff and alumni at
        <NonBreakingSpan>Cal State Los Angeles.</NonBreakingSpan>
      </Header>
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Student Representatives
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'student-representative' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                title={m.title}
                src={m.src}
                alt={`Photo of ${m.name}, ${m.title}`}
                width="calc(22%)"
                margin="24px 16px"
                rounded
              >
                <Typography>{m.credentials}</Typography>
              </StaffCard>
            ) : (
              ''
            ),
          )}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Pro Board Members
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'pro-board-member' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                title={m.title}
                src={m.src}
                alt={`Photo of ${m.name}, ${m.title}`}
                width="calc(22%)"
                margin="24px 16px"
                rounded
              >
                <Typography>{m.credentials}</Typography>
              </StaffCard>
            ) : (
              ''
            ),
          )}
        </FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Advisors
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'advisors' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                title={m.title}
                src={m.src}
                alt={`Photo of ${m.name}, ${m.title}`}
                width="calc(22%)"
                margin="24px 16px"
                rounded
              >
                <Typography>{m.credentials}</Typography>
              </StaffCard>
            ) : (
              ''
            ),
          )}
        </FluidContainer>
      </FluidContainer>
      <GovernanceFooter />
    </Page>
  );
}
