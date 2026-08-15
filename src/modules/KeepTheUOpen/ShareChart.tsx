import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { CitationMarker, PlaceholderMarker, Typography } from 'components';
import { useCountUp, useRevealOnce } from 'hooks';
import { CHART_LABEL_SIZE, CHART_EASING, CHART_DURATION } from './chartTokens';

export interface ShareSegment {
  id: string;
  label: string;
  percentage: number;
  /**
   * Dollar figure for this share, as published. Passed in rather than computed
   * so the page cannot drift from the figure the source states.
   */
  amount: string;
  color: keyof typeof Colors;
  /** Where the percentage is drawn on the figure, in viewBox coordinates. */
  labelPosition: { x: number; y: number };
  detail?: string;
  sourceId?: string;
  marker?: string;
}

interface ShareChartProps {
  segments: ShareSegment[];
  /** Figure shown at the center of the donut, e.g. `$227.25`. */
  total: string;
  totalLabel: string;
  variant?: 'donut' | 'pie';
  ariaLabel: string;
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

/* Two columns that sit centered as a pair, rather than two grid tracks that
   split the full width: with `space-evenly` the gutters outside the figure and
   the legend match the one between them, so the pair stays visually centered in
   whatever container it is dropped into. Stretch, not center, so the legend can
   fill the figure's height — see `LegendList`. */
const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  gap: clamp(24px, 4vw, 48px);
  width: 100%;
`;

const Figure = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 340px;

  svg {
    display: block;
    width: 100%;
    max-width: 340px;
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
  segment: ShareSegment;
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
      x={segment.labelPosition.x}
      y={segment.labelPosition.y}
      textAnchor="middle"
      fontSize={18}
      fontWeight={800}
      fill={Colors.black}
    >
      {Math.round(value)}%
    </text>
  );
};

export const ShareChart = ({
  segments,
  total,
  totalLabel,
  variant = 'donut',
  ariaLabel,
  animation = 'sweep',
  animationDuration = CHART_DURATION,
}: ShareChartProps) => {
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
  const wedges = segments.map((segment) => {
    const wedge = {
      id: segment.id,
      color: Colors[segment.color],
      dash: (CIRCUMFERENCE * segment.percentage) / 100,
      rotation,
    };
    rotation += segment.percentage * 3.6;
    return wedge;
  });

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
      {segments.map((segment) => (
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
      <Figure role="img" aria-label={ariaLabel} ref={ref}>
        <svg viewBox="0 0 400 400" aria-hidden="true">
          {animation === 'grow' ? (
            <GrowGroup $atFinal={atFinal} $transition={transition}>
              {figure}
            </GrowGroup>
          ) : (
            figure
          )}

          {variant === 'donut' && (
            <>
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
              <text
                x={CENTER}
                y={CENTER + 20}
                textAnchor="middle"
                fontSize={CHART_LABEL_SIZE}
                fill={Colors.greyDark}
              >
                {totalLabel}
              </text>
            </>
          )}
        </svg>
      </Figure>

      <LegendList>
        {segments.map((segment) => (
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
                color="gold"
                margin={`${Spaces.xs} 0 0`}
              >
                {segment.percentage}% · {segment.amount} of your fee
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
