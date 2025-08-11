import React from 'react';
import styled, { CSSObject, css } from 'styled-components';
import { FontSizes, Colors } from 'theme';

interface TypeStyle {
  size?: keyof typeof FontSizes;
  color?: keyof typeof Colors;
  weight?: '300' | '400' | '600' | '700';
  lineHeight?: string;
  margin?: string;
}

type TypeElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';

export interface TypeProps extends TypeStyle {
  style?: CSSObject;
  className?: string;
  variant?: keyof typeof styles;
  nowrap?: boolean;
  as?: TypeElements;
  children?: React.ReactNode;
}

interface TypeVariant {
  size: keyof typeof FontSizes;
  weight: string;
  color?: keyof typeof Colors;
  fontFamily?: string;
  textTransform?: string;
  lineHeight?: string;
}

const serif = `'Bitter', serif`;

const styles = {
  pageHeader: {
    size: '4xl',
    weight: '700',
    fontFamily: serif,
    lineHeight: FontSizes['4xl'],
  },
  cta: { size: 'sm', weight: '700' },
  label: { size: 'lg', weight: '700' },
  titleLarge: {
    size: '3xl',
    weight: '300',
    lineHeight: FontSizes['3xl'],
    fontFamily: serif,
  },
  titleLargest: {
    size: '6xl',
    weight: '700',
    lineHeight: FontSizes['6xl'],
    textTransform: 'uppercase',
  },
  title: { size: '2xl', weight: '700' },
  titleSmall: {
    size: 'xl',
    weight: '400',
    lineHeight: FontSizes['2xl'],
    fontFamily: serif,
  },
  subheader: { size: 'lg', weight: '400', fontFamily: serif },
  labelTitle: {
    size: 'md',
    lineHeight: FontSizes.lg,
    weight: '700',
  },
  labelTitleSmall: {
    size: 'xs',
    lineHeight: FontSizes.lg,
    weight: '700',
  },
  copy: {
    size: 'sm',
    weight: '400',
    lineHeight: FontSizes.lg,
    fontFamily: serif,
  },
  span: {
    size: 'sm',
    weight: '400',
    lineHeight: FontSizes.md,
  },
  eventDetail: { size: 'sm', weight: '700', color: 'white' },
  eventTitle: { size: 'lg', weight: '700', color: 'white' },
  eventTime: {
    size: 'md',
    weight: '300',
    color: 'white',
    fontFamily: serif,
  },
} as const;

const getCSS = (p: TypeProps) => {
  const {
    size,
    weight,
    color = 'black',
    fontFamily,
    textTransform,
    lineHeight,
  } = styles[p.variant || 'copy'] as TypeVariant;
  return css`
    *,
    & {
      strong {
        font-weight: 700;
      }
      ${fontFamily && `font-family: ${fontFamily};`}
      ${textTransform && `text-transform: ${textTransform};`}
      font-size: ${FontSizes[p.size || size]};
      font-weight: ${p.weight || weight};
      color: ${Colors[p.color || color]};
      margin: ${p.margin || 0};
      line-height: ${p.lineHeight || lineHeight || 1.6};
      ${p.margin && 'display: inline-block;'}
      ${p.nowrap &&
      `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `}
    }
  `;
};

const H1 = styled.h1`
  ${getCSS}
`;
const H2 = styled.h2`
  ${getCSS}
`;
const H3 = styled.h3`
  ${getCSS}
`;
const H4 = styled.h4`
  ${getCSS}
`;
const H5 = styled.h5`
  ${getCSS}
`;
const H6 = styled.h6`
  ${getCSS}
`;
const P = styled.p`
  ${getCSS}
`;
const Span = styled.span`
  ${getCSS}
`;

export const Typography = ({ as: element, ...props }: TypeProps) => {
  const TypeComponent: any = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    span: Span,
  }[element || 'p'];
  return <TypeComponent {...props} />;
};
