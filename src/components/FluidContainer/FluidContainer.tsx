import styled, { css } from 'styled-components';
import { Colors } from 'theme';

const getBackgroundCSS = (p: FluidContainerProps) => {
  return p.backgroundImage
    ? css`
        background: url(${p.backgroundImage}) no-repeat;
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
  padding: 24px 72px;
  ${getBackgroundCSS}
`;

const FluidInner = styled.div<FluidInnerProps>`
  width: 100%;
  max-width: 1440px;
  ${(p) => p.innerMaxWidth && `max-width: ${p.innerMaxWidth};`}
  ${(p) => p.innerMinHeight && `min-height: ${p.innerMinHeight};`}
  ${(p) =>
    p.flex
      ? css`
          display: flex;
          flex-wrap: ${p.flexWrap || 'nowrap'};
          flex-direction: ${p.flexDirection || 'row'};
          justify-content: ${p.justifyContent || 'flex-start'};
          align-items: ${p.alignItems || 'stretch'};
        `
      : css``};
`;

interface FluidInnerProps {
  innerMaxWidth?: string;
  innerMinHeight?: string;
  flex?: boolean;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
}

interface FluidContainerProps extends FluidInnerProps {
  children?: React.ReactNode;
  backgroundColor?: keyof typeof Colors;
  backgroundImage?: string;
}

export const FluidContainer = ({
  children,
  backgroundColor,
  backgroundImage,
  ...props
}: FluidContainerProps) => (
  <FluidOuter
    backgroundColor={backgroundColor}
    backgroundImage={backgroundImage}
  >
    <FluidInner {...props}>{children}</FluidInner>
  </FluidOuter>
);
