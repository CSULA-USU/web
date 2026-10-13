import { useId, useState } from 'react';
import NextImage from 'next/image';
import styled, { css } from 'styled-components';
import { BiPlus } from 'react-icons/bi';
import { Colors, Radii, Spaces } from 'theme';
import { Typography } from '../Typography';
import { PlaceholderMarker } from '../PlaceholderMarker';
import { CHART_EASING } from '../PieChart/chartTokens';

export interface CrossfadeImage {
  /** Matched against `activeKey`. */
  key: string;
  title: string;
  /** Revealed over the image on hover, or on a tap or click of it. */
  description: React.ReactNode;
  /** Leave unset while the image does not exist yet: the frame renders the
      `pendingLabel` marker instead, and the caption still works. */
  src?: string;
  alt: string;
}

interface ImageCrossfadeProps {
  images: CrossfadeImage[];
  activeKey: string;
  /** Target for `aria-controls` on whatever picks `activeKey`. */
  id?: string;
  aspectRatio?: string;
  pendingLabel?: string;
}

/* Slow and on the page's shared reveal curve, so a swap reads as the picture
   settling rather than a slide being changed. The scale is 2% — enough to
   take the edge off the cut, small enough not to read as a zoom. */
const FADE = `600ms ${CHART_EASING}`;
const SETTLE = `900ms ${CHART_EASING}`;

/* Every image shares one grid cell, so the frame holds its size from first
   paint and a swap moves nothing around it. */
const Stack = styled.div`
  display: grid;

  > * {
    grid-area: 1 / 1;
  }
`;

const Frame = styled.div<{ $aspectRatio: string }>`
  position: relative;
  aspect-ratio: ${(p) => p.$aspectRatio};
  overflow: hidden;
  border-radius: ${Radii.surface};
  background-color: ${Colors.greyDarker};

  /* Sources can be portrait while the frame is landscape, so the picture is
     cropped to its vertical middle — where a room's subject usually sits —
     rather than anchored to the top or bottom edge. */
  img {
    object-fit: cover;
    object-position: center center;
  }
`;

const PendingFrame = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Spaces.md};
  text-align: center;
  border: 1px dashed ${Colors.greyDark};
  border-radius: inherit;
`;

/* Covers the whole picture, so a tap anywhere on it toggles the description.
   The caption on top ignores the pointer and lets the tap through. */
const RevealButton = styled.button`
  position: absolute;
  inset: 0;
  padding: 0;
  border: none;
  border-radius: ${Radii.surface};
  background: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${Colors.primary};
    outline-offset: 3px;
  }
`;

/* 78% black keeps white text above 11:1 even over a white patch of image,
   which a lighter scrim cannot promise for a picture nobody has seen yet. */
const Caption = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: ${Spaces.md} ${Spaces.lg};
  background-color: rgba(0, 0, 0, 0.78);
  border-radius: 0 0 ${Radii.surface} ${Radii.surface};
  pointer-events: none;
`;

const CaptionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.md};
  color: ${Colors.primary};
`;

const ToggleIcon = styled(BiPlus)`
  flex: none;
  font-size: 20px;
  transition: transform ${FADE};
`;

/* Grid rows rather than max-height: 0fr to 1fr animates to the text's real
   height, where a max-height guess either clips long copy or lags on short. */
const Description = styled.div`
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows ${FADE}, opacity ${FADE};

  > * {
    overflow: hidden;
  }
`;

const revealed = css`
  ${Description} {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  ${ToggleIcon} {
    transform: rotate(45deg);
  }
`;

/* Inactive images stay in the cell to hold its height. Visibility flips only
   after the fade-out, so the outgoing picture dissolves instead of vanishing,
   and then leaves the a11y tree and the tab order. `inherit`, never `visible`:
   a child set to `visible` shows through a hidden ancestor, such as an
   inactive tab panel. */
const Figure = styled.figure<{ $isActive: boolean; $isOpen: boolean }>`
  position: relative;
  margin: 0;
  opacity: ${(p) => (p.$isActive ? 1 : 0)};
  visibility: ${(p) => (p.$isActive ? 'inherit' : 'hidden')};
  transition: opacity ${FADE},
    visibility 0s linear ${(p) => (p.$isActive ? '0s' : '600ms')};

  img {
    transform: scale(${(p) => (p.$isActive ? 1 : 1.02)});
    transition: transform ${SETTLE};
  }

  ${(p) => p.$isOpen && revealed}

  /* Hover only where hover exists. On touch, a tap would leave a sticky
     hover behind and the next tap could never close the description. */
  @media (hover: hover) {
    &:hover {
      ${revealed}
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    img,
    ${Description}, ${ToggleIcon} {
      transition: none;
    }
  }
`;

/**
 * One image at a time from a set, crossfading when `activeKey` changes, each
 * with a caption bar whose description opens on hover or on a tap of the
 * picture. Whatever picks `activeKey` lives outside — a list of
 * `SelectableOption`s beside it is the intended pairing.
 *
 * The description is always in the DOM, so screen readers and search read it
 * whether or not it is open. Open state is shared across images: someone who
 * tapped one open on a phone is reading descriptions, and should not have to
 * tap again for every picture.
 */
export const ImageCrossfade = ({
  images,
  activeKey,
  id,
  aspectRatio = '4 / 3',
  pendingLabel = '[IMAGE PENDING]',
}: ImageCrossfadeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseId = useId();

  return (
    <Stack id={id}>
      {images.map((image, index) => {
        const titleId = `${baseId}-${index}-title`;
        const descriptionId = `${baseId}-${index}-description`;
        return (
          <Figure
            key={image.key}
            $isActive={image.key === activeKey}
            $isOpen={isOpen}
          >
            <Frame $aspectRatio={aspectRatio}>
              {image.src ? (
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <PendingFrame>
                  <PlaceholderMarker tone="primary">
                    {pendingLabel}
                  </PlaceholderMarker>
                </PendingFrame>
              )}
            </Frame>
            <RevealButton
              type="button"
              aria-labelledby={titleId}
              aria-expanded={isOpen}
              aria-controls={descriptionId}
              onClick={() => setIsOpen((open) => !open)}
            />
            <Caption>
              <CaptionTitle>
                <Typography
                  as="span"
                  id={titleId}
                  variant="span"
                  size="sm"
                  weight="700"
                  color="white"
                >
                  {image.title}
                </Typography>
                <ToggleIcon aria-hidden="true" />
              </CaptionTitle>
              <Description>
                <div>
                  <Typography
                    as="p"
                    id={descriptionId}
                    variant="copy"
                    size="sm"
                    lineHeight="1.6"
                    color="white"
                    margin={`${Spaces.sm} 0 0`}
                  >
                    {image.description}
                  </Typography>
                </div>
              </Description>
            </Caption>
          </Figure>
        );
      })}
    </Stack>
  );
};
