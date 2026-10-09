import type { ComponentProps } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';
import { FluidContainer } from '../FluidContainer';
import { ParallaxStrip } from '../ParallaxStrip';

const DEFAULT_PHOTO_BAND_OPACITY = 0.88;

/* Fills the whole photo: the section's height comes from the photo, not the
   band's content, so the photo is never zoomed to fit the content. Where the
   content outgrows the photo — five stats stacked on a phone — the section
   grows instead, and the photo zooms to cover it. `color-mix` keeps the band
   on its theme token rather than a hand-copied rgba(), so a change to the
   token carries through here too. */
const TranslucentBand = styled.div<{ $color: string; $opacity: number }>`
  flex: 1;
  display: flex;
  background-color: color-mix(
    in srgb,
    ${(p) => p.$color} ${(p) => p.$opacity * 100}%,
    transparent
  );
`;

type FluidContainerProps = ComponentProps<typeof FluidContainer>;

/* The band's own background is this component's job — a token, made
   translucent over a photo — so FluidContainer's background props are not
   passed through, where they would paint over the photo. */
type BandLayoutProps = Omit<
  FluidContainerProps,
  | 'backgroundColor'
  | 'backgroundImage'
  | 'backgroundImageLoading'
  | 'backgroundBlur'
  | 'backgroundGradient'
  | 'backgroundOverlay'
  | 'backgroundPosition'
  | 'backgroundScrim'
>;

/* `photoAspectRatio` is required here, unlike on ParallaxStrip: it is what
   sizes the section. Without it the section would size to the band's content
   and the photo would zoom to cover whatever height that came to. */
type BackgroundPhoto = Pick<
  ComponentProps<typeof ParallaxStrip>,
  'src' | 'objectPosition' | 'travel' | 'unoptimized' | 'blur' | 'quality'
> & { photoAspectRatio: number };

interface ParallaxBandProps extends BandLayoutProps {
  backgroundColor: keyof typeof Colors;
  /**
   * Moves the band onto a parallax photo, sized to the photo: the band
   * covers it top to bottom, with the photo faint through it and the content
   * centered. Omit for a plain solid band.
   */
  backgroundPhoto?: BackgroundPhoto;
  /**
   * The band's opacity over the photo, 0–1. Ignored without a photo.
   *
   * Contrast is checked against the worst case, the band over pure black: on
   * `primary` with black text, 0.88 holds about 11:1 and contrast reaches the
   * 4.5:1 floor near 0.6. That floor is not the real limit, though — below
   * about 0.85 the photo's edges show through as texture behind the text and
   * hurt legibility before the ratio does. Re-check before lowering it.
   */
  photoBandOpacity?: number;
  children?: React.ReactNode;
}

export const ParallaxBand = ({
  backgroundColor,
  backgroundPhoto,
  photoBandOpacity = DEFAULT_PHOTO_BAND_OPACITY,
  children,
  ...bandLayoutProps
}: ParallaxBandProps) => {
  if (!backgroundPhoto) {
    return (
      <FluidContainer {...bandLayoutProps} backgroundColor={backgroundColor}>
        {children}
      </FluidContainer>
    );
  }

  return (
    <ParallaxStrip {...backgroundPhoto} backgroundColor={backgroundColor}>
      <TranslucentBand
        $color={Colors[backgroundColor]}
        $opacity={photoBandOpacity}
      >
        {/* A row flex item stretches to the band's full height but shrinks
            to its content's width, so the width is set back to full. */}
        <FluidContainer {...bandLayoutProps} width="100%">
          {children}
        </FluidContainer>
      </TranslucentBand>
    </ParallaxStrip>
  );
};
