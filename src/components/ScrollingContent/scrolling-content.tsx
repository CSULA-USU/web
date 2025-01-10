import React from 'react';
import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-25%));
  }
`;

export const BannerItem = styled.span<{ gap?: string }>`
  display: inline-flex;
  align-items: center;
  display: flex;
  margin-right: ${(p) => (p.gap ? p.gap : '2rem')};
  gap: ${(p) => (p.gap ? p.gap : '2rem')};
`;

const Banner = styled.div<{ height: string; bgColor?: string }>`
  height: ${(p) => p.height};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: ${(p) => p.bgColor};
  position: relative;
  display: flex;
  align-items: center;
`;

const ScrollingContentWrapper = styled.div<{ direction: 'left' | 'right' }>`
  display: inline-block;
  animation: ${scroll} 10s linear infinite
    ${(p) => p.direction == 'right' && 'reverse'};
  white-space: nowrap;
  display: flex;

  &:hover {
    animation-play-state: paused;
  }
`;

export const ScrollingContent = ({
  children,
  height,
  bgColor = Colors['primary'],
  direction = 'left',
}: {
  children: ReactNode;
  height: string;
  bgColor?: string;
  direction?: 'left' | 'right';
}) => {
  return (
    <Banner height={height} bgColor={bgColor}>
      <ScrollingContentWrapper direction={direction}>
        {[...Array(4)].map((_, idx) => {
          return <React.Fragment key={idx}>{children}</React.Fragment>;
        })}
      </ScrollingContentWrapper>
    </Banner>
  );
};
