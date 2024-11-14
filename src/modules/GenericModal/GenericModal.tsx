import Modal from 'react-modal';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Colors, Spaces } from 'theme';

interface GenericModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  maxWidth?: string;
  onRequestClose: () => void;
}

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
    width: '95%',
  },
};

const Main = styled.div<{ maxWidth?: string; height?: string }>`
  max-width: ${(props) => props.maxWidth || '100%'};
  margin: ${Spaces.xs};
  text-align: center;
  overflow-y: auto;
`;

export const GenericModal = ({
  children,
  isOpen,
  maxWidth,
  onRequestClose, //expects a function
}: GenericModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <CloseButtonContainer>
        <CloseButton onClick={onRequestClose} aria-label="close">
          <CloseButtonIcon />
        </CloseButton>
      </CloseButtonContainer>
      <Main maxWidth={maxWidth}>{children}</Main>
    </Modal>
  );
};
