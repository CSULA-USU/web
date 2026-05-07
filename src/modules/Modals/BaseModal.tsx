import type React from 'react';
import styled from 'styled-components';
import { Typography } from 'components';
import { Colors, Spaces } from 'theme';

interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
  labelledById?: string;
  role?: 'dialog' | 'alertdialog';
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spaces.md};
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div<{ $maxWidth: string }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${Colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

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

  &:hover {
    background-color: ${Colors.grey};
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
  children,
  footer,
  onClose,
  maxWidth = '600px',
  labelledById = 'modal-title',
  role = 'dialog',
}: BaseModalProps) {
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal
        role={role}
        aria-modal="true"
        aria-labelledby={labelledById}
        $maxWidth={maxWidth}
      >
        <ModalHeader>
          <Typography as="h2" id={labelledById} variant="title">
            {title}
          </Typography>

          <CloseButton type="button" onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
      </Modal>
    </Overlay>
  );
}

export default BaseModal;
