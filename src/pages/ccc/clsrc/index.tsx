import Head from 'next/head';
import styled from 'styled-components';
import { Header, OfficeHours, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const buttons = [
  {
    text: '2024 Grad',
    href: 'ccc/cultural-grads/nuestra',
  },
];
const hours = [
  {
    title: 'Office Hours',
    times: [
      'Monday - Thursday: 8:30 AM - 7:00 PM',
      'Friday: 8:30 AM - 4:00 PM',
    ],
  },
];

const HeaderContainer = styled.div`
  background: url(/backgrounds/subtle-background-4.jpg) no-repeat;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.xl};
`;

export default function CLSRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU CLSRC</title>
        <meta name="author" content="clsrc coordinator" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers the chicana chicano chicanx latina latino latinx student resource center resource ccc u-su university-student"
        />
        <meta
          name="description"
          content="The Chicana/o Latina/o Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/clsrc.ccc/"
            aria-label="link to the Chicano/a, Latino/a Student Resource Center's Instagram feed"
          >
            <AiOutlineInstagram
              fontSize={FontSizes['2xl']}
              aria-label="apisrc instagram icon"
            />
          </a>
          <a
            href="https://linktr.ee/cccatcalstatela"
            style={{ margin: `auto ${Spaces.sm}` }}
          >
            <Image
              alt="linktree icon"
              src="/departments/logos/linktree.svg"
              height="29px"
              width="32px"
            />
          </a>
        </FluidContainer>
        <HeaderLeftContainer>
          <Header
            title="Chicana/o Latina/o Student Resource Center"
            buttons={buttons}
          >
            {isDesktop && (
              <Image
                src="/departments/logos/clsrc-text-logo.svg"
                alt="clsrc logo"
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              />
            )}
            The Chicana/o Latina/o Student Resource Center (CLSRC) was founded
            in 1993. The CLSRC provides services and support for students who
            identify as, or are interested in, Chicana/o and/or Latina/o
            community and cultural issues. The CLSRC also develops long and
            short term programs and events focusing on issues of importance to
            the Chicana/o Latina/o community in the U.S., Central and South
            America, the Caribbean and worldwide.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/logos/clsrc-text-logo.svg"
              alt="clsrc logo"
              width={400}
              height={500}
            />
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5047"
            hours={hours}
          ></OfficeHours>
        </FluidContainer>
      </HeaderContainer>
      <div id="nuestra-grad">
        <FluidContainer
          flex
          flexWrap={isTablet ? 'wrap' : 'nowrap'}
          backgroundColor="primary"
        >
          <Image
            margin="auto"
            borderRadius="12px"
            src="/departments/ccc/nuestra-teaser.jpeg"
            alt="2022 nuestra graduation"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          ></Image>
          <FluidContainer>
            <Typography variant="title" size={isMobile ? 'xl' : '2xl'} as="h2">
              Nuestra Grad
            </Typography>
            <Typography margin="24px 0">
              These ceremonies and celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. The ceremonies are open to all students who
              would like to sign up and participate.
            </Typography>
            <Button variant="black" href={'/ccc/cultural-grads'}>
              Learn More
            </Button>
          </FluidContainer>
        </FluidContainer>
      </div>
      <InstagramFeed department="clsrc" />
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt="chicana chicano latina latino student resource center logo"
            src="/departments/ccc/clsrc/clsrc-header.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
