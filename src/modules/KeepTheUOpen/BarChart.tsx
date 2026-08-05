import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { CountUp, Typography } from 'components';
import { smoothstep, useRevealOnce } from 'hooks';
import { chartColors, CHART_EASING, CHART_DURATION } from './chartTokens';

export interface BarRow {
  id: string;
  campus: string;
  /** True figure, always shown in the value column even when drawn at the cap. */
  value: number;
  color?: keyof typeof Colors;
  /**
   * Second, lighter segment drawn as an extension of the same bar — never a
   * separate row.
   */
  proposedValue?: number;
  /** Labels for the two segments, e.g. `today` and `proposed`. */
  segmentLabels?: { base: string; extension: string };
  /** Short note drawn beside the bar, so color is not the only carrier. */
  annotation?: string;
  /** Drawn at the cap with a hatch fill rather than truncated silently. */
  offScale?: boolean;
}

interface BarChartProps {
  rows: BarRow[];
  /** Value axis ceiling. Bars are drawn as a share of this. */
  cap: number;
  median: { value: number; label: string };
  /** Row drawn as the highlighted, two-segment Cal State LA row. */
  highlightId: string;
  ariaLabel: string;
  /** Grows the bars from the left, staggered top to bottom, with the value
   * column counting up on each row's own delay. */
  animate?: boolean;
  animationDuration?: number;
}

const ROW_GRID = `
  display: grid;
  grid-template-columns: clamp(92px, 14vw, 150px) 1fr 64px;
  gap: 12px;
  align-items: center;
`;

const Chart = styled.div`
  position: relative;
  width: 100%;
`;

const Row = styled.div<{ $highlighted: boolean }>`
  ${ROW_GRID}
  padding: 4px 0;
  ${(p) => p.$highlighted && `background-color: ${chartColors.highlightedRow};`}
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  background-color: ${chartColors.track};
  border-radius: 3px;
  overflow: hidden;
  display: flex;
`;

/* Wraps both segments so the two-segment Cal State LA row grows as one. Stays
   at full width, so each segment's percentage is still measured against the
   track. */
const BarGroup = styled.div<{
  $atFinal: boolean;
  $transition: string | null;
}>`
  display: flex;
  width: 100%;
  transform-origin: left;
  transform: scaleX(${(p) => (p.$atFinal ? 1 : 0)});
  ${(p) => p.$transition && `transition: transform ${p.$transition};`}
`;

const Bar = styled.div<{ $width: number; $height: number; $fill: string }>`
  width: ${(p) => p.$width}%;
  height: ${(p) => p.$height}px;
  background: ${(p) => p.$fill};
  border-radius: 3px 0 0 3px;
`;

const Extension = styled.div<{ $width: number; $height: number }>`
  width: ${(p) => p.$width}%;
  height: ${(p) => p.$height}px;
  background-color: ${Colors.pastelYellow};
  border-left: 2px solid ${Colors.gold};
  border-radius: 0 3px 3px 0;
`;

const CAMPUS_COLUMN = 'clamp(92px, 14vw, 150px)';

/* Horizontal position inside the track column: campus column + gap, then the
   ratio's share of the remaining track width. Shared by the rule and its label
   so the two stay coupled. */
const trackOffset = (ratio: number) =>
  `calc(${CAMPUS_COLUMN} + 12px + (100% - ${CAMPUS_COLUMN} - 64px - 24px) * ${ratio})`;

const MedianRule = styled.div<{ $ratio: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  border-left: 2px dashed ${Colors.gold};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.6);
  left: ${(p) => trackOffset(p.$ratio)};
`;

/* Reserves a row above the bars so the label can sit centered on the rule. */
const MedianLabelRow = styled.div`
  position: relative;
  height: 1.4em;
`;

const MedianLabel = styled.div<{ $ratio: number }>`
  position: absolute;
  bottom: 0;
  left: ${(p) => trackOffset(p.$ratio)};
  transform: translateX(-50%);
  white-space: nowrap;
`;

const AxisRow = styled.div`
  ${ROW_GRID}
  margin-top: ${Spaces.sm};
`;

const AxisTicks = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: space-between;
`;

/* Anchored to the row's top so the track stays level with the two side columns
   however much the sub-labels add below it. */
const BarCell = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/* The campus name and value would otherwise center on the full row height,
   which the sub-labels beneath the track make taller than the bar — that is
   what dropped Cal State LA, Channel Islands and San Luis Obispo below their
   bars. Centering on the bar's own height instead lines all three up. */
