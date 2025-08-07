/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { ReactNode } from 'react';

export interface BaseComponentProps
  extends SpaceProps,
    Partial<Pick<HTMLElement, 'title' | 'id' | 'tabIndex'>> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children?: ReactNode;
  className?: string;
  'data-qa'?: string;
  role?: string;
  style?: CSSObject;
}

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

export const StyledImage = styled('img')<ImageProps>`
  border-radius: ${(p) => (p.round ? '50%' : p.borderRadius || 0)};
  ${layout}
  ${space}
`;

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
    if (placeholder) setImageSrc(placeholder);
    onError?.();
  };

  // Filter out any null values to satisfy strict types (e.g., height, width)
  const filteredProps = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v != null),
  );

  return (
    <StyledImage
      alt={alt}
      onError={handleError}
      sizes={sizes}
      src={imageSrc}
      srcSet={srcset}
      loading={lazy ? 'lazy' : 'eager'}
      {...filteredProps}
    />
  );
};
