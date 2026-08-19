import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { CitationMarker } from 'components/CitationMarker';
import { PlaceholderMarker } from 'components/PlaceholderMarker';
import { Typography } from 'components/Typography';
import { useCountUp, useRevealOnce } from 'hooks';
import { CHART_LABEL_SIZE, CHART_EASING, CHART_DURATION } from './chartTokens';

export type PieChartVariant = 'donut' | 'pie';

export interface PieSegment {
  id: string;
  label: string;
  percentage: number;
  /**
   * Absolute value behind the percentage, already formatted for display, e.g.
   * `$75.00` or `1,240 students`. Passed in rather than computed so a page
   * cannot drift from the figure its source states. Omit for a chart whose
   * segments only have a share, and the legend shows the percentage alone.
   */
  amount?: string;
  color: keyof typeof Colors;
  /**
   * Where the percentage is drawn on the figure, in viewBox coordinates.
   * When omitted, the chart computes an in-wedge position automatically.
   */
  labelPosition?: { x: number; y: number };
  detail?: string;
  sourceId?: string;
  marker?: string;
}

/** Ring the drawn percentages sit on, measured from the figure's center. */
export const LABEL_RING_RADIUS = 118;

/** Font size of the drawn percentages, in viewBox units. */
export const PERCENT_LABEL_SIZE = 18;

export const getPercentLabelPosition = (
  percentage: number,
  rotation: number,
  center = 200,
  radius = LABEL_RING_RADIUS,
) => {
  const sweep = percentage * 3.6;
  const midAngle = (rotation + sweep / 2) * (Math.PI / 180);
  const x = center + Math.cos(midAngle) * radius;
  const y = center + Math.sin(midAngle) * radius;

  return { x, y };
};

/**
 * `33% · $75.00 of your fee`, dropping the separator and the suffix for a
 * segment that carries a share and nothing else.
 */
export const formatLegendValue = (
  segment: PieSegment,
  amountSuffix?: string,
) => {
  const percentage = `${segment.percentage}%`;

  if (!segment.amount) return percentage;

  const amount = amountSuffix
    ? `${segment.amount} ${amountSuffix}`
    : segment.amount;

  return `${percentage} · ${amount}`;
};

interface PieChartProps {
  segments: PieSegment[];
  /**
   * Figure shown in the middle of the donut, e.g. `$227.25`. Donut only — the
   * pie variant has no hole to put it in, and omitting it leaves the hole empty.
   */
  total?: string;
  /** Caption under `total`, e.g. `per semester`. Donut only. */
  totalLabel?: string;
  variant?: PieChartVariant;
  ariaLabel: string;
  /**
   * Trails each legend row's `percentage · amount` line, e.g. `of your fee`.
   * Caller-supplied so the chart carries no copy of its own.
   */
  amountSuffix?: string;
  /** Theme color for each legend row's percentage line. */
  amountColor?: keyof typeof Colors;
  /**
   * Widest the figure may render, in px. It fills whatever width the legend
   * leaves up to this cap, so raise it to give the figure more of a wide row.
   */
  maxFigureSize?: number;
  /**
   * `sweep` fills both wedges simultaneously from their own start angles while
   * the drawn percentages count up in step. `grow` scales the whole figure from
   * center with a fade — better in a tight column, where a sweep reads as a
   * loading spinner.
   */
  animation?: 'sweep' | 'grow' | 'none';
  animationDuration?: number;
}

const CENTER = 200;
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = { donut: 60, pie: 180 } as const;
const DEFAULT_MAX_FIGURE_SIZE = 520;
/** Breathing room between the outermost drawn thing and the viewBox edge. */
const VIEWBOX_PADDING = 8;

/**
 * Crops the viewBox to the artwork instead of a static `0 0 400 400`, which
 * spent a third of the donut's rendered width on empty margin and drew the
 * figure far smaller than the space it was given.
 *
 * The crop has to clear whichever reaches further, the stroke or the drawn
 * percentages — the donut's stroke stops at r=120, but its labels sit on the
 * r=118 ring and their glyphs rise a further half text-height above that. A
 * crop taken from the stroke alone clips the label on any thin segment near
 * the top of the ring. The pie's stroke reaches r=180 and wins outright.
 */
