import Modal from 'react-modal';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

interface GenericModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}

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
  },
};

const Main = styled.div`
  max-width: 600px;
  margin: ${Spaces.xs};
  text-align: center;
`;

export const GenericModal = ({
  children,
  isOpen,
  onRequestClose, //expects a function
}: GenericModalProps) => {
  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <Main>{children}</Main>
    </Modal>
  );
};
