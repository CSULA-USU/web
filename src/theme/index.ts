import { Sizes } from 'types';

export const Spaces: {
  [_ in Exclude<Sizes, '2xs' | '4xl'>]: string;
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
  '2xs': '10px',
  xs: '14px',
  sm: '16px',
  md: '18px',
  lg: '24px',
  xl: '30px',
  '2xl': '36px',
  '3xl': '48px',
  '4xl': '54px',
} as const;

export const Colors = {
  primary: '#FFCE04',
  gold: '#8C6A14',
  black: '#000000',
  greyDarkest: '#2b2b2b',
  greyDarker: '#323232',
  greyDark: '#6E6E6E',
  grey: '#757575',
  greyLighter: '#DEDEDE',
  greyLightest: '#F4F4F4',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;