export const getViewBox = (variant: PieChartVariant) => {
  const strokeEdge = RADIUS + STROKE_WIDTH[variant] / 2;
  const labelEdge = LABEL_RING_RADIUS + PERCENT_LABEL_SIZE;
  const extent = Math.max(strokeEdge, labelEdge) + VIEWBOX_PADDING;

  return `${CENTER - extent} ${CENTER - extent} ${extent * 2} ${extent * 2}`;
};

/* Two columns that sit centered as a pair, rather than two grid tracks that
   split the full width: with `space-evenly` the gutters outside the figure and
   the legend match the one between them, so the pair stays visually centered in
   whatever container it is dropped into. This only has anything to distribute
   because `Figure` is capped — uncapped, that column swallows the whole surplus
   and every `justify-content` value renders identically, with the legend pushed
   against the far edge. Stretch, not center, so the legend can fill the figure's
   height — see `LegendList`. */
const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  width: 100%;
`;

/* Grows into whatever width the row has spare, rather than sitting at a fixed
   340px while the legend beside it gets taller. The figure was always fluid —
   a viewBox with `width: 100%` scales the wedges and their SVG text together —
   so the cap is the only thing deciding how large it gets.

   The cap is `max-width` on the column rather than on the svg inside it. Capping
   only the svg still let this column grow to swallow the row's whole surplus and
   center a small figure inside a wide empty box, which reads as a gap between
   the figure and the legend and leaves `Layout`'s `justify-content` nothing to
   distribute. Bounding the column hands that surplus back to `Layout`. */
const Figure = styled.div<{ $maxSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 340px;
  max-width: ${(p) => p.$maxSize}px;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

/* Rows are spread down the column instead of bunching at the top, so the
   descriptions read as a full-height panel beside the donut. */
const LegendList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 0 1 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LegendRow = styled.li`
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: ${Spaces.md};
  padding: ${Spaces.lg} 0;

  & + & {
    border-top: 1px solid ${Colors.greyLighter};
  }
`;

/* Sweep: the dash is parked behind its start point and slides forward into view. */
const Wedge = styled.circle<{ $offset: number; $transition: string | null }>`
  stroke-dashoffset: ${(p) => p.$offset};
  ${(p) => p.$transition && `transition: stroke-dashoffset ${p.$transition};`}
`;

const GrowGroup = styled.g<{ $atFinal: boolean; $transition: string | null }>`
  transform-origin: ${CENTER}px ${CENTER}px;
  transform: scale(${(p) => (p.$atFinal ? 1 : 0.85)});
  opacity: ${(p) => (p.$atFinal ? 1 : 0)};
  ${(p) =>
    p.$transition &&
    `transition: transform ${p.$transition}, opacity ${p.$transition};`}
`;

const Swatch = styled.span<{ $color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background-color: ${(p) => p.$color};
  margin-top: 4px;
`;

/* Its own component so the counting hook is called unconditionally, whatever
   number of segments a caller passes. */
const PercentLabel = ({
  segment,
  counting,
  active,
  duration,
}: {
  segment: PieSegment;
  counting: boolean;
  active: boolean;
  duration: number;
}) => {
  const value = useCountUp(segment.percentage, {
    start: counting ? 0 : segment.percentage,
    duration,
    active,
  });

  return (
    <text
      x={segment.labelPosition?.x ?? 200}
      y={segment.labelPosition?.y ?? 200}
      textAnchor="middle"
      fontSize={PERCENT_LABEL_SIZE}
      fontWeight={800}
      fill={Colors.black}
    >
      {Math.round(value)}%
    </text>
  );
};

