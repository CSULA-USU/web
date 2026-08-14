import styled from 'styled-components';
import { Spaces } from 'theme';

interface AutoGridStyles {
  /**
   * Narrowest a column may get before the grid drops to fewer columns.
   * Wrapped in `min(..., 100%)` so a wide minimum never overflows a
   * narrow viewport.
   */
  minColumnWidth?: string;
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

const StyledAutoGrid = styled.div<AutoGridStyles>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${(p) => p.minColumnWidth || '280px'}, 100%), 1fr)
  );
  gap: ${(p) => p.gap || Spaces.lg};
  align-items: ${(p) => p.alignItems || 'stretch'};
  justify-items: ${(p) => p.justifyItems || 'stretch'};
  width: 100%;
  margin: ${(p) => p.margin || '0'};
`;

export const AutoGrid = (props: AutoGridProps) => <StyledAutoGrid {...props} />;
