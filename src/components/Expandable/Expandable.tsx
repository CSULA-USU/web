import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Spaces } from 'theme';

interface ExpandableProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  indicator?: React.ReactNode;
  /** How far the indicator turns when open. A `+` becomes an `×` at `45deg`. */
  indicatorRotation?: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div<{
  isOpen?: boolean;
  indicatorRotation: string;
}>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
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

const ContentContainer = styled.div<{ isOpen: boolean; height: number }>`
  overflow: hidden;
  transition: 0.3s ease;
  height: 0px;
  visibility: hidden;
  ${(p) =>
    p.isOpen &&
    `height: ${p.height}px; margin-bottom: ${Spaces.md}; visibility: visible`};
`;

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  rotate: '0deg';
`;

export const Expandable = ({
  isExpanded,
  onToggle,
  indicator,
  indicatorRotation = '90deg',
  header,
  children,
}: ExpandableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) {
      setHeight(ref?.current?.scrollHeight);
    }
  }, [ref, isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle && onToggle();
  };

  const expandedState = isExpanded === undefined ? isOpen : isExpanded;
  return (
    <Container>
      {indicator && (
        <Button aria-expanded={isOpen} onClick={handleToggle}>
          <HeaderContainer
            isOpen={isOpen}
            indicatorRotation={indicatorRotation}
          >
            {header}
            {/* Purely a visual affordance — the button already takes its
                accessible name from the header text. */}
            <span className="indicator" aria-hidden="true">
              {indicator}
            </span>
          </HeaderContainer>
        </Button>
      )}
      <ContentContainer isOpen={expandedState} height={height} ref={ref}>
        {children}
      </ContentContainer>
    </Container>
  );
};
6;
