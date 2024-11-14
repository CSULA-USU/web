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
  onRequestClose, //expects a function
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
      width: width ? width : 'auto',
      overflow: 'auto',
    },
  };

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
      <Main width={width}>{children}</Main>
    </Modal>
  );
};
