import { useId } from 'react';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Table, Typography, VisuallyHidden } from 'components';
import { useRevealOnce } from 'hooks';
import type { TableData } from 'types';
import {
  chartColors,
  CHART_LABEL_SIZE,
  CHART_EASING,
  CHART_DURATION,
} from './chartTokens';

export interface TrendPoint {
  /** Index into `fiscalYears`. Only published figures are plotted. */
  yearIndex: number;
  value: number;
}

export interface TrendSeries {
  id: string;
  label: string;
  color: keyof typeof Colors;
  strokeWidth: number;
  /** Line style, not color, is what distinguishes the series. */
  dashed?: boolean;
  /**
   * Which side of the point its value label sits on. Series that run close
   * together should take opposite sides so their labels do not collide.
   */
  labelSide?: 'above' | 'below';
  /**
   * Draws this series' points as solid dots rather than the default white
   * ring. Set it on any series whose ring would otherwise be confusable with
   * the hollow zero-crossing marker.
   */
  filledPoint?: boolean;
  points: TrendPoint[];
}

interface TrendMarker {
  /** Series to ring where it crosses $0. */
  seriesId: string;
  label: string;
  /**
   * Nudges the label clear of nearby point values and of the line itself.
   * Defaults to centered just above the ring.
   */
  labelPosition?: {
    dx?: number;
    dy?: number;
    anchor?: 'start' | 'middle' | 'end';
  };
}

interface TrendChartProps {
  fiscalYears: string[];
  series: TrendSeries[];
  markers?: TrendMarker[];
  /** Series id pair whose vertical gap is shaded. */
  shadeBetween?: [string, string];
  caption: string;
  /** Reading measure for `caption`. Defaults to `CAPTION_MEASURE`. */
  captionMaxWidth?: string;
  ariaLabel: string;
  /** Year-by-year figures, read by screen readers in place of the drawing. */
  table: TableData;
  /** Wipes the plotted lines in left to right on first scroll into view. */
  animate?: boolean;
  animationDuration?: number;
  /** Draws each published figure beside its own point. */
  showPointValues?: boolean;
}

/* Value axis runs $9M at y=40 down to −$3M at y=340 — 25px per $1M, $0 at 265.
   Seven year ticks span x=150 to x=940. */
const ZERO_Y = 265;
const PX_PER_MILLION = 25;
/* Left edge of the plot. The value axis labels are drawn 12 units to the left
   of this, anchored `end`, so this is really "label width + 12". The widest
   label is `−$2M`: four glyphs at `CHART_LABEL_SIZE`, roughly 34 units. 52
   leaves that a few units of margin and no more — anything larger is dead
   space inside the viewBox that pushes the plotted lines rightward, out of
   line with the heading and copy above them. */
const X_FIRST = 52;
const X_LAST = 940;
const GRIDLINE_MILLIONS = [8, 6, 4, 2, -2];

const yAt = (dollars: number) =>
  ZERO_Y - (dollars / 1_000_000) * PX_PER_MILLION;

const formatMillions = (millions: number) =>
  `${millions < 0 ? '−' : ''}$${Math.abs(millions)}M`;

/* Matches the hidden table's formatting, minus sign included. Exported so the
   reserve figures beside the chart count up into exactly the same string the
   chart draws — a figure that formats two ways reads as two figures. */
export const formatDollars = (dollars: number) =>
  `${dollars < 0 ? '−' : ''}$${Math.abs(dollars).toLocaleString('en-US')}`;

/* Keeps a label inside the drawing: points at either end of the axis anchor
   inward instead of centering and overflowing the viewBox. */
const EDGE_MARGIN = 70;
const anchorFor = (x: number): 'start' | 'middle' | 'end' => {
  if (x <= X_FIRST + EDGE_MARGIN) return 'start';
  if (x >= X_LAST - EDGE_MARGIN) return 'end';
  return 'middle';
};

/**
 * Point values are drawn as filled pills rather than bare text. Loose text
 * over a chart competes with every line and gridline it crosses; a solid
 * ground gives each figure its own space and ties it to the series by color.
 *
 * SVG has no way to size a box to the text inside it, so the pill is measured
 * from the glyphs. Digits, `$` and the minus sign run about 0.62em at this
 * weight; commas about half. The estimate is deliberately generous — a pill a
 * little wide reads as intentional, a pill a little narrow clips the number it
 * exists to make legible.
 */
