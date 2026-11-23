import { useRef, useSyncExternalStore } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import { Image, Typography } from 'components';
import { Colors, FontSizes, Radii, Spaces, media } from 'theme';
import { useDriftControls } from './useDriftControls';

interface StripPhoto {
  src: string;
  alt: string;
  /**
   * "portrait" gets a 2:3 frame; anything else, or nothing, gets 3:2. Typed
   * as a string because JSON imports widen literals, so the data file cannot
   * be checked against a union.
   */
  orientation?: string;
}

interface CulturalGradsHeaderProps {
  images: StripPhoto[];
}

/* AnchorNav floats over the top of the hero, so the hero's content starts
   below the bar's height (AnchorNav's NAV_OFFSET). */
const NAV_CLEARANCE = '84px';

const TITLE_SIZE = `clamp(${FontSizes['2xl']}, 6vw, ${FontSizes['5xl']})`;

/* In px. Numbers rather than CSS strings because the drift duration and the
   eager-load count below are computed from the wide height. */
const STRIP_HEIGHT = { wide: 240, tablet: 140 };
const PHOTO_GAP = Spaces.xs;

/* The drift is set as a speed, not a duration: a fixed duration makes every
   added photo speed the strip up. Measured at the wide height, so the tablet
   strip, being shorter, drifts proportionally slower over the same time. */
const DRIFT_PX_PER_SECOND = 34;

/* Photos that can be on screen at first paint load eagerly; the rest are
   lazy. Sized for a 1920px-wide screen, the widest common one. */
const EAGER_COVERAGE_PX = 1920;

const isPortrait = (photo: StripPhoto) => photo.orientation === 'portrait';

const photoWidthAtWide = (photo: StripPhoto) =>
  STRIP_HEIGHT.wide * (isPortrait(photo) ? 2 / 3 : 3 / 2) +
  parseFloat(PHOTO_GAP);

const driftSeconds = (images: StripPhoto[]) =>
  images.reduce((total, photo) => total + photoWidthAtWide(photo), 0) /
  DRIFT_PX_PER_SECOND;

/* Counts photos until they cover EAGER_COVERAGE_PX, so a set with portrait
   (narrower) photos gets more eager ones. */
const eagerPhotoCount = (images: StripPhoto[]) => {
  let coveredPx = 0;
  let count = 0;
  for (const photo of images) {
    if (coveredPx >= EAGER_COVERAGE_PX) break;
    coveredPx += photoWidthAtWide(photo);
    count += 1;
  }
  return count;
};

const Hero = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: 640px;
  /* Black is the finished look whenever the backdrop is missing — still
     loading, failed, or not yet requested — so nothing depends on it. */
  background-color: ${Colors.black};

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

/* A <picture> rather than a CSS background: backgrounds take neither srcset
   nor fetchPriority. It sits below the overlay (z-index -2 vs -1) inside
   Hero's isolated stack.

   The crops are 2:1 at 768, 1280 and 1920 wide, AVIF first with WebP for
   browsers without it. They are encoded at quality 45 because they only ever
   show through Hero's 80% black; lightening that overlay means re-exporting
   at a higher quality, or the compression starts to show. */
const BACKDROP_BASE_URL =
  'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/2026/new-carousel/better-images/nuestra_hero_q45';
const BACKDROP_WIDTHS = [768, 1280, 1920];

const backdropSrcSet = (format: 'avif' | 'webp') =>
  BACKDROP_WIDTHS.map(
    (width) =>
      `${BACKDROP_BASE_URL}/nuestra-hero-${width}-q45.${format} ${width}w`,
  ).join(', ');

const Backdrop = styled.picture`
  position: absolute;
  inset: 0;
  z-index: -2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
  }
`;

/* The backdrop is barely visible under the overlay, so it must never compete
   with the featured photo or the strip. On a fresh page load it is not
   requested until the window's load event, which waits for every eager image
   above it. On a client-side navigation the document is already loaded, so it
   requests at once — fetchPriority="low" is what keeps it behind the others
   there. The server snapshot is false, so hydration always matches the
   server's markup (no backdrop) before the client value takes over. */
const subscribeToWindowLoad = (onChange: () => void) => {
  window.addEventListener('load', onChange);
  return () => window.removeEventListener('load', onChange);
};

const useAfterWindowLoad = () =>
  useSyncExternalStore(
    subscribeToWindowLoad,
    () => document.readyState === 'complete',
    () => false,
  );

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

  /* Drifting, the strip is dragged by useDriftControls. pan-y hands vertical
     swipes to the page so the strip never traps scrolling on a phone, and
     keeps horizontal ones for the drag. */
  @media (prefers-reduced-motion: no-preference) {
    touch-action: pan-y;
    cursor: grab;
    user-select: none;

    &:active {
      cursor: grabbing;
    }
  }

  /* No drift: the strip becomes a row the visitor can scroll themselves. */
  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
  }
