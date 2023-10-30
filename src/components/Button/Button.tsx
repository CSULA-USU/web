import styled, { css } from 'styled-components';
import { Colors } from 'theme';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  href?: string;
  margin?: string;
  variant?: 'primary' | 'black' | 'grey' | 'outline' | 'transparent';
  disabled?: boolean;
  children?: React.ReactNode;
  padding?: string;
}

interface ButtonVariant {
  backgroundColor: keyof typeof Colors;
  color: keyof typeof Colors;
  border?: string;
  padding?: string;
}

const styles: { [key: string]: ButtonVariant } = {
  primary: { backgroundColor: 'primary', color: 'black' },
  black: { backgroundColor: 'black', color: 'white' },
  grey: {
    backgroundColor: 'greyLightest',
    color: 'black',
    border: 'greyLighter',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'black',
    border: 'black',
  },
  transparent: {
    backgroundColor: 'transparent',
    color: 'black',
    border: '',
  },
} as const;

const getCSS = (p: ButtonProps) => {
  const { backgroundColor, border, color, padding } =
    styles[p.variant || 'primary'];
  return css`
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    border: ${border ? `1px solid ${border}` : 'none'};
    border-radius: 8px;
    display: inline-block;
    padding: ${p.padding ? `${padding}` : '18px 36px'};
    background-color: ${Colors[backgroundColor]};
    color: ${Colors[color]};
    margin: ${p.margin || 0};
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      background-color: ${Colors.greyLighter};
      color: ${Colors.grey};
    }
  `;
};

const StyledAnchor = styled.a`
  ${getCSS}
`;
const StyledButton = styled.button`
  ${getCSS}
`;

export const Button = (props: ButtonProps) => {
  const ButtonComponent: any = props.href ? StyledAnchor : StyledButton;
  return <ButtonComponent {...props} target="_blank" />;
};