const GLYPH_EM = 0.62;
const NARROW_GLYPH_EM = 0.34;
const PILL_PAD_X = 8;
const PILL_HEIGHT = 22;
/* Baseline to pill top. Roughly cap height plus even padding, so digits —
   which have no descenders — sit centered. */
const PILL_BASELINE_OFFSET = 15;

const estimateLabelWidth = (text: string) =>
  text
    .split('')
    .reduce(
      (total, char) =>
        total +
        CHART_LABEL_SIZE *
          (char === ',' || char === '.' ? NARROW_GLYPH_EM : GLYPH_EM),
      0,
    );

/* The text is anchored at the point; the pill wraps it, so its left edge
   depends on which way the text runs from there. */
const pillLeft = (x: number, textWidth: number, anchor: string) => {
  if (anchor === 'start') return x - PILL_PAD_X;
  if (anchor === 'end') return x - textWidth - PILL_PAD_X;

  return x - textWidth / 2 - PILL_PAD_X;
};

/* Point to label baseline. Enough that the pill clears the 4-unit dot rather
   than resting against it. */
/* A series only needs the two-tone stroke if it actually goes below zero. */
const crossesZero = (s: TrendSeries) => s.points.some((p) => p.value < 0);

const POINT_RADIUS = 4;

const LABEL_RISE = 15;
const LABEL_DROP = 23;

/**
 * Width the drawing scrolls at rather than shrinking below.
 *
 * The viewBox is 1000 units wide, so an svg rendered at W px scales its text
 * by W/1000. The previous floor of 660 put `CHART_LABEL_SIZE` at about 8.6px
 * — too small to read, and on the narrow screens most likely to hit it. 900
 * lands it near 12px, about where a dense chart label stops being a squint.
 *
 * The cost is a longer sideways scroll on a phone. That is the intended
 * trade: the drawing is `role="img"` with a full text alternative, and the
 * published figures are in the data table below it, so a reader who does not
 * want to scroll a chart has somewhere better to go.
 */
const SCROLL_FLOOR_PX = 900;
const ScrollRegion = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  svg {
    display: block;
    min-width: ${SCROLL_FLOOR_PX}px;
    width: 100%;
    height: auto;
  }
`;

/* A line of text stops being readable somewhere past 75 characters — the eye
   loses the return sweep and re-reads the line it just finished. The chart
   itself wants the full panel width; its prose does not. Override per caller
   when the chart sits in an unusually wide panel and the default reads mean
   against it. */
const CAPTION_MEASURE = '68ch';

/* Centered under the plot. A legend ranged left reads as a caption and gets
   skipped; a chart whose legend is skipped is a chart nobody can read. */
const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${Spaces.md} ${Spaces.lg};
  list-style: none;
  margin: ${Spaces.md} 0 0;
  padding: 0;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
`;

/* A series that changes color partway along the plot says so in its own
   swatch — half the series color, half the deficit color, split down the
   middle. A legend that shows one color for a two-color line is the thing a
   reader checks when the chart confuses them, and it would confuse them
   further. Drawn as a background rather than a border, since a border takes
   only one color; the dashed series keep the border, which is what makes
   them dashed. */
const LineSwatch = styled.span<{
  $color: string;
  $endColor?: string;
  $dashed: boolean;
}>`
  width: 28px;
  flex-shrink: 0;
  ${(p) =>
    p.$endColor && !p.$dashed
      ? `
        height: 3px;
        background: linear-gradient(
          to right,
          ${p.$color} 50%,
          ${p.$endColor} 50%
        );
      `
      : `border-top: 3px ${p.$dashed ? 'dashed' : 'solid'} ${p.$color};`}
`;

/* Scaled on X from the left edge, so the plotted lines draw across. Gridlines
   and axis labels sit outside the clip and stay visible throughout. */
const WipeRect = styled.rect<{
  $atFinal: boolean;
  $transition: string | null;
}>`
  transform-origin: 0 0;
  transform: scaleX(${(p) => (p.$atFinal ? 1 : 0)});
  ${(p) => p.$transition && `transition: transform ${p.$transition};`}
`;

const RingSwatch = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${Colors.white};
  border: 2.5px solid ${Colors.black};
  flex-shrink: 0;
