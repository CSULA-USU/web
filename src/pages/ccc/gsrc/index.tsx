import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import {
  Button,
  ReactCarousel,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';

const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const buttons = [
  {
    text: 'LGBTQIPA+',
    href: '/departments/ccc/gsrc/booklets/lgbtqipa.pdf',
  },
  { text: 'Womenlife', href: '/departments/ccc/gsrc/booklets/womenlife.pdf' },
];

const carouselImages = [
  {
    src: '/departments/ccc/gsrc/carousel/gsrc-group.jpg',
    alt: 'Students in the GSRC posing for a pic',
  },
  {
    src: '/departments/ccc/gsrc/carousel/pride-drag.jpg',
    alt: 'Drag show at pride grad',
  },
  {
    src: '/departments/ccc/gsrc/carousel/grad-group.jpg',
    alt: 'Pride graduates',
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
    title: 'Student Organizations',
    children:
      'Occasionally hosting "The Queer Connection" club meetings. Note: not officially affiliated with GSRC',
    imgSrc: '/departments/ccc/gsrc/vectors/pride.svg',
    imgAlt: 'the queer connection club',
  },
  {
    title: 'Resources',
    children:
      'Referrals to outside agencies focusing on various issues including, but not limited to: domestic violence, sexual assault, health clinics, LGBTQ safe spaces, shelters, etc.',
    imgSrc: '/departments/ccc/gsrc/vectors/medicine.svg',
    imgAlt: 'resources and connections to agencies',
  },
  {
    title: 'Counseling',
    children:
      'Individual counseling and crisis intervention leading to on and off-campus referrals.',
    imgSrc: '/departments/ccc/gsrc/vectors/referral.svg',
    imgAlt: 'referrals and counseling',
  },
  {
    title: 'Programming',
    children:
      'Programs and events that build awareness on issues concerning Womyn, Men, and the LGBTQ community',
    imgSrc: '/departments/ccc/gsrc/vectors/calendar.svg',
    imgAlt: 'gsrc events',
  },
  {
    title: 'Dialogue',
    children: 'Space for open-minded dialogue groups for Womyn and Men',
    imgSrc: '/departments/ccc/gsrc/vectors/conversation.svg',
    imgAlt: 'dialogue groups',
  },
  {
    title: 'Environment Enhancement',
    children:
      'Books on gender, sexuality, feminist expression, parenting, identity, and empowerment, breastfeeding area, microwave, community refrigerator',
    imgSrc: '/departments/ccc/gsrc/vectors/bookshelf.svg',
    imgAlt: 'books fridges microwaves ',
  },
];

export default function GSRC() {
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
          <Header
            title="Gender and Sexuality Resource Center"
            buttons={buttons}
          >
            {isDesktop && (
              <Image
                src="/departments/logos/gsrc-icon.svg"
                alt="clsrc logo"
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              ></Image>
            )}
            The Gender & Sexuality Resource Center at Cal State LA is dedicated
            to creating safe and respectful learning spaces, catering
            specifically to the empowerment of Womyn, Men, and the Lesbian, Gay,
            Bisexual, Transgender, and Questioning/Queer (LGBTQ) community. We
            pride ourselves in challenging societal norms that have been used
            historically to oppress and marginalize, while raising awareness on
            contemporary issues we face. The GSRC is open and available to all.
            Please visit us... Our doors are always open! The term
            &quot;Womyn&quot; has been adopted to reclaim a feminist identity
            that rejects patriarchal and sexist language.
            <br />
            <br />
            Booklets:
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
      <FluidContainer>
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Check our events out:
        </Typography>
        <ReactCarousel carouselImages={carouselImages} />
        {!isMobile && (
          <FluidContainer flex justifyContent="center">
            <Image
              alt="gender and sexuality resource center header"
              src="/departments/ccc/gsrc.png"
              width="100%"
              margin={`0px 500px ${Spaces.xl}`}
            />
          </FluidContainer>
        )}
      </FluidContainer>
    </Page>
  );
}
