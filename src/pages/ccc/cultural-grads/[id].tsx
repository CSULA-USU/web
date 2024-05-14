import { Page } from 'modules';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { Button, FluidContainer, Loading, Typography } from 'components';
import { CGCParticipantModal } from 'modules';
import { Colors, Spaces, media } from 'theme';
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
  const [loading, isLoading] = useState(true);
  const { isMobile } = useBreakpoint();
  let headerBackgroundColor: keyof typeof Colors = 'primary';
  let headerImageSrc: any = '';
  switch (id) {
    case 'nuestra':
      if (isMobile) {
        headerImageSrc = 'https://i.imgur.com/nvCMyv0.png';
      } else {
        headerImageSrc =
          'https://www.dropbox.com/scl/fi/5ptmdnrwf99d9auip3z5d/Nuestra_Web-01.png?rlkey=cy38xeqq0tubgtlsxj5iofozn&raw=1';
      }
      headerBackgroundColor = 'nuestraOrange';
      break;
    case 'apida':
      if (isMobile) {
        headerImageSrc = 'https://i.imgur.com/XfoLHSR.png';
      } else {
        headerImageSrc = '/departments/ccc/apidaGrad_WebsiteCover-2024.png';
      }
      headerBackgroundColor = 'white';
      break;
    case 'pride':
      if (isMobile) {
        headerImageSrc = 'https://i.imgur.com/88rCUGJ.png';
      } else {
        headerImageSrc = 'https://i.imgur.com/2Xo1BhW.png';
      }
      headerBackgroundColor = 'white';
      break;
    case 'black':
      if (isMobile) {
        headerImageSrc =
          '/departments/ccc/pasrc/black-grad/2024/blackgrad-mobile.svg';
      } else {
        headerImageSrc =
          '/departments/ccc/pasrc/black-grad/2024/blackgrad-desktop.svg';
      }
      headerBackgroundColor = 'blackMauve';
      break;
    default:
      headerImageSrc = '/departments/ccc/ccc-grad-banner.jpg';
  }

  let searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const getJotformSubmissions = useCallback(async () => {
    if (!id) {
      return;
    }
    setJotformSubmissions(await fetchJotform(id));
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);
      await getJotformSubmissions();
      isLoading(false);
    };
    fetchData();
  }, [getJotformSubmissions]);

  return (
    <Page>
      <Head>
        <title>Cultural Graduation Celebration</title>
        <meta
          name="author"
          content="The University Student Union Cross Cultural Centers"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA, college, Los Angeles, Student Union, Cross Cultural Centers, CCC, U-SU, University Student, Cultural Graduation, Nuestra, Chicana, Chicano, Chicanx, Latina, Latino, Latinx, Central American, South American, APIDA, Asian, Pacific Islander, South Asian, Desi-American, Black, African American, Pan-African Diaspora, Native, American Indian, Alaska Native, Native Hawaiian, Indigenous, Pride, Lesbian, Gay, Bisexual, Trans, Queer, Intersex, Asexual"
        />
        <meta
          name="description"
          content="Look back into Cal State LA's Cultural Graduations. These celebrations are great opportunities to acknowledge your academic achievements, honor your families, communities, and other significant people in your lives, and to celebrate the cultural influences that have contributed to your academic success. The celebrations are open to all students who would like to sign up and participate. You deserve to celebrate your achievements with cultural influences that are integral to your being and important to you and your community! Apply now!"
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
        backgroundColor={headerBackgroundColor}
      >
        <Image
          alt="Cross Cultural Centers Cultural Grads Banner"
          src={headerImageSrc}
          width={0}
          height={0}
          sizes="100vh"
          style={{
            height: isMobile ? 'auto' : '80%',
            width: isMobile ? '100%' : 'auto',
          }}
          priority
        />
      </FluidContainer>
      {loading ? (
        <Loading load={loading} />
      ) : (
        <>
          {jotformSubmissions.length != 0 ? (
            <>
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
                        submissions.fullName.pretty
                          .toLowerCase()
                          .includes(searchInput),
                      )
                      .filter(
                        (person: any) =>
                          person.fullName.firstName
                            .slice(0, 1)
                            .toUpperCase() === alphabet,
                      );

                  return filteredSubmissions &&
                    filteredSubmissions.length == 0 ? (
                    <>
                      {/* <FluidContainer flex justifyContent="center">
                        <Typography>No Matching Names</Typography>
                      </FluidContainer> */}
                    </>
                  ) : (
                    <>
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
                    </>
                  );
                })}
              </FluidContainer>
            </>
          ) : (
            <FluidContainer>
              <FluidContainer flex justifyContent="center">
                <Typography as="h1" variant="title">
                  OOPS! We can&apos;t find the page you&apos;re looking for.
                </Typography>
              </FluidContainer>
              <FluidContainer flex justifyContent="center" padding="0">
                <Image
                  src="https://media.giphy.com/media/hqOIyGbkgZoQB7h3Pd/giphy.gif"
                  alt="Eddie trying to figure out what you were looking for"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '50%', height: 'auto' }}
                />
              </FluidContainer>
              <FluidContainer
                flex
                justifyContent="space-around"
                alignItems="center"
              >
                <Typography as="h2" variant="subheader">
                  Did you mean:
                </Typography>
                <Button href="/ccc/cultural-grads/apida">APIDA</Button>
                <Button href="/ccc/cultural-grads/black">Black</Button>
                <Button href="/ccc/cultural-grads/native">Native</Button>
                <Button href="/ccc/cultural-grads/nuestra">Nuestra</Button>
                <Button href="/ccc/cultural-grads/pride">Pride</Button>
              </FluidContainer>
            </FluidContainer>
          )}
        </>
      )}
    </Page>
  );
}
