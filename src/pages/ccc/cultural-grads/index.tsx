'use client';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import {
  AnchorNav,
  Divider,
  Expandable,
  FluidContainer,
  Image,
  Typography,
} from 'components';
import { BiChevronRight } from 'react-icons/bi';
import {
  CulturalGradsHeader,
  FooterExtension,
  ImageWithinCard,
  Page,
} from 'modules';
import { Colors, FontSizes, Radii, Spaces, media } from 'theme';
import CulturalGradsData from 'data/cgc-data.json';
import { PhotoVideoDisclaimer } from 'partials';

/* Matches AnchorNav's NAV_OFFSET, so an anchor jump lands below the bar. */
const SECTION_SCROLL_MARGIN = '84px';

/* One size for every section heading on the page, stepping from 24px on
   phones to 36px. Set in CSS rather than through useBreakpoint, which reports
   'desktop' until after hydration and so makes phone headings jump. */
const SECTION_TITLE_SIZE = `clamp(${FontSizes.lg}, 5vw, ${FontSizes['2xl']})`;

const anchorLinks = [
  { label: 'Celebrations', href: '#celebrations' },
  { label: 'FAQ', href: '#faq' },
];

/* Wide screens: the letter on the left, the centers' marks on the right,
   then a rule and the open-to-all statement across the full width. Below
   desktop width the marks drop under the letter as a single row. */
const Letter = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'letter marks'
    'rule rule'
    'statement statement';
  align-items: center;
  gap: ${Spaces.xl} ${Spaces['2xl']};
  padding: ${Spaces['2xl']};
  border-radius: ${Radii.surface};
  background-color: ${Colors.black};

  ${media('desktop')(`
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'letter' 'marks' 'rule' 'statement';
    gap: ${Spaces.xl};
  `)}

  ${media('tablet')(`
    padding: ${Spaces.xl} ${Spaces.lg};
  `)}
`;

const LetterText = styled.div`
  grid-area: letter;
  display: grid;
  gap: ${Spaces.lg};
`;

const LetterRule = styled.hr`
  grid-area: rule;
  width: 100%;
  margin: 0;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
`;

/* The marks sit on the corners of a regular polygon, one corner per center,
   starting at the top and running clockwise in the list's (alphabetical)
   order, which is also the keyboard order. Positions are computed from the
   count, so adding or removing a celebration keeps the shape regular — five
   centers make the pentagon. */
const RING_MARK_SIZE = 88;
const RING_RADIUS = 104;

const ringLayoutCSS = (count: number) => {
  const corners = Array.from({ length: count }, (_, index) => {
    const angle = ((-90 + (360 * index) / count) * Math.PI) / 180;
    return [Math.cos(angle), Math.sin(angle)];
  });
  const xs = corners.map(([x]) => x);
  const ys = corners.map(([, y]) => y);
  const [minX, minY] = [Math.min(...xs), Math.min(...ys)];
  const width = (Math.max(...xs) - minX) * RING_RADIUS + RING_MARK_SIZE;
  const height = (Math.max(...ys) - minY) * RING_RADIUS + RING_MARK_SIZE;
  const placements = corners
    .map(
      ([x, y], index) => `
        li:nth-child(${index + 1}) {
          left: ${((x - minX) * RING_RADIUS).toFixed(1)}px;
          top: ${((y - minY) * RING_RADIUS).toFixed(1)}px;
        }`,
    )
    .join('');
  return `
    width: ${width.toFixed(1)}px;
    height: ${height.toFixed(1)}px;
    li { position: absolute; }
    ${placements}
  `;
};

/* The centers sign the letter: each mark jumps to its celebration's card. */
const SignOff = styled.ul<{ $count: number }>`
  --mark-size: ${RING_MARK_SIZE}px;
  grid-area: marks;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  ${(p) => ringLayoutCSS(p.$count)}

  /* A single row spread edge to edge, marks growing with the screen up to
     their ring size. */
  ${media('desktop')(`
    --mark-size: clamp(48px, 14vw, ${RING_MARK_SIZE}px);
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    li { position: static; }
  `)}
