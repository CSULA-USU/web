import styled, { css } from 'styled-components';
import { Colors } from 'theme';

const getBackgroundCSS = (p: FluidContainerProps) => {
  return p.backgroundImage
    ? css`
        background: url(${p.backgroundImage});
        background-size: cover;
        background-position: center;
      `
    : css`
        background-color: ${Colors[p.backgroundColor || 'transparent']};
      `;
};

const FluidOuter = styled.div<FluidContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 72px;
  ${getBackgroundCSS}
`;

const FluidInner = styled.div`
  width: 100%;
  max-width: 1440px;
`;

interface FluidContainerProps {
  children?: React.ReactNode;
  backgroundColor?: keyof typeof Colors;
  backgroundImage?: string;
}

export const FluidContainer = ({
  children,
  backgroundColor,
  backgroundImage,
}: FluidContainerProps) => (
  <FluidOuter
    backgroundColor={backgroundColor}
    backgroundImage={backgroundImage}
  >
    <FluidInner>{children}</FluidInner>
  </FluidOuter>
);
