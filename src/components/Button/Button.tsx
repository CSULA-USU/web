import styled, { css } from 'styled-components';
import { Colors } from 'theme';

export interface ButtonProps {
  href?: string;
  margin?: string;
  variant?: 'primary' | 'black' | 'grey' | 'outline';
  children?: React.ReactNode;
}

interface ButtonVariant {
  backgroundColor: keyof typeof Colors;
  color: keyof typeof Colors;
  border?: string;
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
} as const;

const getCSS = (p: ButtonProps) => {
  const { backgroundColor, color, border } = styles[p.variant || 'primary'];
  return css`
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    display: inline-block;
    padding: 18px 36px;
    background-color: ${Colors[backgroundColor]};
    color: ${Colors[color]};
    margin: ${p.margin || 0};
    ${border && `border: 1px solid ${border}`}
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
  return <ButtonComponent {...props} />;
};
