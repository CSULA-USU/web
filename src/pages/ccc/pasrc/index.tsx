import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { SiGroupme } from 'react-icons/si';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const buttons = [
  {
    text: '2024 Grad',
    href: '/ccc/cultural-grads/black',
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
    title: 'Programming',
    children: 'Programs centering on Black identity, history, and culture',
    imgSrc: '/departments/ccc/pasrc/vectors/calendar.svg',
    imgAlt: '',
  },
  {
    title: 'Knowledge',
    children: 'Books on Black identity and empowerment',
    imgSrc: '/departments/ccc/pasrc/vectors/writer.svg',
    imgAlt: '',
  },
  {
    title: 'Dialogue',
    children: 'Space for open-minded dialogue',
    imgSrc: '/departments/ccc/pasrc/vectors/dialogue.svg',
    imgAlt: '',
  },
  {
    title: 'Environment Enhancement',
    children: 'Microwave and community refrigerator',
    imgSrc: '/departments/ccc/pasrc/vectors/eat.svg',
    imgAlt: '',
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

export default function PASRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU PASRC</title>
        <meta name="author" content="pasrc coordinator director" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers africa african black resource center resource ccc u-su university-student programs events "
        />
        <meta
          name="description"
          content="The Pan African Student Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `auto ${Spaces.sm}` }}
            href="https://groupme.com/join_group/96687493/RA2NYgao"
          >
            <SiGroupme
              fontSize={FontSizes['xl']}
              aria-label="groupme link for pasrc"
            />
          </a>
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/pasrc.ccc/"
          >
            <AiOutlineInstagram
              fontSize={FontSizes['2xl']}
              aria-label="Visit the PASRC instagram"
            />
          </a>
          <a
            href="https://linktr.ee/cccatcalstatela"
            style={{ margin: `auto ${Spaces.sm}` }}
            aria-label="Visit the CCC linktree"
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
          <Header title="Pan African Student Resource Center" buttons={buttons}>
            {isDesktop && (
              <Image
                src="/departments/logos/pasrc-icon.svg"
                alt=""
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              />
            )}
            The Pan African Student Resource Center (PASRC) was founded in 1990.
            The PASRC provides services and support for students who identify as
            Pan African, or are interested in, Pan African community and
            cultural issues. The PASRC also develops long and short term
            programs and events focusing on issues of importance to the Pan
            African community in the U.S., Caribbean, Africa and Central/South
            America and worldwide.
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/logos/pasrc-icon.svg"
              alt=""
              width={400}
              height={500}
            />
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5131"
            hours={hours}
          />
        </FluidContainer>
      </HeaderContainer>
      <div id="pride-grad">
        <FluidContainer
          flex
          flexWrap={isTablet ? 'wrap' : 'nowrap'}
          backgroundColor="primary"
        >
          <Image
            margin="auto"
            borderRadius="12px"
            src="/departments/ccc/pasrc/black-grad/2022/grad-smile.png"
            alt="2022 black graduation celebration smiling face with flowers"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          />
          <FluidContainer>
            <Typography variant="title" size={isMobile ? 'xl' : '2xl'} as="h2">
              Black Grad
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
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Resource Center Provides:
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
      <InstagramFeed department="pasrc" />
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt=""
            src="/departments/ccc/pasrc/pasrc.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
