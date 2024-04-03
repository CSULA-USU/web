import { jotformSubmissionsListState } from 'atoms';
import { useRecoilValue } from 'recoil';
import { Page } from 'modules';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { FluidContainer, SearchInput, Typography } from 'components';
import { Spaces, media } from 'theme';

const AlphabetSection = styled.div`
  margin-bottom: ${Spaces['xl']};
`;

const StyledDivider = styled.hr`
  border: 2px solid black;
  margin-bottom: ${Spaces.lg};
`;

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  ${media('desktop')(`grid-template-columns: repeat(2, 1fr);`)}
  ${media('tablet')(`grid-template-columns: repeat(1, 1fr);`)}
`;

export default function NuestraGrad() {
  const jotformSubmissions = useRecoilValue(jotformSubmissionsListState);
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  console.log('jotform blep:', jotformSubmissions);
  return (
    <Page>
      <Head>
        {/* include year in the title? */}
        <title>Nuestra Graduation</title>
        <meta
          name="author"
          content="The University Student Union Cross Cultural Centers"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA, college, Los Angeles, Student Union, Cross Cultural Centers, CCC, U-SU, University Student, Cultural Graduation, Nuestra, Chicana, Chicano, Chicanx, Latina, Latino, Latinx, Central American, South American"
        />
        <meta
          name="description"
          content="Look back into Cal State LA's Nuestra Graduation. These celebrations are great opportunities to acknowledge your academic achievements, honor your families, communities, and other significant people in your lives, and to celebrate the cultural influences that have contributed to your academic success. The celebrations are open to all students who would like to sign up and participate. You deserve to celebrate your achievements with cultural influences that are integral to your being and important to you and your community! Apply now!"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer flex justifyContent="center" backgroundColor="primary">
        <Image
          alt="Cross Cultural Centers Cultural Grads Banner"
          src="/departments/ccc/ccc-grad-banner.jpg"
          width={0}
          height={0}
          sizes="100vh"
          style={{ height: '30%', width: 'auto' }}
        />
      </FluidContainer>
      <FluidContainer>
        <SearchInput />
      </FluidContainer>
      <FluidContainer>
        {alphabets.split('').map((alphabet, i) => {
          const filteredSubmissions =
            jotformSubmissions &&
            jotformSubmissions.filter(
              (person: any) =>
                person.name.first.slice(0, 1).toUpperCase() === alphabet,
            );
          if (filteredSubmissions.length > 0) {
            return (
              <AlphabetSection key={i}>
                <Typography key={i} as="h1" variant="title">
                  {alphabet}
                </Typography>
                <StyledDivider />
                <NameGrid>
                  {filteredSubmissions &&
                    filteredSubmissions.map((submission: any, j: number) => (
                      <Typography key={j}>hi</Typography>
                    ))}
                </NameGrid>
              </AlphabetSection>
            );
          }
        })}
      </FluidContainer>
    </Page>
  );
}
