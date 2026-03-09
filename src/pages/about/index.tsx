import Head from 'next/head';
import { Page } from 'modules';
import {
  Button,
  Card,
  FluidContainer,
  Image,
  NonBreakingSpan,
  Typography,
} from 'components';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

import cards from 'data/about.json';

const ButtonContainer = styled.div`
  margin-top: ${Spaces['sm']};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ./ > *:not(:last-child) {
    margin-right: 8px;
  }
  column-gap: ${Spaces.md};
  row-gap: ${Spaces.md};
`;

// const ImageContainer = styled.div`
//   position: relative;
//   width: 100%;
//   padding-bottom: 128.5%;
//   overflow: hidden;
// `;

export default function About() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>About The U&ndash;SU</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="author"
          content="University-Student Union at Cal State LA"
        />
        <meta
          name="description"
          content="Established in 1975, the U-SU is Cal State LA's hub for connection and growth. Explore our mission, values, organizational chart, and strategic plan for student success."
        />
        <meta
          name="keywords"
          content="About Cal State LA Student Union, U-SU Mission, U-SU Values, Cal State LA Non-Discrimination Policy, Student Union Strategic Plan, Golden Eagles Hub, CSU Los Angeles Student Life"
          key="keywords"
        />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="About the U-SU: Cal State LA's Hub for Connection"
        />
        <meta
          property="og:description"
          content="With open doors and minds, we provide space and opportunities enabling Golden Eagles to soar. Learn about our vision and core values."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.calstatelausu.org/about" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
        />
        <meta
          property="og:image:alt"
          content="The Cal State LA University-Student Union Building"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.calstatelausu.org/about" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'University-Student Union at Cal State LA',
              url: 'https://www.calstatelausu.org',
              logo: 'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/brand/usu_logo_white.webp',
              foundingDate: '1975',
              description:
                'The U-SU provides social, cultural, and recreational programming for California State University, Los Angeles.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5151 State University Dr',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </Head>
      <FluidContainer
        flex
        justifyContent="center"
        backgroundImage="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-2.webp"
      >
        {isTablet || isMobile ? (
          <>
            <FluidContainer>
              <Typography
                as="h1"
                variant="pageHeader"
                size={isTablet ? '4xl' : '5xl'}
                lineHeight="1.3"
                style={{ textAlign: 'center' }}
              >
                We are <NonBreakingSpan>the U&ndash;SU</NonBreakingSpan>
              </Typography>

              <FluidContainer flex justifyContent="center" alignItems="center">
                <Image
                  alt="student union"
                  src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                  style={{ width: '100%', height: '100%' }}
                />
              </FluidContainer>
              <ButtonContainer>
                <Button
                  variant="black"
                  href="https://www.dropbox.com/scl/fi/ilqryvwvq5fgrxn1jwjvt/Org-Chart_9.17.25.jpg?rlkey=o2w6m4cmqj2vskvn8fy36iljp&st=m7xnxsft&raw=1"
                  isExternalLink
                >
                  U&ndash;SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                  isExternalLink
                >
                  Strategic Plan
                </Button>
              </ButtonContainer>
            </FluidContainer>
          </>
        ) : (
          <>
            <FluidContainer
              flex
              justifyContent="center"
              alignItems="center"
              padding="0"
            >
              <Image
                alt="student union"
                src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/calstatela-hero.jpg"
                style={{ width: '100%', height: 'auto' }}
              />
            </FluidContainer>

            <FluidContainer padding="18px 0px 18px 18px">
              <FluidContainer>
                <Typography
                  as="h1"
                  variant="pageHeader"
                  size={isDesktop ? '4xl' : '5xl'}
                  lineHeight="1.3"
                  style={{ textAlign: 'center' }}
                >
                  We are <NonBreakingSpan>the U&ndash;SU</NonBreakingSpan>
                </Typography>
              </FluidContainer>

              <ButtonContainer>
                <Button
                  variant="black"
                  href="https://www.dropbox.com/scl/fi/ilqryvwvq5fgrxn1jwjvt/Org-Chart_9.17.25.jpg?rlkey=o2w6m4cmqj2vskvn8fy36iljp&st=m7xnxsft&raw=1"
                  isExternalLink
                >
                  U&ndash;SU Organizational Chart
                </Button>
                <Button
                  variant="outline"
                  href="https://www.dropbox.com/scl/fi/mhz4o8qwrgoc5fs1913pa/strategic-plan-2024.pdf?rlkey=0lqvmafy11699jekjtgru89lg&raw=1"
                  isExternalLink
                >
                  Strategic Plan
                </Button>
              </ButtonContainer>
            </FluidContainer>
          </>
        )}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection={isMobile ? 'column' : 'row'}
        backgroundColor="primary"
        padding="0"
      >
        <FluidContainer>
          <Typography
            variant="pageHeader"
            as="span"
            size={isDesktop ? 'lg' : 'xl'}
            lineHeight="1.5"
          >
            With open doors and minds, we provide space and opportunities,
            enabling Golden Eagles to soar. Our vision is to become Cal State
            LA&apos;s hub for connection and growth.
          </Typography>
        </FluidContainer>
        <FluidContainer>
          <Typography
            variant="pageHeader"
            color="greyDarkest"
            as="p"
            size={isDesktop ? 'sm' : 'md'}
            lineHeight="1.5"
          >
            The University-Student Union, or U-SU for short, is a great one-stop
            location for students eager to learn about what&apos;s happening on
            campus, collect student discounts or get involved. It is the
            headquarters for the Alumni Center, student government (Associated
            Students Incorporated) and campus organizations and clubs.
          </Typography>
        </FluidContainer>
      </FluidContainer>

      <FluidContainer>
        <Typography variant="title" as="h2" margin="48px 0 0 0 ">
          Values
        </Typography>
      </FluidContainer>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {cards.map((props) => (
          <Card
            key={props.title}
            {...props}
            width={isDesktop ? '100%' : 'calc(33.33% - 24px)'}
            topBorder
            margin="16px 8px"
            iconWidth="112px"
          />
        ))}
      </FluidContainer>
      {/* <FluidContainer>
        <Title>
          <Typography variant="title" as="h2">
            Map
          </Typography>
        </Title>
        <ImageContainer>
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/about/USU-Floor-Plan-Inside.jpg"
            alt="map of the university student union"
            maxWidth="100%"
            style={{ position: 'absolute' }}
          />
        </ImageContainer>
      </FluidContainer> */}
      <InstagramFeed department="usu" />
      <FluidContainer>
        <Typography variant="title" as="h2">
          University Non&ndash;Discrimination Policy
        </Typography>
        <Typography margin={`0 0 Spaces.md`}>
          All university programs and activities are open and available to all
          regardless of race, sex, color, ethnicity or national origin.
          Consistent with California law and federal civil rights laws, the
          California State University, Los Angeles provides equal opportunity in
          education and employment without unlawful discrimination or
          preferential treatment based on race, sex, color, ethnicity, or
          national origin. Our commitment to equal opportunity means ensuring
          that every student and employee has access to the resources and
          support they need to thrive and succeed in a university environment
          and in their communities. The California State University, Los Angeles
          complies with Title VI of the Civil Rights Act of 1964, Title IX of
          the Education Amendments of 1972, the Americans with Disabilities Act
          (ADA), Section 504 of the Rehabilitation Act, the California Equity in
          Higher Education Act, California&apos;s Proposition 209 (Art. I,
          Section 31 of the California Constitution), other applicable state and
          federal anti-discrimination laws, and CSU&apos;s Nondiscrimination
          Policy. We prohibit discriminatory preferential treatment, segregation
          based on race or any other protected status, and all forms of
          discrimination, harassment, and retaliation in all university
          programs, policies, and practices.
        </Typography>
        <Typography>
          The California State University, Los Angeles is a diverse community of
          individuals who represent many perspectives, beliefs and identities,
          committed to fostering an inclusive, respectful, and intellectually
          vibrant environment. We cultivate a culture of open dialogue, mutual
          respect, and belonging to support educational excellence and student
          success. Through academic programs, student organizations and
          activities, faculty initiatives, and community partnerships, we
          encourage meaningful engagement with diverse perspectives. As a higher
          education institution, we are dedicated to advancing knowledge and
          empowering individuals to reach their full potential by prioritizing
          inclusive curriculum development, faculty and staff training, student
          mentorship, and comprehensive support programs. At California State
          University, Los Angeles, excellence is built on merit, talent,
          diversity, accessibility, and equal opportunity for all.
        </Typography>
      </FluidContainer>
    </Page>
  );
}
