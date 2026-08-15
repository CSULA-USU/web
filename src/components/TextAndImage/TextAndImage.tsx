import React from 'react';
import styled from 'styled-components';
import { Image } from 'components';
import { media, Spaces } from 'theme';

type ImagePosition = 'left' | 'right';

/** Where the image sits inside its own column, independent of which side of
    the row that column is on. */
type ImageAlign = 'start' | 'center' | 'end';

/* The values are the box-alignment words rather than `flex-*`, so the prop
   reads like the CSS it becomes; the longhand is what actually ships, being
   the better supported spelling in flexbox. */
const justifyContentFor: Record<ImageAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

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
      doesn't scale up past the size it was drawn for. Ignored when
      `imageHeight` is set. */
  maxImageWidth?: string;
  /**
   * Fixed rendered height, with the width left to follow the artwork's own
   * ratio and the image letterboxed inside its box rather than distorted.
   *
   * Reach for this instead of `maxImageWidth` across a set of illustrations
   * whose aspect ratios differ. Matched widths make a portrait drawing tall
   * and its figures huge next to a landscape one; matched heights keep the
   * drawn people at roughly the same scale, which is what a reader actually
   * compares from section to section.
   */
  imageHeight?: string;
  /**
   * Where the image sits within its column: hard against the column's leading
   * edge, centered in it, or hard against its trailing edge. Independent of
   * `imagePosition`, which decides which side of the row the column is on.
   *
   * `center` is the default and usually right — an image pushed to a column
   * edge strands itself against the section padding and opens a gulf between
   * itself and the copy. Reach for `start` or `end` when the image needs to
   * line up with something specific beside it.
   */
  imageAlign?: ImageAlign;
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

/* Always centered once the row stacks: below that breakpoint the column is
   the full width of the section, so aligning to either end of it just throws
   the image against a margin. */
const ImageColumn = styled.div<
  ColumnProps & {
    $maxImageWidth?: string;
    $imageHeight?: string;
    $imageAlign: ImageAlign;
  }
>`
  display: flex;
  justify-content: ${(p) => justifyContentFor[p.$imageAlign]};
  min-width: 0;
  ${(p) => p.$imagePosition === 'left' && 'grid-column: 1; grid-row: 1;'}

  /* Height-led: object-fit matters because the column can be narrower than the
     artwork's ratio wants, and an image asked for a fixed height in a box too
     narrow for it would otherwise squash rather than shrink. */
  > img {
    ${(p) =>
      p.$imageHeight
        ? `
      width: auto;
      height: ${p.$imageHeight};
      max-width: 100%;
      object-fit: contain;
    `
        : `
      width: 100%;
      max-width: ${p.$maxImageWidth || '320px'};
      height: auto;
    `}
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
  imageHeight,
  imageAlign = 'center',
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
      $imageHeight={imageHeight}
      $imageAlign={imageAlign}
    >
      <Image src={src} alt={alt} lazy />
    </ImageColumn>
  </Row>
);
