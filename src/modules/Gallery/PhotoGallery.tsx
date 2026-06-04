import { useEffect, useRef, useState, type TouchEvent } from 'react';
import styled from 'styled-components';
import { Image } from 'components';
import { Colors } from 'theme';

export type PhotoGalleryVariant = 'light' | 'dark';

export interface PhotoGalleryPhoto {
  id: string;
  src: string;
  thumbUrl?: string;
  alt: string;
  caption: string;
  orientation?: 'landscape' | 'portrait';
}

export interface PhotoGallerySection {
  id: string;
  label: string;
  subLabel?: string;
  heading?: string;
  coverFallbackSrc?: string;
  photos: PhotoGalleryPhoto[];
}

export interface PhotoGalleryProps {
  sections: PhotoGallerySection[];
  variant?: PhotoGalleryVariant;
  tabsLabel?: string;
}

const Root = styled.div<{ $variant: PhotoGalleryVariant }>`
  --g-text: ${(p) =>
    p.$variant === 'dark' ? Colors.white : Colors.greyDarkest};
  --g-text-faint: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  --g-text-muted: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)'};
  --g-border: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'};
  --g-border-strong: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  --g-surface: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
  --g-surface-strong: ${(p) =>
    p.$variant === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};
  --g-thumb-bg: ${(p) =>
    p.$variant === 'dark' ? Colors.greyDarker : Colors.greyLighter};

  color: var(--g-text);
`;

const SectionTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin: 0 auto 36px;
  border-bottom: 1px solid var(--g-border);
`;

const SectionTab = styled.button<{ $active: boolean }>`
  background: none;
  border: 0;
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  padding: 14px 20px;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  color: ${(p) => (p.$active ? 'var(--g-text)' : 'var(--g-text-faint)')};
  border-bottom-color: ${(p) => (p.$active ? Colors.primary : 'transparent')};
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: var(--g-text);
  }
`;

const SubBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 auto 32px;
`;

const SubLabel = styled.span`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${Colors.primary};
  display: inline-flex;
  align-items: center;
  gap: 12px;

  &::before,
  &::after {
    content: '';
    width: 32px;
    height: 1px;
    background: rgba(255, 206, 4, 0.5);
  }
`;

const SubHeading = styled.h3`
  font-family: var(--font-bitter), serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(28px, 4vw, 44px);
  color: var(--g-text);
  margin: 0;
`;

const ViewerGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Stage = styled.div`
  position: relative;
  border-radius: 20px;
  background: #000;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
`;

const Backdrop = styled.div<{ $src: string }>`
  position: absolute;
  inset: 0;
  background: url(${(p) => p.$src}) center / cover no-repeat;
  filter: blur(28px) saturate(0.85);
  transform: scale(1.15);
  opacity: 0.55;
`;

const PhotoSlot = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    position: relative;
    z-index: 2;
    ${(p) =>
      p.$orientation === 'portrait'
        ? 'height: 100%; aspect-ratio: 3 / 4; object-fit: contain;'
        : 'width: 100%; height: 100%; object-fit: cover;'}
  }
`;

const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 80px 32px 28px;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.85));
  color: ${Colors.white};
  font-family: var(--font-bitter), serif;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s, transform 0.25s;
  pointer-events: none;
  z-index: 3;

  ${Stage}:hover &,
  ${Stage}:focus-within & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 700px) {
    padding: 60px 20px 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.25s;
    transform: none;
  }
`;

const Counter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 4;
  font-family: var(--font-montserrat), sans-serif;
  color: ${Colors.white};

  & .now {
    font-weight: 700;
    font-size: 16px;
    color: ${Colors.primary};
  }

  & .sep {
    opacity: 0.5;
  }

  & .total {
    font-weight: 600;
    font-size: 14px;
    opacity: 0.85;
  }
