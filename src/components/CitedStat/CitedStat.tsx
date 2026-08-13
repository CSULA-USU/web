import styled from 'styled-components';
import { Colors, FontSizes, Spaces } from 'theme';
import { Typography } from '../Typography';
import { CitationMarker } from '../CitationMarker';

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
}: CitedStatProps) => {
  const figureColor =
    variant === 'onDark' && highlightValue
      ? 'primary'
      : variant === 'onDark'
      ? 'white'
      : 'black';

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
      <Typography
        as="p"
        variant="span"
        weight="800"
        fluidSize={figureSizes[variant]}
        lineHeight="1"
        tabularNums
        color={figureColor}
      >
        {value}
        {sourceId && markerOnFigure && (
          <CitationMarker sourceId={sourceId} context="figure" />
        )}
      </Typography>
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
