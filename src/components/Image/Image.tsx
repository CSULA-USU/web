import React, { FC, useEffect, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { ReactNode } from 'react';
import { Colors, media } from 'theme';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrExpand } from 'react-icons/gr';

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
}

const TriggerWrapper = styled.div<{ isExpandable?: boolean }>`
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: ${(p) => (p.isExpandable ? 'zoom-in' : 'default')};

  ${layout}
  ${space}
`;

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: zoom-out;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: inline-flex;
  max-width: 95%;
  max-height: 95%;
  justify-content: center;
  align-items: center;
`;

const TopIconAnchor = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 10001;
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

const CloseButton = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  width: 24px;
  height: 24px;
`;

const CloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  font-size: 24px;
  display: block;

  &:hover {
    color: ${Colors.black};
  }
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

const ExpandedImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

export const StyledImage = styled('img')<ImageProps>`
  border-radius: ${(p) => (p.round ? '50%' : p.borderRadius || 0)};
  flex-shrink: ${(p) => (p.noShrink ? 0 : 'initial')};
  ${layout}
  ${space}
  display: block;
`;

export const Image: FC<ImageProps> = ({
  alt,
  onError,
  placeholder,
  sizes,
  src,
  srcset,
  lazy = 'eager',
  isExpandable,
  fullSizeSrc,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => isExpandable && setIsOpen((prev) => !prev);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (placeholder) setImageSrc(placeholder);
    onError?.();
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isExpandable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const filteredProps = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v != null),
  );

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLDivElement;

      const timeout = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 10);

      return () => clearTimeout(timeout);
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {isExpandable ? (
        <TriggerWrapper
          ref={triggerRef}
          isExpandable={isExpandable}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          tabIndex={isExpandable ? 0 : -1}
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
            {...filteredProps}
          />
          {!isOpen && (
            <BottomIconAnchor>
              <ExpandIcon />
            </BottomIconAnchor>
          )}
        </TriggerWrapper>
      ) : (
        <StyledImage
          alt={alt}
          src={imageSrc}
          srcSet={srcset}
          sizes={sizes}
          isExpandable={isExpandable}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          tabIndex={-1}
          {...filteredProps}
        />
      )}

      {isOpen && (
        <FullScreenOverlay
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <ContentWrapper onClick={(e) => e.stopPropagation()}>
            <TopIconAnchor>
              <CloseButton
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <CloseButtonIcon />
              </CloseButton>
            </TopIconAnchor>
            <ExpandedImage src={fullSizeSrc || src} alt={alt} />
          </ContentWrapper>
        </FullScreenOverlay>
      )}
    </>
  );
};
