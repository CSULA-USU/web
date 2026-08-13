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

/* Matches the hidden table's formatting, minus sign included. */
const formatDollars = (dollars: number) =>
  `${dollars < 0 ? '−' : ''}$${Math.abs(dollars).toLocaleString('en-US')}`;

/* Keeps a label inside the drawing: points at either end of the axis anchor
   inward instead of centering and overflowing the viewBox. */
const EDGE_MARGIN = 70;
const anchorFor = (x: number): 'start' | 'middle' | 'end' => {
  if (x <= X_FIRST + EDGE_MARGIN) return 'start';
  if (x >= X_LAST - EDGE_MARGIN) return 'end';
  return 'middle';
};

const LABEL_RISE = 12;
const LABEL_DROP = 20;

/* Below ~660px the drawing scrolls rather than shrinking labels past legibility. */
const ScrollRegion = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  svg {
    display: block;
    min-width: 660px;
    width: 100%;
    height: auto;
  }
`;

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
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

const LineSwatch = styled.span<{ $color: string; $dashed: boolean }>`
  width: 28px;
  border-top: 3px ${(p) => (p.$dashed ? 'dashed' : 'solid')} ${(p) => p.$color};
  flex-shrink: 0;
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
  ariaLabel,
  table,
  animate = true,
  animationDuration = CHART_DURATION,
  showPointValues = true,
}: TrendChartProps) => {
  const clipId = useId();
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
                stroke={Colors[s.color]}
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

                  return (
                    <g key={`${s.id}-${point.yearIndex}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill={Colors.white}
                        stroke={Colors[s.color]}
                        strokeWidth={2}
                      />
                      <text
                        x={x}
                        y={above ? y - LABEL_RISE : y + LABEL_DROP}
                        textAnchor={anchorFor(x)}
                        fontSize={CHART_LABEL_SIZE}
                        fontWeight={700}
                        fill={Colors[s.color]}
                      >
                        {formatDollars(point.value)}
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
            <LineSwatch $color={Colors[s.color]} $dashed={!!s.dashed} />
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
        margin={`${Spaces.md} 0 0`}
      >
        {caption}
      </Typography>

      <VisuallyHidden>
        <Table data={table} />
      </VisuallyHidden>
    </div>
  );
};
