import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaRegCopy } from 'react-icons/fa6';
import { IoIosCheckmark } from 'react-icons/io';
import { Colors } from 'theme';

interface CopyButtonProps {
  // The exact text placed on the clipboard.
  value: string;
  // What the value is, used to build the accessible name — 'email address'
  // reads as "Copy email address".
  label: string;
}

const CONFIRMATION_DURATION = 2000;

const StyledCopyButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 28px;
  width: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: ${(p) => (p.$copied ? Colors.gold : Colors.greyDark)};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: ${Colors.greyLightest};
    ${(p) => !p.$copied && `color: ${Colors.greyDarkest};`}
  }

  &:focus-visible {
    outline: 2px solid ${Colors.gold};
    outline-offset: 2px;
  }
`;

// Gives screen readers the same confirmation the icon swap gives sighted users.
const LiveRegion = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

export const CopyButton = ({ value, label }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimeout.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard access can be refused — an insecure context, or a browser
      // that denies the permission. Leave the button alone rather than
      // confirming a copy that never happened.
      return;
    }

    setCopied(true);
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(
      () => setCopied(false),
      CONFIRMATION_DURATION,
    );
  };

  return (
    <>
      <StyledCopyButton
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        title={copied ? 'Copied' : 'Copy'}
        $copied={copied}
      >
        {copied ? (
          <IoIosCheckmark size="22px" aria-hidden />
        ) : (
          <FaRegCopy size="15px" aria-hidden />
        )}
      </StyledCopyButton>
      <LiveRegion aria-live="polite">
        {copied ? `${label} copied` : ''}
      </LiveRegion>
    </>
  );
};
