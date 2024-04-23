import { Page } from 'modules';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { CGCParticipantModal } from 'modules';
import { Spaces, media } from 'theme';
import { useRouter } from 'next/router';
import { fetchJotform } from 'api';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Graduate } from 'types';
import { useBreakpoint } from 'hooks';

const AlphabetSection = styled.div`
  margin-bottom: ${Spaces['xl']};
`;

const StyledDivider = styled.hr`
  border: 2px solid black;
  margin-bottom: ${Spaces.lg};
`;

const NameGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.input.attrs({ type: 'text' })`
  ${media('mobile')('width: 80%')};
  width: 50%;
  height: 30%;
  text-align: center;
  border-radius: 40px;
  padding: 12px 24px;
  font-size: 16px;
`;

export default function CGCGrad() {
  const router = useRouter();
  const { id } = router.query;
  const [jotformSubmissions, setJotformSubmissions] = useState<Graduate[]>([]);
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [searchInput, setSearchInput] = useState<string>('');
  const { isMobile } = useBreakpoint();

  let searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const getJotformSubmissions = useCallback(async () => {
    setJotformSubmissions(await fetchJotform(id));
  }, [id]);

  useEffect(() => {
    getJotformSubmissions();
  }, [getJotformSubmissions]);

  return (
    <Page>
      <Head>
        <title>Cultural Graduation</title>
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
        <meta
          name="image"
          property="og:image"
          content="/departments/ccc/ccc-grad-banner.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FluidContainer
        flex
        justifyContent="center"
        backgroundColor={id === 'apida' ? 'white' : 'primary'}
      >
        <Image
          alt="Cross Cultural Centers Cultural Grads Banner"
          src={
            id === 'apida'
              ? '/departments/ccc/apidaGrad_WebsiteCover-2024.png'
              : '/departments/ccc/ccc-grad-banner.jpg'
          }
          width={0}
          height={0}
          sizes="100vh"
          style={{
            height: isMobile ? 'auto' : '80%',
            width: isMobile ? '100%' : 'auto',
          }}
        />
      </FluidContainer>
      <FluidContainer flex justifyContent="center">
        <SearchBar
          placeholder="Enter Graduate's Name"
          onChange={searchInputHandler}
        />
      </FluidContainer>
      <FluidContainer padding="0 16px">
        {alphabets.split('').map((alphabet, i) => {
          const filteredSubmissions =
            Array.isArray(jotformSubmissions) &&
            jotformSubmissions
              .filter((submissions) =>
                submissions.fullName.pretty.toLowerCase().includes(searchInput),
              )
              .filter(
                (person: any) =>
                  person.fullName.firstName.slice(0, 1).toUpperCase() ===
                  alphabet,
              );
          if (filteredSubmissions && filteredSubmissions.length > 0) {
            return (
              <AlphabetSection key={i}>
                <Typography
                  key={i}
                  as="h1"
                  variant="span"
                  size="xl"
                  margin="0 0 8px 0"
                >
                  {alphabet}
                </Typography>
                <StyledDivider />
                <NameGrid>
                  {filteredSubmissions &&
                    filteredSubmissions
                      .sort(function (a: any, b: any) {
                        if (
                          a.fullName.firstName +
                            a.fullName.middleName +
                            a.fullName.lastName <
                          b.fullName.firstName +
                            b.fullName.middleName +
                            b.fullName.lastName
                        ) {
                          return -1;
                        }
                        if (
                          a.fullName.firstName +
                            a.fullName.middleName +
                            a.fullName.lastName <
                          b.fullName.firstName +
                            b.fullName.middleName +
                            b.fullName.lastName
                        ) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((submission: any, j: number) => (
                        <CGCParticipantModal
                          participantData={submission}
                          key={j}
                        />
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
