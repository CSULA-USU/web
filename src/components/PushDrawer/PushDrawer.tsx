import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
interface PushDrawerProps {
  isOpen?: boolean;
  drawer: React.ReactNode;
  children: React.ReactNode;
}

const Container = styled.div<{ isOpen?: boolean; drawerWidth: number }>`
  position: relative;
  transition: 0.3s ease;
  margin-left: ${(p) => (p.isOpen ? `${p.drawerWidth}` : 0)}px;
  > div:last-child {
    height: calc(100vh - 80px);
    overflow-y: scroll;
  }
  > div:first-child {
    height: calc(100vh - 80px);
    position: absolute;
    top: 0;
    left: ${(p) => `-${p.drawerWidth}px`};
  }
`;

export const PushDrawer = ({ isOpen, drawer, children }: PushDrawerProps) => {
  const [drawerWidth, setDrawerWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) {
      setDrawerWidth(ref?.current?.clientWidth);
    }
  }, [ref, isOpen]);

  return (
    <Container isOpen={isOpen} drawerWidth={drawerWidth}>
      <div ref={ref}>{drawer}</div>
      <div>{children}</div>
    </Container>
  );
};
