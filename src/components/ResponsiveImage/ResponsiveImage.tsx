import React, { FC } from 'react';
import styled from 'styled-components';
import { Radii } from 'theme';
import { Image, ImageProps } from '../Image';

type Radius = (typeof Radii)[keyof typeof Radii];

const Picture = styled.picture<{ borderRadius?: Radius }>`
  display: block;
  border-radius: ${(props) => props.borderRadius || 0};
  overflow: hidden;
`;

export interface ResponsiveImageProps extends Omit<ImageProps, 'borderRadius'> {
  borderRadius?: Radius;
  portraitSrc?: string;
  portraitMedia?: string;
}

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  alt,
  portraitSrc,
  portraitMedia = '(max-width: 768px)',
  borderRadius,
  objectFit,
  objectPosition = 'center center',
  ...imageProps
}) => {
  if (!portraitSrc && !borderRadius) {
    return (
      <Image
        {...imageProps}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    );
  }

  return (
    <Picture borderRadius={borderRadius}>
      {portraitSrc && <source media={portraitMedia} srcSet={portraitSrc} />}
      <Image
        {...imageProps}
        alt={alt}
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    </Picture>
  );
};
