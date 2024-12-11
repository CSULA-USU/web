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

export const BannerItem = ({
  children,
  gap = '2rem',
}: {
  children: ReactNode;
  gap?: string;
}) => {
  const BannerItemWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    display: flex;
    margin-right: ${gap};
    gap: ${gap};
  `;
  return <BannerItemWrapper>{children}</BannerItemWrapper>;
};

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
  const Banner = styled.div`
    height: ${height};
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background-color: ${bgColor};
    position: relative;
    display: flex;
    align-items: center;
  `;

  const ScrollingContentWrapper = styled.div`
    display: inline-block;
    animation: ${scroll} 10s linear infinite
      ${direction == 'right' && 'reverse'};
    white-space: nowrap;
    display: flex;

    &:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <Banner>
      <ScrollingContentWrapper>
        {[...Array(4)].map((_, idx) => {
          return <React.Fragment key={idx}>{children}</React.Fragment>;
        })}
      </ScrollingContentWrapper>
    </Banner>
  );
};
