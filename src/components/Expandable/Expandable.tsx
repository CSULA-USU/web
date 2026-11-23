import { useId, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colors, Radii, Spaces } from 'theme';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

type HoverEffect = 'fade' | 'blob' | 'highlight';

interface ExpandableProps {
  /** Makes the component controlled: `onToggle` then owns the open state. */
  isExpanded?: boolean;
  onToggle?: () => void;
  /** Optional. Leaving it out drops the icon, never the trigger itself. */
  indicator?: React.ReactNode;
  /** How far the indicator turns when open. A `+` becomes an `×` at `45deg`. */
  indicatorRotation?: string;
  /**
   * Wraps the trigger in an `h2`–`h6`. The heading sits outside the button:
   * a heading inside a button is invalid markup, and drops out of the list
   * of headings screen-reader users navigate a page by.
   */
  headingLevel?: HeadingLevel;
  /**
   * `fade` (the default) dims the header on hover — the least opinionated
   * treatment, so it stays the default. The others fill an oversized shape
   * behind the header instead — `blob` a rounded, hand-drawn one, `highlight`
   * a plain rectangle — and hold it while the panel is open so the panel
   * never reads as detached from its trigger.
   */
  hoverEffect?: HoverEffect;
  /**
   * `blob` and `highlight` only. The header's own text and indicator colors
   * must contrast with it — black on `primary`.
   */
  hoverFillColor?: keyof typeof Colors;
  /**
   * Rendered inside a `<button>`, so phrasing content only — text, `span`s,
   * icons. No headings (use `headingLevel`), `div`s, `p`s, or links and
   * other buttons.
   */
  header: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingSlot = styled.div`
  margin: 0;
  font: inherit;
`;

/* Shape only — everything else about the fill is shared in `fill` below, so a
   new effect is one entry here.

   `blob` deliberately breaks the `Radii` scale: it is meant to look
   hand-drawn, not built. Its radii are percentages so the same lopsided shape
   holds on a phone-width row and a 1300px one — pixel radii that outgrow a
   short, wide box get scaled down unevenly and the shape collapses into a
   plain pill. The tilt stays at half a degree because on a full-width row
   every degree drops the far corner about 11px.

   `highlight` is the plain counterpart and stays on the scale: a row a person
   points at is a `control`. */
const FILL_SHAPES: Record<Exclude<HoverEffect, 'fade'>, string> = {
  blob: `
    border-radius: 2% 6% 3% 4% / 40% 18% 45% 25%;
    rotate: -0.5deg;
  `,
  highlight: `border-radius: ${Radii.control};`,
};

/* The sideways bleed stays at `Spaces.sm` so it fits inside the narrowest
   section gutter (`Spaces.md`) without causing horizontal scroll. */
const fill = css<{
  isOpen: boolean;
  hoverEffect: HoverEffect;
  hoverFillColor: keyof typeof Colors;
}>`
  position: relative;
  /* Lets the fill's negative z-index sit behind the header without falling
     behind the section's own background. */
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -${Spaces.xs} -${Spaces.sm};
    z-index: -1;
    background-color: ${(p) => Colors[p.hoverFillColor]};
    ${(p) => p.hoverEffect !== 'fade' && FILL_SHAPES[p.hoverEffect]}
    opacity: ${(p) => (p.isOpen ? 1 : 0)};
    scale: ${(p) => (p.isOpen ? 1 : 0.96)};
    transition: opacity 0.2s ease, scale 0.2s ease;
  }

  /* Touch screens fire :hover on tap and leave it stuck until the next tap
     elsewhere, so hover is limited to real pointers. The fill held while open
     is what touch users see instead. */
  @media (hover: hover) {
    &:hover::before {
      opacity: 1;
      scale: 1;
    }
  }

  /* Keyboard users get the same signal pointer users do. */
  &:focus-visible::before {
    opacity: 1;
    scale: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`;

const Button = styled.button<{
  isOpen: boolean;
  hoverEffect: HoverEffect;
  hoverFillColor: keyof typeof Colors;
}>`
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  ${(p) => p.hoverEffect !== 'fade' && fill}
`;

const HeaderContainer = styled.span<{
  isOpen?: boolean;
  indicatorRotation: string;
  hoverEffect: HoverEffect;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    transition: 0.3s;
  }

  .indicator {
    /* A long header must wrap rather than squeeze the chevron. */
    flex-shrink: 0;
    rotate: ${(p) => (p.$isOpen ? p.$indicatorRotation : '0deg')};
    transition: rotate 0.2s ease-in-out;
  }

  /* The indicator shifts rather than grows. Scaling it up restated what the
     fade or fill already said, and did it by resizing the one element whose
     size is the open/closed signal. */
  &:hover {
    ${(p) => p.hoverEffect === 'fade' && 'opacity: 0.8;'}
    .indicator {
      translate: ${(p) => (p.$isOpen ? '0' : '4px')};
    }
  }
`;

/* Opens to the content's own height through the grid track, not a measured
   pixel height. A measurement is a snapshot: anything that reflows an open
   panel afterward — a narrower viewport, a late font, an image arriving —
   clips it. `1fr` is always the content's current height.

   Collapsed content stays in the DOM, so it is indexed, and `visibility`
   keeps it out of the tab order and the accessibility tree until opened. */
const ContentContainer = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: 0.3s ease;
  ${(p) =>
    p.$isOpen &&
    `grid-template-rows: 1fr; margin-bottom: ${Spaces.md}; visibility: visible;`};
`;

const ContentClip = styled.div`
  min-height: 0;
  overflow: hidden;
`;

export const Expandable = ({
  isExpanded,
  onToggle,
  indicator,
  indicatorRotation = '90deg',
  headingLevel,
  hoverEffect = 'fade',
  hoverFillColor = 'primary',
  header,
  children,
}: ExpandableProps) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const panelId = useId();
  const isOpen = isExpanded ?? isOpenInternal;

  const handleToggle = () => {
    if (isExpanded === undefined) setIsOpenInternal(!isOpenInternal);
    onToggle && onToggle();
  };

  const trigger = (
    <Button
      type="button"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={handleToggle}
      isOpen={isOpen}
      hoverEffect={hoverEffect}
      hoverFillColor={hoverFillColor}
    >
      <HeaderContainer
        isOpen={isOpen}
        indicatorRotation={indicatorRotation}
        hoverEffect={hoverEffect}
      >
        {header}
        {/* Purely a visual affordance — the button already takes its
            accessible name from the header text. */}
        {indicator && (
          <span className="indicator" aria-hidden="true">
            {indicator}
          </span>
        )}
      </HeaderContainer>
    </Button>
  );

  return (
    <Container>
      {headingLevel ? (
        <HeadingSlot as={`h${headingLevel}` as const}>{trigger}</HeadingSlot>
      ) : (
        trigger
      )}
      <ContentContainer id={panelId} $isOpen={isOpen}>
        <ContentClip>{children}</ContentClip>
      </ContentContainer>
    </Container>
  );
};
