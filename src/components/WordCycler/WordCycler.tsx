import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface WordCyclerProps {
  words: React.ReactNode[];
  interval?: number;
  className?: string;
  animation?:
    | 'fade'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'zoom';
}

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUpIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(100%);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDownIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-100%);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftIn = keyframes`
  from { 
    opacity: 0;
    transform: translateX(100%);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideRightIn = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-100%);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const zoomIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.5);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

// Animation styles
const getAnimation = (animation?: string) => {
  switch (animation) {
    case 'fade':
      return css`
        animation: ${fadeIn} 0.5s ease-in-out;
      `;
    case 'slideUp':
      return css`
        animation: ${slideUpIn} 0.6s ease-out;
      `;
    case 'slideDown':
      return css`
        animation: ${slideDownIn} 0.6s ease-out;
      `;
    case 'slideLeft':
      return css`
        animation: ${slideLeftIn} 0.6s ease-out;
      `;
    case 'slideRight':
      return css`
        animation: ${slideRightIn} 0.6s ease-out;
      `;
    case 'zoom':
      return css`
        animation: ${zoomIn} 0.5s ease-out;
      `;
    default:
      return css`
        animation: ${fadeIn} 0.3s ease-in-out;
      `;
  }
};

const AnimatedSpan = styled.span<{ animation?: string }>`
  display: inline-block;
  ${({ animation }) => getAnimation(animation)}
`;

export const WordCycler = ({
  words,
  interval = 2000,
  className,
  animation = 'fade',
}: WordCyclerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatedSpan
      key={currentIndex}
      animation={animation}
      className={className}
    >
      {words[currentIndex]}
    </AnimatedSpan>
  );
};

// see use case in about/u-krew home page
