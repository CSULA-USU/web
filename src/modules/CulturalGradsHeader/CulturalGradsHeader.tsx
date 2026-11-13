import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPause, FaPlay } from 'react-icons/fa';
import { Image, Typography } from 'components';
import { Colors, FontSizes, Radii, Spaces, media } from 'theme';

interface StripPhoto {
  src: string;
  alt: string;
  /* Intrinsic size. The strip sets each photo's height and lets the width
     follow, so without these a photo that has not loaded yet has no width and
     leaves a blank stretch in the strip. */
  width: number;
  height: number;
}

interface CulturalGradsHeaderProps {
  images: StripPhoto[];
}

/* AnchorNav floats over the top of the hero, so the hero's content starts
   below the bar's height (AnchorNav's NAV_OFFSET). */
const NAV_CLEARANCE = '84px';

const TITLE_SIZE = `clamp(${FontSizes['2xl']}, 6vw, ${FontSizes['5xl']})`;

const STRIP_HEIGHT = { wide: '240px', tablet: '140px' };

const Hero = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: 640px;
  /* A small image stretched across a very large area, kept under a flat 80%
     black on purpose: the darkness is what hides the upscaling. Lighten it
     only together with a larger source image. */
  background: ${Colors.black}
    url('/departments/ccc/clsrc/nuestra-grad/header-background.png') center
    bottom / cover no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.8);
  }

  ${media('tablet')(`
    min-height: 360px;
  `)}
`;

/* Photo and title travel as one centered group, with the title centered on
   the photo's height. The side padding steps with FluidContainer's own
   gutters so the hero lines up with the sections below it. */
const HeroInner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: calc(${NAV_CLEARANCE} + ${Spaces.lg}) ${Spaces['2xl']} ${Spaces.xl};
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  align-items: center;
  gap: ${Spaces['2xl']};

  ${media('desktop')(`
    padding-left: ${Spaces.xl};
    padding-right: ${Spaces.xl};
    gap: ${Spaces.xl};
  `)}

  ${media('tablet')(`
    grid-template-columns: minmax(0, 1fr);
    justify-content: stretch;
  `)}

  ${media('mobile')(`
    padding-left: ${Spaces.md};
    padding-right: ${Spaces.md};
  `)}
`;

const Feature = styled.figure`
  margin: 0;
  width: clamp(260px, 26vw, 360px);

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 842 / 999;
    object-fit: cover;
    border-radius: ${Radii.surface};
    /* A hairline rather than one of the theme's shadows: those are tuned for
       light pages and disappear against this near-black ground. */
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
  }

  /* Beside the title it is a supporting photo; at phone width it would push
     the title below the fold, and the strip below already carries photos. */
  ${media('tablet')(`
    display: none;
  `)}
`;

const FeatureCaption = styled.figcaption`
  margin-top: ${Spaces.md};
  text-align: right;
  font-size: ${FontSizes.xs};
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.8);
`;

const PresentedBy = styled.p`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  /* Optical alignment. The title's lines all start on round capitals (C, G,
     C), whose curves read as sitting right of the true left edge, so a line
     set flush to that edge looks like it sticks out. Indenting by a fraction
     of the title's size keeps the correction in step as the title scales. */
  margin: ${Spaces.lg} 0 0 calc(${TITLE_SIZE} * 0.07);
  font-size: ${FontSizes.xs};
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);

  &::before {
    content: '';
    flex: none;
    width: 16px;
    height: 2px;
    background-color: ${Colors.primary};
  }
`;

/* The track holds the photo set twice and slides left by exactly one set,
   then starts over. At that moment the second set sits exactly where the
   first began, so the loop has no seam and never runs out of photos. */
const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Strip = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: ${Spaces.xs};
  background-color: ${Colors.black};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: ${Spaces['2xl']};
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, ${Colors.black}, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, ${Colors.black}, transparent);
  }

  ${media('tablet')(`
    &::before, &::after { width: ${Spaces.lg}; }
  `)}

  /* No drift: the strip becomes a row the visitor can scroll themselves. */
  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
  }
`;

const Track = styled.div<{ $paused: boolean }>`
  display: flex;
  width: max-content;
  animation: ${drift} 100s linear infinite;
  animation-play-state: ${(p) => (p.$paused ? 'paused' : 'running')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Spacing is a margin on every photo, the last one included, rather than a
   flex gap: both copies of the set must be exactly the same width for the
   loop to line up, and a gap leaves no space after the final photo. */
const PhotoSet = styled.div`
  display: flex;
  flex: none;

  img {
    height: ${STRIP_HEIGHT.wide};
    width: auto;
    margin-right: ${Spaces.xs};
  }

  ${media('tablet')(`
    img { height: ${STRIP_HEIGHT.tablet}; }
  `)}
`;

/* The second copy exists only for the loop. With motion reduced there is no
   loop, so it would just repeat every photo at the end of the row. */
const LoopCopy = styled(PhotoSet)`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

/* Bottom-left on purpose: the site's fixed back-to-top button lives in the
   bottom-right corner and sits on top of anything placed there. */
const StripToggle = styled.button`
  position: absolute;
  left: ${Spaces.md};
  bottom: ${Spaces.md};
  z-index: 2;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: ${Radii.circle};
  background-color: rgba(0, 0, 0, 0.7);
  color: ${Colors.white};
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 3px;
  }

  /* Nothing moves, so there is nothing to pause. */
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const renderPhotos = (images: StripPhoto[]) =>
  images.map((photo) => (
    <Image
      key={photo.src}
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
    />
  ));

export const CulturalGradsHeader = ({ images }: CulturalGradsHeaderProps) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <>
      <Hero>
        <HeroInner>
          <Feature>
            <Image
              src="/departments/ccc/cultural-grads/nuestra-grads-celebrating-onstage.png"
              alt="2022 nuestra graduate participants on stage"
              width={842}
              height={999}
            />
            <FeatureCaption>Nuestra Grad &apos;22</FeatureCaption>
          </Feature>
          <div>
            <Typography
              as="h1"
              variant="pageHeader"
              fluidSize={TITLE_SIZE}
              lineHeight="1.04"
              letterSpacing="-0.01em"
              color="white"
              margin="0"
              style={{ maxWidth: '9ch' }}
            >
              Cultural Graduation Celebrations
            </Typography>
            <PresentedBy>Presented by: The U-SU &amp; CCC</PresentedBy>
          </div>
        </HeroInner>
      </Hero>
      <Strip>
        <Track $paused={isPaused}>
          <PhotoSet>{renderPhotos(images)}</PhotoSet>
          <LoopCopy aria-hidden="true">{renderPhotos(images)}</LoopCopy>
        </Track>
        <StripToggle
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? 'Play photo strip' : 'Pause photo strip'}
        >
          {isPaused ? (
            <FaPlay size={14} aria-hidden="true" />
          ) : (
            <FaPause size={14} aria-hidden="true" />
          )}
        </StripToggle>
      </Strip>
    </>
  );
};
