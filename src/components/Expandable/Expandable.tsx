import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Spaces } from 'theme';

interface ExpandableProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  indicator?: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div<{ isOpen?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    transition: 0.3s;
  }

  .indicator {
    rotate: ${(p) => (p.isOpen ? '90deg' : '0deg')};
  }

  &:hover {
    opacity: 0.8;
    .indicator {
      scale: 1.2;
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
        <Button
          aria-expanded={isOpen}
          aria-label="Toggle Accordion"
          onClick={handleToggle}
          role="button"
        >
          <HeaderContainer isOpen={isOpen}>
            {header}
            <span className="indicator">{indicator}</span>
          </HeaderContainer>
        </Button>
      )}
      <ContentContainer isOpen={expandedState} height={height} ref={ref}>
        {children}
      </ContentContainer>
    </Container>
  );
};
