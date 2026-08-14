import { useEffect, useRef, useState } from 'react';
import { Typography, TypeProps, VisuallyHidden } from 'components';
import { useCountUp } from 'hooks';

interface CountUpProps extends TypeProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  format?: (n: number) => string;
  showPlus?: boolean;
  /**
   * Drives counting from outside instead of this component's own observer —
   * for figures that must stay in step with a wider animation. When provided,
   * no observer is registered.
   */
  trigger?: boolean;
  /** Maps linear progress 0→1 onto eased progress. Defaults to linear. */
  easing?: (progress: number) => number;
}

export const CountUp = ({
  start = 0,
  end,
  duration = 2000,
  delay = 500,
  format,
  showPlus,
  trigger,
  easing,
  ...typographyProps
}: CountUpProps) => {
  const isControlled = trigger !== undefined;
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isControlled) return;

    /* Reduced motion short-circuits setup entirely: no observer is registered
       and the figure paints at its final value. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isControlled]);

  const value = useCountUp(end, {
    start,
    duration,
    delay,
    easing,
    active: isControlled ? trigger : isVisible,
  });

  const rounded = Math.round(value);
  const display = isNaN(rounded) ? start : format ? format(rounded) : rounded;
  const text = showPlus ? `${display}+` : display;

  const finalDisplay = format ? format(end) : end;
  const finalText = showPlus ? `${finalDisplay}+` : finalDisplay;

  /**
   * The counting figure is decorative to a screen reader: it is mid-animation
   * text that changes many times a second, and a reader landing on it hears
   * whatever number the tween happens to be on — or, worse, hears the count
   * announced repeatedly. It is hidden from the accessibility tree, and the
   * final value is exposed once, statically, in its place. Sighted and
   * non-sighted readers get the same number; only the motion differs.
   */
  return (
    <div ref={containerRef}>
      <div aria-hidden="true">
        <Typography {...typographyProps}>{text}</Typography>
      </div>
      <VisuallyHidden as="span">{finalText}</VisuallyHidden>
    </div>
  );
};
