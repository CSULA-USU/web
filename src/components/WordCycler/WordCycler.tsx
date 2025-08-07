import React, { useState, useEffect } from 'react';

interface WordCyclerProps {
  words: React.ReactNode[];
  interval?: number; // Time in milliseconds between word changes
  className?: string;
  animation?: string; // CSS animation class for the cycling effect
}

export const WordCycler = ({
  words,
  interval = 2000,
  className,
}: WordCyclerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
  return <span className={className}>{words[currentIndex]}</span>;
};
