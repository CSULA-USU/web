import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import styled from 'styled-components';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  noCloseButton?: boolean;
}

const PopoverContent = styled(RadixPopover.Content)`
  border-radius: 4px;
  padding: 20px;
  width: 240px;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  &:focus {
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px black;
  }
  &[data-state='open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }
  &[data-state='open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }
  &[data-state='open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }
  &[data-state='open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const PopoverArrow = styled(RadixPopover.Arrow)`
  fill: white;
`;

const PopoverClose = styled(RadixPopover.Close)`
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    background-color: black;
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export const Popover = ({ trigger, children, noCloseButton }: PopoverProps) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
    <RadixPopover.Portal>
      <PopoverContent align="center">
        {children}
        {!noCloseButton && (
          <PopoverClose aria-label="Close">
            <Cross2Icon />
          </PopoverClose>
        )}
        <PopoverArrow />
      </PopoverContent>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);
