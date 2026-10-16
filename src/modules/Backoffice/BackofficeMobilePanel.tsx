'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { Colors, FontSizes, Radii, Shadows, Spaces } from 'theme';
import BackofficeNavList from './BackofficeNavList';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`;

// The sidebar's rail, as a drawer from the same edge, so the tools look and
// sit the same whichever way a viewer reaches them.
const Drawer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(320px, calc(100vw - 48px));
  overflow-y: auto;
  background: ${Colors.greyDarkest};
  box-shadow: ${Shadows.lifted};
  padding-bottom: ${Spaces.lg};
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Spaces.md} 12px ${Spaces.md} 20px;
`;

const DrawerTitle = styled.h2`
  margin: 0;
  font-size: ${FontSizes['2xs']};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.greyLighter};
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: ${Radii.structure};
  background: transparent;
  color: ${Colors.greyLighter};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: -2px;
  }
`;

export default function BackofficeMobilePanel({ open, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Focus moves into the drawer and back to whatever opened it, so a
    // keyboard user is not left behind the scrim or dropped at the page top.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay>
      <Scrim aria-hidden="true" />
      <Drawer
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="backoffice-drawer-title"
      >
        <DrawerHeader>
          <DrawerTitle id="backoffice-drawer-title">
            Backoffice tools
          </DrawerTitle>
          <CloseButton
            ref={closeRef}
            type="button"
            aria-label="Close tools menu"
            onClick={onClose}
          >
            <MdClose size={24} aria-hidden="true" />
          </CloseButton>
        </DrawerHeader>
        <BackofficeNavList
          searchId="backoffice-drawer-search"
          onNavigate={onClose}
        />
      </Drawer>
    </Overlay>
  );
}
