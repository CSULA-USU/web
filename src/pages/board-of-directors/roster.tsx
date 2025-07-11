import Head from 'next/head';
import { Header, Page } from 'modules';
import { FluidContainer, Image, NonBreakingSpan, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import boardMembers from 'data/board-members.json';
import { StaffCard } from 'components/StaffCard';
import { GovernanceFooter } from 'partials';

export default function Governance() {
  const {} = useBreakpoint();
  return (
    <Page>
      <Head>
        <title>U-SU Board Members</title>
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Board of Directors, Board, Directors, Student, Leader, ASI, Representative, Chair, Alumni, President, Faculty, Apointee, Advisor, Dean"
          key="keywords"
        />
      </Head>
      <Header
        title="Meet the Board of Directors"
        backgroundImage="/backgrounds/subtle-background-3.jpg"
      >
        <Typography as="h2">
          The University-Student Union&apos;s Board of Directors is the
          governing board of the Union. The purpose of the Board is to establish
          policy for the Union as a student body center for the benefit of
          students, faculty, staff and alumni at{' '}
          <NonBreakingSpan>Cal State Los Angeles.</NonBreakingSpan>
        </Typography>
      </Header>
      <FluidContainer>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'student-representative' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                head={m.head}
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
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'pro-board-member' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                head={m.head}
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
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {boardMembers.map((m) =>
            m.section === 'advisors' ? (
              <StaffCard
                key={m.name}
                name={m.name}
                head={m.head}
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
      <FluidContainer flex justifyContent="center">
        <Image
          alt="group photo of u-su board of directors "
          src="https://www.dropbox.com/scl/fi/82dsw2a92skpb14t1jbc1/BODGroup2_2024.jpg?rlkey=gh60f6n5b4z3y4hh5xj8qionb&st=gfn7ty85&raw=1"
          width="100%"
          height="auto"
          borderRadius="12px"
        />
      </FluidContainer>
      <GovernanceFooter />
    </Page>
  );
}
