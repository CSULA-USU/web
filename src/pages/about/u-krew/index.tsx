import Head from 'next/head';
import { Page, Header } from 'modules';
import { ImageCardCarousel } from 'modules/ImageCardCarousel/ImageCardCarousel';
import {
  FluidContainer,
  Typography,
  Image,
  Card,
  NonBreakingSpan,
  Button,
  StyledLink,
  CountUp,
} from 'components';
import styled from 'styled-components';
import { Colors, Spaces, media } from 'theme';
import { useBreakpoint } from 'hooks';
import UKrewData from 'data/aboutUKrew.json';
import { useState } from 'react';
import {
  PositionsDescriptions,
  TabClusterControlled,
} from 'modules/UKrewCardList';

const { cards, stories, positions } = UKrewData;

const DescriptionSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Spaces.xl};
  ${media('desktop')(`
    flex-direction: column;
    align-items: center;
  `)};
`;

const DirectorySection = styled.div`
  display: flex;
  justify-content: center;

  ${media('tablet')(`
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `)}
`;

const DirectorySquares = styled.button`
  width: 240px;
  height: 120px;
  border: 2px solid grey;
  border-radius: 8px;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${Colors.greyLightest};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
  width: 100%;

  .square-image {
    aspect-ratio: 1 / 1;
    width: 100%;
    height: auto;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 12px;
  }

  @media screen and (min-width: 1025px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

export default function UKrew() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const departmentTabs: { [key: string]: string } = {
    All: 'All',
    Admin: 'Administration',
    CCC: 'Cross Cultural Centers',
    CSI: 'Center for Student Involvement',
    Graffix: 'Graffix',
    Operations: 'Operations',
    Recreation: 'Recreation',
  };
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <Page>
      <Head>
        <title>
          U-Krew | Student Jobs at Cal State LA University-Student Union
        </title>
        <meta
          name="description"
          content="Explore U-Krew student positions at Cal State LA's University-Student Union. Join departments like Operations, Media Services, Graffix, CSI, and more to build real-world experience."
        />
        <meta name="author" content="University-Student Union, Cal State LA" />
        <meta
          name="keywords"
          content="Cal State LA, California State University Los Angeles, CSULA, Cal State LA U-SU, Cal State LA University Student Union, U-Krew jobs, U-Krew Cal State LA, student employment Cal State LA, student jobs CSULA, Operations Assistant, Event Services Aide, Student Engagement Assistant, Information & Reservations Aide, Junior Graphics Designer Assistant, Media Services Assistant, Production Aide, Accounting Assistant, Administrative Assistant"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Join U-Krew at Cal State LA U-SU" />
        <meta
          property="og:description"
          content="Browse open student job opportunities at Cal State LA's University-Student Union. Learn about U-Krew positions in media, operations, events, and more."
        />
        <meta
          property="og:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan//awards.webp"
        />
        <meta property="og:url" content="https://usu.calstatela.edu/u-krew" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="U-Krew | Student Jobs at Cal State LA U-SU"
        />
        <meta
          name="twitter:description"
          content="Apply for U-Krew student jobs at Cal State LA U-SU. Opportunities available across departments like Graffix, Recreation, CCC, and more."
        />
        <meta
          name="twitter:image"
          content="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan//awards.webp"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        title="U-Krew"
        backgroundImage="/backgrounds/subtle-background-1.jpg"
      >
        u-krew page filler
      </Header>

      <FluidContainer>
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
          What is U&ndash;Krew?
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <DescriptionSection>
          <FluidContainer padding="0">
            <Typography
              as="h3"
              variant="labelTitle"
              weight="700"
              size={isMobile ? 'md' : '2xl'}
              lineHeight="1.2"
              margin="0 0 18px 0"
            >
              The Heart of Student Union Operations
            </Typography>
            <Typography
              margin="24px 0"
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
            >
              From web development to event coordination, maintenance to front
              desk operations, our student workers are the backbone of
              everything we do.
            </Typography>
            <Typography
              margin="24px 0"
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
            >
              Working with U-Krew isn&apos;t just a job; it&apos;s an
              opportunity to develop real&ndash;world skills, build lasting
              friendships, gain confidence, and make a meaningful impact on your
              fellow students&apos; campus experience.
            </Typography>
          </FluidContainer>

          <ImageGrid>
            <Image
              className="square-image"
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-maintenance.jpg"
              alt="Operations assistant fixing light"
            />
            <Image
              className="square-image"
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/information-event-services.jpg"
              alt="Student providing clerical support"
            />
            <Image
              className="square-image"
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/building-services.jpg"
              alt="Student setting up for an event"
            />
            <Image
              className="square-image"
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/departments/operations/images/media-services.jpg"
              alt="Student operating audio-visual equipment"
            />
          </ImageGrid>
        </DescriptionSection>
      </FluidContainer>

      <FluidContainer>
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
          We&apos;re Looking For
        </Typography>
      </FluidContainer>
      <FluidContainer flex flexWrap="wrap" justifyContent="center">
        {cards.map(({ iconSrc, iconAlt, title, children }) => (
          <Card
            key={title}
            title={title}
            iconSrc={iconSrc}
            iconAlt={iconAlt}
            topBorder
            width={isDesktop ? '100%' : 'calc(33.33% - 24px)'}
            margin="16px 8px"
            iconWidth="112px"
          >
            {children}
          </Card>
        ))}
      </FluidContainer>

      <FluidContainer>
        <div id="positions">
          <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
            Positions
          </Typography>
        </div>
      </FluidContainer>
      <FluidContainer>
        <TabClusterControlled
          tabItems={Object.keys(departmentTabs)}
          selectedTabKey={selectedTab}
          onSelectTab={setSelectedTab}
        />

        <PositionsDescriptions
          data={positions}
          filterByDepartment={departmentTabs[selectedTab]}
        />
      </FluidContainer>

      <FluidContainer>
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
          Student Stories
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <ImageCardCarousel stories={stories} />
      </FluidContainer>

      <FluidContainer>
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
          U&ndash;Awards
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <DescriptionSection>
          <Image
            src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/wingspan//awards.webp"
            alt="Staff recieving his award."
            width="100%"
            maxWidth={isDesktop ? '100%' : '500px'}
            height="auto"
            borderRadius="12px"
          />
          <FluidContainer padding="0">
            <FluidContainer padding="0">
              <Typography
                variant="labelTitle"
                as="h3"
                weight="700"
                size={isMobile ? 'md' : '2xl'}
                lineHeight="1.2"
                margin="0 0 18px 0"
              >
                Celebrating Excellence
              </Typography>
            </FluidContainer>
            <Typography
              margin="24px 0"
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
            >
              The U&ndash;Awards ceremony is our annual celebration recognizing
              outstanding student staff and full&ndash;time employees who have
              demonstrated exceptional dedication, innovation, and service to
              the Cal State LA Student Union community.
            </Typography>
            <Typography
              margin="24px 0"
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
            >
              From student workers who go above and beyond in their daily
              responsibilities to full&ndash;time staff members who mentor and
              inspire our student teams, the U&ndash;Awards honor those who make
              our workplace a thriving, supportive environment.
            </Typography>
            <Typography
              margin="24px 0"
              as="p"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
            >
              Join us in celebrating achievements, recognizing leadership, and
              highlighting the incredible impact our team members have on
              student life at Cal State LA.
            </Typography>
            {/* <Button
              href="https://form.jotform.com/210416532268047"
              isExternalLink
            >
              View Awards →
            </Button> */}
          </FluidContainer>
        </DescriptionSection>
      </FluidContainer>

      <FluidContainer>
        <Typography variant="title" as="h2" size={isMobile ? 'lg' : '3xl'}>
          Directory
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <Typography
          variant="labelTitle"
          weight="700"
          size={isMobile ? 'md' : '2xl'}
          lineHeight="1.2"
        >
          Connect with current and former U&ndash;Krew members. Build your
          network and discover opportunities through our alumni community.
        </Typography>
      </FluidContainer>
      <FluidContainer>
        <DirectorySection>
          <StyledLink href="/u-krew/directory">
            <DirectorySquares>
              <FluidContainer flexDirection="column" alignItems="center">
                <Typography
                  as="h3"
                  variant="span"
                  size={isMobile ? 'sm' : 'lg'}
                  lineHeight="1.2"
                  weight="700"
                >
                  2025
                </Typography>
                <Typography
                  as="p"
                  variant="labelTitle"
                  size={isMobile ? 'sm' : 'md'}
                  lineHeight="1.2"
                  weight="400"
                >
                  Current
                </Typography>
              </FluidContainer>
            </DirectorySquares>
          </StyledLink>
          {/* <DirectorySquares>
              <Typography
                as="h3"
                variant="span"
                size={isMobile ? 'sm' : 'lg'}
                lineHeight="1.2"
                weight="700"
              >
                2024
              </Typography>
            </DirectorySquares>
            <DirectorySquares>
              <Typography
                as="h3"
                variant="span"
                size={isMobile ? 'sm' : 'lg'}
                lineHeight="1.2"
                weight="700"
              >
                2023
              </Typography>
            </DirectorySquares> */}
        </DirectorySection>
      </FluidContainer>

      <FluidContainer
        flex
        justify-content="space-between"
        alignItems="center"
        backgroundColor="greyDarkest"
        flexDirection="column"
        padding={isMobile ? '' : '96px 72px 36px 72px'}
      >
        <Typography
          variant="title"
          as="h2"
          size={isMobile ? 'lg' : '3xl'}
          color="primary"
        >
          Ready to Join <NonBreakingSpan>U&ndash;Krew?</NonBreakingSpan>
        </Typography>
        <FluidContainer innerMaxWidth="800px">
          <Typography
            margin="24px 0"
            as="p"
            variant="span"
            size={isMobile ? 'sm' : 'lg'}
            lineHeight="1.2"
            color="white"
          >
            Take the next step in your career journey. Join a team that values
            growth, collaboration, and making a real impact on campus life.
          </Typography>
        </FluidContainer>
        <FluidContainer flex justifyContent="center" gap="36px" padding="0">
          <Button href="/employment">Apply</Button>
          <Button href="#positions" variant="whiteOutline">
            Learn More
          </Button>
        </FluidContainer>
        <FluidContainer
          flex
          justifyContent="center"
          gap={isMobile ? '35px' : isTablet ? '35px' : '100px'}
          alignItems="flex-start"
          padding="48px"
        >
          <FluidContainer
            flex
            flexDirection="column"
            padding="0"
            alignItems="center"
            justifyContent="center"
          >
            <CountUp
              end={80}
              duration={3000}
              variant="title"
              as="h2"
              size={isMobile ? 'lg' : '3xl'}
              color="primary"
              showPlus
              format={(n) => n.toLocaleString()}
            />
            <Typography
              as="h3"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
              color="white"
            >
              Student Positions
            </Typography>
          </FluidContainer>
          <FluidContainer
            flex
            flexDirection="column"
            padding="0"
            alignItems="center"
            justifyContent="center"
          >
            <CountUp
              end={6}
              duration={3000}
              variant="title"
              as="h2"
              size={isMobile ? 'lg' : '3xl'}
              color="primary"
              format={(n) => n.toLocaleString()}
            />
            <Typography
              as="h3"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
              color="white"
            >
              Departments
            </Typography>
          </FluidContainer>
          <FluidContainer
            flex
            flexDirection="column"
            padding="0"
            alignItems="center"
            justifyContent="center"
          >
            <CountUp
              end={50}
              duration={3000}
              variant="title"
              as="h2"
              size={isMobile ? 'lg' : '3xl'}
              color="primary"
              format={(n) => n.toLocaleString()}
            />
            <Typography
              as="h3"
              variant="span"
              size={isMobile ? 'sm' : 'lg'}
              lineHeight="1.2"
              color="white"
            >
              Years of Excellence
            </Typography>
          </FluidContainer>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
