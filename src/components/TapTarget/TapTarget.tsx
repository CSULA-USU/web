import styled from 'styled-components';

interface TapTargetProps {
  children: React.ReactNode;
  /**
   * Minimum hit area, in px. WCAG 2.2 SC 2.5.8 (AA) asks for 24×24 on a
   * control that is not part of a sentence.
   */
  size?: number;
  /** Fills its line instead of shrinking to the control, for a row of one. */
  block?: boolean;
}

/**
 * The rule lands on the control rather than this wrapper, because the hit
 * area a pointer actually tests is the anchor's or button's own box — a
 * roomy parent around an 18px link leaves the link 18px. Inline-flex with
 * centered items grows the box without moving the label off the baseline it
 * shares with whatever sits beside it.
 */
const Target = styled.span<{ $size: number; $block: boolean }>`
  display: ${(p) => (p.$block ? 'flex' : 'inline-flex')};

  a,
  button {
    display: inline-flex;
    align-items: center;
    min-height: ${(p) => p.$size}px;
    min-width: ${(p) => p.$size}px;
  }
`;

/**
 * Grows a control's hit area to a minimum square without changing how it
 * looks. Wrap a standalone link or icon button — one that stands on its own
 * rather than sitting inside a sentence, which SC 2.5.8 exempts.
 */
export const TapTarget = ({
  children,
  size = 24,
  block = false,
}: TapTargetProps) => (
  <Target $size={size} $block={block}>
    {children}
  </Target>
);