`;

/* White discs for the same reason StaffCard's PhotoFrame is white: several
   of these marks are dark or transparent and vanish on black. Icon-only
   links lift rather than fill, per the site's hover rules. */
const SignOffLink = styled.a`
  display: grid;
  place-items: center;
  width: var(--mark-size);
  height: var(--mark-size);
  border-radius: ${Radii.circle};
  background-color: ${Colors.white};
  transition: transform 160ms ease, box-shadow 160ms ease;

  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 0 3px ${Colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const Statement = styled.div`
  grid-area: statement;
  padding-left: ${Spaces.lg};
  border-left: 3px solid ${Colors.primary};
`;

const CardList = styled.div`
  display: grid;
  gap: ${Spaces.xl};
`;

const slideshowImages = CulturalGradsData['header-images'];
const cards = CulturalGradsData['info-cards'];
const questions = CulturalGradsData['questions'];

const pageTitle = 'Cultural Graduation Celebrations';
const pageUrl = 'https://www.calstatelausu.org/ccc/cultural-grads';
const pageDescription =
  'Celebrate your achievements through Cultural Graduation Celebrations hosted by the Cross Cultural Centers at Cal State LA University-Student Union. Open to all participating students.';
const socialImageUrl =
  'https://www.calstatelausu.org/departments/ccc/clsrc/nuestra-grad/nuestra-graduate.png';
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: pageTitle,
      url: pageUrl,
      description: pageDescription,
      image: socialImageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'University-Student Union at Cal State LA',
        url: 'https://www.calstatelausu.org',
      },
    },
    {
      '@type': 'Organization',
      name: 'The University Student Union Cross Cultural Centers',
      url: pageUrl,
      parentOrganization: {
        '@type': 'Organization',
        name: 'University-Student Union at Cal State LA',
        url: 'https://www.calstatelausu.org',
      },
    },
  ],
};

