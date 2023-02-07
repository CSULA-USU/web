import { FaGraduationCap, FaRegQuestionCircle } from 'react-icons/fa';
import styled from 'styled-components';
import Head from 'next/head';
import {
  Button,
  Card,
  Divider,
  FluidContainer,
  Image,
  Tabs,
  Typography,
} from 'components';
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
    Please read through the application requirements carefully! For the best
    results, please disable pop-up blockers and complete form in Incognito mode.
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
          <li>APIDA Graduate Celebration - 10 Tickets</li>
          <li>Black Graduate Celebration - 10 Tickets</li>
          <li>Nuestra Graduate Celebration - 10 Tickets</li>
          <li>Pride Graduate Celebration - 6 Tickets</li>
        </ul>
      </li>
    </ul>
  </TabContent>
);

const WhereTab = () => (
  <TabContent>
    Each celebration has a specific location, time and date. Please see the
    individual applications for information. All applications are due on March
    17, 2023 by EOD.
    <br />
    <ul>
      <li>
        APIDA:
        <ul>
          <li>Saturday, May 20, 2023</li>
          <li>1:00 PM - 3:00 PM</li>
          <li>
            State Playhouse Theatre, California State University Los Angeles
          </li>
        </ul>
      </li>
      <Divider color="greyLighter" margin="24px auto" />
      <li>
        Black
        <ul>
          <li>Saturday, May 27, 2023</li>
          <li>5:00 PM - 7:00 PM</li>
          <li>University Gymnasium, California State University Los Angeles</li>
        </ul>
      </li>
      <Divider color="greyLighter" margin="24px auto" />
      <li>
        Nuestra:
        <ul>
          <li>Saturday, May 27, 2023</li>
          <li>12:00 PM - 2:00 PM</li>
          <li>University Gymnasium, California State University Los Angeles</li>
        </ul>
      </li>
      <Divider color="greyLighter" margin="24px auto" />
      <li>
        Pride:
        <ul>
          <li>Saturday, May 19, 2023</li>
          <li>5:00 PM - 7:00 PM</li>
          <li>Los Angeles Rooms, CSULA University-Student Union</li>
        </ul>
      </li>
    </ul>
  </TabContent>
);

const WhoTab = () => (
  <TabContent>
    <strong>All</strong> graduating students (of all degree types, Bachelors,
    Masters, EdD) who are interested are welcome to apply. Priority is given to
    Spring 2023 graduates, but Fall 2022 graduates are welcome to apply as well.
  </TabContent>
);

const WhyTab = () => (
  <TabContent>
    You deserve to celebrate your achievements with cultural influences that are
    integral to your being and important to you and your community! APPLY NOW!
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
    title: 'APIDA',
    children: 'Asian, Pacific Islander, South Asian, Desi-American',
    linkText: 'Apply Here',
    href: 'https://form.jotform.com/223187645673162',
    iconSrc: '/departments/logos/apisrc-icon.svg',
    iconAlt: 'APISRC logo',
  },
  {
    title: 'Black',
    children: 'Black, African-American, Pan-African Diaspora',
    linkText: 'Apply Here',
    href: 'https://form.jotform.com/230055135393147',
    iconSrc: '/departments/logos/pasrc-icon.svg',
    iconAlt: 'PASRC logo',
  },
  {
    title: 'Nuestra',
    children: 'Chicana/o, Latina/o, Central American, South American',
    linkText: 'Apply Here',
    href: 'https://form.jotform.com/230047359271151',
    iconSrc: '/departments/logos/clsrc-logo.svg',
    iconAlt: 'CLSRC logo',
  },
  {
    title: 'Pride',
    children:
      'Lesbian, Gay, Bisexual, Trans, Queer, Intersex, Asexual + Community',
    linkText: 'Apply Here',
    href: 'https://form.jotform.com/223187106653152',
    iconSrc: '/departments/logos/gsrc-icon.svg',
    iconAlt: 'GSRC logo',
  },
];

const IconHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${Spaces.md};
`;

export default function CulturalGrads() {
  const tabItems = [
    { title: 'Where & When', children: <WhereTab /> },
    { title: 'How', children: <HowTab /> },
    { title: 'What', children: <WhatTab /> },
    { title: 'Who', children: <WhoTab /> },
    { title: 'Why', children: <WhyTab /> },
  ];

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
          content="csula cal state la student union center for student involvement csi u-su university-student"
        />
        <meta
          name="description"
          content="The Center for Student Involvement in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FluidContainer
        backgroundColor="primary"
        flex
        justifyContent="center"
        alignItems="center"
        innerMaxWidth="560px"
      >
        <Image
          src="/departments/ccc/ccc-grad-banner.jpg"
          alt="recreation logo"
          width="100%"
          height="fit-content"
        />
      </FluidContainer>
      <FluidContainer
        flex
        flexDirection="column"
        backgroundImage="/bod-cta-background.jpg"
      >
        <FluidContainer flex>
          <FluidContainer flex flexDirection="column">
            <TeaserContainer />
            <br />
            <Typography variant="cta">Nuestra Grad &apos;22</Typography>
          </FluidContainer>
          <FluidContainer>
            <Typography variant="title">
              2023
              <br />
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
            <Button variant="black" href="#">
              <SubHeaderSpan>
                Apply Now&nbsp;
                <FaGraduationCap color={'white'} fontSize={'24px'} />
              </SubHeaderSpan>
            </Button>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>
      <FluidContainer flex flexDirection="column">
        <SubHeaderSpan>
          <Typography margin="24px" as="h2" variant="titleSmall">
            Graduations
          </Typography>
        </SubHeaderSpan>
        <FluidContainer flex flexWrap="wrap">
          {cards.map((props) => (
            <Card
              margin={`${Spaces.md}`}
              topBorder
              key={`${props.title}`}
              {...props}
              width="calc(22% - 8px)"
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
            <Typography margin="24px 8px 24px 0px" as="h2" variant="titleSmall">
              Frequently Asked Questions
            </Typography>
            <FaRegQuestionCircle fontSize={'24px'} />
          </SubHeaderSpan>
        </IconHeading>
        <Tabs items={tabItems} minHeight="320px" />
      </FluidContainer>
    </Page>
  );
}
