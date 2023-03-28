import Head from 'next/head';
import styled from 'styled-components';
import { CallToAction, Header, ImageAndCard, OfficeHours, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaDiscord, FaTiktok } from 'react-icons/fa';

const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const buttons = [
  { text: 'APIDA Grad', href: '#apida-grad' },
  {
    text: 'Volunteer',
    href: 'https://forms.office.com/pages/responsepage.aspx?id=AiCKzo9EWE-Csdhvc-Ov3SKXNpO6eVxLkvnb3NWEIOBUNjIzMUxQNjVERkhDWUY4NURMTjZLUEkwSC4u',
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

const offerings = [
  {
    title: 'Cultural Education',
    children:
      'Cultural Education – Provide scholarly and cultural education programs. Approaching cultural diversity from an academic perspective that provides the entire campus community with an opportunity to culturally engage and learn outside of the classroom.',
    imgSrc: '/vectors/ccc/teaching.svg',
    imgAlt: 'cultural education',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Engagement',
    children:
      'Cultural Engagement – Provide opportunities for students, staff, faculty, and community members to be part of the practice, celebration, and demonstration of cultural celebration and joy',
    imgSrc: '/vectors/ccc/winner.svg',
    imgAlt: 'apisrc',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Student Development',
    children:
      'Cultural Student Development – Provide students with opportunities to develop their academic, professional, and personal growth during their undergraduate experience',
    imgSrc: '/vectors/ccc/education.svg',
    imgAlt: 'apisrc',
    href: 'ccc/apisrc',
  },
  {
    title: 'Cultural Environment Enhancement',
    children:
      'Cultural Environment Enhancement – Provide a safe space on campus for APIDA-identified students where they see themselves reflected, embraced, celebrated, and validated. Resources available within the center',
    imgSrc: '/vectors/ccc/reading-lounge.svg',
    imgAlt: 'apisrc',
    href: 'ccc/apisrc',
  },
];

export default function APISRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  const HeaderContainer = styled.div`
    background: url(/bod-cta-background.jpg) no-repeat;
  `;

  const HeaderLeftContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: ${Spaces.xl};
  `;

  return (
    <Page>
      <Head>
        <title>U-SU APISRC</title>
        <meta name="author" content="apisrc coordinator" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers asian pacific islander student resource ccc u-su university-student"
        />
        <meta
          name="description"
          content="The Asian Pacific Islander Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://discord.com/invite/quZwGJqsMm"
          >
            <FaDiscord
              fontSize={FontSizes['2xl']}
              aria-label="apisrc discord icon"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/apisrc.ccc/"
          >
            <AiOutlineInstagram
              fontSize={FontSizes['2xl']}
              aria-label="apisrc instagram icon"
            />
          </a>
          <a
            href="https://linktr.ee/apisrc.ccc"
            style={{ margin: `auto ${Spaces.sm}` }}
          >
            <Image
              alt="linktree icon"
              src="/departments/logos/linktree.svg"
              height="29px"
              width="32px"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.tiktok.com/@apisrc.ccc"
          >
            <FaTiktok fontSize={FontSizes.xl} aria-label="apisrc tiktok icon" />
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
                alt="students"
                width="100%"
                height="400px"
                margin={`${Spaces.sm} auto`}
              ></Image>
            )}
            The APISRC is one of the four identity-based centers within the
            Cross Cultural Centers at the University-Student Union. The APISRC
            was established in 1993 to address the growing needs and concerns of
            the Asian, Pacific Islander, and Desi American student population
            while enriching and raising social awareness for the entire campus
            community. The APISRC provides services and support for students who
            identity as, or are interested in, AA, PI, and DA community and
            cultural issues.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
              alt="students"
              width={400}
              height={500}
            ></Image>
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5001"
            hours={hours}
          ></OfficeHours>
        </FluidContainer>
      </HeaderContainer>
      <CallToAction
        href="https://forms.office.com/r/2pTsmaFvCk"
        buttonVariantColor="primary"
        buttonText="Sign Up"
        text="APIDA Grad Committee"
        textColorProp="white"
        backgroundColorProp="greyDarkest"
      >
        <Typography as="h3" variant="labelTitle" color="white">
          We&apos;re looking for committee members to help us plan APIDA Grad!
          From the theme, sash design, performance - join us in making one of
          the biggest celebrations happen! You don&apos;t have to be a
          graduating student to be on the committee!
        </Typography>
      </CallToAction>
      <FluidContainer>
        <Typography margin="24px 8px 24px 0px" as="h2" variant="titleSmall">
          The APISRC continues to serve the mission through 4 components:
        </Typography>
        <OfferingsContainer>
          {offerings.map((props) => (
            <ImageAndCard
              key={props.title}
              imageWidth={isMobile ? '65%' : '184px'}
              {...props}
            />
          ))}
        </OfferingsContainer>
      </FluidContainer>
      <div id="apida-grad">
        <FluidContainer
          flex
          flexWrap={isTablet ? 'wrap' : 'nowrap'}
          backgroundColor="greyLightest"
        >
          <Image
            margin="auto"
            borderRadius="12px"
            src="/departments/ccc/apisrc/apida-grad.jpeg"
            alt="2022 apida graduation image"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          ></Image>
          <FluidContainer>
            <Typography variant="title">APIDA Grad</Typography>
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
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt="asian pacific islander student resource center logo"
            src="/departments/ccc/apisrc-header.png"
            width="100%"
            margin={`${Spaces.xl} 500px`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
