import styled, { css } from 'styled-components';
import { Colors, media } from 'theme';
import { useRevealOnce } from 'hooks';

const REVEAL_DURATION = 700;
const REVEAL_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Distance the content travels up as it fades in. */
const REVEAL_RISE = '20px';

const getBackgroundCSS = (p: FluidContainerProps) => {
  if (!p.backgroundImage) {
    return css`
      background-color: ${Colors[p.backgroundColor || 'transparent']};
    `;
  }

  /* A blurred background needs layers of its own: a filter on the container
     itself would take the content down with it. */
  if (p.backgroundBlur) {
    return css`
      position: relative;
      overflow: hidden;

      ::before {
        content: '';
        position: absolute;
        /* Blur samples past the layer's edges, so a layer sized to the box
           fades out at its seams. Oversizing it by twice the radius keeps the
           frame filled corner to corner. */
        inset: calc(${p.backgroundBlur} * -2);
        background: url(${p.backgroundImage}) no-repeat;
        background-size: cover;
        background-position: ${p.backgroundPosition || 'center'};
        filter: blur(${p.backgroundBlur});
        z-index: 0;
      }

      ${p.backgroundOverlay &&
      `
        ::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: ${p.backgroundOverlay};
          z-index: 0;
        }
      `}

      /* ::after is the container's last child, so without this the scrim would
         paint over the content rather than under it. */
      > * {
        position: relative;
        z-index: 1;
      }
    `;
  }

  const flatOverlay = p.backgroundOverlay
    ? `linear-gradient(${p.backgroundOverlay}, ${p.backgroundOverlay}), `
    : '';
  /* A scrim wins over a flat overlay when both are set: it is the more
     specific instruction, and stacking the two would double-darken. */
  const overlay = p.backgroundScrim ? `${p.backgroundScrim}, ` : flatOverlay;
  return css`
    background: ${overlay} url(${p.backgroundImage}) no-repeat;
    background-size: cover;
    background-position: ${p.backgroundPosition || 'center'};
  `;
};

const FluidOuter = styled.div<FluidContainerProps>`
  display: flex;
  align-items: ${(p) => p.outerAlignItems || 'center'};
  border: ${(p) => (p.border ? `1px solid ${Colors[p.border]}` : 'none')};
  justify-content: ${(p) => p.outerJustifyContent || 'center'};
  padding: ${(p) => p.padding || '36px 72px'};
  margin: ${(p) => p.margin};
  height: ${(p) => p.height};
  width: ${(p) => p.width};
  ${(p) => p.scrollMarginTop && `scroll-margin-top: ${p.scrollMarginTop};`}
  ${(p) =>
    media('desktop')(`
    padding: ${p.paddingDesktop || p.padding || '18px 36px'};
  `)}
  ${(p) =>
    media('mobile')(`
    padding: ${p.paddingMobile || p.paddingDesktop || p.padding || '18px 16px'};
  `)}
  ${getBackgroundCSS}
`;

/* Only emitted for a revealing container, so nothing else on the site gains a
   transform — which would create a containing block for fixed/sticky children. */
const getRevealCSS = (p: RevealState) => {
  if (!p.$reveal) return css``;
  return css`
    opacity: ${p.$atFinal ? 1 : 0};
    transform: translateY(${p.$atFinal ? '0' : REVEAL_RISE});
    ${p.$isTransitioning &&
    `transition: opacity ${REVEAL_DURATION}ms ease-out,
       transform ${REVEAL_DURATION}ms ${REVEAL_EASING};`}
  `;
};

const FluidInner = styled.div<FluidInnerProps & RevealState>`
  border-radius: ${(p) => (p.innerRounded ? '12px' : '0px')};
  background-color: ${(p) => Colors[p.innerBackgroundColor || 'transparent']};
  max-width: 1440px;
  padding: ${(p) => p.innerPadding};
  width: 100%;
  ${(p) => p.innerMaxWidth && `max-width: ${p.innerMaxWidth};`}
  ${(p) => p.innerMinHeight && `min-height: ${p.innerMinHeight};`}
  ${(p) => p.textAlign && `text-align: ${p.textAlign};`}
  ${(p) =>
    p.flex
      ? css`
          align-items: ${p.alignItems || 'stretch'};
          display: flex;
          flex-wrap: ${p.flexWrap || 'nowrap'};
          flex-direction: ${p.flexDirection || 'row'};
          justify-content: ${p.justifyContent || 'flex-start'};
          gap: ${p.gap || 'initial'};
        `
      : css``};
  ${getRevealCSS}
`;

