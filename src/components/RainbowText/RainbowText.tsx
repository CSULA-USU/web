import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';

// Every stop is dark enough to stay legible against the white cards. The
// brighter theme tokens that would otherwise belong here — primary and
// recognizedGreen — wash out on white at text size, so a deeper green stands in
// and primary is left out.
const cycleHues = keyframes`
  0%,
  100% {
    color: ${Colors.red};
  }
  17% {
    color: ${Colors.nuestraOrange};
  }
  33% {
    color: ${Colors.gold};
  }
  50% {
    color: #1a8a45;
  }
  67% {
    color: ${Colors.blue};
  }
  83% {
    color: ${Colors.blackMauve};
  }
`;

// The delay is the whole effect: the text sits in its normal colour long enough
// to look ordinary, then starts shifting. With no fill-mode the span keeps the
// colour it inherits until the delay elapses, so nothing flashes on mount.
// Animating colour on this span also beats the static colour its Typography
// parent sets, since animations outrank normal declarations while running.
const Cycling = styled.span`
  animation: ${cycleHues} 6s linear 7s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

interface RainbowTextProps {
  children: React.ReactNode;
  /** Off by default, so the text renders untouched unless asked for. */
  active?: boolean;
}

/**
 * Cycles its text through the spectrum after a short pause. Inherits colour and
 * type styles from its parent, so it can wrap the text inside a Typography
 * without changing the layout.
 */
export const RainbowText = ({ children, active = false }: RainbowTextProps) => {
  if (!active) {
    return <>{children}</>;
  }

  return <Cycling>{children}</Cycling>;
};
