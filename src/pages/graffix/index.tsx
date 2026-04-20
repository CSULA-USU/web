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
      'A graphic used on Instagram. This design coincided with Halloween and the Graffix open house. We decided to merge the two and add symbols inspired by Graffix staff',
    alt: 'Cutesy black and orange square Instagram post that reads "Graffix Trick or Tour" with a pumpkin and a ghost',
  },
  {
    title: 'Larry Itliong Day',
    designer: 'P Dacayan',
    src: '/departments/graffix/student-designs/larry-itliong.jpg',
    description:
      'A tabloid size vertical poster that highlights Filipino-American history month and Larry Itliong Day. The design features a portrait of Larry Itliong, performances, food, activities, and a Filipino flag',
    alt: 'Tabloid size vertical poster that highlights Filipino-American history month and Larry Itliong Day',
  },
  {
    title: 'Graffix Open House',
    designer: 'Hector Almaraz',
    src: '/departments/graffix/student-designs/graffix-job-fair.jpg',
    description: 'This design was inspired by retro scary movie posters',
    alt: 'Postcard to promote the Graffix open house and job fair with an image of the work office in the background',
  },
];
const cards2 = [
  {
    title: 'Smash League Tournament',
    designer: 'Hector Almaraz',
    src: '/departments/graffix/student-designs/smash-league.png',
    description:
      'This is a design used on Instagram to promote a Super Smash Bros. video game tournament. It takes modern e-sports aesthetics and combines them with Cal State LA colors',
    alt: 'An Instagram post to promote the Super Smash Bros Ultimate Smash League for Fall 2022, which was a 1v1 tournament. The image features popular in-game characters Fox, Cloud, Kirby, Mario, Ryu, and Shulk on the foreground with location and time information at the bottom. It combines e-sports aesthetics and combines them with Cal State LA colors',
  },

  {
    title: 'Harvest Festival',
    designer: 'Anthony (Tony) Villa',
    src: '/departments/graffix/student-designs/harvest-festival.png',
    description:
      'A vertical tabloid-sized poster that promotes a night event at the U-SU with spooky decorations and Halloween-themed activities',
    alt: 'A vertical tabloid-size poster featuring a mummified Eddy the Eagle and hand-drawn illustration of the U-SU at the bottom',
  },
  {
    title: 'Fluffy Friends',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/fluffy-friends.png',
    description:
      'An Instagram post to promote a pet therapy event with information on when and where.',
    alt: 'An Instagram post featuring a notebook and paw prints to promote a pet therapy event with information on when and where',
  },
];
const cards3 = [
  {
    title: 'Brown & Gay in LA',
    designer: 'P Dacayan',
    src: '/departments/graffix/student-designs/brown-gay-la.png',
    description:
      'A vertical tabloid-sized poster image that promotes the APISRC and GSRC book event. The predominant use of yellow and red is a throwback to the popular Filipino fast food chain, Jollibee',
    alt: 'A predominantly yellow vertical tabloid-size poster with red text and a picture of the author Dr. Anthony Ocampo with the book Brown and Gay in LA',
  },
  {
    title: 'Swim in the Sounds',
    designer: 'Sebastian Lopez',
    src: '/departments/graffix/student-designs/swim-in-the-sound.png',
    description:
      ' An Instagram post designed to promote the music playlists of the student-staff at Graffix. The use of blue heavily contrasts with the red beach ball, drawing attention on the post',
    alt: 'An Instagram post graphic with a digital image of a swimming pool to promote the music playlists of the student-staff at Graffix. The use of blue heavily contrasts with the red beach ball, drawing the eyes.',
  },
  {
    title: 'Study Break of Color',
    designer: 'Frankie Sandoval',
    src: '/departments/graffix/student-designs/study-break-of-color.png',
    description:
      'An Instagram post graphic to promote a study break event with information on when and where',
    alt: 'An Instagram post depicting a student wearing headphones laying on a bean bag relaxing with a book in the corner to promote a study break event with information on when and where',
  },
];

const DesignsContainer = styled.div`
  width: calc(33.33% - 24px);
  ${media('tablet')(`
   width: 100%;
   margin: 0;
   `)}
  margin: 0 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: ${Spaces.lg};
`;

