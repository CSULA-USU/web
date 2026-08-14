import styled from 'styled-components';
import { Colors, FontSizes } from 'theme';

type MonogramShape = 'circle' | 'rounded';

interface MonogramProps {
  /**
   * The abbreviation itself, e.g. `CSUSM`. Kept as an explicit prop rather
   * than derived from a name, because the useful abbreviation is rarely the
   * first letter of each word.
   */
  label: string;
  size?: string;
  /** `circle` suits two or three characters; `rounded` holds four or five. */
  shape?: MonogramShape;
  backgroundColor?: keyof typeof Colors;
  textColor?: keyof typeof Colors;
  /**
   * Set when the full name is already written beside it, which is the usual
   * case — otherwise a screen reader reads the abbreviation and the name.
   */
  isDecorative?: boolean;
}

const Tile = styled.span<{
  $size: string;
  $shape: MonogramShape;
  $backgroundColor: keyof typeof Colors;
  $textColor: keyof typeof Colors;
}>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  padding: ${(p) => (p.$shape === 'circle' ? '0' : '0 10px')};
  width: ${(p) => (p.$shape === 'circle' ? p.$size : 'auto')};
  border-radius: ${(p) => (p.$shape === 'circle' ? '50%' : '10px')};
  background-color: ${(p) => Colors[p.$backgroundColor]};
  color: ${(p) => Colors[p.$textColor]};
  font-size: ${FontSizes['2xs']};
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  white-space: nowrap;
`;

/**
 * A lettered stand-in for a logo or seal.
 *
 * Used where an organization has no mark on file, or where using its real
 * mark would imply an endorsement it has not given. Keeps a row of entities
 * looking like a set instead of a ragged mix of logos and blanks.
 */
export const Monogram = ({
  label,
  size = '44px',
  shape = 'circle',
  backgroundColor = 'primary',
  textColor = 'black',
  isDecorative = false,
}: MonogramProps) => (
  <Tile
    $size={size}
    $shape={shape}
    $backgroundColor={backgroundColor}
    $textColor={textColor}
    aria-hidden={isDecorative || undefined}
  >
    {label}
  </Tile>
);
