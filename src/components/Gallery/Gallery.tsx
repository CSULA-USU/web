import { useState, useCallback, useEffect } from 'react';
import NextImage from 'next/image';
import styled from 'styled-components';
import { Typography } from 'components';
import { Colors, Spaces, media } from 'theme';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  showCounter?: boolean;
  'aria-label'?: string;
}

const GalleryRoot = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.md};
  width: 100%;
`;

const SlideRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Spaces.md};
  width: 100%;
  ${media('mobile')(`gap: ${Spaces.sm};`)}
`;

const NavButton = styled.button`
  background: ${Colors.black};
  color: ${Colors.primary};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${Colors.greyDarker};
  }
  &:focus-visible {
    outline: 3px solid ${Colors.primary};
    outline-offset: 2px;
  }
  ${media('mobile')(`
    width: 40px;
    height: 40px;
    min-width: 40px;
  `)}
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 800px;
  height: 520px;
  ${media('tablet')(`height: 400px;`)}
  ${media('mobile')(`height: 260px;`)}
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Spaces.xs};
  text-align: center;
  max-width: 700px;
  padding: 0 ${Spaces.md};
`;

const Counter = styled.p`
  font-size: 14px;
  color: ${Colors.grey};
  margin: 0;
`;

const ScreenReaderAnnouncement = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const Gallery = ({
  images,
  showCounter = true,
  'aria-label': ariaLabel = 'Image gallery',
}: GalleryProps) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  if (total === 0) return null;

  const { src, alt, title, caption } = images[current];

  return (
    <GalleryRoot aria-label={ariaLabel}>
      <ScreenReaderAnnouncement aria-live="polite" aria-atomic="true">
        Image {current + 1} of {total}: {alt}
      </ScreenReaderAnnouncement>

      <SlideRow>
        <NavButton type="button" onClick={prev} aria-label="Previous image">
          <MdChevronLeft size={28} aria-hidden="true" />
        </NavButton>

        <ImageWrapper>
          <NextImage
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'contain', borderRadius: '8px' }}
            sizes="(max-width: 580px) 85vw, (max-width: 768px) 75vw, 800px"
          />
        </ImageWrapper>

        <NavButton type="button" onClick={next} aria-label="Next image">
          <MdChevronRight size={28} aria-hidden="true" />
        </NavButton>
      </SlideRow>

      <Meta>
        {title && (
          <Typography variant="labelTitle" as="h3">
            {title}
          </Typography>
        )}
        {caption && (
          <Typography variant="copy" as="p" color="grey">
            {caption}
          </Typography>
        )}
        {showCounter && (
          <Counter>
            {current + 1} / {total}
          </Counter>
        )}
      </Meta>
    </GalleryRoot>
  );
};
