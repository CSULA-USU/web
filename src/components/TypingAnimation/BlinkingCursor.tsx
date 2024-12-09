import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';

export const BlinkingCursor = ({ color }: { color: keyof typeof Colors }) => {
  const blink = keyframes`
        50% {
            opacity: 0;
        }
    `;

  const Cursor = styled.span`
    font-weight: bold;
    animation: ${blink} 0.6s step-end infinite;
    color: ${color};
  `;

  return <Cursor>|</Cursor>;
};