const Graphic = styled.button`
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  background: url(https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/backgrounds/subtle-background-1.webp)
    no-repeat;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.xl};
`;

const ScreenReaderOnly = styled.div`
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
`;

export default function Graffix() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<DesignCardData | null>(null);

  return (
    <Page>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>U&ndash;SU Graffix</title>
        <meta
          name="author"
          content="The University Student Union Graffix Department"
          key="author"
        />
        <meta
          name="description"
          content="Contact U-SU Graffix at (323) 343-2464. The award-winning creative hub at Cal State LA for graphic design, web development, and campus promotion."
          key="description"
        />{' '}
        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Graffix | Cal State LA University-Student Union"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Award-winning student design and marketing department providing professional creative services for the Cal State LA community."
          key="og-desc"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/graffix"
        />
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/graffix-header.webp"
          key="og-image"
        />
        <meta property="og:image:alt" content="U-SU Graffix Department Logo" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Graffix | Cal State LA University-Student Union"
        />
        <meta
          name="twitter:description"
          content="Explore student-led graphic design and web development at Cal State LA's award-winning Graffix department."
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/graffix-header.webp"
        />
        <link rel="canonical" href="https://www.calstatelausu.org/graffix" />
        {/* Structured Data for Google/AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'U-SU Graffix',
              url: 'https://www.calstatelausu.org/graffix',
              logo: 'https://www.calstatelausu.org/departments/logos/graffix-logo.svg',
              telephone: '+13233432464',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5154 State University Dr., U-SU Room 204B',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90032',
                addressCountry: 'US',
              },
              // Office Hours
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '08:00',
                  closes: '17:00',
                },
              ],
              // Department Emails
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  email: 'usugraffix@gmail.com',
                  contactType: 'general inquiries',
                },
                {
                  '@type': 'ContactPoint',
                  email: 'graffixwebteam@gmail.com',
                  contactType: 'web development',
                },
                {
                  '@type': 'ContactPoint',
                  email: 'rgonza282@calstatela.edu',
                  contactType: 'graphic design team',
                },
              ],
              parentOrganization: {
                '@type': 'NonprofitOrganization',
                name: 'University-Student Union at Cal State LA',
                url: 'https://www.calstatelausu.org',
              },
              description:
                'The U-SU Graffix Department is the award-winning creative hub at Cal State LA, responsible for graphic design, web development, and campus promotions.',
            }),
          }}
        />
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
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/graffix/graffix-header.webp"
              alt="two female students posing and showcasing the Graffix department tote bags"
              width={600}
              height={700}
            />
          )}
        </HeaderInnerContainer>
        <FluidContainer backgroundColor="transparent">
          <OfficeHours
            address="5154 State University Dr, Los Angeles, CA 90032 Room 204B, Floor 2"
            phoneNumber="(323)-343-2464"
            hours={hours}
          />
        </FluidContainer>
      </HeaderContainer>
      <FluidContainer backgroundColor="greyLightest">
        <Typography as="h2" variant="title" margin="0">
          Works
        </Typography>
        <FluidContainer
          flex
          backgroundColor="greyLightest"
          justifyContent="center"
          alignItems="center"
          flexDirection={isTablet ? 'column' : 'row'}
        >
          <DesignsContainer>
            {cards1.map((props) => (
              <Graphic
                key={props.title}
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
              </Graphic>
            ))}
          </DesignsContainer>
          <DesignsContainer>
            {cards2.map((props) => (
              <Graphic
                key={props.title}
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
              </Graphic>
            ))}
          </DesignsContainer>
          <DesignsContainer>
            {cards3.map((props) => (
              <Graphic
                key={props.title}
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
              </Graphic>
            ))}
          </DesignsContainer>
        </FluidContainer>
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
          <ScreenReaderOnly id="acui-banner-descriptions">
            A group of 22 banners representing the different years and cities
            that hosted ACUI, the oldest taking place in 2007 and the most
            recent in 2020.
          </ScreenReaderOnly>
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
                alt=""
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
            ACUI Awards
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
          width={isDesktop ? '90%' : '600px'}
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <FluidContainer flex flexDirection="column" alignItems="center">
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
          </FluidContainer>
        </GenericModal>
      )}
    </Page>
  );
}
