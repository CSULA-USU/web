import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Radii, Spaces } from 'theme';

export interface FilterChipProps
  extends React.ComponentPropsWithoutRef<'button'> {
  /** Drives both the filled look and `aria-pressed`. */
  selected?: boolean;
}

const Chip = styled.button<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.sm};
  padding: ${Spaces.sm} ${Spaces.md};
  border-radius: ${Radii.pill};
  border: 1px solid
    ${({ $selected }) => ($selected ? Colors.black : Colors.greyLighter)};
  background-color: ${({ $selected }) =>
    $selected ? Colors.black : Colors.white};
  color: ${({ $selected }) => ($selected ? Colors.white : Colors.black)};
  font-family: inherit;
  font-size: ${FontSizes.xs};
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease;

  /* A finger needs the 44px target a mouse pointer does not, so touch
     screens get it and desktop keeps the compact 32px pill. */
  @media (pointer: coarse) {
    min-height: 44px;
  }

  /* Hover is gated to real pointers: on a touch screen :hover sticks to the
     last chip tapped, which would paint a just-deselected chip yellow and
     read as still selected. */
  @media (hover: hover) {
    &:hover {
      background-color: ${Colors.primary};
      border-color: ${Colors.primary};
      color: ${Colors.black};
    }
  }

  &:focus-visible {
    outline: 3px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

/** A toggle pill for narrowing a list, such as one department of several. */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ selected = false, ...buttonProps }, ref) => (
    <Chip
      ref={ref}
      type="button"
      aria-pressed={selected}
      $selected={selected}
      {...buttonProps}
    />
  ),
);
FilterChip.displayName = 'FilterChip';
