import styled from 'styled-components';
import { Colors } from 'theme';
import { Typography } from '../Typography';

type MarkerTone = 'gold' | 'primary';

interface PlaceholderMarkerProps {
  /**
   * The bracketed text itself, e.g. `[NEEDS FIGURE — events per year]`.
   * These markers are load-bearing: a hole is recoverable, a wrong number is
   * not. Do not remove one because it looks unfinished.
   */
  children: string;
  /** `inline` sits inside a sentence; `block` is a dashed standalone chip. */
  variant?: 'inline' | 'block';
  /** `primary` for markers on a dark ground, `gold` on a light one. */
  tone?: MarkerTone;
}

const Chip = styled.span<{ $tone: MarkerTone }>`
  display: inline-block;
  border: 1px dashed ${(p) => Colors[p.$tone]};
  border-radius: 8px;
  padding: 10px 14px;
`;

export const PlaceholderMarker = ({
  children,
  variant = 'inline',
  tone = 'gold',
}: PlaceholderMarkerProps) => {
  const label = (
    <Typography
      as="span"
      variant="span"
      size="2xs"
      weight="700"
      letterSpacing={variant === 'block' ? '0.04em' : undefined}
      color={tone}
    >
      {children}
    </Typography>
  );

  return variant === 'block' ? <Chip $tone={tone}>{label}</Chip> : label;
};
