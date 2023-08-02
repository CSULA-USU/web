import { Page, Header, OfficeHours, GenericModal } from 'modules';
import Head from 'next/head';
import {
  FluidContainer,
  Typography,
  Image,
  Button,
  NonBreakingSpan,
} from 'components';
import { Colors, FontSizes, Spaces, media } from 'theme';
import styled from 'styled-components';
import { useState } from 'react';
import awardYears from 'data/acuiYear.json';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import { useBreakpoint } from 'hooks';
import { Component as InstagramFeed } from 'sections/InstagramFeed/InstagramFeed';

interface DesignCardData {
  title: string;
  designer: string;
  src: string;
  description: string;
}

const buttons = [
  { text: 'ACUI Awards', href: '/graffix/acui-awards' },
  { text: 'Linktree', href: 'https://linktr.ee/usugraffix' },
];
const hours = [
  {
    title: 'Office Hours',
    times: ['Monday - Friday: 8:00 AM - 5:00 PM'],
  },
];
const cards1 = [
  {
    title: 'Graffix Trick or Tour',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/graffix-trick-or-tour.png',
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
  },
  {
    title: 'Larry Itliong Day',
    designer: 'P Dacayan',
    src: '/departments/graffix/student-designs/larry-itliong.jpg',
    description: ' Larry Itliong Day',
  },
  {
    title: 'Graffix Open House',
    designer: 'Hector Almaraz',
    src: '/departments/graffix/student-designs/graffix-job-fair.jpg',
    description: 'This design was inspired by retro scary movie posters.',
  },
];
const cards2 = [
  {
    title: 'Smash League Tournament',
    designer: 'Hector Almaraz',
    src: '/departments/graffix/student-designs/smash-league.png',
    description:
      'This is a design that takes modern e-sports asthetics and combines them with Cal State LA colors.',
  },

  {
    title: 'Harvest Festival',
    designer: 'Anthony (Tony) Villa',
    src: '/departments/graffix/student-designs/harvest-festival.png',
    description: ' Harvest Festival',
  },
  {
    title: 'Fluffy Friends',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/fluffy-friends.png',
    description: ' Fluffy Friends',
  },
];
const cards3 = [
  {
    title: 'Brown & Gay in LA',
    designer: 'P Dacayan',
    src: '/departments/graffix/student-designs/brown-gay-la.png',
    description: ' Brown & Gay in LA',
  },
  {
    title: 'Swim in the Sounds',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/swim-in-the-sound.png',
    description: ' Swim in the Sounds',
  },
  {
    title: 'Study Break of Color',
    designer: 'Frankie Sandoval',
    src: '/departments/graffix/student-designs/study-break-of-color.png',
    description: ' Study Break of Color',
  },
];

const DesignsContainer = styled.div`
  width: calc(33.33% - 24px);
  ${media('tablet')(`
   width: 100%
   `)}
  margin: 0 24px 0 0;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  background: url(/backgrounds/subtle-background-1.jpg) no-repeat;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.xl};
`;

