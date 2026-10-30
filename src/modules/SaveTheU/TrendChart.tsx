import { useEffect, useId } from 'react';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Table, Typography, VisuallyHidden } from 'components';
import { useCountUp, useRevealOnce } from 'hooks';
import type { TableData } from 'types';
import {
  applyChartEasing,
  chartColors,
  CHART_LABEL_SIZE,
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
   * together should take opposite sides so their labels do not collide. A
   * point shared with another series uses the first series' side.
   */
  labelSide?: 'above' | 'below';
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
  /**
   * Shades the vertical gap between two series, and names that area in the
   * legend. The label travels with the pair so the shading cannot ship
   * without its key.
   */
  shadeBetween?: { seriesIds: [string, string]; label: string };
  caption: string;
  /** Reading measure for `caption`. Defaults to `CAPTION_MEASURE`. */
  captionMaxWidth?: string;
  ariaLabel: string;
  /** Year-by-year figures, read by screen readers in place of the drawing. */
  table: TableData;
  /**
   * Draws the lines left to right on first scroll into view. Each line is led
   * by a bubble counting its value, and every published figure is left in
   * place as the tip passes it.
   */
  animate?: boolean;
  animationDuration?: number;
  /**
   * Fires once, as the lines begin to draw, so figures outside the chart can
   * start in step with it — run them for `animationDuration` on
   * `applyChartEasing` and they track the lines the whole way, not just at the
   * ends. Never fires when the chart paints at rest — animation off, or
   * reduced motion.
   */
  onReveal?: () => void;
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

/* The leading bubble travels the whole axis, so it cannot snap between
   `anchorFor`'s three anchors the way a fixed pill can — it would jump half
   its own width at each edge margin. Instead the share of the pill sitting
   left of the tip ramps from 0 (start) to ½ (middle) to 1 (end) across a band
   just inside each margin. Outside those bands it equals `anchorFor`, so the
   bubble arrives exactly where the pill it leaves behind is drawn. That holds
   as long as no published year lands inside a band; at seven years the
   nearest sits 8 units clear. */
const anchorShareAt = (x: number) => {
  const leftBandStart = X_FIRST + EDGE_MARGIN;
  const rightBandEnd = X_LAST - EDGE_MARGIN;
  const rightBandStart = rightBandEnd - EDGE_MARGIN;
  if (x <= leftBandStart) return 0;
  if (x < leftBandStart + EDGE_MARGIN)
    return ((x - leftBandStart) / EDGE_MARGIN) * 0.5;
  if (x <= rightBandStart) return 0.5;
  if (x < rightBandEnd) return 0.5 + ((x - rightBandStart) / EDGE_MARGIN) * 0.5;
  return 1;
};

/* Point to label baseline. Enough that the pill clears the 4-unit dot rather
   than resting against it. */
/* A series only needs the two-tone stroke if it actually goes below zero. */
const crossesZero = (s: TrendSeries) => s.points.some((p) => p.value < 0);

const POINT_RADIUS = 4;

const LABEL_RISE = 15;
const LABEL_DROP = 23;

interface PlottedPoint {
  series: TrendSeries;
  point: TrendPoint;
}

/* Groups points that land on the exact same year and value, in series order.
   Coincident points would otherwise stack, and only the last series drawn
   would show — so a shared figure would read as belonging to one series. A
   group of one is the ordinary case. */
const groupCoincidentPoints = (series: TrendSeries[]) => {
  const groups = new Map<string, PlottedPoint[]>();
  series.forEach((s) =>
    s.points.forEach((point) => {
      const key = `${point.yearIndex}:${point.value}`;
      groups.set(key, [...(groups.get(key) ?? []), { series: s, point }]);
    }),
  );
  return Array.from(groups.values());
};

/* Bounds of slice `index` of `count`, in objectBoundingBox units, so one set
   of slices cuts both the dot and the pill however wide each is. The outer
   slices overhang the box, because the bounding box excludes the stroke and
   an exact 0–1 slice would shave the dot's outer edge off at either end. */
const sliceBounds = (index: number, count: number) => {
  const left = index === 0 ? -0.5 : index / count;
  const right = index === count - 1 ? 1.5 : (index + 1) / count;
  return { x: left, width: right - left };
};

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

const VIEWBOX_WIDTH = 1000;

/* Shared by the shaded area and its legend swatch, so the key cannot drift
   from what it describes. */
const SHADE_OPACITY = 0.3;

/* Square, because the shading is an area: lines stand for series and the ring
   for a single point, so a round swatch would send readers looking for a dot.
   Same size as the ring so the two sit evenly in the legend. The hairline ring
   keeps a 30% tint from dissolving into the white behind it — the same fix as
   the BarChart's segment swatches. */
const AreaSwatch = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-color: color-mix(
    in srgb,
    ${Colors.primary} ${SHADE_OPACITY * 100}%,
    transparent
  );
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16);
  flex-shrink: 0;
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
  onReveal,
  showPointValues = true,
}: TrendChartProps) => {
  const clipId = useId();
  const deficitGradientId = (seriesId: string) =>
    `${clipId}-deficit-${seriesId}`;
  const { ref, phase } = useRevealOnce<HTMLDivElement>({
    enabled: animate,
    resetKey: animationDuration,
  });

  useEffect(() => {
    if (phase === 'revealed') onReveal?.();
  }, [phase, onReveal]);

  /* One eased 0→1 value drives the line clip, the leading bubbles and the
     pills they leave behind, so none of them can drift off the others the way
     a CSS transition and a JS counter would. Held at 1 in the `final` phase,
     which is first render too — so server output, no-JS and reduced motion
     all paint the finished chart. */
  const progress = useCountUp(1, {
    start: phase === 'final' ? 1 : 0,
    duration: animationDuration,
    easing: applyChartEasing,
    active: phase !== 'armed',
  });
  const tipX = X_FIRST + progress * (X_LAST - X_FIRST);
  const isReached = (x: number) => progress >= 1 || x <= tipX;

  const xAt = (yearIndex: number) =>
    X_FIRST + (yearIndex * (X_LAST - X_FIRST)) / (fiscalYears.length - 1);

  /* The series' value at the tip, read off the straight segment the tip is
     on. Null before the first point and from the last point on, where the
     published pill has taken over. It is not a published figure — only the
     pills left at the points are — which is why it only exists in motion. */
  const valueAtTip = (s: TrendSeries) => {
    for (let i = 0; i < s.points.length - 1; i += 1) {
      const from = s.points[i];
      const to = s.points[i + 1];
      const fromX = xAt(from.yearIndex);
      const toX = xAt(to.yearIndex);
      if (tipX >= fromX && tipX < toX) {
        return (
          from.value +
          ((to.value - from.value) * (tipX - fromX)) / (toX - fromX)
        );
      }
    }
    return null;
  };

  const pointsFor = (s: TrendSeries) =>
    s.points.map((p) => `${xAt(p.yearIndex)},${yAt(p.value)}`).join(' ');

  const shadedPolygon = () => {
    if (!shadeBetween) return null;
    const [aId, bId] = shadeBetween.seriesIds;
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
  const pointGroups = groupCoincidentPoints(series);
  const sliceCounts = Array.from(
    new Set(pointGroups.map((group) => group.length).filter((n) => n > 1)),
  );
  const sliceClipId = (index: number, count: number) =>
    `${clipId}-slice-${count}-${index}`;

  return (
    <div>
      <ScrollRegion role="img" aria-label={ariaLabel} tabIndex={0} ref={ref}>
        <svg viewBox="0 0 1000 380" aria-hidden="true">
          <defs>
            {/* Ends at the tip while drawing; at rest it opens to the full
                width so the round line caps at `X_LAST` are not shaved. */}
            <clipPath id={clipId}>
              <rect
                x={0}
                y={0}
                width={progress >= 1 ? VIEWBOX_WIDTH : tipX}
                height={380}
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

            {/* Vertical slices for coincident points: slice i of n shows the
                i-th series' dot and pill, left to right in series order. One
                set per group size actually on the chart. */}
            {sliceCounts.map((count) =>
              Array.from({ length: count }, (_, index) => (
                <clipPath
                  key={sliceClipId(index, count)}
                  id={sliceClipId(index, count)}
                  clipPathUnits="objectBoundingBox"
                >
                  <rect {...sliceBounds(index, count)} y={-0.5} height={2} />
                </clipPath>
              )),
            )}
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
                fill={Colors.greyDarker}
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

          {/* Lines and shading draw under the clip. Points, pills and markers
              sit outside it and appear whole once the tip reaches them — a
              clip would uncover a pill a sliver at a time. */}
          <g clipPath={`url(#${clipId})`}>
            {polygon && (
              <polygon
                points={polygon}
                fill={Colors.primary}
                opacity={SHADE_OPACITY}
              />
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
          </g>

          <g>
            {/* A dot marks every published figure; the lines between them are
                only trajectories, so the dots are what is actually sourced. */}
            {/* Coincident points share one dot and one pill, split into equal
                vertical slices, one per series. The figure is drawn once,
                since it is one figure; the slices say whose it is. The shared
                label takes the first series' side. */}
            {showPointValues &&
              pointGroups.map((group) => {
                const [{ series: first, point }] = group;
                const x = xAt(point.yearIndex);
                if (!isReached(x)) return null;
                const y = yAt(point.value);
                const above = (first.labelSide || 'above') === 'above';

                const label = formatDollars(point.value);
                const anchor = anchorFor(x);
                const textWidth = estimateLabelWidth(label);
                const baselineY = above ? y - LABEL_RISE : y + LABEL_DROP;

                return (
                  <g
                    key={`${group
                      .map((member) => member.series.id)
                      .join('+')}-${point.yearIndex}`}
                  >
                    {group.map(({ series: s }, index) => {
                      /* A figure below zero takes the deficit color rather
                         than its series color, so the number says what it
                         means without the reader having to catch a minus
                         sign. */
                      const pillFill =
                        point.value < 0 ? Colors.redDark : Colors[s.color];
                      /* Set on the dot and the pill each, not on a group
                         around them: a bounding-box clip measures whatever it
                         is applied to, and a group's box is mostly pill, so
                         the dot would land wholly inside one slice. */
                      const sliceClip =
                        group.length > 1
                          ? `url(#${sliceClipId(index, group.length)})`
                          : undefined;
                      return (
                        <g key={s.id}>
                          <circle
                            clipPath={sliceClip}
                            cx={x}
                            cy={y}
                            r={POINT_RADIUS}
                            /* Always solid, on every series: a solid dot is a
                               published figure and the hollow ring is the
                               computed $0 crossing, so a ring here would read
                               as a second crossing. Color follows the same
                               rule as the line and the pill, so the dot below
                               zero is not the odd one out. */
                            fill={pillFill}
                            stroke={pillFill}
                            strokeWidth={2}
                          />
                          <rect
                            clipPath={sliceClip}
                            x={pillLeft(x, textWidth, anchor)}
                            y={baselineY - PILL_BASELINE_OFFSET}
                            width={textWidth + PILL_PAD_X * 2}
                            height={PILL_HEIGHT}
                            rx={6}
                            fill={pillFill}
                          />
                        </g>
                      );
                    })}
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
              })}

            {markers.map((marker) => {
              const s = series.find((entry) => entry.id === marker.seriesId);
              const x = s ? zeroCrossing(s) : null;
              if (x === null || !isReached(x)) return null;
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

            {/* Drawn last so each bubble passes over the pills it has just
                left. Skipped at 0, where every bubble would sit on its own
                first pill — and a shared first pill would be covered by
                whichever series drew last. */}
            {showPointValues &&
              progress > 0 &&
              series.map((s) => {
                const value = valueAtTip(s);
                if (value === null) return null;
                const y = yAt(value);
                const above = (s.labelSide || 'above') === 'above';
                /* Same rule as the published pills, so the bubble turns the
                   deficit color the moment it crosses $0. */
                const pillFill = value < 0 ? Colors.redDark : Colors[s.color];
                const label = formatDollars(Math.round(value));
                const textWidth = estimateLabelWidth(label);
                const left =
                  tipX - anchorShareAt(tipX) * textWidth - PILL_PAD_X;
                const baselineY = above ? y - LABEL_RISE : y + LABEL_DROP;
                return (
                  <g key={`${s.id}-tip`}>
                    <circle
                      cx={tipX}
                      cy={y}
                      r={POINT_RADIUS}
                      fill={pillFill}
                      stroke={pillFill}
                      strokeWidth={2}
                    />
                    <rect
                      x={left}
                      y={baselineY - PILL_BASELINE_OFFSET}
                      width={textWidth + PILL_PAD_X * 2}
                      height={PILL_HEIGHT}
                      rx={6}
                      fill={pillFill}
                    />
                    <text
                      x={left + textWidth / 2 + PILL_PAD_X}
                      y={baselineY}
                      textAnchor="middle"
                      fontSize={CHART_LABEL_SIZE}
                      fontWeight={700}
                      fill={Colors.white}
                    >
                      {label}
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
              fill={Colors.greyDarker}
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
        {/* Grouped by kind: lines, then the area, then the point marker. */}
        {shadeBetween && (
          <LegendItem>
            <AreaSwatch />
            <Typography as="span" variant="span" size="xs" color="greyDarker">
              {shadeBetween.label}
            </Typography>
          </LegendItem>
        )}
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
        color="greyDarker"
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
