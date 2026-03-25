import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Colors } from 'theme';
import { useImageLoading } from 'hooks';
import { Skeleton } from 'components/Skeleton';

interface ImageModalProps {
  alt: string;
  src: string;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onRestoreFocus?: () => void;
}

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

const ExpandedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalMediaFrame = styled.div`
  width: min(95vw, calc(90vh * 2.5603));
  height: calc(137vw / 2.5603);
`;

function ExpandedImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const loading = useImageLoading(src);

  return (
    <>
      {loading ? (
        <ModalMediaFrame>
          <Skeleton width="100%" height="100%" />
        </ModalMediaFrame>
      ) : (
        <ExpandedImage src={src} alt={alt} />
      )}
    </>
  );
}

export const ImageModal: FC<ImageModalProps> = ({
  alt,
  src,
  closeButtonRef,
  onClose,
  onRestoreFocus,
}) => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 10);

    return () => {
      window.clearTimeout(timeout);
      onRestoreFocus?.();
    };
  }, [closeButtonRef, onRestoreFocus]);

  return (
    <FullScreenOverlay onClick={onClose} role="dialog" aria-modal="true">
      <ContentWrapper onClick={(e) => e.stopPropagation()}>
        <TopIconAnchor>
          <CloseButton onClick={onClose} aria-label="Close">
            <CloseButtonIcon />
          </CloseButton>
        </TopIconAnchor>
        <ExpandedImageWithSkeleton src={src} alt={alt} />
      </ContentWrapper>
    </FullScreenOverlay>
  );
};