`;

const ControlsRow = styled.div`
  display: contents;

  @media (max-width: 700px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ArrowButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--g-surface);
  color: var(--g-text);
  border: 1px solid var(--g-border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;

  &:hover {
    background: ${Colors.primary};
    color: ${Colors.black};
    border-color: ${Colors.primary};
    transform: scale(1.05);
  }

  @media (max-width: 700px) {
    width: 44px;
    height: 44px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

const Rail = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  margin-top: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Thumb = styled.button<{ $active: boolean }>`
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  border: 2px solid ${(p) => (p.$active ? Colors.primary : 'transparent')};
  padding: 0;
  cursor: pointer;
  background: var(--g-thumb-bg);
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.15s;

  &:hover {
    transform: translateY(-2px);
    border-color: ${(p) =>
      p.$active ? Colors.primary : 'var(--g-border-strong)'};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Hint = styled.p`
  text-align: center;
  margin: 24px 0 0;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 13px;
  color: var(--g-text-muted);

  kbd {
    display: inline-block;
    padding: 2px 8px;
    background: var(--g-surface-strong);
    border: 1px solid var(--g-border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 12px;
    color: var(--g-text);
    margin: 0 2px;
  }
`;

const EmptyState = styled.p`
  margin: 0;
  color: var(--g-text-faint);
  font-family: var(--font-bitter), serif;
  font-size: 18px;
`;

const EmptyStage = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  z-index: 2;
`;

export const PhotoGallery = ({
  sections,
  variant = 'dark',
  tabsLabel = 'Select gallery section',
}: PhotoGalleryProps) => {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef({ x: 0, y: 0, t: 0 });

  const currentSection =
    sections[Math.min(sectionIdx, Math.max(sections.length - 1, 0))];
  const currentPhotoCount = currentSection?.photos.length ?? 0;

  useEffect(() => {
    setPhotoIdx(0);
  }, [sectionIdx]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!rootRef.current) {
        return;
      }

      const rect = rootRef.current.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.75 &&
        rect.bottom > window.innerHeight * 0.25;

      if (!inView || currentPhotoCount < 2) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        setPhotoIdx((idx) => (idx - 1 + currentPhotoCount) % currentPhotoCount);
      }

      if (event.key === 'ArrowRight') {
        setPhotoIdx((idx) => (idx + 1) % currentPhotoCount);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentPhotoCount]);

  if (!sections.length) {
    return null;
  }

  const section = sections[Math.min(sectionIdx, sections.length - 1)];
  const hasRealPhotos = section.photos.length > 0;
  const isCoverFallback = !hasRealPhotos && Boolean(section.coverFallbackSrc);
  const photos: PhotoGalleryPhoto[] = hasRealPhotos
    ? section.photos
    : isCoverFallback
    ? [
        {
          id: `cover-${section.id}`,
          src: section.coverFallbackSrc as string,
          alt: '',
          caption: `${section.heading ?? section.label} — photos coming soon`,
        },
      ]
    : [];
  const shot = photos[Math.min(photoIdx, Math.max(photos.length - 1, 0))];
  const len = photos.length;

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      t: Date.now(),
    };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchRef.current.x;
    const dy = touch.clientY - touchRef.current.y;
    const dt = Date.now() - touchRef.current.t;

    if (dt < 700 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        setPhotoIdx((idx) => (idx + 1) % len);
      } else {
        setPhotoIdx((idx) => (idx - 1 + len) % len);
      }
    }
  };

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <Root ref={rootRef} $variant={variant}>
      {sections.length > 1 ? (
        <SectionTabs role="tablist" aria-label={tabsLabel}>
          {sections.map((entry, index) => (
            <SectionTab
              key={entry.id}
              role="tab"
              aria-selected={index === sectionIdx}
              $active={index === sectionIdx}
              onClick={() => setSectionIdx(index)}
            >
              {entry.label}
            </SectionTab>
          ))}
        </SectionTabs>
      ) : null}

      {section.heading || section.subLabel ? (
        <SubBlock aria-live="polite">
          {section.subLabel ? <SubLabel>{section.subLabel}</SubLabel> : null}
          {section.heading ? <SubHeading>{section.heading}</SubHeading> : null}
        </SubBlock>
      ) : null}

      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <ViewerGrid>
          <ControlsRow>
            <ArrowButton
              aria-label="Previous photo"
              onClick={() => {
                if (len < 2) {
                  return;
                }

                setPhotoIdx((idx) => (idx - 1 + len) % len);
              }}
              disabled={len < 2}
            >
              <Chevron dir="left" />
            </ArrowButton>
          </ControlsRow>

          <Stage
            role="img"
            aria-label={shot?.caption ?? 'No photos available yet'}
          >
            {shot ? (
              <>
                <Backdrop $src={shot.src} aria-hidden />
                <PhotoSlot $orientation={shot.orientation ?? 'landscape'}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    placeholder={section.coverFallbackSrc}
                    isExpandable
                  />
                </PhotoSlot>
                <Caption>{shot.caption}</Caption>
                {hasRealPhotos ? (
                  <Counter aria-live="polite">
                    <span className="now">{pad(photoIdx + 1)}</span>
                    <span className="sep">/</span>
                    <span className="total">{pad(len)}</span>
                  </Counter>
                ) : null}
              </>
            ) : (
              <EmptyStage>
                <EmptyState>No photos available yet.</EmptyState>
              </EmptyStage>
            )}
          </Stage>

          <ControlsRow>
            <ArrowButton
              aria-label="Next photo"
              onClick={() => {
                if (len < 2) {
                  return;
                }

                setPhotoIdx((idx) => (idx + 1) % len);
              }}
              disabled={len < 2}
            >
              <Chevron dir="right" />
            </ArrowButton>
          </ControlsRow>
        </ViewerGrid>

        {hasRealPhotos ? (
          <Rail role="tablist" aria-label="Jump to photo">
            {photos.map((photo, index) => (
              <Thumb
                key={photo.id}
                role="tab"
                aria-selected={index === photoIdx}
                aria-label={`Photo ${index + 1}: ${photo.caption}`}
                $active={index === photoIdx}
                onClick={() => setPhotoIdx(index)}
              >
                <Image
                  src={photo.thumbUrl ?? photo.src}
                  alt=""
                  placeholder={section.coverFallbackSrc}
                  lazy
                  width="100%"
                  height="100%"
                />
              </Thumb>
            ))}
          </Rail>
        ) : null}
      </div>

      {hasRealPhotos ? (
        <Hint aria-hidden>
          Use <kbd>{'<'}</kbd> <kbd>{'>'}</kbd> or swipe to navigate.
        </Hint>
      ) : null}
    </Root>
  );
};

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
);
