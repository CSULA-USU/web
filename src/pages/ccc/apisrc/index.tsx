import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaDiscord, FaTiktok } from 'react-icons/fa';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const buttons = [
  {
    text: 'Volunteer',
    href: 'https://forms.office.com/r/UQGaQbrSbW',
  },
  {
    text: '2024 Grad',
    href: '/ccc/cultural-grads/apida',
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

const offerings = [
  {
    title: 'Cultural Education',
    children:
      'Provide scholarly and cultural education programs. Approaching cultural diversity from an academic perspective that provides the entire campus community with an opportunity to culturally engage and learn outside of the classroom.',
    imgSrc: '/vectors/ccc/teaching.svg',
    imgAlt: '',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Engagement',
    children:
      'Provide opportunities for students, staff, faculty, and community members to be part of the practice, celebration, and demonstration of cultural celebration and joy.',
    imgSrc: '/vectors/ccc/winner.svg',
    imgAlt: '',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Student Development',
    children:
      'Provide students with opportunities to develop their academic, professional, and personal growth during their undergraduate experience.',
    imgSrc: '/vectors/ccc/education.svg',
    imgAlt: '',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Environment Enhancement',
    children:
      'Provide a safe space on campus for students where they see themselves reflected, embraced, celebrated, and validated. Resources are available within the center',
    imgSrc: '/vectors/ccc/reading-lounge.svg',
    imgAlt: '',
    href: 'ccc/apisrc',
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

const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function APISRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU APISRC</title>
        <meta name="author" content="apisrc coordinator" key="author" />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, Cross Cultural Centers, CCC, Asian Pacific Islander Resource Center, ASPIRC, APIDA, Cultural Graduation, Cultural Grads, Asian, Pacific Islander, Desi-American, U-SU, University Student"
          key="keywords"
        />
        <meta
          name="description"
          content="The Asian Pacific Islander Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
          key="description"
        />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://discord.com/invite/quZwGJqsMm"
            aria-label="Join our APISRC Discord server"
          >
            <FaDiscord fontSize={FontSizes['2xl']} aria-hidden="true" />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/apisrc.ccc/"
            aria-label="link to the APISRC Instagram feed"
          >
            <AiOutlineInstagram
              fontSize={FontSizes['2xl']}
              aria-hidden="true"
            />
          </a>
          <a
            href="https://linktr.ee/apisrc.ccc"
            style={{ margin: `auto ${Spaces.sm}` }}
            aria-label="Visit our Linktree page"
          >
            <Image
              alt="linktree icon"
              src="/departments/logos/linktree.svg"
              height="29px"
              width="32px"
              aria-hidden="true"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.tiktok.com/@apisrc.ccc"
            aria-label="Follow us on TikTok"
          >
            <FaTiktok fontSize={FontSizes.xl} aria-hidden="true" />
          </a>
        </FluidContainer>
        <HeaderLeftContainer>
          <Header
            title="Asian Pacific Islander Student Resource Center"
            buttons={buttons}
          >
            {isDesktop && (
              <Image
                src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
                alt=""
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              />
            )}
            The APISRC is one of the four identity-based centers within the
            Cross Cultural Centers at the University-Student Union. The APISRC
            was established in 1993 to address the growing needs and concerns of
            the Asian, Pacific Islander, and Desi American student population
            while enriching and raising social awareness for the entire campus
            community. The APISRC provides services and support for students who
            identify as, and/or any students who are interested in learning more
            about, Asian American, Pacific Islander, and South Asian/Desi
            community cultural issues.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
              alt=""
              width={400}
              height={500}
            />
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5249"
            hours={hours}
          />
        </FluidContainer>
      </HeaderContainer>
      <div id="apida-grad">
        <FluidContainer
          flex
          flexWrap={isTablet ? 'wrap' : 'nowrap'}
          backgroundColor="primary"
        >
          <Image
            margin="auto"
            borderRadius="12px"
            src="/departments/ccc/apisrc/apida-grad.jpeg"
            alt="2022 apida graduation graduates"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          />
          <FluidContainer>
            <abbr title="Asian, Pacific Islander, South Asian, Desi-American Graduation">
              <Typography
                variant="title"
                as="h2"
                size={isMobile ? 'xl' : '2xl'}
              >
                APIDA Grad
              </Typography>
            </abbr>
            <Typography as="p" margin="24px 0">
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
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          The APISRC continues to serve the mission through four components:
        </Typography>
        <OfferingsContainer>
          {offerings.map((props) => (
            <ImageAndCard
              key={props.title}
              imageWidth={isTablet ? '128px' : '184px'}
              {...props}
            />
          ))}
        </OfferingsContainer>
      </FluidContainer>
      <InstagramFeed department="apisrc" />
      <FluidContainer flex justifyContent="center">
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Open to all who are interested to participate regardless of race, sex,
          color, ethnicity, or national origin
        </Typography>
      </FluidContainer>
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt="asian pacific islander student resource center logo"
            src="/departments/ccc/apisrc/apisrc-header.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
