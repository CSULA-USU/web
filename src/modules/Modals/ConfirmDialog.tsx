import { useId, useRef } from 'react';
import styled from 'styled-components';
// Imported from the leaf modules rather than the `components` barrel: that
// barrel transitively pulls in the whole app (sections, services, Supabase),
// which makes these modals impossible to render in isolation under test.
import { Button } from 'components/Button/Button';
import type { ButtonProps } from 'components/Button/Button';
import { Typography } from 'components/Typography/Typography';
import { Colors, Spaces } from 'theme';
import BaseModal from './BaseModal';

interface ConfirmDialogProps {
  title?: string;
  message: string;
  highlightedText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ButtonProps['variant'];
  onConfirm: () => void;
  onCancel: () => void;
}

const MessageWrap = styled.div`
  display: grid;
  gap: ${Spaces.sm};
`;

const HighlightedText = styled.strong`
  display: block;
  padding: ${Spaces.sm} ${Spaces.md};
  border-radius: 4px;
  background-color: ${Colors.greyLighter};
  color: ${Colors.black};
  word-break: break-word;
`;

export function ConfirmDialog({
  title = 'Confirm Action',
  message,
  highlightedText,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Focus the non-destructive action: these confirmations are irreversible, so a
  // stray Enter on open should cancel rather than commit.
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const generatedId = useId();
  const messageId = `${generatedId}-message`;

  return (
    <BaseModal
      title={title}
      onClose={onCancel}
      maxWidth="480px"
      role="alertdialog"
      describedById={messageId}
      initialFocusRef={cancelButtonRef}
      footer={
        <>
          <Button ref={cancelButtonRef} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <MessageWrap id={messageId}>
        <Typography as="p" variant="copy">
          {message}
        </Typography>

        {highlightedText ? (
          <HighlightedText>{highlightedText}</HighlightedText>
        ) : null}
      </MessageWrap>
    </BaseModal>
  );
}

export default ConfirmDialog;
