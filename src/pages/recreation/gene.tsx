import Head from 'next/head';
import styled from 'styled-components';
import { Page, Header } from 'modules';
import { Spaces } from 'theme';
import {
  Button,
  Card,
  FluidContainer,
  Icon,
  Image,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import data from 'data/recreation.json';
import React from 'react';

const WelcomeContentContainer = styled.div`
  max-width: 760px;
  text-align: center;
`;

const buttons = [
  {
    text: 'Program Portfolio',
    href: 'https://www.dropbox.com/scl/fi/umgxniy3fxfocj60vmxja/ACHA_Poster_Final_5.31.22.pdf?rlkey=hel3lzj55v8tuzao50fvu66y1&raw=1',
  },
];

export default function Gene() {
  const { isDesktop, isMobile, isWidescreen } = useBreakpoint();
  const geneData = data.gene;

  return (
    <Page>
      <Head>
        <title>Nutrition Education (GENE)</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Sign up for personalized nutrition coaching with Cal State LA GENE. Work with Nutritional Science graduate students to build healthy habits and mindfulness."
          key="description"
        />
        <meta name="author" content="Recreation" key="author" />
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Golden Eagle Nutrition Education (GENE) | Cal State LA"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Your partner in change. Get personalized feedback and encouragement from nutrition coaches to foster lifelong well-being."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/recreation/gene"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/gene/gene-header.webp"
          key="og-image"
        />
        <meta
          property="og:image:alt"
          content="Student utilizing GENE nutrition services at Cal State LA"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Golden Eagle Nutrition Education (GENE) | Cal State LA"
        />
        <meta
          name="twitter:description"
          content="Your partner in change. Get free, personalized nutrition coaching from Cal State LA graduate students. Start building healthy habits today!"
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/gene/gene-header.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Student utilizing GENE nutrition coaching services at Cal State LA"
        />

        <link
          rel="canonical"
          href="https://www.calstatelausu.org/recreation/gene"
        />

        {/* Structured Data for Coaching Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Nutrition Education and Coaching',
              provider: {
                '@type': 'EducationalOrganization',
                name: 'Golden Eagle Nutrition Education (GENE)',
                parentOrganization: {
                  '@type': 'NonprofitOrganization',
                  name: 'University-Student Union at Cal State LA',
                },
              },
              areaServed: {
                '@type': 'CollegeOrUniversity',
                name: 'California State University, Los Angeles',
              },
              description:
                'Personalized nutrition education sessions provided by Cal State LA Nutritional Science graduate students focusing on habit change and mindfulness.',
              offers: {
                '@type': 'Offer',
                price: '0.00',
                priceCurrency: 'USD',
                description:
                  'Free for Cal State LA students, staff, and faculty',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Friday',
                  opens: '08:00',
                  closes: '17:00',
                },
              ],
            }),
          }}
        />
      </Head>
      <FluidContainer flex flexDirection="row" padding="0px">
        <Header
          title="Golden Eagle Nutrition Education (GENE)"
          buttons={buttons}
        >
          {isDesktop && isMobile && (
            <Image
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/gene/gene-header.webp"
              alt="young man using gene services"
              height="232px"
              margin="0px auto"
            />
          )}
          <Typography as="p">
            At GENE, we believe we all can benefit from learning new skills and
            receiving support to live our best lives. We are your partner in
            change and want to support you in fostering new possibilities and
            discovering habits of well&ndash;being that will last a lifetime.
          </Typography>
        </Header>
        {!isDesktop && (
          // desktop
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/gene/gene-header.webp"
            alt="young man using gene services"
            height="500px"
            margin="auto"
          />
        )}
        {!isMobile && isDesktop && (
          // mobile
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/recreation/gene/gene-header.webp"
            alt="a young man using gene services eating an apple"
            height="250px"
            margin="auto"
          />
        )}
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        innerMinHeight="200px"
        backgroundColor="primary"
      >
        <Typography margin="auto" variant="title" as="h2">
          Welcome!
        </Typography>
        <WelcomeContentContainer>
          <Typography as="p" margin="12px 0">
            Welcome to the Golden Eagle Nutrition Education (GENE) program!
            Here, you can sign up for personalized nutrition education sessions
            provided by our Cal State LA Nutritional Science students. Our
            student coaches can teach you everything you need to know about
            nutrition, plus the science of mindfulness and habit change. Think
            of your nutrition coach as a supportive mentor who can offer
            individual feedback and encouragement as you make food and lifestyle
            changes.
          </Typography>
        </WelcomeContentContainer>
        <Button
          variant="black"
          href="https://forms.office.com/r/V7u5KxzAGs"
          isExternalLink
        >
          RSVP
        </Button>
      </FluidContainer>
      <FluidContainer>
        <Typography variant="title" as="h2">
          <abbr title="gene">GENE</abbr> Bios Spring 2026:
        </Typography>
        <Typography as="p" margin="8px 0px 0px 0px">
          Our <abbr title="gene">GENE</abbr> coaches are all working to finish
          their Masters&apos; of Science in Nutrition here at Cal State LA.
        </Typography>
        <FluidContainer flex flexWrap="wrap" justifyContent="center">
          {geneData.educators.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.iconAlt}`}
              {...props}
              width={isWidescreen ? '100%' : 'calc(48% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
              iconElement={<Icon iconName={`${props.iconName}`} size="50px" />}
            />
          ))}
        </FluidContainer>
      </FluidContainer>
      <FluidContainer>
        <Typography variant="title" as="h2" margin="0px">
          What to expect:
        </Typography>
        <FluidContainer flex flexWrap="wrap">
          {geneData.cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              key={`${props.title}`}
              {...props}
              width={isDesktop ? '100%' : 'calc(30.33% - 8px)'}
              minHeight="200px"
              iconWidth="100px"
            />
          ))}
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
