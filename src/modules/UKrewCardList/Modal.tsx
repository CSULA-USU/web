import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RiCloseCircleFill } from 'react-icons/ri';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  padding: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(31, 41, 55, 0.5); /* gray-800 w/ opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  max-width: 1280px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  color: #4b5563; /* gray-600 */
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id === 'modal-backdrop') {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Backdrop id="modal-backdrop">
      <ModalBox ref={modalRef} tabIndex={0}>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <RiCloseCircleFill size={28} color="red" />
        </CloseButton>
        {children}
      </ModalBox>
    </Backdrop>
  );
};
