import { Sizes } from 'types';

export const SpaceSizes: {
  [Key in Exclude<Sizes, '2xs' | '3xl' | '4xl'>]: string;
} = {
  zero: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
} as const;

export const FontSizes: { [Key in Exclude<Sizes, 'zero'>]: string } = {
  '2xs': '10px',
  xs: '12px',
  sm: '16px',
  md: '18px',
  lg: '24px',
  xl: '28px',
  '2xl': '30px',
  '3xl': '36px',
  '4xl': '48px',
} as const;

export const Colors = {
  primary: '#FFCE04',
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