const BandCell = styled.div<{ $height: number }>`
  align-self: start;
  display: flex;
  align-items: center;
  min-height: ${(p) => p.$height}px;
`;

const SegmentLabels = styled.div`
  display: flex;
  gap: ${Spaces.md};
  flex-wrap: wrap;
`;

const formatDollars = (value: number) => `$${value.toLocaleString('en-US')}`;

export const BarChart = ({
  rows,
  cap,
  median,
  highlightId,
  ariaLabel,
  animate = true,
  animationDuration = CHART_DURATION,
}: BarChartProps) => {
  const { ref, phase, atFinal, isTransitioning } =
    useRevealOnce<HTMLDivElement>({
      enabled: animate,
      resetKey: animationDuration,
    });

  /* Bars run for 60% of the duration; rows start duration/60 apart. */
  const barDuration = animationDuration * 0.6;
  const stagger = animationDuration / 60;

  return (
    <div>
      <MedianLabelRow>
        <MedianLabel $ratio={median.value / cap}>
          <Typography
            as="p"
            variant="span"
            size="2xs"
            weight="700"
            color="gold"
            tabularNums
          >
            {median.label}
          </Typography>
        </MedianLabel>
      </MedianLabelRow>

      <Chart role="img" aria-label={ariaLabel} ref={ref}>
        {rows.map((row, rowIndex) => {
          const highlighted = row.id === highlightId;
          const rowDelay = rowIndex * stagger;
          const height = highlighted ? 30 : 20;
          const drawnValue = row.offScale ? cap : row.value;
          const baseWidth = (drawnValue / cap) * 100;
          const extensionWidth = row.proposedValue
            ? ((row.proposedValue - row.value) / cap) * 100
            : 0;
          const fill = row.offScale
            ? `repeating-linear-gradient(135deg, ${Colors.greyDarkest} 0 6px, ${Colors.greyDark} 6px 12px)`
            : Colors[row.color || 'greyDarkest'];

          return (
            <Row key={row.id} $highlighted={highlighted}>
              <BandCell $height={height}>
                <Typography
                  as="span"
                  variant="span"
                  size="2xs"
                  weight={highlighted ? '800' : '400'}
                >
                  {row.campus}
                </Typography>
              </BandCell>
              <BarCell>
                <Track>
                  <BarGroup
                    $atFinal={atFinal}
                    $transition={
                      isTransitioning
                        ? `${barDuration}ms ${CHART_EASING} ${rowDelay}ms`
                        : null
                    }
                  >
                    <Bar $width={baseWidth} $height={height} $fill={fill} />
                    {extensionWidth > 0 && (
                      <Extension $width={extensionWidth} $height={height} />
                    )}
                  </BarGroup>
                </Track>
                {(row.segmentLabels || row.annotation) && (
                  <SegmentLabels>
                    {row.segmentLabels && (
                      <>
                        <Typography
                          as="span"
                          variant="span"
                          size="2xs"
                          color="greyDark"
                          tabularNums
                        >
                          {row.segmentLabels.base} {formatDollars(row.value)}
                        </Typography>
                        {row.proposedValue && (
                          <Typography
                            as="span"
                            variant="span"
                            size="2xs"
                            color="greyDark"
                            tabularNums
                          >
                            {row.segmentLabels.extension}{' '}
                            {formatDollars(row.proposedValue)}
                          </Typography>
                        )}
                      </>
                    )}
                    {row.annotation && (
                      <Typography
                        as="span"
                        variant="span"
                        size="2xs"
                        weight="700"
                        color="gold"
                      >
                        {row.annotation}
                      </Typography>
                    )}
                  </SegmentLabels>
                )}
              </BarCell>
              <BandCell $height={height}>
                <CountUp
                  as="span"
                  variant="span"
                  size="2xs"
                  weight={highlighted ? '800' : '400'}
                  tabularNums
                  start={isTransitioning ? 0 : row.value}
                  end={row.value}
                  trigger={phase === 'revealed'}
                  duration={barDuration}
                  delay={rowDelay}
                  easing={smoothstep}
                  format={formatDollars}
                />
              </BandCell>
            </Row>
          );
        })}
        <MedianRule $ratio={median.value / cap} />
      </Chart>

      <AxisRow>
        <AxisTicks>
          {[0, cap / 3, (cap / 3) * 2, cap].map((tick) => (
            <Typography
              key={tick}
              as="span"
              variant="span"
              size="2xs"
              color="greyDark"
              tabularNums
            >
              {formatDollars(Math.round(tick))}
            </Typography>
          ))}
        </AxisTicks>
      </AxisRow>
    </div>
  );
};
