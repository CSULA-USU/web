import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

const shadows = {
  default: '2px 4px 12px rgba(191, 191, 191, 0.25)',
  soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

export interface PanelStyleProps {
  height?: string;
  width?: string;
  minHeight?: string;
  margin?: string;
  padding?: string;
  topBorder?: boolean;
  /** 1px outline in the given theme color. */
  border?: keyof typeof Colors;
  /** Outline style for `border`. `dashed` marks deliberately unfinished content. */
  borderStyle?: 'solid' | 'dashed';
  rounded?: boolean;
  /** Explicit corner radius; overrides `rounded` when both are set. */
  borderRadius?: string;
  shadow?: keyof typeof shadows;
  hoverable?: boolean;
  backgroundColor?: keyof typeof Colors;
  /**
   * Cross-axis alignment of the panel's children. Defaults to `stretch`, so
   * a child fills the panel's width the way it would in ordinary block flow.
   * Set `flex-start` to shrink children to their content instead — worth it
   * only when the panel holds something with an intrinsic width, such as a
   * lone button or image, that should not be pulled edge to edge.
   */
  alignItems?: 'stretch' | 'flex-start' | 'center';
}

interface PanelProps extends PanelStyleProps {
  children?: React.ReactNode;
}

const StyledPanel = styled.div<PanelStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(p) => p.alignItems || 'stretch'};
  padding: ${(p) => p.padding || Spaces.xl};
  gap: 16px;
  box-shadow: ${(p) => shadows[p.shadow || 'default']};
  background-color: ${(p) => Colors[p.backgroundColor || 'white']};
  ${(p) => p.height && `height: ${p.height};`}
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}
  ${(p) => p.topBorder && `border-top: 5px solid ${Colors.primary};`}
  ${(p) =>
    p.border && `border: 1px ${p.borderStyle || 'solid'} ${Colors[p.border]};`}
  border-radius: ${(p) => p.borderRadius || (p.rounded ? '12px' : '0px')};
  ${(p) =>
    p.hoverable &&
    `
    transition: 0.2s;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  `}
`;

export const Panel = (props: PanelProps) => <StyledPanel {...props} />;
