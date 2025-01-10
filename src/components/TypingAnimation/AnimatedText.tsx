import { Typography } from 'components';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { TypingAnimationProps } from './TypingAnimation';

const TextContainer = styled.div`
  display: inline-block;
`;

export const AnimatedText = ({ words, ...props }: TypingAnimationProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 100 : 100;

    const type = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === '') {
          setTimeout(() => {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, 1500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(type);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <TextContainer>
      <Typography
        as={props.as}
        variant={props.variant}
        weight={props.weight}
        size={props.size}
        lineHeight={props.lineHeight}
        color={props.color}
      >
        {displayedText}
      </Typography>
    </TextContainer>
  );
};
