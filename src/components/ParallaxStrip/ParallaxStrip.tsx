import { useEffect, useRef } from 'react';
import NextImage from 'next/image';
import styled from 'styled-components';
import { Colors } from 'theme';

const DEFAULT_TRAVEL = 0.5;

interface ParallaxOffsetInput {
  /** The strip's top edge, relative to the viewport. */
  stripTop: number;
  stripHeight: number;
  viewportHeight: number;
  /** Extra image height beyond the strip, as a share of the strip's height. */
  travel: number;
}

/**
 * How far to shift the image layer, in px, for the strip's current place in
 * the viewport. Positive moves it down.
 *
 * Progress runs 0 → 1 from the strip's top edge entering at the bottom of the
 * viewport to its bottom edge leaving at the top, so the strip's view walks
 * top-to-bottom down the photo as the visitor scrolls down. At halfway it is 0,
 * which is the layer's resting position, so a server render, a reduced-motion
 * visitor, and a strip parked mid-screen all show the same crop.
 */
export const getParallaxOffset = ({
  stripTop,
  stripHeight,
  viewportHeight,
  travel,
}: ParallaxOffsetInput) => {
  const progress = (viewportHeight - stripTop) / (viewportHeight + stripHeight);
  const clampedProgress = Math.min(1, Math.max(0, progress));
  return (0.5 - clampedProgress) * travel * stripHeight;
};

const Strip = styled.div<{ $height?: string; $backgroundColor: string }>`
  position: relative;
  overflow: hidden;
  ${(p) => p.$height && `height: ${p.$height};`}
  /* Shows while the lazy photo is still on its way, so the strip reads as a
     band rather than a hole. */
  background-color: ${(p) => p.$backgroundColor};
`;

/* Taller than the strip by `travel`, and centered on it at rest, so there is
   photo above and below the visible crop for the transform to reveal. Without
   the overhang the moving layer would pull its own edge into view.

   A blur samples past the layer's edges, so it fades them out; the layer is
   oversized by twice the radius on every side, as FluidContainer's blur layer
   is, to keep the faded seam outside the strip. The blur is a fixed filter on
   the moving layer, not a `backdrop-filter` on the content: the browser draws
   it once and only moves it, where a backdrop blur over a moving photo would
   be redrawn on every scroll frame. */
const ImageLayer = styled.div<{
  $travel: number;
  $objectPosition: string;
  $blur?: string;
}>`
  position: absolute;
  left: ${(p) => (p.$blur ? `calc(${p.$blur} * -2)` : '0')};
  right: ${(p) => (p.$blur ? `calc(${p.$blur} * -2)` : '0')};
  top: calc(
    ${(p) => (p.$travel / 2) * -100}% -
      ${(p) => (p.$blur ? `${p.$blur} * 2` : '0px')}
  );
  height: calc(
    ${(p) => (1 + p.$travel) * 100}% +
      ${(p) => (p.$blur ? `${p.$blur} * 4` : '0px')}
  );
  will-change: transform;
  ${(p) => p.$blur && `filter: blur(${p.$blur});`}

  img {
    object-fit: cover;
    object-position: ${(p) => p.$objectPosition};
  }
`;

const Scrim = styled.div<{ $scrim: string }>`
  position: absolute;
  inset: 0;
  background: ${(p) => p.$scrim};
`;

/* The aspect ratio sits here rather than on the strip because the strip's
   `overflow: hidden` makes it a scroll container, and a scroll container with
   an aspect ratio does not grow to fit its content — content taller than the
   ratio would be cut off. Here overflow is visible, so it grows instead. */
const ContentLayer = styled.div<{ $aspectRatio?: number }>`
  position: relative;
  height: 100%;
  ${(p) =>
    p.$aspectRatio &&
    `
      aspect-ratio: ${p.$aspectRatio};
      display: flex;
      flex-direction: column;
    `}
`;

