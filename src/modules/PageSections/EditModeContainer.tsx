import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ hide?: boolean; maxHeight?: number }>`
  transition: 0.5s ease;
  overflow: hidden;
  max-height: ${(p) => (p.hide ? 0 : `${p.maxHeight}px`)};
`;

export default function EditModeContainer({
  children,
  hide,
}: {
  children?: React.ReactNode;
  hide?: boolean;
}) {
  const [maxHeight, setMaxHeight] = useState<number>(3000);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) {
      setMaxHeight(Math.max(ref?.current?.scrollHeight, maxHeight));
    }
  }, [ref, maxHeight]);

  return (
    <Container hide={hide} maxHeight={maxHeight} ref={ref}>
      {children}
    </Container>
  );
}
