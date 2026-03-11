/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import styled, { CSSObject } from 'styled-components';
import { layout, space, LayoutProps, SpaceProps } from 'styled-system';
import { ReactNode } from 'react';
import { Colors } from 'theme';
import { AiFillCloseCircle } from 'react-icons/ai';

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
}

/**
 * Styled Components for the Fullscreen Logic
 */
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

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10001;

  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

const CloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  font-size: 24px;
  &:hover,
  &:focus {
    color: ${Colors.black};
    transition: 0.2s ease-in-out;
  }
`;

const ExpandedImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

export const StyledImage = styled('img')<ImageProps>`
  border-radius: ${(p) => (p.round ? '50%' : p.borderRadius || 0)};
  flex-shrink: ${(p) => (p.noShrink ? 0 : 'initial')};

  ${layout}
  ${space}
  
  cursor: ${(p) => (p.isExpandable ? 'zoom-in' : 'default')};

  &:hover {
    transition: opacity 0.2s ease-in-out;
  }
`;

/**
 * Main Image Component
 */
export const Image: FC<ImageProps> = ({
  alt,
  onError,
  placeholder,
  sizes,
  src,
  srcset,
  lazy = 'eager',
  isExpandable,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => isExpandable && setIsOpen(!isOpen);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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

  const handleError = () => {
    if (placeholder) setImageSrc(placeholder);
    onError?.();
  };

  const filteredProps = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v != null),
  );

  return (
    <>
      <StyledImage
        {...filteredProps}
        alt={alt}
        src={imageSrc}
        srcSet={srcset}
        sizes={sizes}
        isExpandable={isExpandable}
        onClick={toggleOpen}
        onError={handleError}
        loading={lazy ? 'lazy' : 'eager'}
        tabIndex={isExpandable ? 0 : -1}
        role={isExpandable ? 'button' : undefined}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label={isExpandable ? `View ${alt} in full screen` : alt}
      />

      {isOpen && (
        <FullScreenOverlay
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <ContentWrapper onClick={(e) => e.stopPropagation()}>
            <CloseButtonContainer>
              <CloseButton
                onClick={() => setIsOpen(false)}
                aria-label="Close fullscreen image"
              >
                <CloseButtonIcon />
              </CloseButton>
            </CloseButtonContainer>

            <ExpandedImage src={src} alt={alt} />
          </ContentWrapper>
        </FullScreenOverlay>
      )}
    </>
  );
};
