import styled from 'styled-components';
import { Colors } from 'theme';

const FluidOuter = styled.div<FluidContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => Colors[p.backgroundColor || 'transparent']};
  padding: 36px 72px;
`;

const FluidInner = styled.div`
  width: 100%;
  max-width: 1200px;
`;

interface FluidContainerProps {
  children?: React.ReactNode;
  backgroundColor?: keyof typeof Colors;
}

export const FluidContainer = ({
  children,
  backgroundColor,
}: FluidContainerProps) => (
  <FluidOuter backgroundColor={backgroundColor}>
    <FluidInner>{children}</FluidInner>
  </FluidOuter>
);
