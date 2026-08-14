import styled, { css, keyframes } from 'styled-components';
import { Colors } from 'theme';

type ScrollCueLine = 'solid' | 'dashed' | 'dotted';
type ScrollCueAnimation = 'trickle' | 'pulse' | 'draw' | 'drift';

/** How far `pulse` fades at the bottom of its cycle. Zero, so the line clears
 * completely between beats rather than idling as a visible bar — a cue that
 * is only there while it moves. */
const PULSE_LOW_OPACITY = 0;

/** Length of `trickle`'s traveling highlight, as a fraction of the cue's
 * height. The mask window and the distance it travels both derive from this,
 * so it is the only place to change how long the light reads. */
const HIGHLIGHT_HEIGHT_RATIO = 0.75;

interface ScrollCueProps {
  /** Shape of the line itself. */
  lineStyle?: ScrollCueLine;
  /**
   * `trickle` runs a soft light down a dim line. `pulse` breathes the whole
   * line. `draw` grows it from the top, over and over. `drift` marches the
   * pattern downward — which needs a pattern, so it reads as static on a
   * `solid` line.
   */
  animation?: ScrollCueAnimation;
  color?: keyof typeof Colors;
  /**
   * The line the highlight travels along, drawn beneath it. `trickle` only —
   * every other animation is a single line and uses `color`. Transparent by
   * default, so the cue is just the traveling light; give it a color to lay
   * a visible line under that light.
   */
  trackColor?: keyof typeof Colors;
  height?: string;
  /** Width of the line, and the diameter of a `dotted` dot. */
  thickness?: string;
  /**
   * Distance over which the cue dissolves into nothing at its bottom edge,
   * e.g. `24px`.
   *
   * Without it the line simply stops, and `trickle` stops worst of all: the
   * travelling highlight is at its brightest exactly when it reaches the end,
   * so the container clips it at full strength and the cue reads as cut off
   * rather than as running out. A rounded cap cannot do this job at hairline
   * widths — a radius is capped at half the line's width, so on a sub-pixel
   * line there is nothing to round.
   */
  fadeLength?: string;
  /** One full cycle, e.g. `2600ms`. Longer is subtler. */
  duration?: string;
  margin?: string;
  className?: string;
}

interface CueStyle {
  $lineStyle: ScrollCueLine;
  $animation: ScrollCueAnimation;
  $color: string;
  $trackColor?: string;
  $height: string;
  $thickness: string;
  $duration: string;
  $fadeLength?: string;
  $margin?: string;
}

/* Both layers share one pattern so a dotted highlight lands exactly on the
   dotted track rather than beating against it. */
const getPattern = (p: CueStyle, color: string) => {
  if (p.$lineStyle === 'solid') {
    /* `drift` moves a pattern, and a flat fill has none to move. A solid line
       drifts as a soft wave travelling down it, so the line stays unbroken
       and the animation still reads. */
    if (p.$animation === 'drift') {
      return `
        background-image: linear-gradient(
          to bottom,
          ${color} 0%,
          ${color}33 50%,
          ${color} 100%
        );
        background-size: 100% var(--cue-pitch);
        background-repeat: repeat-y;
      `;
    }
    return `background-color: ${color};`;
  }

  const dash = p.$lineStyle === 'dotted' ? p.$thickness : '12px';
  const gap =
    p.$lineStyle === 'dotted' ? `calc(${p.$thickness} * 2.5)` : '10px';

  return `
    background-image: repeating-linear-gradient(
      to bottom,
      ${color} 0 ${dash},
      transparent ${dash} calc(${dash} + ${gap})
    );
  `;
};

/** Distance that returns a repeating pattern to its own starting phase, so a
 * drift of exactly this far loops without a seam. */
const getPatternPitch = (p: CueStyle) => {
  if (p.$lineStyle === 'dotted') return `calc(${p.$thickness} * 3.5)`;
  if (p.$lineStyle === 'dashed') return '22px';
  return '28px';
};

/* The highlight holds still and its mask moves, so the pattern underneath
   never shifts. It starts one full window above the line and ends one full
   line below it, so the highlight has entirely left before the loop restarts.
   Lengths, not percentages: a percentage mask-position resolves against
   (line - window), which shrinks as the window grows, so percentages that
   clear at one HIGHLIGHT_HEIGHT_RATIO overlap at the next. */
