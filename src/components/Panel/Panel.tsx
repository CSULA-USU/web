import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

interface CardStyles {
  width?: string;
  minHeight?: string;
  margin?: string;
  topBorder?: boolean;
  rounded?: boolean;
  hoverable?: boolean;
  backgroundColor?: keyof typeof Colors;
}

interface CardProps extends CardStyles {
  children?: React.ReactNode;
}

const StyledPanel = styled.div<CardStyles>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${Spaces.xl};
  gap: 16px;
  box-shadow: 2px 4px 12px rgba(191, 191, 191, 0.25);
  background-color: ${(p) => Colors[p.backgroundColor || 'white']};
  ${(p) => p.width && `width: ${p.width};`}
  ${(p) => p.margin && `margin: ${p.margin};`}
  ${(p) => p.minHeight && `min-height: ${p.minHeight};`}
  ${(p) => p.topBorder && `border-top: 3px solid ${Colors.primary};`}
  border-radius: ${(p) => (p.rounded ? '12px' : '0px')};
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

export const Panel = (props: CardProps) => <StyledPanel {...props} />;
