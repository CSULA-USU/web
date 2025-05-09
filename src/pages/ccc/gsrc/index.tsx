import Head from 'next/head';
import styled from 'styled-components';
import { Header, ImageAndCard, OfficeHours, Page } from 'modules';
import {
  Button,
  FluidContainer,
  Image,
  StyledLink,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, FontSizes, Spaces } from 'theme';
import { AiOutlineInstagram } from 'react-icons/ai';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

const buttons = [
  {
    text: '2024 Grad',
    href: '/ccc/cultural-grads/pride',
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
    title: 'Programming',
    children:
      'Programs centering around education, engagement, and empowerment in relation to gender equity and LGBTQIA+ issues.',
    imgSrc: '/departments/ccc/gsrc/vectors/calendar.svg',
    imgAlt: '',
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
    imgAlt: '',
  },
  {
    title: 'Relevant Student Organizations',
    children: (
      <ul>
        <li>
          <StyledLink
            href="https://www.instagram.com/csula_wgsclub/"
            isExternalLink
          >
            <Typography variant="span">
              Cal State LA Women&apos;s, Gender, and Sexualities Club
            </Typography>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="https://www.instagram.com/swd_csula/"
            isExternalLink
          >
            <Typography variant="span">
              Students with Dependents at Cal State LA
            </Typography>
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="https://www.instagram.com/thetransqueerconnection"
            isExternalLink
          >
            <Typography variant="span">Trans Queer Connection</Typography>
          </StyledLink>
        </li>
      </ul>
    ),
    imgSrc: '/departments/ccc/gsrc/vectors/pride.svg',
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

const OfferingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function GSRC() {
  const { isDesktop, isMobile, isTablet } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>U-SU GSRC</title>
        <meta name="author" content="gsrc coordinator" key="author" />
        <meta
          name="keywords"
          content="csula cal state la student union cross cultural centers the gender sexuality student queer questioning trans transgender womyn lesbian gay lgbt bi curious feminist resource center resource ccc u-su university-student"
          key="keywords"
        />
        <meta
          name="description"
          content="The Gender and Sexuality Resource Center is one of the four identity-based centers within the Cross Cultural Centers at the University-Student Union"
          key="description"
        />
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
              aria-label="Visit GSRC Instagram"
            />
          </a>
          <a
            href="https://linktr.ee/cccatcalstatela"
            style={{ margin: `auto ${Spaces.sm}` }}
            aria-label="Visit the CCC Linktree"
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
            title="Gender and Sexuality Resource Center"
            buttons={buttons}
          >
            {isDesktop && (
              <Image
                src="/departments/logos/gsrc-icon.svg"
                alt=""
                width="100%"
                height="300px"
                margin={`${Spaces.md} auto`}
              />
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
              alt=""
              width={400}
              height={500}
            />
          )}
        </HeaderLeftContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 206"
            phoneNumber="(323)-343-3370"
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
            src="/departments/ccc/gsrc/carousel/pride-grad.jpg"
            alt="2022 pride graduation"
            width={isMobile ? '100%' : '45%'}
            height={isMobile ? '100%' : '45%'}
          />
          <FluidContainer>
            <Typography variant="title" size={isMobile ? 'xl' : '2xl'} as="h2">
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
      <FluidContainer flex justifyContent="center">
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '2xl'}>
          Open to all who are interested to participate regardless of race, sex,
          color, ethnicity, or national origin
        </Typography>
      </FluidContainer>
      {!isMobile && (
        <FluidContainer flex justifyContent="center">
          <Image
            alt=""
            src="/departments/ccc/gsrc/gsrc.png"
            width="100%"
            margin={`0px 500px ${Spaces.xl}`}
          />
        </FluidContainer>
      )}
    </Page>
  );
}