const travel = keyframes`
  from {
    -webkit-mask-position: 0 calc(-1 * var(--cue-highlight-length));
    mask-position: 0 calc(-1 * var(--cue-highlight-length));
  }
  to {
    -webkit-mask-position: 0 var(--cue-height);
    mask-position: 0 var(--cue-height);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: ${PULSE_LOW_OPACITY}; }
  50% { opacity: 1; }
`;

const draw = keyframes`
  0% { transform: scaleY(0); opacity: 0; }
  15% { opacity: 1; }
  70% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; }
`;

/* Travels exactly one pattern period, read from a custom property, so this
   stays a single static keyframes rather than one built per render. */
const drift = keyframes`
  to {
    background-position: 0 var(--cue-pitch);
  }
`;

const getTrackAnimation = (p: CueStyle) => {
  if (p.$animation === 'pulse') {
    return css`
      animation: ${pulse} ${p.$duration} ease-in-out infinite;
    `;
  }
  if (p.$animation === 'draw') {
    return css`
      transform-origin: top center;
      animation: ${draw} ${p.$duration} ease-in-out infinite;
    `;
  }
  if (p.$animation === 'drift') {
    return css`
      animation: ${drift} ${p.$duration} linear infinite;
    `;
  }
  return css``;
};

const Cue = styled.span<CueStyle>`
  display: block;
  position: relative;
  overflow: hidden;
  --cue-pitch: ${getPatternPitch};
  --cue-height: ${(p) => p.$height};
  --cue-highlight-length: calc(var(--cue-height) * ${HIGHLIGHT_HEIGHT_RATIO});
  width: ${(p) => p.$thickness};
  height: var(--cue-height);
  margin: ${(p) => p.$margin || '0'};

  /* Applied to the cue rather than to either layer inside it, so it fades
     whatever is there — the track, the travelling highlight, or both — and
     composes with the highlight's own mask instead of competing with it. */
  ${(p) =>
    p.$fadeLength &&
    css`
      --cue-fade: ${p.$fadeLength};
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 0,
        #000 calc(100% - var(--cue-fade)),
        transparent 100%
      );
      mask-image: linear-gradient(
        to bottom,
        #000 0,
        #000 calc(100% - var(--cue-fade)),
        transparent 100%
      );
    `}

  ::before {
    content: '';
    position: absolute;
    inset: 0;
    /* Only trickle has a layer above this one, so only trickle has a track to
       color separately. The rest are a single line drawn in the main color —
       otherwise trackColor would quietly win over it. */
    ${(p) =>
      getPattern(
        p,
        p.$animation === 'trickle'
          ? p.$trackColor || Colors.transparent
          : p.$color,
      )}
    ${getTrackAnimation}
  }

  ${(p) =>
    p.$animation === 'trickle' &&
    css`
      ::after {
        content: '';
        position: absolute;
        inset: 0;
        ${getPattern(p, p.$color)}
        -webkit-mask-image: linear-gradient(
          to bottom,
          transparent,
          #000 50%,
          transparent
        );
        mask-image: linear-gradient(
          to bottom,
          transparent,
          #000 50%,
          transparent
        );
        -webkit-mask-size: 100% var(--cue-highlight-length);
        mask-size: 100% var(--cue-highlight-length);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        animation: ${travel} ${p.$duration} linear infinite;
      }
    `}

  /* At rest the cue is simply a line: no travelling highlight frozen partway
     down, no half-drawn stroke. */
  @media (prefers-reduced-motion: reduce) {
    ::before {
      animation: none;
      opacity: 1;
      transform: none;
      /* A trickle's track is transparent by default, and its highlight is
         gone here — so draw the line in the main color rather than leave an
         empty gap. An explicit trackColor is still honored. */
      ${(p) =>
        p.$animation === 'trickle' && !p.$trackColor && getPattern(p, p.$color)}
    }

    ::after {
      display: none;
    }
  }
`;

/**
 * A short vertical line that nudges the reader further down the page. It
 * carries no text and is hidden from assistive technology — anything it is
 * the only signal for does not belong in it.
 */
export const ScrollCue = ({
  lineStyle = 'solid',
  animation = 'trickle',
  color = 'greyDark',
  trackColor,
  height = '64px',
  thickness = '2px',
  duration = '2600ms',
  fadeLength,
  margin,
  className,
}: ScrollCueProps) => (
  <Cue
    aria-hidden="true"
    className={className}
    $lineStyle={lineStyle}
    $animation={animation}
    $color={Colors[color]}
    $trackColor={trackColor && Colors[trackColor]}
    $height={height}
    $thickness={thickness}
    $duration={duration}
    $fadeLength={fadeLength}
    $margin={margin}
  />
);
