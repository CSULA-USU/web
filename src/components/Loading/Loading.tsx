import { FluidContainer } from 'components/FluidContainer';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  load: boolean;
}

const spin = keyframes`
to {
  transform: rotate(360deg);
}
`;

const LoadingCircle = styled.div<LoadingProps>`
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '20vw';
      case 'lg':
        return '7vw';
      default:
        return '8vw';
    }
  }};
  width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '20vw';
      case 'lg':
        return '7vw';
      default:
        return '8vw';
    }
  }};
  border: 6px solid;
  border-color: black transparent black transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  animation-name: ${spin};
`;

export const Loading = ({ size = 'md', load }: LoadingProps) => {
  return load ? (
    <FluidContainer flex justifyContent="center">
      <LoadingCircle size={size} load />
    </FluidContainer>
  ) : null;
};
