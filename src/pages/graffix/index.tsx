import { Page, Header, OfficeHours, GenericModal } from 'modules';
import Head from 'next/head';
import {
  FluidContainer,
  Typography,
  Image,
  Panel,
  Button,
  NonBreakingSpan,
} from 'components';
import { Colors, FontSizes, Spaces, media } from 'theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import awards from 'data/acuiAwards.json';
import awardYears from 'data/acuiYear.json';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import { useBreakpoint } from 'hooks';

interface DesignCardData {
  title: string;
  designer: string;
  src: string;
  description: string;
}

const buttons = [
  { text: 'ACUI Awards', href: '#acui-awards' },
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
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
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
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
  },
  {
    title: 'Fluffy Friends',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/fluffy-friends.png',
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
  },
];
const cards3 = [
  {
    title: 'Brown & Gay in LA',
    designer: 'P Dacayan',
    src: '/departments/graffix/student-designs/brown-gay-la.png',
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
  },
  {
    title: 'Swim in the Sounds',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/swim-in-the-sound.png',
    description:
      ' This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff.',
  },
  {
    title: 'Study Break of Color',
    designer: 'Frankie Sandoval',
    src: '/departments/graffix/student-designs/study-break-of-color.png',
    description:
      ' This design coincided with Halloween and the Graffix open house.We decided to merge the two and add symbols inspired by Graffix staff.',
  },
];
const NavItems = [
  'Best of Show',
  '1st Place',
  '2nd Place',
  '3rd Place',
  'Honorable Mention',
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

const InnerAwardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${media('tablet')(`
   flex-wrap: wrap;
  
   `)}
  margin: auto;
`;

const NavItemContainer = styled.div`
  *:hover {
    color: ${Colors.gold};
  }

  *:active {
    color: ${Colors.gold};
  }
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
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [buttonType, setButtonType] = useState('');
  const [awardCards, setAwardCards] = useState(awards);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<DesignCardData | null>(null);

  useEffect(() => {
    switch (buttonType) {
      case 'Best of Show':
        const bestOfShow = awards.filter((p) =>
          p.place.includes('Best of Show'),
        );
        setAwardCards(bestOfShow);
        break;
      case '1st Place':
        const first = awards.filter((p) => p.place.includes('First'));
        setAwardCards(first);
        break;
      case '2nd Place':
        const second = awards.filter((p) => p.place.includes('Second'));
        setAwardCards(second);
        break;
      case '3rd Place':
        const third = awards.filter((p) => p.place.includes('Third'));
        setAwardCards(third);
        break;
      case 'Honorable Mention':
        const honorableMentions = awards.filter((p) =>
          p.place.includes('Honorable Mention'),
        );
        setAwardCards(honorableMentions);
        break;
    }
  }, [buttonType]);

  const AwardsNav = () => {
    return (
      <FluidContainer flex justifyContent="space-between">
        {NavItems.map((item) => (
          <NavItemContainer
            key={item}
            onClick={() => {
              setButtonType(item);
            }}
          >
            <Typography color="black" variant="labelTitleSmall">
              {item}
            </Typography>
          </NavItemContainer>
        ))}
      </FluidContainer>
    );
  };

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
              src="/departments/graffix/students-1.png"
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
      <AwardsNav></AwardsNav>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {awardCards.map((award) => (
          <Panel
            width={!isTablet ? 'calc(35%)' : '100%'}
            topBorder
            margin={Spaces.md}
            key={award.name}
          >
            <InnerAwardContainer>
              <Image
                src={award.src}
                alt={award.title}
                width={'300px'}
                marginRight={Spaces.md}
              ></Image>
              <div>
                <Typography as="h4" variant="titleSmall" margin="16px 0">
                  {award.name}
                </Typography>
                <Typography as="p">ACUI Conference:{award.acuiName}</Typography>
                <Typography as="p">Title: {award.title}</Typography>
                <Typography as="p">Place: {award.place}</Typography>
                <Typography as="p">Category: {award.category}</Typography>
                <Typography as="p">Class: {award.class}</Typography>
              </div>
            </InnerAwardContainer>
          </Panel>
        ))}
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