`;

export const TrendChart = ({
  fiscalYears,
  series,
  markers = [],
  shadeBetween,
  caption,
  captionMaxWidth = CAPTION_MEASURE,
  ariaLabel,
  table,
  animate = true,
  animationDuration = CHART_DURATION,
  showPointValues = true,
}: TrendChartProps) => {
  const clipId = useId();
  const deficitGradientId = (seriesId: string) =>
    `${clipId}-deficit-${seriesId}`;
  const { ref, atFinal, isTransitioning } = useRevealOnce<HTMLDivElement>({
    enabled: animate,
    resetKey: animationDuration,
  });

  const xAt = (yearIndex: number) =>
    X_FIRST + (yearIndex * (X_LAST - X_FIRST)) / (fiscalYears.length - 1);

  const pointsFor = (s: TrendSeries) =>
    s.points.map((p) => `${xAt(p.yearIndex)},${yAt(p.value)}`).join(' ');

  const shadedPolygon = () => {
    if (!shadeBetween) return null;
    const [aId, bId] = shadeBetween;
    const a = series.find((s) => s.id === aId);
    const b = series.find((s) => s.id === bId);
    if (!a || !b) return null;
    return `${pointsFor(a)} ${[...b.points]
      .reverse()
      .map((p) => `${xAt(p.yearIndex)},${yAt(p.value)}`)
      .join(' ')}`;
  };

  /* Where a series crosses $0, interpolated between the two published points
     that straddle it. */
  const zeroCrossing = (s: TrendSeries) => {
    for (let i = 0; i < s.points.length - 1; i += 1) {
      const from = s.points[i];
      const to = s.points[i + 1];
      if (from.value > 0 !== to.value > 0) {
        const ratio = from.value / (from.value - to.value);
        return (
          xAt(from.yearIndex) +
          ratio * (xAt(to.yearIndex) - xAt(from.yearIndex))
        );
      }
    }
    return null;
  };

  const polygon = shadedPolygon();

  return (
    <div>
      <ScrollRegion role="img" aria-label={ariaLabel} tabIndex={0} ref={ref}>
        <svg viewBox="0 0 1000 380" aria-hidden="true">
          <defs>
            <clipPath id={clipId}>
              <WipeRect
                x={0}
                y={0}
                width={1000}
                height={380}
                $atFinal={atFinal}
                $transition={
                  isTransitioning
                    ? `${animationDuration}ms ${CHART_EASING}`
                    : null
                }
              />
            </clipPath>

            {/* A line that crosses zero is two different facts either side of
                it, so it is drawn in two colors. Splitting the polyline at the
                crossing would mean solving for the intercept and rebuilding
                the points; a vertical gradient does it geometrically instead.
                The two stops sit a single unit apart at the zero line, which
                reads as a hard cut at any rendered size, and a gradient pads
                its end colors outward — so everything above zero is the series
                color and everything below is the deficit color, wherever the
                line happens to cross. One per series that goes negative. */}
            {series.filter(crossesZero).map((s) => (
              <linearGradient
                key={`${s.id}-gradient`}
                id={deficitGradientId(s.id)}
                gradientUnits="userSpaceOnUse"
                x1={0}
                y1={ZERO_Y}
                x2={0}
                y2={ZERO_Y + 1}
              >
                <stop offset="0" stopColor={Colors[s.color]} />
                <stop offset="1" stopColor={Colors.redDark} />
              </linearGradient>
            ))}
          </defs>

          {GRIDLINE_MILLIONS.map((millions) => (
            <g key={millions}>
              <line
                x1={X_FIRST}
                x2={X_LAST}
                y1={yAt(millions * 1_000_000)}
                y2={yAt(millions * 1_000_000)}
                stroke={chartColors.gridline}
                strokeWidth={1}
              />
              <text
                x={X_FIRST - 12}
                y={yAt(millions * 1_000_000) + 4}
                textAnchor="end"
                fontSize={CHART_LABEL_SIZE}
                fill={Colors.greyDark}
              >
                {formatMillions(millions)}
              </text>
            </g>
          ))}

          {/* $0 reads as an axis, not a gridline. */}
          <line
            x1={X_FIRST}
            x2={X_LAST}
            y1={ZERO_Y}
            y2={ZERO_Y}
            stroke={Colors.greyDarkest}
            strokeWidth={1.5}
          />
          <text
            x={X_FIRST - 12}
            y={ZERO_Y + 4}
            textAnchor="end"
            fontSize={CHART_LABEL_SIZE}
            fill={Colors.greyDarkest}
          >
            $0
          </text>

          {/* Everything data-bearing lives inside the wipe. */}
          <g clipPath={`url(#${clipId})`}>
            {polygon && (
              <polygon points={polygon} fill={Colors.primary} opacity={0.3} />
            )}

            {series.map((s) => (
              <polyline
                key={s.id}
                points={pointsFor(s)}
                fill="none"
                stroke={
                  crossesZero(s)
                    ? `url(#${deficitGradientId(s.id)})`
                    : Colors[s.color]
                }
                strokeWidth={s.strokeWidth}
                strokeDasharray={s.dashed ? '9 7' : undefined}
                strokeLinecap="round"
              />
            ))}

            {/* A dot marks every published figure; the lines between them are
                only trajectories, so the dots are what is actually sourced. */}
            {showPointValues &&
              series.map((s) =>
                s.points.map((point) => {
                  const x = xAt(point.yearIndex);
                  const y = yAt(point.value);
                  const above = (s.labelSide || 'above') === 'above';

                  const label = formatDollars(point.value);
                  const anchor = anchorFor(x);
                  const textWidth = estimateLabelWidth(label);
                  const baselineY = above ? y - LABEL_RISE : y + LABEL_DROP;
                  /* A figure below zero takes the deficit color rather than
                     its series color, so the number says what it means
                     without the reader having to catch a minus sign. */
                  const pillFill =
                    point.value < 0 ? Colors.redDark : Colors[s.color];

                  return (
                    <g key={`${s.id}-${point.yearIndex}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={POINT_RADIUS}
                        /* Filled series read as a solid dot; the stroke stays
                           so both kinds keep the same outer diameter. Color
                           follows the same rule as the line and the pill, so
                           the dot below zero is not the odd one out. */
                        fill={s.filledPoint ? pillFill : Colors.white}
                        stroke={pillFill}
                        strokeWidth={2}
                      />
                      <rect
                        x={pillLeft(x, textWidth, anchor)}
                        y={baselineY - PILL_BASELINE_OFFSET}
                        width={textWidth + PILL_PAD_X * 2}
                        height={PILL_HEIGHT}
                        rx={6}
                        fill={pillFill}
                      />
                      <text
                        x={x}
                        y={baselineY}
                        textAnchor={anchor}
                        fontSize={CHART_LABEL_SIZE}
                        fontWeight={700}
                        fill={Colors.white}
                      >
                        {label}
                      </text>
                    </g>
                  );
                }),
              )}

            {markers.map((marker) => {
              const s = series.find((entry) => entry.id === marker.seriesId);
              const x = s ? zeroCrossing(s) : null;
              if (x === null) return null;
              return (
                <g key={marker.seriesId}>
                  <circle
                    cx={x}
                    cy={ZERO_Y}
                    r={7}
                    fill={Colors.white}
                    stroke={Colors.black}
                    strokeWidth={2.5}
                  />
                  <text
                    x={x + (marker.labelPosition?.dx ?? 0)}
                    y={ZERO_Y + (marker.labelPosition?.dy ?? -18)}
                    textAnchor={marker.labelPosition?.anchor ?? 'middle'}
                    fontSize={CHART_LABEL_SIZE}
                    fontWeight={700}
                    fill={Colors.black}
                  >
                    {marker.label}
                  </text>
                </g>
              );
            })}
          </g>

          {fiscalYears.map((year, index) => (
            <text
              key={year}
              x={xAt(index)}
              y={368}
              textAnchor="middle"
              fontSize={CHART_LABEL_SIZE}
              fill={Colors.greyDark}
            >
              {year}
            </text>
          ))}
        </svg>
      </ScrollRegion>

      {/* Legend and caption sit outside role="img" so they are read as text. */}
      <Legend>
        {series.map((s) => (
          <LegendItem key={s.id}>
            <LineSwatch
              $color={Colors[s.color]}
              $endColor={crossesZero(s) ? Colors.redDark : undefined}
              $dashed={!!s.dashed}
            />
            <Typography as="span" variant="span" size="xs" color="greyDarker">
              {s.label}
            </Typography>
          </LegendItem>
        ))}
        {markers.map((marker) => (
          <LegendItem key={marker.seriesId}>
            <RingSwatch />
            <Typography as="span" variant="span" size="xs" color="greyDarker">
              {marker.label}
            </Typography>
          </LegendItem>
        ))}
      </Legend>

      <Typography
        as="p"
        variant="copy"
        size="xs"
        lineHeight="1.6"
        color="greyDark"
        /* `auto` sides center the capped block under the full-width plot,
           in line with the legend above it. The text inside stays ranged
           left — centering the lines themselves would cost the reader the
           straight left edge their eye returns to. */
        margin={`${Spaces.md} auto 0`}
        style={{ maxWidth: captionMaxWidth }}
      >
        {caption}
      </Typography>

      <VisuallyHidden>
        <Table data={table} />
      </VisuallyHidden>
    </div>
  );
};
