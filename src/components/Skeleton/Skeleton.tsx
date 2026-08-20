import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontSizes } from 'theme';

interface SkeletonProps {
  size?: keyof typeof FontSizes;
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
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
  margin: ${({ margin }) => margin || '0'};
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

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

/**
 * The same shimmer, filling a positioned parent instead of taking part in the
 * layout, so an image can sit underneath and reveal itself as it decodes.
 *
 * The parent has to establish the containing block and give the box its size —
 * an aspect-ratio frame, or a fixed width and height. A skeleton stretched over
 * a box that only gets its size *from* the loaded image renders at zero height
 * and shows nothing, which is the case this cannot solve on its own.
 */
export const SkeletonOverlay = styled(SkeletonWrapper)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const Skeleton = ({
  size,
  width,
  height,
  borderRadius,
  margin,
}: SkeletonProps) => {
  return (
    <SkeletonWrapper
      size={size}
      width={width}
      height={height}
      borderRadius={borderRadius}
      margin={margin}
    />
  );
};