`;

/* Paused and played through the Web Animations API in useDriftControls, never
   animation-play-state — see that hook's header for why. */
const Track = styled.div<{ $durationSeconds: number }>`
  display: flex;
  width: max-content;
  /* One full pass over the set, timed from DRIFT_PX_PER_SECOND. */
  animation: ${drift} ${(p) => p.$durationSeconds}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Every photo sits in a fixed frame, 3:2 or 2:3, cropped to fill it. The
   frame's size comes from CSS alone, so a photo's width is known before the
   file arrives (no blank stretches while loading) and the data never needs
   pixel dimensions. Swapping in a photo of a different shape crops it rather
   than resizing the strip.

   Spacing is a margin on every photo, the last one included, rather than a
   flex gap: both copies of the set must be exactly the same width for the
   loop to line up, and a gap leaves no space after the final photo. */
const PhotoSet = styled.div`
  display: flex;
  flex: none;

  img {
    height: ${STRIP_HEIGHT.wide}px;
    width: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    margin-right: ${PHOTO_GAP};
  }

  img[data-orientation='portrait'] {
    aspect-ratio: 2 / 3;
  }

  ${media('tablet')(`
    img { height: ${STRIP_HEIGHT.tablet}px; }
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
   bottom-right corner and sits on top of anything placed there.

   Previous and next exist for WCAG 2.5.7 (Dragging Movements): everything a
   drag does must also be doable with single clicks, and they are how a mouse,
   switch or keyboard user moves the strip without dragging. */
const StripControls = styled.div`
  position: absolute;
  left: ${Spaces.md};
  bottom: ${Spaces.md};
  z-index: 2;
  display: flex;
  gap: ${Spaces.sm};

  /* Nothing moves, and the row scrolls natively, so there is nothing to
     pause or step. */
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const StripButton = styled.button`
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
`;

/* Lazy photos start loading early in Chrome and Edge, which give clipped
   containers like Strip a scroll margin. Firefox and Safari don't yet, so
   there a lazy photo starts loading as it reaches the strip's edge and can
   show as a black frame under the edge fade for a moment. That's acceptable
   for photos the visitor waits seconds to reach; the alternative is every
   visitor downloading the whole set up front. */
const renderPhotos = (images: StripPhoto[], eagerCount: number) =>
  images.map((photo, index) => (
    <Image
      key={photo.src}
      src={photo.src}
      alt={photo.alt}
      lazy={index >= eagerCount}
      data-orientation={isPortrait(photo) ? 'portrait' : 'landscape'}
    />
  ));

export const CulturalGradsHeader = ({ images }: CulturalGradsHeaderProps) => {
  const isWindowLoaded = useAfterWindowLoad();
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const photoSetRef = useRef<HTMLDivElement>(null);
  const { isPaused, togglePaused, stepBack, stepForward, pointerHandlers } =
    useDriftControls({ stripRef, trackRef, photoSetRef });

  return (
    <>
      <Hero>
        {isWindowLoaded && (
          <Backdrop>
            <source
              type="image/avif"
              srcSet={backdropSrcSet('avif')}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={backdropSrcSet('webp')}
              sizes="100vw"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image would re-encode crops that are already sized and compressed */}
            <img
              src={`${BACKDROP_BASE_URL}/nuestra-hero-1280-q45.webp`}
              alt=""
              fetchPriority="low"
              decoding="async"
            />
          </Backdrop>
        )}
        <HeroInner>
          <Feature>
            <Image
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/2026/new-carousel/better-images/051626NuestraGrad041_720x854.webp"
              alt="2026 nuestra graduate participant on stage waving"
              width={842}
              height={999}
            />
            <FeatureCaption>Nuestra Grad &apos;26</FeatureCaption>
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
            <PresentedBy>Presented by: The CCC</PresentedBy>
          </div>
        </HeroInner>
      </Hero>
      {/* Native image dragging is cancelled so a mouse drag moves the strip
          instead of lifting a ghost copy of the photo. */}
      <Strip
        ref={stripRef}
        onDragStart={(event) => event.preventDefault()}
        {...pointerHandlers}
      >
        <Track ref={trackRef} $durationSeconds={driftSeconds(images)}>
          <PhotoSet ref={photoSetRef}>
            {renderPhotos(images, eagerPhotoCount(images))}
          </PhotoSet>
          {/* All lazy: the copy reuses the first set's URLs, so its photos
              come from cache, and none of it is on screen at first paint. */}
          <LoopCopy aria-hidden="true">{renderPhotos(images, 0)}</LoopCopy>
        </Track>
        <StripControls role="group" aria-label="Photo strip">
          <StripButton
            type="button"
            onClick={stepBack}
            aria-label="Previous photo"
          >
            <FaChevronLeft size={14} aria-hidden="true" />
          </StripButton>
          <StripButton
            type="button"
            onClick={togglePaused}
            aria-label={isPaused ? 'Play photo strip' : 'Pause photo strip'}
          >
            {isPaused ? (
              <FaPlay size={14} aria-hidden="true" />
            ) : (
              <FaPause size={14} aria-hidden="true" />
            )}
          </StripButton>
          <StripButton
            type="button"
            onClick={stepForward}
            aria-label="Next photo"
          >
            <FaChevronRight size={14} aria-hidden="true" />
          </StripButton>
        </StripControls>
      </Strip>
    </>
  );
};
