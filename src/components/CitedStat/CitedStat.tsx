import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Spaces } from 'theme';
import { Typography } from '../Typography';
import { CitationMarker } from '../CitationMarker';
import { CountUp } from '../CountUp';

type StatVariant = 'onLight' | 'onDark' | 'onPrimary';

interface CitedStatProps {
  value: string;
  /** Omit when `eyebrow` alone names the figure. */
  label?: string;
  /** Row in the page's source list. Renders a superscript marker linking to it. */
  sourceId?: string;
  /** Ground the stat sits on. Drives figure scale, color, and label type. */
  variant?: StatVariant;
  /** Small uppercase heading above the figure, e.g. `Today`. */
  eyebrow?: string;
  /**
   * Renders the figure in primary instead of white. Honored on `onDark` only —
   * yellow figures fail AA on both light grounds and the yellow band.
   */
  highlightValue?: boolean;
  /** Draws a 3px rule down the left edge in this color. */
  accentColor?: keyof typeof Colors;
  /**
   * Counts the figure up on first scroll into view, from zero to this number.
   * A negative number counts down, which is the honest motion for a figure
   * falling into deficit. `value` still supplies the text that renders on
   * first paint, without JS, and under `prefers-reduced-motion`, so the two
   * must express the same number.
   */
  countTo?: number;
  /**
   * Formats each counted frame. Required alongside `countTo` — without it the
   * figure counts in bare digits and only settles into `value`'s formatting
   * at the end.
   */
  formatValue?: (n: number) => string;
  /** Overrides the figure color the variant would otherwise pick. */
  valueColor?: keyof typeof Colors;
}

/* Both ends of every clamp are real FontSizes steps, and every maximum stays
   under the 4xl a page header uses, so a figure never outgrows the heading it
   sits beneath. `onPrimary` leads because the yellow band carries the numbers
   the page is built around. */
const figureSizes: Record<StatVariant, string> = {
  onLight: `clamp(${FontSizes.xl}, 4vw, ${FontSizes['2xl']})`,
  onDark: `clamp(${FontSizes.lg}, 3.2vw, ${FontSizes.xl})`,
  onPrimary: `clamp(${FontSizes['2xl']}, 5.4vw, ${FontSizes['3xl']})`,
};

const labelProps = {
  onLight: {
    variant: 'copy',
    size: 'sm',
    lineHeight: '1.6',
    color: 'black',
  },
  onDark: {
    variant: 'span',
    size: '2xs',
    weight: '700',
    uppercase: true,
    letterSpacing: '0.08em',
    color: 'greyLighter',
  },
  onPrimary: {
    variant: 'copy',
    size: 'md',
    lineHeight: '1.55',
    color: 'black',
  },
} as const;

const Container = styled.div<{ $accentColor?: keyof typeof Colors }>`
  ${(p) =>
    p.$accentColor &&
    `
    border-left: 3px solid ${Colors[p.$accentColor]};
    padding-left: ${Spaces.md};
  `}
`;

export const CitedStat = ({
  value,
  label,
  sourceId,
  variant = 'onLight',
  eyebrow,
  highlightValue,
  accentColor,
  countTo,
  formatValue,
  valueColor,
}: CitedStatProps) => {
  const figureColor =
    valueColor ??
    (variant === 'onDark' && highlightValue
      ? 'primary'
      : variant === 'onDark'
      ? 'white'
      : 'black');

  /* `CountUp` starts its counter at zero and only reaches the real number
     once its observer fires, so rendering it on the server would ship HTML
     stating the figure is $0. The static `value` holds until mount, and holds
     forever under reduced motion — where, per this page's rules, no observer
     should be registered at all. */
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (countTo === undefined) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsCounting(true);
  }, [countTo]);

  /* Shared by the static figure and the counted one, so a stat that animates
     is the same typography as one that does not. */
  const figureType = {
    as: 'p',
    variant: 'span',
    weight: '800',
    fluidSize: figureSizes[variant],
    lineHeight: '1',
    tabularNums: true,
    color: figureColor,
  } as const;

  /* On the yellow band the figure carries the marker, sized to the figure and
     black for contrast. Elsewhere it reads as a footnote on the label. */
  const markerOnFigure = variant === 'onPrimary';

  return (
    <Container $accentColor={accentColor}>
      {eyebrow && (
        <Typography
          as="p"
          variant="span"
          size="2xs"
          weight="700"
          uppercase
          letterSpacing="0.08em"
          color={variant === 'onDark' ? 'greyLighter' : 'greyDark'}
          margin={`0 0 ${Spaces.sm}`}
        >
          {eyebrow}
        </Typography>
      )}
      {countTo !== undefined && isCounting ? (
        <CountUp {...figureType} end={countTo} format={formatValue} />
      ) : (
        <Typography {...figureType}>
          {value}
          {sourceId && markerOnFigure && (
            <CitationMarker sourceId={sourceId} context="figure" />
          )}
        </Typography>
      )}
      {label && (
        <Typography
          as="p"
          {...labelProps[variant]}
          margin={`${Spaces.sm} 0 0`}
          style={variant === 'onPrimary' ? { maxWidth: '30ch' } : undefined}
        >
          {label}
          {sourceId && !markerOnFigure && (
            <CitationMarker sourceId={sourceId} />
          )}
        </Typography>
      )}
    </Container>
  );
};
