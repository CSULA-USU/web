import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontSizes } from 'theme';

interface SkeletonProps {
  size?: keyof typeof FontSizes;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const SkeletonWrapper = styled.div<SkeletonProps>`
  background-color: #e0e0e0;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  width: ${({ width }) => width || '100%'};
  height: ${({ size, height }) => (size ? FontSizes[size] : height || '1rem')};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 150%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
    animation: ${loadingAnimation} 1.5s infinite ease-in-out;
  }
`;

export const Skeleton = ({
  size,
  width,
  height,
  borderRadius,
}: SkeletonProps) => {
  return (
    <SkeletonWrapper
      size={size}
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  );
};
