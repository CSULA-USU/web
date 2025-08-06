import { Sizes } from 'types';
import { CSSObject } from 'styled-components';

export const breakpoints = {
  uhd: 1980,
  widescreen: 1366,
  desktop: 1024,
  tablet: 768,
  mobile: 580,
  mini: 414,
};

export const media = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | CSSObject | String) =>
    `
      @media (max-width: ${breakpoints[key]}px) {
        ${style};
      }
    `;
};

export const Spaces: {
  [_ in Exclude<Sizes, '2xs' | '4xl' | '5xl'>]: string;
} = {
  zero: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '36px',
  '2xl': '72px',
  '3xl': '96px',
} as const;

export const FontSizes: { [_ in Exclude<Sizes, 'zero'>]: string } = {
  '2xs': '12px',
  xs: '14px',
  sm: '16px',
  md: '18px',
  lg: '24px',
  xl: '30px',
  '2xl': '36px',
  '3xl': '48px',
  '4xl': '54px',
  '5xl': '72px',
} as const;

export const Colors = {
  primary: '#ffce04',
  gold: '#8c6a14',
  black: '#000000',
  greyDarkest: '#2b2b2b',
  greyDarker: '#323232',
  greyDark: '#6e6e6e',
  grey: '#757575',
  greyLighter: '#dedede',
  greyLightest: '#f4f4f4',
  white: '#ffffff',
  transparent: 'transparent',
  nuestraOrange: '#f4951c',
  blackMauve: '#52284f',
  nativeBeige: '#c6ba98',
  pastelYellow: '#fef9c3',
} as const;
