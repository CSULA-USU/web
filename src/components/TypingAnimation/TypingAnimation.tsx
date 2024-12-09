import React from 'react';

import { BlinkingCursor } from './BlinkingCursor';
import { AnimatedText } from './AnimatedText';
import { TypeProps } from 'components';

export interface TypingAnimationProps extends TypeProps {
  words: String[];
}

const TypingAnimation = ({ words, ...props }: TypingAnimationProps) => {
  return (
    <>
      <AnimatedText words={words} {...props} />
      <BlinkingCursor color={props.color || 'white'} />
    </>
  );
};

export default TypingAnimation;
