import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';

interface EyebrowProps {
  children: React.ReactNode;
  /** Color of the label itself. */
  color?: keyof typeof Colors;
  /**
   * Color of the accent rule. Defaults to gold, which reads on every light
   * ground on the site but all but vanishes on a dark band — pass the label's
   * own color there so the rule stays visible.
   */
  accentColor?: keyof typeof Colors;
  /** Tracking for the uppercase label. */
  letterSpacing?: string;
  margin?: string;
  /** Drops the rule for an eyebrow that is not marking the top of a section. */
  accent?: boolean;
}

/* A short rule leading into the label, matching the section kickers on the
   U-Awards page. It is decorative — the label carries the meaning on its own,
   so nothing is lost when the rule is dropped or fails to paint. */
const EyebrowRow = styled.p<{
  $accent: boolean;
  $accentColor: keyof typeof Colors;
  $margin?: string;
}>`
  display: flex;
  align-items: center;
  gap: ${Spaces.sm};
  margin: ${(p) => p.$margin ?? '0'};

  ${(p) =>
    p.$accent &&
    `
      ::before {
        content: '';
        flex: none;
        width: 28px;
        height: 2px;
        background-color: ${Colors[p.$accentColor]};
      }
    `}
`;

export const Eyebrow = ({
  children,
  color = 'gold',
  accentColor = 'gold',
  letterSpacing = '0.12em',
  margin,
  accent = true,
}: EyebrowProps) => (
  <EyebrowRow $accent={accent} $accentColor={accentColor} $margin={margin}>
    <Typography
      variant="span"
      as="span"
      size="2xs"
      weight="700"
      uppercase
      letterSpacing={letterSpacing}
      color={color}
    >
      {children}
    </Typography>
  </EyebrowRow>
);