interface RevealState {
  $reveal?: boolean;
  $atFinal?: boolean;
  $isTransitioning?: boolean;
}

interface FluidInnerProps {
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  flex?: boolean;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  innerBackgroundColor?: keyof typeof Colors;
  innerMaxWidth?: string;
  innerMinHeight?: string;
  innerRounded?: boolean;
  innerPadding?: string;
  /**
   * Centers or right-aligns everything inside, headings and running text and
   * button rows alike, by inheritance. Preferred over `alignItems` for this:
   * that shrinks each child to its own content width, which centers a short
   * heading but leaves a wrapped paragraph ragged-left inside a centered box,
   * and collapses any child whose width comes from its content — a bare
   * `Divider` renders as a border with nothing in it, so it disappears.
   */
  textAlign?: 'left' | 'center' | 'right';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
}

interface FluidContainerProps extends FluidInnerProps {
  alt?: string;
  backgroundColor?: keyof typeof Colors;
  backgroundImage?: string;
  /**
   * Flat scrim laid over `backgroundImage` so text on top stays legible —
   * any CSS color, e.g. `rgba(0, 0, 0, 0.66)`. Ignored without an image.
   */
  backgroundOverlay?: string;
  /**
   * A full CSS background layer laid over `backgroundImage` — a gradient,
   * where `backgroundOverlay` only takes a flat color. Use it when the scrim
   * has to be heavier at one edge than the other, e.g.
   * `linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.45))`.
   * Takes precedence over `backgroundOverlay`. Ignored without an image, and
   * ignored under `backgroundBlur`, which composites its own layers.
   */
  backgroundScrim?: string;
  /**
   * Blur radius for `backgroundImage`, e.g. `12px`. The image moves to its own
   * layer so only it is blurred, which also softens a low-resolution or
   * over-scaled photo enough that its artifacts stop reading as a mistake.
   * Ignored without an image.
   */
  backgroundBlur?: string;
  /** `background-position` for `backgroundImage`. Defaults to `center`. */
  backgroundPosition?: string;
  border?: keyof typeof Colors;
  children?: React.ReactNode;
  height?: string;
  id?: string;
  padding?: string;
  paddingDesktop?: string;
  paddingMobile?: string;
  width?: string;
  margin?: string;
  /** Keeps an anchored section's heading clear of sticky page chrome. */
  scrollMarginTop?: string;
  /**
   * Fades and rises the inner content the first time the container scrolls into
   * view. The band's own background never animates, so adjacent sections don't
   * flicker. `prefers-reduced-motion: reduce` paints the content at rest.
   */
  revealOnScroll?: boolean;
  outerAlignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';

  outerJustifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
}

export const FluidContainer = ({
  children,
  backgroundColor,
  backgroundImage,
  revealOnScroll = false,
  id,
  ...props
}: FluidContainerProps) => {
  /* Sections are often taller than the viewport, so a small threshold plus a
     bottom margin fires as the section's top edge comes up the screen rather
     than waiting for a fifth of a tall band to clear the fold. */
  const { ref, atFinal, isTransitioning } = useRevealOnce<HTMLDivElement>({
    enabled: revealOnScroll,
    threshold: 0,
    rootMargin: '0px 0px -12% 0px',
  });

  /* `id` is pulled out of the spread and applied only to the outer element:
     the rest of the props legitimately style both boxes, but an id on both
     makes it a duplicate in the DOM. The outer one is the right target — it
     carries `scroll-margin-top`, so an anchor jump lands with the section's
     padding cleared. */
  return (
    <FluidOuter
      ref={ref}
      id={id}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      {...props}
    >
      <FluidInner
        {...props}
        $reveal={revealOnScroll}
        $atFinal={atFinal}
        $isTransitioning={isTransitioning}
      >
        {children}
      </FluidInner>
    </FluidOuter>
  );
};
