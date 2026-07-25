import type React from 'react';
import { useEffect, useId } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
// Leaf import rather than the `components` barrel — see ConfirmDialog.
import { Typography } from 'components/Typography/Typography';
import { Colors, Spaces } from 'theme';

interface BaseModalProps {
  title: string;
  greekLetters?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
  labelledById?: string;
  describedById?: string;
  role?: 'dialog' | 'alertdialog';
  initialFocusRef?: React.RefObject<HTMLElement>;
}

const FixedModal = Modal as unknown as React.FC<any>;

// react-modal merges these over Modal.defaultStyles, so the content defaults it
// pins 40px from every edge have to be reset explicitly for the overlay's flex
// centering to place the panel.
const buildModalStyles = (maxWidth: string) => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spaces.md,
    zIndex: 1000,
  },
  content: {
    position: 'static',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    border: 'none',
    background: Colors.white,
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth,
    maxHeight: '90vh',
    overflowY: 'auto',
  },
});

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.md};
  padding: ${Spaces.lg};
  border-bottom: 1px solid ${Colors.grey};
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${Colors.black};
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  border-radius: 50%;

  &:hover {
    background-color: ${Colors.red};
    color: ${Colors.white};
  }

  &:focus {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

const ModalBody = styled.div`
  padding: ${Spaces.lg};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${Spaces.sm};
  padding: ${Spaces.md} ${Spaces.lg};
  border-top: 1px solid ${Colors.grey};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export function BaseModal({
  title,
  greekLetters,
  children,
  footer,
  onClose,
  maxWidth = '600px',
  labelledById,
  describedById,
  role = 'dialog',
  initialFocusRef,
}: BaseModalProps) {
  const generatedId = useId();
  const headingId = labelledById ?? `${generatedId}-title`;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <FixedModal
      isOpen
      onRequestClose={onClose}
      onAfterOpen={() => initialFocusRef?.current?.focus()}
      role={role}
      aria={{ labelledby: headingId, describedby: describedById }}
      style={buildModalStyles(maxWidth)}
    >
      <ModalHeader>
        <Typography as="h2" id={headingId} variant="title" size="xl">
          {greekLetters ? `${title} (${greekLetters})` : title}
        </Typography>

        <CloseButton type="button" onClick={onClose} aria-label="Close modal">
          ×
        </CloseButton>
      </ModalHeader>

      <ModalBody>{children}</ModalBody>

      {footer ? <ModalFooter>{footer}</ModalFooter> : null}
    </FixedModal>
  );
}

export default BaseModal;