export default function Graffix() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<DesignCardData | null>(null);

  return (
    <Page>
      <Head>
        <title>U-SU Graffix</title>
        <meta
          name="author"
          content="The University Student Union Graffix Department"
        />
        <meta
          name="keywords"
          content="The University Student Union, California State University Los Angeles, Student Union, CSULA, Cal State LA, U-SU, USU, Graffix, Graphics, Programming, Events, Campaign, Promotion, Print, ACUI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderContainer>
        <FluidContainer flex justifyContent="flex-end">
          <a
            style={{ color: Colors.black, margin: `0 ${Spaces.md}` }}
            href="https://www.instagram.com/usugraffix/?hl=en"
            aria-label="link to University-Student Union Graffix's Instagram feed"
          >
            <AiOutlineInstagram fontSize={FontSizes['2xl']} />
          </a>
          <a
            style={{ color: Colors.black }}
            href="https://www.tiktok.com/@usugraffix?is_from_webapp=1&sender_device=pc"
            aria-label="link to University-Student Union Graffix's Tiktok feed"
          >
            <FaTiktok fontSize={FontSizes.xl} />
          </a>
        </FluidContainer>
        <HeaderInnerContainer>
          <Header title="Graffix" buttons={buttons}>
            The U-SU Graffix Department is responsible for promoting events and
            programs coordinated by the U-SU Programming Units through print
            materials and the U-SU website. We establish and maintain an
            identity for the U-SU through consistent publicity campaigns and
            promotions.
          </Header>
          {!isDesktop && (
            <Image
              src="https://www.dropbox.com/s/7uo8gsk1iy3ukn4/students-1.png?raw=1"
              alt="students"
              width={600}
              height={700}
            ></Image>
          )}
        </HeaderInnerContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 204B, Floor 2"
            phoneNumber="(323)-343-2464"
            hours={hours}
          ></OfficeHours>
        </FluidContainer>
      </HeaderContainer>
      <FluidContainer
        flex
        flexWrap="wrap"
        backgroundColor="greyLightest"
        justifyContent="center"
        alignItems="center"
      >
        <DesignsContainer>
          {cards1.map((props) => (
            <div key={props.title}>
              <div
                onClick={() => {
                  setModalData(props);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={props.src}
                  alt={props.title}
                  width="100%"
                  borderRadius="8px"
                />
              </div>
            </div>
          ))}
        </DesignsContainer>
        <DesignsContainer>
          {cards2.map((props) => (
            <div key={props.title}>
              <div
                onClick={() => {
                  setModalData(props);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={props.src}
                  alt={props.title}
                  borderRadius="8px"
                  width="100%"
                />
              </div>
            </div>
          ))}
        </DesignsContainer>
        <DesignsContainer>
          {cards3.map((props) => (
            <div key={props.title}>
              <div
                onClick={() => {
                  setModalData(props);
                  setIsOpen(true);
                }}
              >
                <Image
                  src={props.src}
                  alt={props.title}
                  borderRadius="8px"
                  width="100%"
                />
              </div>
            </div>
          ))}
        </DesignsContainer>
      </FluidContainer>
      <FluidContainer flex backgroundColor="primary" padding="0">
        <FluidContainer>
          <Typography as="h2" variant="titleLarge" lineHeight="1">
            Join the
            <br />
            <strong>
              {!isMobile ? (
                <NonBreakingSpan>award-winning</NonBreakingSpan>
              ) : (
                <>award winning</>
              )}
            </strong>
            <br />
            team!
          </Typography>
          <Typography as="p" margin={`${Spaces.md} 0`}>
            Are you an aspiring graphic designer/ web developer/ social media
            manager? Hone new skills and experiences here at Graffix!
          </Typography>
          <Button href="/employment" variant="black">
            Apply Now
          </Button>
        </FluidContainer>
        {!isDesktop && (
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="space-evenly"
            backgroundColor="white"
            padding="24px"
          >
            {awardYears.map((y) => (
              <Image
                key={y.alt}
                src={y.src}
                alt={y.alt}
                width="100px"
                margin="8px"
              />
            ))}
          </FluidContainer>
        )}
      </FluidContainer>
      <div id="acui-awards">
        <FluidContainer flex flexDirection="column" backgroundColor="black">
          <Typography variant="title" margin="16px 0" color="gold" as="h2">
            ACUI Awards{' '}
          </Typography>
          <Typography color="greyLighter" variant="label" as="h3">
            Association of College Unions International (ACUI)
          </Typography>
          <Typography color="white" as="p">
            Association of College Unions International is a nonprofit
            educational organization that brings together college union and
            student activities professionals from hundreds of schools in seven
            countries. Its mission is to build campus community through
            education, advocacy, and the delivery of services. There are total
            of eight Regions and California is part of the Region I, which also
            includes Arizona, Hawaii, Nevada, New Mexico, Australia and the
            Territory of Guam.
          </Typography>
          <Typography
            variant="label"
            margin="16px 0 0"
            color="greyLighter"
            as="h3"
          >
            Steal This Idea
          </Typography>
          <Typography color="white" as="p" margin="0 0 24px 0">
            Steal This Idea is the ACUI&apos;s marketing and graphics
            competition to recognize the year&apos;s best promotional ideas
            throughout the regions and presents them at the conference. There
            are at least 10 design categories and each category has both student
            and professional entries. The winning entries are selected based on
            concept, design, editorial content, and effectiveness. Also, a
            &quot;Best in Show&quot; award will honor the top idea presented.
          </Typography>
        </FluidContainer>
      </div>
      <InstagramFeed department="graffix" />

      {modalData && (
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <Typography variant="titleSmall" margin="16px 0">
            {modalData.title}
          </Typography>
          <Image
            src={modalData.src}
            alt={modalData.title}
            width="80%"
            height="80%"
          />
          <Typography weight="700">{modalData.designer}</Typography>
          <Typography variant="copy" margin="12px 0 0 0">
            {modalData.description}
          </Typography>
        </GenericModal>
      )}
    </Page>
  );
}
