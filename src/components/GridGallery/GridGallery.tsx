import NextImage from 'next/image';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { Typography } from '../Typography';
import { CitationMarker } from '../CitationMarker';
import { PlaceholderMarker } from '../PlaceholderMarker';

export interface GridGalleryItem {
  src: string;
  /** Describes the scene, not the individuals in it. Never names a person. */
  alt: string;
  /** Optional, but a captioned tile is the point of using this over a grid
      of bare images. Keep it factual. */
  caption?: string;
  /** Renders a citation marker after the caption, linking to `#source-{id}`.
      Use whenever the caption states a figure. */
  sourceId?: string;
  /**
   * The caption is written and the image does not exist yet. Renders a dashed
   * frame in place of the picture, so the caption still reaches the reader
   * rather than pointing `alt` at a stand-in it does not describe. Delete the
   * line when the real image lands — nothing else changes.
   */
  isAwaitingImage?: boolean;
}

type ColumnCount = 2 | 3 | 4;

interface GridGalleryProps {
  items: GridGalleryItem[];
  /** Columns from `TWO_COLUMN_MAX_WIDTH` up. Below that the grid steps down
      on its own, so this is the ceiling rather than a fixed count. */
  columns?: ColumnCount;
  /** Uniform tile ratio, so the grid reads as one set rather than a ransom
      note of whatever ratios the photographer handed over. */
  aspectRatio?: string;
  gap?: string;
  /** Names the list for screen readers. Worth setting when a page has more
      than one gallery. */
  ariaLabel?: string;
  /** Shown instead of the grid when `items` is empty. A gallery that
      collapses silently looks finished when it isn't. */
  emptyLabel?: string;
  /** Shown inside the frame of any item flagged `isAwaitingImage`. */
  pendingLabel?: string;
}

/* Not theme breakpoints: the grid steps down at the widths where a tile stops
   being able to hold a caption line, which fall between `mobile` (580) and
   `tablet` (768) and above `tablet` respectively. */
const SINGLE_COLUMN_MAX_WIDTH = '640px';
const TWO_COLUMN_MAX_WIDTH = '900px';

/* Shared by the frame and the caption below it — see `Caption`. */
const FRAME_CORNER_RADIUS = '12px';

const Grid = styled.ul<{ $columns: ColumnCount; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$columns}, minmax(0, 1fr));
  gap: ${(p) => p.$gap || Spaces.lg};
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  @media (max-width: ${TWO_COLUMN_MAX_WIDTH}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${SINGLE_COLUMN_MAX_WIDTH}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Tile = styled.li`
  min-width: 0;
`;

/* `figure`/`figcaption` is the markup that actually ties a caption to its
   image for assistive tech; a sibling paragraph only looks related. */
const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.sm};
  margin: 0;
  height: 100%;
`;

/* A fixed ratio gives the image a box to cover. Intrinsic width and height
   stay set on the image itself so the layout never shifts while it loads. */
const Frame = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${(p) => p.$aspectRatio};
  overflow: hidden;
  border-radius: ${FRAME_CORNER_RADIUS};
  background-color: ${Colors.greyLightest};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* `Typography` has a fixed set of elements it will render as, and
   `figcaption` is not one of them. Rather than widen that shared union for a
   single caller, the semantic element wraps the styled text. */
/* Inset by half the frame's corner radius. The caption sits under the tile's
   bottom corner, where the frame has already curved inward, so a caption flush
   to the frame's box reads as overhanging the picture rather than aligning
   with it. Both sides, so the text block stays centered under the tile. */
const Caption = styled.figcaption`
  margin: 0;
  padding: 0 calc(${FRAME_CORNER_RADIUS} / 2);
`;

const PendingFrame = styled(Frame)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spaces.md};
  text-align: center;
  border: 1px dashed ${Colors.greyLighter};
  background-color: ${Colors.white};
`;

/**
 * A responsive grid of images, each with a permanently visible caption.
 *
 * Captions are never hover-revealed or overlaid on the image: there is no
 * hover on a touch device, and on a page where the caption carries the
 * information, hiding it behind a pointer hides the point. There is
 * deliberately no lightbox — it costs a tap and a dismissal on mobile, and
 * a larger copy of the same photo is rarely worth the trip.
 */
export const GridGallery = ({
  items,
  columns = 3,
  aspectRatio = '4 / 3',
  gap,
  ariaLabel,
  emptyLabel = '[GALLERY — awaiting images]',
  pendingLabel = '[IMAGE PENDING]',
}: GridGalleryProps) => {
  if (items.length === 0) {
    return <PlaceholderMarker variant="block">{emptyLabel}</PlaceholderMarker>;
  }

  return (
    <Grid $columns={columns} $gap={gap} aria-label={ariaLabel}>
      {items.map((item, index) => (
        <Tile key={item.src || item.caption || index}>
          <Figure>
            {item.isAwaitingImage ? (
              <PendingFrame $aspectRatio={aspectRatio}>
                <PlaceholderMarker>{pendingLabel}</PlaceholderMarker>
              </PendingFrame>
            ) : (
              <Frame $aspectRatio={aspectRatio}>
                <NextImage
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  sizes={`(max-width: ${SINGLE_COLUMN_MAX_WIDTH}) 92vw, (max-width: ${TWO_COLUMN_MAX_WIDTH}) 46vw, ${Math.floor(
                    100 / columns,
                  )}vw`}
                  /* Everything past the first row is below the fold on any
                     viewport that shows this many columns. */
                  loading={index < columns ? 'eager' : 'lazy'}
                />
              </Frame>
            )}
            {item.caption && (
              <Caption>
                <Typography as="span" variant="copy" size="xs" lineHeight="1.5">
                  {item.caption}
                  {item.sourceId && <CitationMarker sourceId={item.sourceId} />}
                </Typography>
              </Caption>
            )}
          </Figure>
        </Tile>
      ))}
    </Grid>
  );
};
