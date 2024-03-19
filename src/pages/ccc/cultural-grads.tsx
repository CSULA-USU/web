'use client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Button,
  Divider,
  FlatCard,
  FluidContainer,
  Image,
  Panel,
  Typography,
} from 'components';
import { BiChevronRight } from 'react-icons/bi';
import { CulturalGradsHeader, Page } from 'modules';
import { Spaces } from 'theme';
import CulturalGradsData from 'data/cgc-data.json';
import { useBreakpoint } from 'hooks';

const IncentiveCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const slideshowImages = CulturalGradsData['header-images'];
const cards = CulturalGradsData['info-cards'];
const questions = CulturalGradsData['questions'];
const incentives = CulturalGradsData['incentives'];

const DynamicExpandable = dynamic(
  () => import('../../components/Expandable').then((mod) => mod.Expandable),
  { ssr: false },
);

const DynamicImageAndCard = dynamic(
  () =>
    import('../../components/Card/ImageAndCard').then(
      (mod) => mod.ImageAndCard,
    ),
  { ssr: false },
);

export default function CulturalGrads() {
  const { isMobile } = useBreakpoint();
  const [showFAQ, setShowFAQ] = useState(false);
  const [showIncentives, setShowIncentives] = useState(false);
  const [showGraduations, setShowGraduations] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the position of FAQ section relative to the viewport
      const faqSection = document.getElementById('faq-section');
      if (faqSection && !showFAQ) {
        const rect = faqSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setShowFAQ(true);
        }
      }
    };

    const incentivesSection = document.getElementById('incentives-section');
    if (incentivesSection && !showIncentives) {
      const incentivesRect = incentivesSection.getBoundingClientRect();
      if (incentivesRect.top < window.innerHeight) {
        setShowIncentives(true);
      }
    }

    const graduationsSection = document.getElementById('graduations-section');
    if (graduationsSection && !showGraduations) {
      const incentivesRect = graduationsSection.getBoundingClientRect();
      if (incentivesRect.top < window.innerHeight) {
        setShowGraduations(true);
      }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIncentives, showFAQ, showGraduations]);

  return (
    <Page>
      <Head>
        <title>Cultural Graduation Celebrations</title>
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
      <CulturalGradsHeader images={slideshowImages} />
      {isMobile ? (
        <></>
      ) : (
        <>
          <FluidContainer flex justifyContent="space-around" flexWrap="wrap">
            {cards.map((e, i) => (
              <div key={i}>
                <Button href={`#${e.id}`} variant="transparent" notALink>
                  <Image
                    src={e.iconSrc}
                    alt={e.iconAlt}
                    size={100}
                    style={{ objectFit: 'scale-down' }}
                    lazy
                  />
                </Button>
              </div>
            ))}
          </FluidContainer>
        </>
      )}

      <FluidContainer>
        <Panel backgroundColor="black">
          <Typography as="h2" variant="label" color="primary">
            Dear Cal State LA Prospective Graduate,
          </Typography>
          <Typography as="p" variant="copy" color="white">
            These celebrations are great opportunities to acknowledge your
            academic achievements, honor your families, communities, and other
            significant people in your lives, and to celebrate the cultural
            influences that have contributed to your academic success. The
            celebrations are open to all students who would like to sign up and
            participate. You deserve to celebrate your achievements with
            cultural influences that are integral to your being and important to
            you and your community! Apply now!
          </Typography>
        </Panel>
      </FluidContainer>
      <FluidContainer>
        <Typography
          as="p"
          variant="copy"
          color="black"
          style={{
            ...(isMobile ? { textAlign: 'left' } : { textAlign: 'center' }),
          }}
        >
          <Typography>
            <strong>All</strong> graduating students of all degree
            types&mdash;bachelor&apos;s, master&apos;s,
            doctorate&apos;s&mdash;who are interested are welcome to apply.
          </Typography>
          <br />
          <Typography>
            Priority is given to spring 2024 graduates, but fall 2024 graduates
            are welcome to apply as well.
          </Typography>
          <br />
          <Typography>
            This year&apos;s Cultural Graduation Celebrations are{' '}
            <strong>free</strong> to all graduating students who sign up. Please
            make sure you sign up by the deadline.
          </Typography>
          <br />
          <Typography>
            Spaces are limited for each Cultural Graduation Celebration.
          </Typography>
          <br />
          <Typography>Deadline for applications: March 29 at 5 PM</Typography>
        </Typography>
      </FluidContainer>
      <div id="graduations-section">
        {showGraduations && (
          <FluidContainer>
            <Typography
              margin={`${Spaces.md} 0`}
              as="h2"
              variant={isMobile ? 'subheader' : 'title'}
            >
              Graduations
            </Typography>
            {cards.map((card, i) => (
              <div id={card.id} key={`${card.id}-${i}`}>
                <DynamicImageAndCard
                  index={i}
                  title={card.title}
                  subheader={card.subheader}
                  copy={card.copy}
                  iconAlt={card.iconAlt}
                  iconSrc={card.iconSrc}
                  buttonLink={card.applicationLink}
                  imgSrc={card.imgSrc}
                  imgAlt={card.imgAlt}
                />
              </div>
            ))}
          </FluidContainer>
        )}
      </div>
      <div id="incentives-section">
        {showIncentives && (
          <FluidContainer>
            <Typography
              margin={`${Spaces.md} 0`}
              as="h2"
              variant={isMobile ? 'subheader' : 'title'}
            >
              Incentives
            </Typography>
            <IncentiveCardsContainer>
              {incentives.map((e, i) => (
                <FlatCard key={i} imgSrc={e.src} imgAlt={e.alt}>
                  {e.description}
                </FlatCard>
              ))}
            </IncentiveCardsContainer>
          </FluidContainer>
        )}
      </div>
      <div id="faq-section">
        {showFAQ && (
          <FluidContainer backgroundColor="black">
            <div>
              <Typography
                color="primary"
                variant={isMobile ? 'subheader' : 'title'}
                as="h2"
              >
                Graduate Participation Information
              </Typography>
            </div>
            {/* Render FAQ content */}
            {/* Replace questions.map with your FAQ content */}
            {/* Ensure to remove DynamicExpandable and use Expandable directly if you're not dynamically rendering */}
            {questions.map((e, i) => (
              <React.Fragment key={i}>
                <DynamicExpandable
                  indicator={<BiChevronRight color="white" size={48} />}
                  header={
                    <Typography
                      variant="label"
                      color="white"
                      as="h3"
                      margin={`${Spaces.sm} 0`}
                    >
                      {e.question}
                    </Typography>
                  }
                >
                  <Typography color="white" as="p">
                    {Array.isArray(e.answer) ? (
                      <>
                        <ul>
                          {e.answer.map((e, answerKey) => (
                            <li key={`answer-${answerKey}`}>{e}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <> {e.answer}</>
                    )}
                  </Typography>
                </DynamicExpandable>
                <Divider color="gold" />
              </React.Fragment>
            ))}
          </FluidContainer>
        )}
      </div>
      {/* <FluidContainer
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
      </FluidContainer> */}
    </Page>
  );
}
