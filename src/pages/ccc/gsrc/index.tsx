import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import { Button, FluidContainer, Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import Link from 'next/link';
import { useEffect } from 'react';
import { fetchToken, refreshInstagramToken, updateSupabaseToken } from 'api';
import * as schedule from 'node-schedule';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

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
    children:
      'Programs centering around education, engagement, and empowerment in relation to gender equity and LGBTQIA+ issues.',
    imgSrc: '/departments/ccc/gsrc/vectors/calendar.svg',
    imgAlt: 'gsrc events',
  },
  {
    title: 'Resources',
    children: (
      <ul>
        <li>
          Books on relevant topics such as: gender, sexuality, feminism,
          parenting, identity and empowerment
        </li>
        <li>
          Lactation Room for parenting students stocked with resources such as
          diapers, toys, childrens books, and blankets
        </li>
        <li>
          Affirmation Closet: free gently used clothing for students to take
        </li>
        <li>Free menstruation products (pads, tampons, liners)</li>
        <li>Free sexual health products (condoms, lube, dental dam)</li>
        <li>Microwave and refrigerator</li>
      </ul>
    ),
    imgSrc: '/departments/ccc/gsrc/vectors/bookshelf.svg',
    imgAlt: 'books fridges microwaves ',
  },
  {
    title: 'Relevant Student Organizations',
    children: (
      <ul>
        <li>
          <Link href="https://www.instagram.com/csula_wgsclub/">
            <Typography color="gold">
              Cal State LA Women&apos;s, Gender, and Sexualities Club
            </Typography>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/swd_csula/">
            <Typography color="gold">
              Students with Dependents at Cal State LA
            </Typography>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/thetransqueerconnection">
            <Typography color="gold">Trans Queer Connection</Typography>
          </Link>
        </li>
      </ul>
    ),
    imgSrc: '/departments/ccc/gsrc/vectors/pride.svg',
    imgAlt: 'the queer connection club ',
  },
];

export default function GSRC() {
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
    await fetchToken('IG_TOKEN_GSRC')
      .then((data) => data[0].token)
      .then(async (oldToken) => {
        await refreshInstagramToken(oldToken)
          .then((newToken) => newToken.access_token)
          .then(async (newToken) => {
            await updateSupabaseToken(newToken, 'IG_TOKEN_GSRC');
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
        <title>U-SU GSRC</title>
        <meta name="author" content="gsrc coordinator" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers the gender sexuality student queer questioning trans transgender womyn lesbian gay lgbt bi curious feminist resource center resource ccc u-su university-student"
        />
        <meta
          name="description"
          content="The Gender and Sexuality Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.sm}` }}
            href="https://www.instagram.com/gsrc.ccc/"
            aria-label="link to the Cross Cultural Center's Instagram feed"
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
          <Header title="Gender and Sexuality Resource Center">
            {isDesktop && (
              <Image
                src="/departments/logos/gsrc-icon.svg"
                alt="clsrc logo"
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              ></Image>
            )}
            The Gender and Sexuality Resource Center at Cal State LA is
            dedicated to creating safe and respectful learning spaces, catering
            specifically to the empowerment of all individuals across the gender
            and sexuality spectrum.
            <br />
            <br />
          </Header>
          {!isDesktop && (
            <Image
              src="/departments/logos/gsrc-icon.svg"
              alt="clsrc logo"
              width={400}
              height={500}
            ></Image>
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-3370"
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
            src="/departments/ccc/gsrc/carousel/pride-grad.jpg"
            alt="2022 pride graduation"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          ></Image>
          <FluidContainer>
            <Typography variant="title" size={isMobile ? 'xl' : '2xl'}>
              Pride Grad
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
          The GSRC offers:
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
      <InstagramFeed department="gsrc" />
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt="gender and sexuality student resource center logo"
            src="/departments/ccc/gsrc/gsrc.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
