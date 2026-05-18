import styled from 'styled-components';
import { Button, Typography } from 'components';
import { Colors, Spaces } from 'theme';
import BaseModal from './BaseModal';

interface ConfirmDialogProps {
  title?: string;
  message: string;
  highlightedText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
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
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <BaseModal
      title={title}
      onClose={onCancel}
      maxWidth="480px"
      role="alertdialog"
      footer={
        <>
          <Button onClick={onCancel}>{cancelLabel}</Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </>
      }
    >
      <MessageWrap>
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
