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
    href: '/ccc/cultural-grads/nuestra',
  },
];
const hours = [
  {
    title: 'Office Hours',
    times: [
      'Monday - Thursday: 8:00 AM - 6:00 PM',
      'Friday: 8:00 AM - 5:00 PM',
      'Saturday - Sunday: CLOSED',
    ],
  },
];

const HeaderContainer = styled.div`
  background: url(https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-4.webp)
    no-repeat;
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
        <meta name="author" content="clsrc coordinator" key="author" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The Chicana/o Latina/o Student Resource Center (CLSRC) provides services, cultural education, and community support for Cal State LA students. Join us for Nuestra Grad."
        />
        <meta
          name="keywords"
          content="CLSRC, Chicana/o Latina/o Student Resource Center, Cal State LA, CSULA, Latinx Resources, Chicanx, Nuestra Grad, Cultural Graduation, CCC, U-SU, Student Union"
          key="keywords"
        />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Chicana/o Latina/o Student Resource Center (CLSRC) | Cal State LA"
        />
        <meta
          property="og:description"
          content="Providing support, cultural programming, and events for the Chicana/o and Latina/o community at Cal State LA."
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/ccc/clsrc"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.calstatelausu.org/departments/ccc/nuestra-teaser.jpeg"
        />
        <meta
          property="og:image:alt"
          content="Nuestra Graduation celebration at Cal State LA"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.calstatelausu.org/ccc/clsrc" />

        {/* Structured Data for Cultural Resource Center */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Chicana/o Latina/o Student Resource Center (CLSRC)',
              description:
                'An identity-based center within the Cross Cultural Centers providing academic and cultural support for the Chicana/o and Latina/o community.',
              parentOrganization: {
                '@type': 'NonprofitOrganization',
                name: 'University-Student Union at Cal State LA',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5154 State University Dr, Room 206',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
              },
              sameAs: [
                'https://www.instagram.com/clsrc.ccc/',
                'https://linktr.ee/cccatcalstatela',
              ],
            }),
          }}
        />
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
              aria-label="visit the clsrc instagram"
            />
          </a>
          <a
            href="https://linktr.ee/cccatcalstatela"
            style={{ margin: `auto ${Spaces.sm}` }}
            aria-label="visit ccc linktree"
          >
            <Image
              alt=""
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
                alt=""
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              />
            )}
            The Chicana/o Latina/o Student Resource Center (CLSRC) was founded
            in 1993. The CLSRC provides services and support for students who
            identify as, and/or any students who are interested in learning more
            about Chicana/o and/or Latina/o community and cultural issues. The
            CLSRC also develops long and short term programs and events focusing
            on issues of importance to the Chicana/o Latina/o community in the
            U.S., Central and South America, the Caribbean and worldwide.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/logos/clsrc-text-logo.svg"
              alt=""
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
          />
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
          />
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
      <FluidContainer flex justifyContent="center">
        <Typography as="h2" variant="title" size={isMobile ? 'xl' : '2xl'}>
          Open to all who are interested to participate regardless of race, sex,
          color, ethnicity, or national origin
        </Typography>
      </FluidContainer>
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt=""
            src="/departments/ccc/clsrc/clsrc-header.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
