import React, { FC, useEffect, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { ReactNode } from 'react';
import { Colors } from 'theme';
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
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
`;

const ExpandIcon = styled(GrExpand)`
  color: ${Colors.white || '#fff'};
  font-size: 18px;
  path {
    stroke: ${Colors.white || '#fff'};
  }
`;

const CloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  font-size: 24px;
  &:hover {
    color: ${Colors.black};
    transition: 0.2s ease-in-out;
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
  width: 100%;
  height: 100%;
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

  const toggleOpen = () => isExpandable && setIsOpen(!isOpen);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (placeholder) setImageSrc(placeholder);
    onError?.();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
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

  return (
    <>
      <TriggerWrapper
        {...filteredProps}
        isExpandable={isExpandable}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={isExpandable ? 0 : -1}
        role={isExpandable ? 'button' : undefined}
        aria-expanded={isOpen}
        aria-label={isExpandable ? `View ${alt} in full screen` : alt}
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
        {isExpandable && !isOpen && (
          <BottomIconAnchor>
            <ExpandIcon />
          </BottomIconAnchor>
        )}
      </TriggerWrapper>

      {isOpen && (
        <FullScreenOverlay
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <ContentWrapper onClick={(e) => e.stopPropagation()}>
            <TopIconAnchor>
              <CloseButton onClick={() => setIsOpen(false)} aria-label="Close">
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
