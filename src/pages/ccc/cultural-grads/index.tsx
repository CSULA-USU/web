'use client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Image } from 'components';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Divider,
  FlatCard,
  FluidContainer,
  Panel,
  Typography,
} from 'components';
import { BiChevronRight } from 'react-icons/bi';
import { CulturalGradsHeader, Page } from 'modules';
import { Spaces } from 'theme';
import CulturalGradsData from 'data/cgc-data.json';
import { useBreakpoint } from 'hooks';
import { PhotoVideoDisclaimer } from 'partials';

const GradButtonContainer = styled.div`
  height: 100px;
  width: 100px;
`;
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
  () => import('../../../components/Expandable').then((mod) => mod.Expandable),
  { ssr: false },
);

const DynamicImageWithinCard = dynamic(
  () =>
    import('../../../modules/ImageWithinCard').then(
      (mod) => mod.ImageWithinCard,
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
          content="The University Student Union Cross Cultural Centers"
          key="author"
        />
        <meta
          name="keywords"
          content="CSULA, Cal State LA, college, Los Angeles, Student Union, Cross Cultural Centers, CCC, U-SU, University Student, Cultural Graduation, Black, APIDA, Pride, Nuestra"
          key="keywords"
        />
        <meta
          name="description"
          content="The Cross Cultural Centers in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA. These celebrations are great opportunities to acknowledge your academic achievements, honor your families, communities, and other significant people in your lives, and to celebrate the cultural influences that have contributed to your academic success. The celebrations are open to all students who would like to sign up and participate. You deserve to celebrate your achievements with cultural influences that are integral to your being and important to you and your community! Apply now!"
          key="description"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        />
        <meta property="og:title" content="Cultural Graduation Celebrations" />
        <meta
          property="og:description"
          content="The Cross Cultural Centers in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA. These celebrations are great opportunities to acknowledge your academic achievements, honor your families, communities, and other significant people in your lives, and to celebrate the cultural influences that have contributed to your academic success. The celebrations are open to all students who would like to sign up and participate. You deserve to celebrate your achievements with cultural influences that are integral to your being and important to you and your community! Apply now!"
        />
        <meta
          property="og:image"
          content="/departments/ccc/clsrc/nuestra-grad/nuestra-graduate.png"
        />
        <meta
          property="og:url"
          content="https://www.calstatelausu.org/ccc/cultural-grads"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cultural Graduation Celebrations" />
        <meta
          name="twitter:description"
          content="The Cross Cultural Centers in the Cal State LA University-Student Union serves as a hub for involvement, recreation, and leadership, adding to the value of campus life at Cal State LA. These celebrations are great opportunities to acknowledge your academic achievements, honor your families, communities, and other significant people in your lives, and to celebrate the cultural influences that have contributed to your academic success. The celebrations are open to all students who would like to sign up and participate. You deserve to celebrate your achievements with cultural influences that are integral to your being and important to you and your community! Apply now!"
        />
        <meta
          name="twitter:image"
          content="/departments/ccc/clsrc/nuestra-grad/nuestra-graduate.png"
        />
      </Head>
      <CulturalGradsHeader images={slideshowImages} />
      {isMobile ? (
        <></>
      ) : (
        <FluidContainer
          flex
          justifyContent="space-around"
          flexWrap="wrap"
          innerMinHeight="100px"
          padding="36px 72px 0px"
        >
          {cards.map((e, i) => (
            <GradButtonContainer key={i}>
              <Image
                src={e.iconSrc}
                alt=""
                style={{ objectFit: 'scale-down' }}
                width={100}
                height={100}
                lazy
              />
            </GradButtonContainer>
          ))}
        </FluidContainer>
      )}
      <FluidContainer
        innerMinHeight="122px"
        padding={isMobile ? '16px 16px 0px' : '36px 72px 0px'}
      >
        <Panel backgroundColor="black">
          <Typography as="h2" variant="label" color="primary">
            Dear Cal State LA Prospective Graduate,
          </Typography>
          <Typography as="p" variant="copy" color="white">
            These celebrations are great opportunities to acknowledge your
            academic achievements, honor your families, communities, and other
            significant people in your lives, and to celebrate the cultural
            influences that have contributed to your academic success. You
            deserve to celebrate your achievements with cultural influences that
            are integral to your being and important to you and your community!
            Applications open on February 9, 2026!
          </Typography>
          <Typography as="p" variant="copy" color="primary">
            The celebrations are open to all students who would like to sign up
            and participate.
          </Typography>
        </Panel>
      </FluidContainer>
      {/* <FluidContainer
        innerMinHeight="216px"
        padding={isMobile ? '16px 36px 0px' : '36px 72px 0px'}
      >
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
            Priority is given to spring 2025 graduates, but fall 2025 graduates
            are welcome to apply as well.
          </Typography>
          <br />
          <Typography>
            This year&apos;s Cultural Graduation Celebrations are{' '}
            <strong>free</strong> to all graduating students who sign up. Please
            make sure you sign up by the deadline (to be announced).
          </Typography>
          <br />
          <Typography>
            Spaces are limited for each Cultural Graduation Celebration.
          </Typography>
          <br />
          <Typography>Deadline for applications: TBD</Typography>
        </Typography>
      </FluidContainer> */}
      <div id="graduations-section">
        {showGraduations && (
          <FluidContainer>
            <Typography
              margin={isMobile ? '0px' : `${Spaces.md} 0 0`}
              as="h2"
              variant="title"
              size={isMobile ? 'lg' : '2xl'}
            >
              Graduation Celebrations
            </Typography>
            {cards.map((card, i) => {
              return (
                <div key={`${card.id}-${i}`}>
                  <DynamicImageWithinCard
                    index={i}
                    title={card.title}
                    subheader={card.subheader}
                    copy={card.copy}
                    iconAlt={card.iconAlt}
                    iconSrc={card.iconSrc}
                    imgSrc={card.imgSrc}
                    imgAlt={card.imgAlt}
                    button={card.button}
                  />
                </div>
              );
            })}
          </FluidContainer>
        )}
      </div>
      <div id="incentives-section">
        {showIncentives && (
          <FluidContainer>
            <Typography
              margin={isMobile ? '0px 0px 24px' : `${Spaces.md} 0`}
              as="h2"
              variant="title"
              size={isMobile ? 'lg' : '2xl'}
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
            <PhotoVideoDisclaimer />
            <FluidContainer flex justifyContent="center">
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'lg' : '2xl'}
              >
                Open to all who are interested to participate regardless of
                race, sex, color, ethnicity, or national origin
              </Typography>
            </FluidContainer>
          </FluidContainer>
        )}
      </div>
      <div id="faq-section">
        {showFAQ && (
          <FluidContainer backgroundColor="black">
            <div>
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'lg' : '2xl'}
                color="primary"
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
                      size={isMobile ? 'md' : 'lg'}
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
        <LegacyImage
          src="/departments/ccc/ccc-grad-banner.jpg"
          alt="cultural grad banner"
          width="100%"
          height="fit-content"
        />
      </FluidContainer> */}
    </Page>
  );
}
