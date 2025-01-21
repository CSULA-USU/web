import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';

const blink = keyframes`
      50% {
          opacity: 0;
      }
  `;

const Cursor = styled.span<{ color: keyof typeof Colors }>`
  font-weight: bold;
  animation: ${blink} 0.6s step-end infinite;
  color: ${(p) => p.color};
`;

export const BlinkingCursor = ({ color }: { color: keyof typeof Colors }) => {
  return <Cursor color={color}>|</Cursor>;
};