export default function CulturalGrads() {
  return (
    <Page>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={pageDescription} key="description" />
        <meta
          name="author"
          content="The University Student Union Cross Cultural Centers"
          key="author"
        />
        <link rel="canonical" href={pageUrl} key="canonical" />

        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:site_name"
          content="University-Student Union at Cal State LA"
          key="og-site-name"
        />
        <meta property="og:url" content={pageUrl} key="og-url" />
        <meta property="og:title" content={pageTitle} key="og-title" />
        <meta
          property="og:description"
          content={pageDescription}
          key="og-desc"
        />
        <meta property="og:image" content={socialImageUrl} key="og-image" />

        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <AnchorNav
        title="Cultural Graduation Celebrations"
        links={anchorLinks}
        tone="dark"
      />
      <CulturalGradsHeader images={slideshowImages} />
      <FluidContainer>
        <Letter>
          <LetterText>
            <Typography
              as="h2"
              variant="title"
              fluidSize={SECTION_TITLE_SIZE}
              lineHeight="1.15"
              color="primary"
              margin="0"
            >
              Dear Cal State LA Prospective Graduate,
            </Typography>
            <Typography
              as="p"
              variant="copy"
              size="md"
              lineHeight="1.7"
              color="white"
              margin="0"
              style={{ maxWidth: '72ch' }}
            >
              Cultural Graduation Celebrations are great opportunities to
              acknowledge your academic achievements, honor your families,
              communities, and other significant people in your lives, and to
              celebrate the cultural influences that have contributed to your
              academic success. You deserve to celebrate your achievements with
              cultural influences that are integral to your being and important
              to you and your community! Applications open on February 9, 2026!
            </Typography>
          </LetterText>
          <SignOff $count={cards.length}>
            {cards.map((card) => (
              <li key={card.id}>
                <SignOffLink href={`#${card.id}`} aria-label={card.title}>
                  <Image src={card.iconSrc} alt="" />
                </SignOffLink>
              </li>
            ))}
          </SignOff>
          <LetterRule />
          <Statement>
            <Typography
              as="p"
              variant="copy"
              fluidSize={`clamp(${FontSizes.md}, 2.5vw, ${FontSizes.lg})`}
              lineHeight="1.45"
              color="white"
              margin="0"
              style={{ maxWidth: '60ch' }}
            >
              Open to all students who would like to sign up and participate
              regardless of race, sex, color, ethnicity, or national origin.
            </Typography>
          </Statement>
        </Letter>
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
      {/* Every section is rendered on the server and never scroll-gated:
          content that only enters the DOM on scroll is never indexed, because
          crawlers do not scroll, and an anchor link to it would land nowhere. */}
      <FluidContainer
        id="celebrations"
        scrollMarginTop={SECTION_SCROLL_MARGIN}
        padding={`0 ${Spaces['2xl']} ${Spaces['2xl']}`}
        /* Below desktop width the letter section's own bottom padding drops
           to 18px, too tight against this heading, so the gap moves here. */
        paddingDesktop={`${Spaces.lg} ${Spaces.xl} ${Spaces.xl}`}
        paddingMobile={`${Spaces.lg} ${Spaces.md} ${Spaces.xl}`}
      >
        <Typography
          as="h2"
          variant="title"
          fluidSize={SECTION_TITLE_SIZE}
          lineHeight="1.15"
          margin={`0 0 ${Spaces.lg}`}
        >
          Graduation Celebrations
        </Typography>
        <CardList>
          {cards.map((card) => (
            <ImageWithinCard
              key={card.id}
              id={card.id}
              title={card.title}
              subheader={card.subheader}
              details={card.copy}
              iconSrc={card.iconSrc}
              imgSrc={card.imgSrc}
              imgAlt={card.imgAlt}
              /* Only the first link is shown, as on the page before. */
              button={card.button[0]}
            />
          ))}
        </CardList>
      </FluidContainer>
      <FluidContainer
        id="faq"
        scrollMarginTop={SECTION_SCROLL_MARGIN}
        backgroundColor="black"
      >
        <Typography
          as="h2"
          variant="title"
          fluidSize={SECTION_TITLE_SIZE}
          lineHeight="1.15"
          color="primary"
          margin={`0 0 ${Spaces.md}`}
        >
          Graduate Participation Information
        </Typography>
        {questions.map((faq) => (
          <React.Fragment key={faq.question}>
            <Expandable
              headingLevel={3}
              indicator={
                <BiChevronRight color="white" size={48} aria-hidden="true" />
              }
              header={
                <Typography
                  variant="label"
                  fluidSize={`clamp(${FontSizes.md}, 2.5vw, ${FontSizes.lg})`}
                  color="white"
                  as="span"
                  margin={`${Spaces.sm} 0`}
                >
                  {faq.question}
                </Typography>
              }
            >
              {/* A div, not a p: some answers are lists, and a list inside
                  a paragraph is invalid HTML that breaks hydration. */}
              <Typography color="white" as="div">
                {Array.isArray(faq.answer) ? (
                  <ul>
                    {faq.answer.map((answerLine) => (
                      <li key={answerLine}>{answerLine}</li>
                    ))}
                  </ul>
                ) : (
                  faq.answer
                )}
              </Typography>
            </Expandable>
            <Divider color="gold" />
          </React.Fragment>
        ))}
      </FluidContainer>
      <PhotoVideoDisclaimer />
      <FooterExtension
        text="Consider a gift to the University-Student Union to help make our Cultural Graduation Celebrations a meaningful experience for students and their families. Thank you for your support!"
        highlight="Give to the U-SU"
        url="https://host.nxt.blackbaud.com/donor-form/?svcid=renxt&formId=dfe9b9e1-20b1-4d92-917d-4d29d91438b7&envid=p-3IGxPccVJUKbRONNvdF98g&zone=usa"
        isExternalLink
      />
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
