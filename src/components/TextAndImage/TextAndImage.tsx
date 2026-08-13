import React from 'react';
import styled from 'styled-components';
import { Image } from 'components';
import { media, Spaces } from 'theme';

type ImagePosition = 'left' | 'right';

interface TextAndImageProps {
  /** Anything: headings, paragraphs, a chart. Rendered as-is, unwrapped. */
  children?: React.ReactNode;
  /** Which side the image sits on from tablet up. Below that it always
      stacks under the text, whichever side was asked for. */
  imagePosition?: ImagePosition;
  src: string;
  /** Decorative by default. Pass real text only when the image carries
      information the copy beside it does not. */
  alt?: string;
  /** Grid track for the image column; the text column is always
      `minmax(0, 1fr)`. Narrow this to give the copy more room. */
  imageColumnWidth?: string;
  /** Ceiling on the image itself, so an illustration in a wide column
      doesn't scale up past the size it was drawn for. */
  maxImageWidth?: string;
  /**
   * `edge` pins the image to the row's outer edge, so all the slack falls
   * between it and the copy. `center` gives it equal margins inside its own
   * column instead — the right choice when it sits beside something that is
   * itself centered in its column, such as a chart with `margin: 0 auto`,
   * where an edge-pinned image reads as lopsided.
   */
  imageAlign?: 'edge' | 'center';
  gap?: string;
  margin?: string;
  alignItems?: 'center' | 'flex-start';
}

type ColumnProps = { $imagePosition: ImagePosition };

const Row = styled.div<{
  $imagePosition: ImagePosition;
  $imageColumnWidth: string;
  $gap?: string;
  $margin?: string;
  $alignItems?: string;
}>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.$imagePosition === 'left'
      ? `${p.$imageColumnWidth} minmax(0, 1fr)`
      : `minmax(0, 1fr) ${p.$imageColumnWidth}`};
  gap: ${(p) => p.$gap || `clamp(${Spaces.lg}, 4vw, ${Spaces['2xl']})`};
  align-items: ${(p) => p.$alignItems || 'center'};
  margin: ${(p) => p.$margin || '0'};
  width: 100%;

  ${media('tablet')(`
    grid-template-columns: minmax(0, 1fr);
  `)}
`;

/* Text is first in the DOM either way, so the reading order on a phone is
   copy-then-image and the illustration never pushes the section's opening
   line below the fold. `left` is achieved by placing the columns, not by
   reordering the markup. */
const TextColumn = styled.div<ColumnProps>`
  min-width: 0;
  ${(p) => p.$imagePosition === 'left' && 'grid-column: 2; grid-row: 1;'}

  ${media('tablet')(`
    grid-column: auto;
    grid-row: auto;
  `)}
`;

/* By default the image hugs the row's outer edge, so the gap it opens up
   falls between the image and the copy — which is the point of putting it
   there. `center` overrides that for the case where the thing beside it is
   itself centered. Centered once the row stacks either way, since there is
   no outer edge to hug. */
const ImageColumn = styled.div<
  ColumnProps & { $maxImageWidth?: string; $imageAlign: 'edge' | 'center' }
>`
  display: flex;
  justify-content: ${(p) => {
    if (p.$imageAlign === 'center') return 'center';
    return p.$imagePosition === 'left' ? 'flex-start' : 'flex-end';
  }};
  min-width: 0;
  ${(p) => p.$imagePosition === 'left' && 'grid-column: 1; grid-row: 1;'}

  > img {
    width: 100%;
    max-width: ${(p) => p.$maxImageWidth || '320px'};
    height: auto;
  }

  ${media('tablet')(`
    grid-column: auto;
    grid-row: auto;
    justify-content: center;
  `)}
`;

export const TextAndImage = ({
  children,
  imagePosition = 'right',
  src,
  alt = '',
  imageColumnWidth = 'minmax(0, 0.8fr)',
  maxImageWidth,
  imageAlign = 'edge',
  gap,
  margin,
  alignItems,
}: TextAndImageProps) => (
  <Row
    $imagePosition={imagePosition}
    $imageColumnWidth={imageColumnWidth}
    $gap={gap}
    $margin={margin}
    $alignItems={alignItems}
  >
    <TextColumn $imagePosition={imagePosition}>{children}</TextColumn>
    <ImageColumn
      $imagePosition={imagePosition}
      $maxImageWidth={maxImageWidth}
      $imageAlign={imageAlign}
    >
      <Image src={src} alt={alt} lazy />
    </ImageColumn>
  </Row>
);
