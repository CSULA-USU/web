import styled from 'styled-components';
import { Spaces } from 'theme';

interface AutoGridStyles {
  /**
   * Narrowest a column may get before the grid drops to fewer columns.
   * Wrapped in `min(..., 100%)` so a wide minimum never overflows a
   * narrow viewport.
   */
  minColumnWidth?: string;
  /**
   * Most columns the grid may reach, however wide it gets. Set it when the
   * item count is known and a full-width row would strand a remainder — six
   * cards at four across leave two hanging, at three across they fill two
   * rows. Below the cap the grid still drops columns at `minColumnWidth`.
   */
  maxColumns?: number;
  gap?: string;
  alignItems?: 'stretch' | 'flex-start' | 'center';
  /**
   * Inline placement of each item within its own column. `stretch` fills the
   * column; `center` sizes the item to its content and centers it, which is
   * what makes a row of equal columns read as evenly spaced rather than as
   * items shoved against their left edges.
   */
  justifyItems?: 'stretch' | 'center';
  margin?: string;
}

interface AutoGridProps extends AutoGridStyles {
  children?: React.ReactNode;
}

/* With a cap, a column's floor rises to one nth of the row (less the gaps
   between n columns), so auto-fit can never fit more than n. The outer
   min(..., 100%) still keeps a narrow viewport from overflowing. */
const columnFloor = ({ minColumnWidth, maxColumns, gap }: AutoGridStyles) => {
  const minimum = minColumnWidth || '280px';
  if (!maxColumns) return minimum;
  return `max(${minimum}, calc((100% - ${maxColumns - 1} * ${
    gap || Spaces.lg
  }) / ${maxColumns}))`;
};

const StyledAutoGrid = styled.div<AutoGridStyles>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${columnFloor}, 100%), 1fr)
  );
  gap: ${(p) => p.gap || Spaces.lg};
  align-items: ${(p) => p.alignItems || 'stretch'};
  justify-items: ${(p) => p.justifyItems || 'stretch'};
  width: 100%;
  margin: ${(p) => p.margin || '0'};
`;

export const AutoGrid = (props: AutoGridProps) => <StyledAutoGrid {...props} />;
