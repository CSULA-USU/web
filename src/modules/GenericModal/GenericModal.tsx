import Modal from 'react-modal';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Colors, Spaces } from 'theme';

interface GenericModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  height?: string;
  width?: string;
  onRequestClose: () => void;
}
const FixedModal = Modal as unknown as React.FC<any>;

const CloseButton = styled.button`
  background: transparent;
  height: 24px;
  width: 24px;
  border: none;
  cursor: pointer;
  margin: 0 20px 20px;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${Colors.greyLightest};
`;

const CloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  cursor: pointer;
  font-size: 24px;
  &:hover,
  &:focus {
    color: ${Colors.black};
    transition: 0.2s ease-in-out;
  }
`;

const Main = styled.div<{ width?: string; height?: string }>`
  margin: ${Spaces.xs};
  text-align: center;
  overflow-y: auto;
`;

export const GenericModal = ({
  children,
  isOpen,
  height,
  width,
  onRequestClose,
}: GenericModalProps) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '12px',
      border: `1px solid ${Colors.greyLightest}`,
      boxShadow: '2px 4px 12px rgba(191, 191, 191, 0.25)',
      height: height ? height : 'auto',
      maxHeight: '90vh',
      width: width ? width : 'auto',
      maxWidth: '90vw',
      overflow: 'auto',
      zIndex: 1000,
    },
    overlay: {
      zIndex: 999,
    },
  };

  // Locks the page behind the modal, and restores whatever the body had before
  // — including when the modal unmounts while still open, which is what happens
  // when a link inside it navigates away. Writing a fixed value on close instead
  // left the lock stuck on, and clobbered any scroll lock another component had
  // set. Doing nothing while closed keeps a closed modal from touching the body
  // at all, which matters here because a page can mount many of these at once.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <FixedModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >
      <CloseButtonContainer>
        <CloseButton onClick={onRequestClose} aria-label="close">
          <CloseButtonIcon />
        </CloseButton>
      </CloseButtonContainer>
      <Main width={width}>{children}</Main>
    </FixedModal>
  );
};
