import styled, { keyframes } from 'styled-components';
import { Colors, Spaces } from '../../theme';
import { Typography } from '../Typography';

/**
 * The dot breathes rather than blinks. A hard on/off reads as a broken image
 * on a slow connection, and it draws the eye away from the event title the
 * badge is meant to qualify.
 */
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.35); opacity: 0.55; }
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${Colors.white};
  flex-shrink: 0;
  animation: ${pulse} 2s ease-in-out infinite;

  /* The badge still reads as live at rest — the dot and the word carry it, the
     motion only says the page is not stale. */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/*
 * Red rather than the brand yellow: this is a state, not a promotion, and
 * yellow is already spent on buttons and accents everywhere around the card.
 * `redDark` clears AA against white where `red` does not.
 */
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${Spaces.xs};
  padding: 6px 12px;
  border-radius: 999px;
  background-color: ${Colors.redDark};
  white-space: nowrap;
`;

/**
 * Marks an event that is under way. Never the only signal that something is
 * live — the word carries it for anyone who cannot see the color or the
 * motion.
 */
export const LiveBadge = ({ className }: { className?: string }) => (
  <Badge className={className}>
    <Dot aria-hidden="true" />
    <Typography
      as="span"
      variant="labelTitle"
      size="xs"
      color="white"
      weight="700"
      lineHeight="1"
      inline
    >
      Live now
    </Typography>
  </Badge>
);
