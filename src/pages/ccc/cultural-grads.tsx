import { FaRegQuestionCircle } from 'react-icons/fa';
import styled from 'styled-components';
import Head from 'next/head';
import {
  Card,
  Divider,
  FluidContainer,
  Image,
  Tabs,
  Typography,
} from 'components';
import { useBreakpoint } from 'hooks';
import { Page } from 'modules';
import { Spaces } from 'theme';

const TabContent = styled(Typography)`
  &,
  * {
    line-height: 2;
  }
  ol {
    margin-top: 12px;
  }
`;

const HowTab = () => (
  <TabContent>
    Read through the application requirements carefully! For the best results,
    please disable pop-up blockers and complete form in Incognito mode.
  </TabContent>
);

const WhatTab = () => (
  <TabContent>
    These ceremonies and celebrations are supplemental to University
    Commencement and are great opportunities to acknowledge your academic
    achievements, honor your families, communities, and to celebrate the
    cultural influences and traditions that have contributed to your academic
    success.
    <br />
    <br />
    Every student who applies to participate receives the following:
    <ul>
      <li>
        A specially curated lineup of speakers and entertainment during the
        ceremony
      </li>
      <li>A uniquely designed graduation sash</li>
      <li>A program booklet with your picture and 75 word acknowledgment</li>
      <li>
        Tickets for guests (guest ticket amounts may differ for each graduation)
        <ul>
          <li>APIDA Graduate Celebration - Ticket # TBA</li>
          <li>Black Graduate Celebration - Ticket # TBA</li>
          <li>Native Graduate Celebration - Ticket # TBA</li>
          <li>Nuestra Graduate Celebration - Ticket # TBA</li>
          <li>Pride Graduate Celebration - Ticket # TBA</li>
        </ul>
      </li>
    </ul>
  </TabContent>
);

const WhereTab = () => (
  <TabContent>
    Each celebration has a specific location, time and date. Please see the
    individual applications for information. All applications are due TBD by
    EOD.
    <br />
    <ul>
      <li>
        APIDA:
        <ul>
          <li>Day, Date TBA</li>
          <li>Time TBA</li>
          <li>Location TBA</li>
        </ul>
      </li>
    </ul>
    <Divider color="greyLighter" margin="24px auto" />
    <ul>
      <li>
        Black:
        <ul>
          <li>Day, Date TBA</li>
          <li>Time TBA</li>
          <li>Location TBA</li>
        </ul>
      </li>
    </ul>
    <Divider color="greyLighter" margin="24px auto" />
    <ul>
      <li>
        Native:
        <ul>
          <li>Day, Date TBA</li>
          <li>Time TBA</li>
          <li>Location TBA</li>
        </ul>
      </li>
    </ul>
    <Divider color="greyLighter" margin="24px auto" />
    <ul>
      <li>
        Nuestra:
        <ul>
          <li>Day, Date TBA</li>
          <li>Time TBA</li>
          <li>Location TBA</li>
        </ul>
      </li>
    </ul>
    <Divider color="greyLighter" margin="24px auto" />
    <ul>
      <li>
        Pride:
        <ul>
          <li>Day, Date TBA</li>
          <li>Time TBA</li>
          <li>Location TBA</li>
        </ul>
      </li>
    </ul>
    <Divider color="greyLighter" margin="24px auto" />
  </TabContent>
);

const WhoTab = () => (
  <TabContent>
    <strong>All</strong> graduating students (of all degree types, Bachelors,
    Masters, EdD) who are interested are welcome to apply. Priority is given to
    Spring 2024 graduates, but Fall 2024 graduates are welcome to apply as well.
  </TabContent>
);

const WhyTab = () => (
  <TabContent>
    You deserve to celebrate your achievements with cultural influences that are
    integral to your being and important to you and your community! Apply now!
  </TabContent>
);

const SubHeaderSpan = styled.span`
  display: flex;
  align-items: center;
`;

const TeaserContainer = styled.div`
  width: 500px;
  height: 520px;
  background: center / contain no-repeat
    url('/departments/ccc/nuestra-teaser.jpeg');
  border-radius: 12px;
`;

