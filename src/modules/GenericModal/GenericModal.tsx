import Modal from 'react-modal';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Colors, Spaces } from 'theme';
import { useBodyScrollLock } from 'hooks';

interface GenericModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  height?: string;
  width?: string;
  /** Names the dialog for screen readers — usually whatever the heading says. */
  contentLabel?: string;
  onRequestClose: () => void;
}
const FixedModal = Modal as unknown as React.FC<any>;

/**
 * Fade duration. Must stay in step with the transition on
 * `.usu-generic-modal-portal` in globals.css — react-modal keeps the modal
 * mounted for exactly this long on close so the fade-out can finish.
 */
const FADE_DURATION_MS = 200;

/**
 * Scopes the fade to this component. react-modal drops its default inline
 * styles the moment you pass `className`, which would silently strip the
 * content's `position: absolute` and white background — so the transition is
 * hung off `portalClassName` instead, which has no such side effect and leaves
 * the other react-modal consumers (EventModal, ImageModal, ConfirmDialog)
 * exactly as they were.
 */
const PORTAL_CLASS_NAME = 'usu-generic-modal-portal';

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
  contentLabel,
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

  // Locks the page behind the modal. The hook owns the restore — including the
  // case where the modal unmounts while still open, which is what happens when
  // a link inside it navigates away — and does nothing while closed, which
  // matters here because a page can mount many of these at once.
  useBodyScrollLock(isOpen);

  return (
    <FixedModal
      isOpen={isOpen}
      style={customStyles}
      contentLabel={contentLabel}
      portalClassName={PORTAL_CLASS_NAME}
      closeTimeoutMS={FADE_DURATION_MS}
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
