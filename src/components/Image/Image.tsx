import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { Colors, media } from 'theme';
import { GrExpand } from 'react-icons/gr';
import { ImageModal } from './ImageModal';

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
}

const TriggerWrapper = styled.div<{ isExpandable?: boolean }>`
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: ${(p) => (p.isExpandable ? 'zoom-in' : 'default')};

  ${layout}
  ${space}
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
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isOpen, setIsOpen] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (placeholder) {
      setImageSrc(placeholder);
    }

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
    return (
      <StyledImage
        alt={alt}
        src={imageSrc}
        srcSet={srcset}
        sizes={sizes}
        isExpandable={isExpandable}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        tabIndex={-1}
        onLoad={onLoad}
        {...filteredProps}
      />
    );
  }

  return (
    <>
      <TriggerWrapper
        isExpandable={isExpandable}
        onClick={openModal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={`View ${alt} in full screen`}
      >
        <StyledImage
          alt={alt}
          src={imageSrc}
          srcSet={srcset}
          sizes={sizes}
          isExpandable={isExpandable}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          tabIndex={-1}
          onLoad={onLoad}
          {...filteredProps}
        />
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
