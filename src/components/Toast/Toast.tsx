import styled from 'styled-components';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const ToastContainer = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 500;
  z-index: 2000;
  animation: slideIn 0.3s ease;
  max-width: 400px;

  ${(props) =>
    props.type === 'success'
      ? `
    background-color: #28a745;
    color: #ffffff;
  `
      : `
    background-color: #dc3545;
    color: #ffffff;
  `}

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
`;

export function Toast({ message, type }: ToastProps) {
  return (
    <ToastContainer type={type} role="alert" aria-live="polite">
      {message}
    </ToastContainer>
  );
}
