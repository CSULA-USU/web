import { useId, useState } from 'react';
import styled from 'styled-components';
import { Spaces } from 'theme';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

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

const Button = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
`;

const HeaderContainer = styled.span<{
  isOpen?: boolean;
  indicatorRotation: string;
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
    rotate: ${(p) => (p.isOpen ? p.indicatorRotation : '0deg')};
    transition: rotate 0.2s ease-in-out;
  }

  /* The indicator shifts rather than grows. Scaling it up restated what the
     opacity change already said, and did it by resizing the one element whose
     size is the open/closed signal. */
  &:hover {
    opacity: 0.8;
    .indicator {
      translate: ${(p) => (p.isOpen ? '0' : '4px')};
    }
  }
`;

/* Opens to the content's own height through the grid track, not a measured
   pixel height. A measurement is a snapshot: anything that reflows an open
   panel afterward — a narrower viewport, a late font, an image arriving —
   clips it. `1fr` is always the content's current height.

   Collapsed content stays in the DOM, so it is indexed, and `visibility`
   keeps it out of the tab order and the accessibility tree until opened. */
const ContentContainer = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: 0.3s ease;
  ${(p) =>
    p.isOpen &&
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
    >
      <HeaderContainer isOpen={isOpen} indicatorRotation={indicatorRotation}>
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
      <ContentContainer id={panelId} isOpen={isOpen}>
        <ContentClip>{children}</ContentClip>
      </ContentContainer>
    </Container>
  );
};
