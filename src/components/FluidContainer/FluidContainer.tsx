import styled, { css } from 'styled-components';
import { Colors, media } from 'theme';

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
  border: ${(p) => `1px solid ${p.border}`};
  justify-content: center;
  padding: ${(p) => p.padding || '36px 72px'};
  margin: ${(p) => p.margin};
  height: ${(p) => p.height};
  width: ${(p) => p.width};
  ${(p) =>
    media('desktop')(`
    padding: ${p.padding || '18px 36px'};
  `)}
  ${(p) =>
    media('mobile')(`
    padding: ${p.padding || '18px 16px'};
  `)}
  ${getBackgroundCSS}
`;

const FluidInner = styled.div<FluidInnerProps>`
  border-radius: ${(p) => (p.innerRounded ? '12px' : '0px')};
  background-color: ${(p) => Colors[p.innerBackgroundColor || 'transparent']};
  max-width: 1440px;
  padding: ${(p) => p.innerPadding};
  width: 100%;
  ${(p) => p.innerMaxWidth && `max-width: ${p.innerMaxWidth};`}
  ${(p) => p.innerMinHeight && `min-height: ${p.innerMinHeight};`}
  ${(p) =>
    p.flex
      ? css`
          align-items: ${p.alignItems || 'stretch'};
          display: flex;
          flex-wrap: ${p.flexWrap || 'nowrap'};
          flex-direction: ${p.flexDirection || 'row'};
          justify-content: ${p.justifyContent || 'flex-start'};
          gap: ${p.gap || 'initial'};
        `
      : css``};
`;

interface FluidInnerProps {
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  flex?: boolean;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  innerBackgroundColor?: keyof typeof Colors;
  innerMaxWidth?: string;
  innerMinHeight?: string;
  innerRounded?: boolean;
  innerPadding?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
}

interface FluidContainerProps extends FluidInnerProps {
  alt?: string;
  backgroundColor?: keyof typeof Colors;
  backgroundImage?: string;
  border?: keyof typeof Colors;
  children?: React.ReactNode;
  height?: string;
  id?: string;
  padding?: string;
  width?: string;
  margin?: string;
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
    {...props}
  >
    <FluidInner {...props}>{children}</FluidInner>
  </FluidOuter>
);
