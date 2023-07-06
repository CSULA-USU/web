import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import {
  Button,
  FluidContainer,
  Image,
  Typography,
  InstagramFeed,
} from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { useEffect } from 'react';
import { fetchToken, refreshInstagramToken, updateSupabaseToken } from 'api';
import * as schedule from 'node-schedule';
const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    imgAlt: 'pasrc events',
  },
  {
    title: 'Knowledge',
    children: 'Books on Black identity and empowerment',
    imgSrc: '/departments/ccc/pasrc/vectors/writer.svg',
    imgAlt: 'books and writing',
  },
  {
    title: 'Dialogue',
    children: 'Space for open-minded dialogue',
    imgSrc: '/departments/ccc/pasrc/vectors/dialogue.svg',
    imgAlt: 'dialogue groups',
  },
  {
    title: 'Environment Enhancement',
    children: 'Microwave and community refrigerator',
    imgSrc: '/departments/ccc/pasrc/vectors/eat.svg',
    imgAlt: 'food fridges microwaves ',
  },
];

export default function PASRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  const HeaderContainer = styled.div`
    background: url(/backgrounds/bod-cta-background.jpg) no-repeat;
  `;

  const HeaderLeftContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: ${Spaces.xl};
  `;

  const updateToken = async () => {
    await fetchToken('IG_TOKEN_PASRC')
      .then((data) => data[0].token)
      .then(async (oldToken) => {
        await refreshInstagramToken(oldToken)
          .then((newToken) => newToken.access_token)
          .then(async (newToken) => {
            await updateSupabaseToken(newToken, 'IG_TOKEN_PASRC');
          });
      });
  };

  const rule = new schedule.RecurrenceRule();
  rule.date = new schedule.Range(1, 31, 55);
  useEffect(() => {
    schedule.scheduleJob(rule, function () {
      updateToken();
    });
  }, []);

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
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/pasrc.ccc/"
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
          <Header title="Pan African Student Resource Center">
            {isDesktop && (
              <Image
                src="/departments/logos/pasrc-icon.svg"
                alt="clsrc logo"
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              ></Image>
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
              alt="clsrc logo"
              width={400}
              height={500}
            ></Image>
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-5131"
            hours={hours}
          ></OfficeHours>
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
            src="/departments/ccc/pasrc/black-grad/2022/grad-smile.jpg"
            alt="2022 black graduation celebration smiling face with flowers"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          ></Image>
          <FluidContainer>
            <Typography variant="title" size={isMobile ? 'xl' : '2xl'}>
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
            alt="pan african student resource center logo"
            src="/departments/ccc/pasrc/pasrc.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