const cards = [
  {
    title: 'APIDA Grad',
    children: 'Asian, Pacific Islander, South Asian, Desi-American',
    linkText: 'Applications will be open soon',
    href: '',
    iconSrc: '/departments/ccc/apisrc/apisrc-textless.svg',
    iconAlt: 'APISRC logo',
  },
  {
    title: 'Black Grad',
    children: 'Black, African-American, Pan-African Diaspora',
    linkText: 'Applications will be open soon',
    href: '',
    iconSrc: '/departments/logos/pasrc-icon.svg',
    iconAlt: 'PASRC logo',
  },
  {
    title: 'Native Grad',
    children: 'Native American, Indigenous',
    linkText: 'Applications will be open soon',
    href: '',
    iconSrc: '/departments/ccc/native-logo.png',
    iconAlt: 'Native American and Indigenous Student Association logo',
  },
  {
    title: 'Nuestra Grad',
    children: 'Chicana/o, Latina/o, Central American, South American',
    linkText: 'Applications will be open soon',
    href: '',
    iconSrc: '/departments/logos/clsrc-logo.svg',
    iconAlt: 'CLSRC logo',
  },
  {
    title: 'Pride Grad',
    children:
      'Lesbian, Gay, Bisexual, Trans, Queer, Intersex, Asexual + Community',
    linkText: 'Applications will be open soon',
    href: '',
    iconSrc: '/departments/logos/gsrc-icon.svg',
    iconAlt: 'GSRC logo',
  },
];

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
`;

const tabItems = [
  { title: 'Where & When', children: <WhereTab /> },
  { title: 'How', children: <HowTab /> },
  { title: 'What', children: <WhatTab /> },
  { title: 'Who', children: <WhoTab /> },
  { title: 'Why', children: <WhyTab /> },
];

export default function CulturalGrads() {
  const { isTablet, isDesktop } = useBreakpoint();

  return (
    <Page>
      <Head>
        <title>Cultural Graduate Celebrations</title>
        <meta
          name="author"
          content="The University Student Union Center for Student Involvement"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA Student Union, Center for Student Involvement, CSI, Cross Cultural Center, CCC, U-SU, University Student, Cultural Graduation, Black Graduation, APIDA Graduation, Pride Graduation, Nuestra Graduation"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isDesktop ? (
        <>
          <FluidContainer
            backgroundColor="primary"
            flex
            justifyContent="center"
            alignItems="center"
            innerMaxWidth="560px"
          >
            <Image
              src="/departments/ccc/ccc-grad-banner.jpg"
              alt="cultural grad banner"
              width="100%"
              height="fit-content"
            />
          </FluidContainer>
          <FluidContainer
            flex
            flexDirection="column"
            backgroundImage="/backgrounds/subtle-background-4.jpg"
          >
            <SubHeaderSpan>
              <Typography margin="0px" as="h2" variant="titleSmall">
                Cultural Graduate Celebrations
              </Typography>
            </SubHeaderSpan>
            <FluidContainer flex flexDirection="column" alignItems="center">
              <Typography margin="0" as="h3">
                <strong>Dear Cal State LA Prospective Graduate,</strong>
                <br />
                These ceremonies and celebrations are great opportunities to
                acknowledge your academic achievements, honor your families,
                communities, and other significant people in your lives, and to
                celebrate the cultural influences that have contributed to your
                academic success. The ceremonies are open to all students who
                would like to sign up and participate.
              </Typography>
            </FluidContainer>
          </FluidContainer>
          <FluidContainer flex flexDirection="column">
            <SubHeaderSpan>
              <Typography margin="0px" as="h2" variant="titleSmall">
                Graduations
              </Typography>
            </SubHeaderSpan>
            <FluidContainer flex flexWrap="wrap" padding="0px">
              {cards.map((props) => (
                <Card
                  margin={`${Spaces.md}`}
                  topBorder
                  key={`${props.title}`}
                  {...props}
                  width={isTablet ? 'calc(95%)' : 'calc(45% - 8px)'}
                  minHeight="280px"
                >
                  {`${
                    props.children.length > 200
                      ? props.children.substring(0, 200) + '...'
                      : props.children
                  }`}
                </Card>
              ))}
            </FluidContainer>
          </FluidContainer>
          <FluidContainer backgroundColor="greyLightest">
            <IconHeading>
              <SubHeaderSpan>
                <Typography
                  margin="0px 8px 0px 0px"
                  as="h2"
                  variant="titleSmall"
                >
                  FAQs
                </Typography>
                <FaRegQuestionCircle fontSize={'24px'} />
              </SubHeaderSpan>
            </IconHeading>
            <Tabs items={tabItems} minHeight="320px" />
          </FluidContainer>
        </>
      ) : (
        <>
          <FluidContainer
            backgroundColor="primary"
            flex
            justifyContent="center"
            alignItems="center"
            innerMaxWidth="560px"
          >
            <Image
              src="/departments/ccc/ccc-grad-banner.jpg"
              alt="cultural grad banner"
              width="100%"
              height="fit-content"
            />
          </FluidContainer>
          <FluidContainer
            flex
            flexDirection="row"
            backgroundImage="/backgrounds/subtle-background-4.jpg"
            justifyContent="space-evenly"
          >
            <FluidContainer
              flex
              flexDirection="column"
              padding="16px"
              innerMaxWidth="500px"
            >
              <TeaserContainer />
              <br />
              <Typography variant="cta">Nuestra Grad &apos;22</Typography>
            </FluidContainer>
            <FluidContainer
              padding="16px"
              flex
              flexDirection="column"
              innerMaxWidth="500px"
            >
              <Typography variant="title">
                Cultural Graduate Celebrations
              </Typography>
              <Typography margin="24px 0">
                <strong>Dear Cal State LA Prospective Graduate,</strong>
                <br />
                These ceremonies and celebrations are great opportunities to
                acknowledge your academic achievements, honor your families,
                communities, and other significant people in your lives, and to
                celebrate the cultural influences that have contributed to your
                academic success. The ceremonies are open to all students who
                would like to sign up and participate.
              </Typography>
            </FluidContainer>
          </FluidContainer>
          <FluidContainer flex flexDirection="column">
            <Typography margin="24px 0px" as="h2" variant="titleSmall">
              Graduations
            </Typography>
            <FluidContainer flex flexWrap="wrap" padding="0px">
              {cards.map((props) => (
                <Card
                  margin={`${Spaces.md}`}
                  topBorder
                  key={`${props.title}`}
                  {...props}
                  width={isDesktop ? 'calc(45% - 8px)' : 'calc(30% - 8px)'}
                  minHeight="280px"
                >
                  {`${
                    props.children.length > 200
                      ? props.children.substring(0, 200) + '...'
                      : props.children
                  }`}
                </Card>
              ))}
            </FluidContainer>
          </FluidContainer>
          <FluidContainer backgroundColor="greyLightest">
            <IconHeading>
              <SubHeaderSpan>
                <Typography
                  margin="24px 8px 24px 0px"
                  as="h2"
                  variant="titleSmall"
                >
                  Frequently Asked Questions
                </Typography>
                <FaRegQuestionCircle fontSize={'24px'} />
              </SubHeaderSpan>
            </IconHeading>
            <Tabs items={tabItems} minHeight="320px" />
          </FluidContainer>
        </>
      )}
    </Page>
  );
}