export const PieChart = ({
  segments,
  total,
  totalLabel,
  variant = 'donut',
  ariaLabel,
  amountSuffix,
  amountColor = 'gold',
  maxFigureSize = DEFAULT_MAX_FIGURE_SIZE,
  animation = 'sweep',
  animationDuration = CHART_DURATION,
}: PieChartProps) => {
  const { ref, phase, atFinal, isTransitioning } =
    useRevealOnce<HTMLDivElement>({
      enabled: animation !== 'none',
      resetKey: `${animation}-${animationDuration}`,
    });

  const transition = isTransitioning
    ? `${animationDuration}ms ${CHART_EASING}`
    : null;
  const sweeping = animation === 'sweep';

  /* Wedges are drawn as dashed strokes on one circle. The first starts at 12
     o'clock; each next one starts where the previous ended. */
  let rotation = -90;
  const chartSegments = segments.map((segment) => {
    const startRotation = rotation;
    const labelPosition =
      segment.labelPosition ??
      getPercentLabelPosition(segment.percentage, startRotation);

    rotation += segment.percentage * 3.6;

    return {
      ...segment,
      startRotation,
      labelPosition,
    };
  });

  const wedges = chartSegments.map((segment) => ({
    id: segment.id,
    color: Colors[segment.color],
    dash: (CIRCUMFERENCE * segment.percentage) / 100,
    rotation: segment.startRotation,
  }));

  const figure = (
    <>
      {wedges.map((wedge) => (
        <Wedge
          key={wedge.id}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={wedge.color}
          strokeWidth={STROKE_WIDTH[variant]}
          strokeDasharray={`${wedge.dash} ${CIRCUMFERENCE}`}
          transform={`rotate(${wedge.rotation} ${CENTER} ${CENTER})`}
          $offset={sweeping && !atFinal ? wedge.dash : 0}
          $transition={sweeping ? transition : null}
        />
      ))}

      {/* Percentages are drawn on the figure so color is never the only
          carrier of the split. */}
      {chartSegments.map((segment) => (
        <PercentLabel
          key={segment.id}
          segment={segment}
          counting={sweeping && isTransitioning}
          active={phase === 'revealed'}
          duration={animationDuration}
        />
      ))}
    </>
  );

  return (
    <Layout>
      <Figure
        role="img"
        aria-label={ariaLabel}
        ref={ref}
        $maxSize={maxFigureSize}
      >
        <svg viewBox={getViewBox(variant)} aria-hidden="true">
          {animation === 'grow' ? (
            <GrowGroup $atFinal={atFinal} $transition={transition}>
              {figure}
            </GrowGroup>
          ) : (
            figure
          )}

          {variant === 'donut' && (
            <>
              {total && (
                <text
                  x={CENTER}
                  y={CENTER - 2}
                  textAnchor="middle"
                  fontSize={30}
                  fontWeight={800}
                  fill={Colors.black}
                >
                  {total}
                </text>
              )}
              {totalLabel && (
                <text
                  x={CENTER}
                  y={CENTER + 20}
                  textAnchor="middle"
                  fontSize={CHART_LABEL_SIZE}
                  fill={Colors.greyDark}
                >
                  {totalLabel}
                </text>
              )}
            </>
          )}
        </svg>
      </Figure>

      <LegendList>
        {chartSegments.map((segment) => (
          <LegendRow key={segment.id}>
            <Swatch $color={Colors[segment.color]} />
            <div>
              <Typography as="p" variant="span" size="sm" weight="700">
                {segment.label}
              </Typography>
              <Typography
                as="p"
                variant="span"
                size="sm"
                weight="700"
                tabularNums
                color={amountColor}
                margin={`${Spaces.xs} 0 0`}
              >
                {formatLegendValue(segment, amountSuffix)}
              </Typography>
              {segment.detail && (
                <Typography
                  as="p"
                  variant="copy"
                  size="xs"
                  lineHeight="1.6"
                  color="greyDarker"
                  margin={`${Spaces.xs} 0 0`}
                >
                  {segment.detail}
                  {segment.sourceId && (
                    <CitationMarker sourceId={segment.sourceId} />
                  )}
                </Typography>
              )}
              {segment.marker && (
                <Typography as="p" margin={`${Spaces.sm} 0 0`}>
                  <PlaceholderMarker>{segment.marker}</PlaceholderMarker>
                </Typography>
              )}
            </div>
          </LegendRow>
        ))}
      </LegendList>
    </Layout>
  );
};
