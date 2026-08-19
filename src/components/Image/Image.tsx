import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { Colors, media } from 'theme';
import { GrExpand } from 'react-icons/gr';
import { ImageModal } from './ImageModal';
import { SkeletonOverlay } from '../Skeleton';

export interface BaseComponentProps
  extends SpaceProps,
    Partial<Pick<HTMLElement, 'title' | 'id' | 'tabIndex'>> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children?: ReactNode;
  className?: string;
  'data-qa'?: string;
  role?: string;
  style?: CSSObject;
  noShrink?: boolean;
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
  isExpandable?: boolean;
  fullSizeSrc?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  /**
   * Shimmer over the image's box until it has decoded, for photographs heavy
   * enough that a slow connection leaves a hole in the layout.
   *
   * Requires the box to be known before the image arrives — a sized parent, or
   * an explicit width and height. A skeleton over a box that takes its size
   * *from* the loaded image has nothing to fill and renders as nothing.
   */
  skeletonWhileLoading?: boolean;
}

const TriggerWrapper = styled.div<{
  $isExpandable?: boolean;
  round?: boolean;
  borderRadius?: '12px' | '8px';
  noShrink?: boolean;
}>`
  position: relative;
  display: inline-block;
  cursor: ${(p) => (p.$isExpandable ? 'zoom-in' : 'default')};
  border-radius: ${(p) => (p.round ? '50%' : p.borderRadius || 0)};
  flex-shrink: ${(p) => (p.noShrink ? 0 : 'initial')};

  ${layout}
  ${space}

  > img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: inherit;
  }
`;

/* Only wraps the image when a skeleton is asked for, so every existing caller
   keeps rendering a bare `img` with no extra element in the tree. */
const SkeletonFrame = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const BottomIconAnchor = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 4px;

  ${media('tablet')(`
    bottom: 1px;
    right: 1px;
    border-radius: 10px;
  `)}

  ${media('mobile')(`
    bottom: 1px;
    right: 1px;
    border-radius: 10px;
  `)}
`;

const ExpandIcon = styled(GrExpand)`
  color: ${Colors.white || '#fff'};
  font-size: 18px;

  ${media('tablet')(`
    font-size: 16px;
  `)}

  ${media('mobile')(`
    font-size: 14px;
  `)}

  path {
    stroke: ${Colors.white || '#fff'};
  }
`;

export const StyledImage = styled('img')<ImageProps>`
  border-radius: ${(p) => (p.round ? '50%' : p.borderRadius || 0)};
  flex-shrink: ${(p) => (p.noShrink ? 0 : 'initial')};
  display: block;

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
  lazy = false,
  isExpandable,
  fullSizeSrc,
  onLoad,
  skeletonWhileLoading,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  /* A cached image can already be complete before this mounts, in which case
     its load event has been and gone and the skeleton would never clear. */
  useEffect(() => {
    if (imageRef.current?.complete) setIsSettled(true);
  }, [imageSrc]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setIsSettled(true);
    onLoad?.(event);
  };

  const handleError = () => {
    if (placeholder) {
      setImageSrc(placeholder);
    }

    /* Clear the shimmer either way: a failed image should fall through to its
       placeholder or the browser's broken-image mark, not shimmer forever. */
    setIsSettled(true);
    onError?.();
  };

  const openModal = () => {
    if (!isExpandable) return;

    previouslyFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const restoreFocus = () => {
    previouslyFocusedElementRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isExpandable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  const filteredProps = Object.fromEntries(
    Object.entries(rest).filter(([_, value]) => value != null),
  );

  if (!isExpandable) {
    const image = (
      <StyledImage
        ref={imageRef}
        alt={alt}
        src={imageSrc}
        srcSet={srcset}
        sizes={sizes}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        tabIndex={-1}
        onLoad={handleLoad}
        {...filteredProps}
      />
    );

    if (!skeletonWhileLoading) return image;

    return (
      <SkeletonFrame>
        {image}
        {!isSettled && <SkeletonOverlay aria-hidden="true" />}
      </SkeletonFrame>
    );
  }

  return (
    <>
      <TriggerWrapper
        {...filteredProps}
        $isExpandable={isExpandable}
        onClick={openModal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={`View ${alt} in full screen`}
      >
        <StyledImage
          ref={imageRef}
          alt={alt}
          src={imageSrc}
          srcSet={srcset}
          sizes={sizes}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          tabIndex={-1}
          onLoad={handleLoad}
        />
        {skeletonWhileLoading && !isSettled && (
          <SkeletonOverlay aria-hidden="true" />
        )}
        {!isOpen && (
          <BottomIconAnchor>
            <ExpandIcon />
          </BottomIconAnchor>
        )}
      </TriggerWrapper>

      {isOpen && (
        <ImageModal
          alt={alt}
          src={fullSizeSrc || src}
          closeButtonRef={closeButtonRef}
          onClose={closeModal}
          onRestoreFocus={restoreFocus}
        />
      )}
    </>
  );
};
