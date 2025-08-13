import { useState, useEffect, useRef } from 'react';
import { Typography, TypeProps } from 'components';

interface CountUpProps extends TypeProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  format?: (n: number) => string;
  showPlus?: boolean;
}

export const CountUp = ({
  start = 0,
  end,
  duration = 2000,
  delay = 500,
  format,
  showPlus,
  ...typographyProps
}: CountUpProps) => {
  const [value, setValue] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (start === end) {
      setValue(end);
      return;
    }

    let animationFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let startTime: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      const newValue = start + (end - start) * progressRatio;

      setValue(Math.round(newValue));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [start, end, duration, delay, isVisible]);

  const display = isNaN(value) ? start : format ? format(value) : value;

  const text = showPlus ? `${display}+` : display;

  return (
    <div ref={containerRef}>
      <Typography {...typographyProps}>{text}</Typography>
    </div>
  );
};
