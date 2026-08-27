import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';

interface SelectableOptionProps {
  title: string;
  /** Qualifier under the title — who this option is for. */
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
  /** Element the option's answer is written into, for `aria-controls`. */
  controls?: string;
}

/* The selected option mirrors the answer panel so the two sides read as one
  choice: black surface, white copy, and the primary accent. */
const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.md};
  width: 100%;
  padding: 22px ${Spaces.lg};
  text-align: left;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  background-color: ${(p) =>
    p.$selected ? Colors.black : Colors.greyLightest};
  border: 1px solid
    ${(p) => (p.$selected ? Colors.primary : Colors.greyLighter)};

  &:focus-visible {
    outline: 3px solid ${Colors.black};
    outline-offset: 3px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

/* Two borders on a rotated box — the chevron every design system draws before
   it reaches for an icon set. Nothing here needs a glyph font. */
const Chevron = styled.span`
  flex: none;
  width: 10px;
  height: 10px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(-45deg);
`;

/**
 * One choice in a group that swaps a panel beside it — a picker, not a form
 * control. It reports its state with `aria-pressed` and points at the panel it
 * swaps with `aria-controls`; whether pressing the active option clears it is
 * the caller's decision, since the group's state lives there.
 */
export const SelectableOption = ({
  title,
  subtitle,
  selected,
  onSelect,
  controls,
}: SelectableOptionProps) => (
  <Option
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    aria-controls={controls}
    $selected={selected}
  >
    <span>
      <Typography
        as="span"
        variant="labelTitle"
        size="md"
        weight="700"
        color={selected ? 'white' : 'greyDarker'}
        margin="0"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          as="span"
          variant="copy"
          size="xs"
          color={selected ? 'white' : 'greyDarker'}
          margin={`${Spaces.xs} 0 0`}
        >
          {subtitle}
        </Typography>
      )}
    </span>
    <Chevron aria-hidden="true" />
  </Option>
);