interface ParallaxStripProps {
  src: string;
  /**
   * Defaults to empty: a strip is usually decorative, with anything it says
   * carried by the content laid over it. Give it real alt text only when the
   * photo is the content.
   */
  alt?: string;
  /**
   * Any CSS height, e.g. `clamp(260px, 30vw, 420px)`. Omit it to let the
   * content set the height — the layer's overhang is a percentage and the
   * offset is measured every frame, so the effect holds either way.
   */
  height?: string;
  /**
   * The photo's width ÷ height, from its pixel size. With no `height`, sizes
   * the strip so the image layer has the photo's exact shape: `cover` then
   * neither zooms it nor crops it, and the full frame scrolls past top to
   * bottom. Content taller than that still grows the strip, and the photo
   * zooms to cover it. The content is laid out as a flex column, so a
   * `flex: 1` child can take whatever height is left.
   */
  photoAspectRatio?: number;
  /**
   * How much taller than the strip the image layer is, as a share of the
   * strip's height — and so how far the view moves down the photo. `0.5`
   * makes the layer 150% of the strip. Larger reads as faster, and crops the
   * photo tighter at the sides on narrow screens, where `cover` has to scale
   * by height.
   */
  travel?: number;
  /** `object-position` for the photo. Defaults to `center`. */
  objectPosition?: string;
  /** Fill shown until the photo loads. */
  backgroundColor?: keyof typeof Colors;
  /**
   * A CSS background laid over the photo, under the content — e.g.
   * `linear-gradient(to top, rgba(0,0,0,0.7), transparent)` to keep text on
   * top legible. It stays put while the photo moves.
   */
  scrim?: string;
  /**
   * Serves `src` as uploaded instead of through Vercel's optimizer. The
   * optimizer stops at the widest `deviceSizes` entry (1024px), but `cover`
   * draws the photo wider than the viewport to fill the layer's overhang, so a
   * desktop strip gets that file stretched about 3× on a retina screen. Set it
   * when the source is already web-sized and compressed — every visitor,
   * phones included, then downloads that one file.
   */
  unoptimized?: boolean;
  /**
   * Blur radius for the photo, e.g. `6px` — for a photo that sits behind
   * content as texture, where its own detail (signage, lettering) would
   * otherwise compete with the text on top. A blurred photo also hides the
   * optimizer's 1024px ceiling, so `unoptimized` is rarely needed with it.
   */
  blur?: string;
  /**
   * `next/image` quality, 1–100; it defaults to 75. Worth lowering for a
   * blurred or tinted photo, whose compression artifacts nobody can see.
   * Ignored with `unoptimized`.
   */
  quality?: number;
  /**
   * Laid over the photo. With `height` set it fills the strip, and layout is
   * the content's job, e.g. a `FluidContainer` at `height="100%"`. Without
   * `height` it is what sizes the strip.
   */
  children?: React.ReactNode;
}

export const ParallaxStrip = ({
  src,
  alt = '',
  height,
  photoAspectRatio,
  travel = DEFAULT_TRAVEL,
  objectPosition = 'center',
  backgroundColor = 'greyDarkest',
  scrim,
  unoptimized = false,
  blur,
  quality,
  children,
}: ParallaxStripProps) => {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* Reduced motion registers nothing at all, not a zero-distance version of
       the effect: the layer stays at its resting crop, which is a finished
       state rather than a fallback. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const strip = stripRef.current;
    const imageLayer = imageLayerRef.current;
    if (!strip || !imageLayer) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height: stripHeight } = strip.getBoundingClientRect();
      const offset = getParallaxOffset({
        stripTop: top,
        stripHeight,
        viewportHeight: window.innerHeight,
        travel,
      });
      /* Written straight to the element, not through state: a re-render per
         scroll frame would cost far more than the transform it produces. */
      imageLayer.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /* The scroll listener only exists while the strip is on screen, so a page
       with the strip far below the fold pays nothing for it. */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
      } else {
        window.removeEventListener('scroll', scheduleUpdate);
        window.removeEventListener('resize', scheduleUpdate);
      }
    });
    observer.observe(strip);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [travel]);

  return (
    <Strip
      ref={stripRef}
      $height={height}
      $backgroundColor={Colors[backgroundColor]}
    >
      <ImageLayer
        ref={imageLayerRef}
        $travel={travel}
        $objectPosition={objectPosition}
        $blur={blur}
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          unoptimized={unoptimized}
          quality={quality}
        />
      </ImageLayer>
      {scrim && <Scrim $scrim={scrim} />}
      {children && (
        <ContentLayer
          /* The layer is `1 + travel` strips tall, so a strip that is the
             photo's shape × (1 + travel) gives the layer the photo's shape. */
          $aspectRatio={
            !height && photoAspectRatio
              ? photoAspectRatio * (1 + travel)
              : undefined
          }
        >
          {children}
        </ContentLayer>
      )}
    </Strip>
  );
};
