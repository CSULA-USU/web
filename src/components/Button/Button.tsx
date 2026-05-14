import React from 'react';
import styled, { css } from 'styled-components';
import { Colors } from 'theme';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  margin?: string;
  isExternalLink?: boolean;
  notALink?: boolean;
  padding?: string;
  shadow?: boolean;
  fontSize?: string;
  fontWeight?: string;
  variant?:
    | 'primary'
    | 'black'
    | 'white'
    | 'grey'
    | 'greyDarker'
    | 'outline'
    | 'transparent'
    | 'whiteOutline'
    | 'edit'
    | 'delete';
}

interface ButtonVariant {
  backgroundColor: keyof typeof Colors;
  color: keyof typeof Colors;
  border?: keyof typeof Colors;
  padding?: string;
}

const styles: { [key: string]: ButtonVariant } = {
  primary: { backgroundColor: 'primary', color: 'black' },
  black: { backgroundColor: 'black', color: 'white' },
  white: { backgroundColor: 'white', color: 'black' },
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
  },
  whiteOutline: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'white',
  },
  greyDarker: {
    backgroundColor: 'greyDarker',
    color: 'white',
    border: 'white',
  },
  edit: {
    backgroundColor: 'transparent',
    color: 'blue',
    border: 'blue',
    padding: '6px 12px',
  },
  delete: {
    backgroundColor: 'transparent',
    color: 'red',
    border: 'red',
    padding: '6px 12px',
  },
} as const;

const getCSS = (p: ButtonProps) => {
  const { backgroundColor, border, color, padding } =
    styles[p.variant || 'primary'];
  return css`
    cursor: pointer;
    text-align: center;
    font-size: ${p.fontSize ?? '16px'};
    font-weight: ${p.fontWeight ?? '700'};
    filter: ${p.shadow ? 'drop-shadow(0px 4px 4px rgb(0, 0, 0, 0.25))' : ''};
    border: ${border ? `1px solid ${Colors[border]}` : 'none'};
    border-radius: 8px;
    display: inline-block;
    padding: ${p.padding ?? padding ?? '18px 36px'};
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

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const ButtonComponent: any = props.href ? StyledAnchor : StyledButton;
  const role = props.href ? undefined : 'button';
  return (
    <ButtonComponent
      {...props}
      ref={ref}
      target={props.isExternalLink ? '_blank' : null}
      role={role}
      rel="noopener noreferrer"
    />
  );
});
Button.displayName = 'Button';
