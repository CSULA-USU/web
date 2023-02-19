import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ExpandableProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  cursor: pointer;
`;

const ContentContainer = styled.div<{ isOpen: boolean; height: number }>`
  overflow: hidden;
  transition: 0.3s ease;
  height: 0px;
  ${(p) => p.isOpen && `height: ${p.height}px`};
`;

export const Expandable = ({
  isExpanded,
  onToggle,
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
  }, [ref]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle && onToggle();
  };

  const expandedState = isExpanded === undefined ? isOpen : isExpanded;
  return (
    <Container>
      <HeaderContainer onClick={handleToggle}>{header}</HeaderContainer>
      <ContentContainer isOpen={expandedState} height={height} ref={ref}>
        {children}
      </ContentContainer>
    </Container>
  );
};
