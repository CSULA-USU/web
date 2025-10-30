import type React from 'react';
import styled from 'styled-components';

interface DeleteConfirmDialogueProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const Dialogue = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const DialogueHeader = styled.div`
  padding: 24px 24px 16px;
`;

const DialogueTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

const DialogueMessage = styled.p`
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

const DialogueFooter = styled.div`
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

export function DeleteConfirmDialogue({
  title,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogueProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialogue
        role="alertDialogue"
        aria-labelledby="Dialogue-title"
        aria-modal="true"
      >
        <DialogueHeader>
          <DialogueTitle id="Dialogue-title">Confirm Deletion</DialogueTitle>
          <DialogueMessage>
            Are you sure you want to delete this document? This action cannot be
            undone.
            <DocumentTitle>{title}</DocumentTitle>
          </DialogueMessage>
        </DialogueHeader>
        <DialogueFooter>
          <Button onClick={onCancel} aria-label="Cancel deletion">
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            aria-label="Confirm deletion"
          >
            Delete
          </Button>
        </DialogueFooter>
      </Dialogue>
    </Overlay>
  );
}
