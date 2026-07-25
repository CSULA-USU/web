import { useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

interface ArchiveConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const FixedModal = Modal as unknown as React.FC<any>;

// react-modal merges these over Modal.defaultStyles, so the content defaults it
// pins 40px from every edge have to be reset explicitly for the overlay's flex
// centering to place the panel.
const ARCHIVE_DIALOG_STYLES = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  content: {
    position: 'static',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    border: 'none',
    background: '#ffffff',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    overflow: 'visible',
  },
};

const DialogHeader = styled.div`
  padding: 24px 24px 16px;
`;

const DialogTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

const DialogMessage = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0;
  line-height: 1.5;
`;

const DocumentTitle = styled.strong`
  color: #333333;
  display: block;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f8f8f8;
  border-radius: 4px;
  word-break: break-word;
`;

const DialogFooter = styled.div`
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'danger' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === 'danger'
      ? `
    background-color: #dc3545;
    color: #ffffff;
    &:hover {
      background-color: #c82333;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
    }
  `
      : `
    background-color: #f0f0f0;
    color: #333333;
    &:hover {
      background-color: #e0e0e0;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    }
  `}

  &:active {
    transform: translateY(1px);
  }
`;

export function ArchiveConfirmDialog({
  title,
  onConfirm,
  onCancel,
}: ArchiveConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <FixedModal
      isOpen
      onRequestClose={onCancel}
      onAfterOpen={() => cancelButtonRef.current?.focus()}
      role="alertdialog"
      aria={{
        labelledby: 'archive-dialog-title',
        describedby: 'archive-dialog-message',
      }}
      style={ARCHIVE_DIALOG_STYLES}
    >
      <DialogHeader>
        <DialogTitle id="archive-dialog-title">Confirm Archival</DialogTitle>
        <DialogMessage id="archive-dialog-message">
          Are you sure you want to archive all documents in this section? This
          action cannot be undone.
          <DocumentTitle>{title}</DocumentTitle>
        </DialogMessage>
      </DialogHeader>
      <DialogFooter>
        <Button ref={cancelButtonRef} onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Archive
        </Button>
      </DialogFooter>
    </FixedModal>
  );
}
