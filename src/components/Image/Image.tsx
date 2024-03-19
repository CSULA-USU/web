/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { layout, space, LayoutProps } from 'styled-system';

import { ElementType, ReactNode } from 'react';
import { CSSObject } from 'styled-components';
import { SpaceProps } from 'styled-system';

export interface BaseComponentProps
  extends SpaceProps,
    Partial<Pick<HTMLElement, 'title' | 'id' | 'tabIndex'>> {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  'data-qa'?: string;
  role?: string;
  style?: CSSObject;
}

export const StyledImage = styled.img<ImageProps>`
  border-radius: ${(p) => (p.round ? `50%` : p.borderRadius || 0)};
  ${layout}
  ${space}
`;

export interface ImageProps extends BaseComponentProps, LayoutProps {
  alt: string;
  onError?: () => void;
  placeholder?: string;
  sizes?: string;
  src: string;
  srcset?: string;
  borderRadius?: '12px' | '8px';
  round?: boolean;
  lazy?: boolean;
}

export const Image: FC<ImageProps> = ({
  alt,
  onError,
  placeholder,
  sizes,
  src,
  srcset,
  lazy = 'eager',
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    placeholder && setImageSrc(placeholder);
    onError && onError();
  };

  return (
    <StyledImage
      alt={alt}
      onError={handleError}
      sizes={sizes}
      src={imageSrc}
      srcSet={srcset}
      {...rest}
      loading={lazy ? 'lazy' : 'eager'}
    />
  );
};
