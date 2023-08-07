import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import styled from 'styled-components';
import { Colors } from 'theme';

interface SelectProps extends RadixSelect.SelectProps {
  items: { label: string; value: string }[];
  ariaLabel?: string;
  placeholder?: string;
}

const SelectTrigger = styled(RadixSelect.SelectTrigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: white;
  color: black;
  &:hover {
    background-color: white;
  }
  *:focus {
    box-shadow: 0 0 0 2px black;
  }
  &[data-placeholder] {
    color: ${Colors.grey};
  }
`;

const SelectIcon = styled(RadixSelect.SelectIcon)`
  color: black;
`;

const SelectContent = styled(RadixSelect.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const SelectViewport = styled(RadixSelect.Viewport)`
  padding: 5px;
`;

const SelectItem = React.forwardRef(
  ({ children, ...props }: any, forwardedRef) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <StyledItemIndicator>
          <CheckIcon />
        </StyledItemIndicator>
      </StyledItem>
    );
  },
);
SelectItem.displayName = 'SelectItem';

const StyledItem = styled(RadixSelect.Item)`
  font-size: 13px;
  line-height: 1;
  color: ${Colors.black};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
  &[data-disabled] {
    color: ${Colors.greyLighter};
    pointer-events: none;
  }
  &[data-highlighted] {
    outline: none;
    background-color: ${Colors.greyLightest};
    color: ${Colors.black};
  }
`;

const StyledItemIndicator = styled(RadixSelect.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: 'violet',
  cursor: 'default',
};

const SelectScrollUpButton = styled(RadixSelect.ScrollUpButton)`
  ${scrollButtonStyles}
`;

const SelectScrollDownButton = styled(RadixSelect.ScrollDownButton)`
  ${scrollButtonStyles}
`;

export const Select = ({
  items,
  ariaLabel,
  placeholder,
  ...props
}: SelectProps) => (
  <RadixSelect.Root {...props}>
    <SelectTrigger aria-label={ariaLabel}>
      <RadixSelect.Value placeholder={placeholder} />
      <SelectIcon>
        <ChevronDownIcon />
      </SelectIcon>
    </SelectTrigger>
    <RadixSelect.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);
