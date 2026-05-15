import { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';
import { Colors } from 'theme';
import { Typography } from '../Typography';
import { PortraitPlaceholder } from './PortraitPlaceholder';
import type { Awardee } from 'types';

interface AwardeeCardProps {
  awardee: Awardee;
  badge?: string;
  index?: number;
  isFirst?: boolean;
  hidePhoto?: boolean;
  layout?: 'card' | 'list';
}

const PREVIEW_QUOTE_LENGTH = 248;

const TriggerButton = styled.button<{ $layout: 'card' | 'list' }>`
  background: ${Colors.white};
  border-radius: ${(p) => (p.$layout === 'list' ? '10px' : '16px')};
  overflow: hidden;
  box-shadow: ${(p) =>
    p.$layout === 'list' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid ${Colors.greyLighter};
  width: 100%;
  text-align: left;
  padding: 0;
  font: inherit;

  &:hover {
    box-shadow: ${(p) =>
      p.$layout === 'list'
        ? '0 4px 12px rgba(0, 0, 0, 0.08)'
        : '0 12px 28px rgba(0, 0, 0, 0.14)'};
    transform: ${(p) => (p.$layout === 'list' ? 'none' : 'translateY(-2px)')};
    border-color: ${Colors.primary};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  border: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.52);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const ModalCard = styled.article<{ $hidePhoto: boolean }>`
  width: min(1040px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  background: ${Colors.white};
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
  display: grid;
  grid-template-columns: ${(p) => (p.$hidePhoto ? '1fr' : '5fr 7fr')};
  gap: 48px;
  align-items: center;
  padding: 36px;
  cursor: default;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  height: 24px;
  width: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ModalCloseButtonIcon = styled(AiFillCloseCircle)`
  color: red;
  font-size: 24px;

  &:hover,
  &:focus {
    color: ${Colors.black};
    transition: 0.2s ease-in-out;
  }
`;

const imageShimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const PhotoWrap = styled.div<{ $hasPhoto: boolean; $loaded: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: ${Colors.greyLighter};

  ${(p) =>
    p.$hasPhoto &&
    `
    &:hover img {
      transform: scale(1.04);
    }
  `}

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.55) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: ${(p) => (p.$hasPhoto && !p.$loaded ? 1 : 0)};
    pointer-events: none;
    ${(p) =>
      p.$hasPhoto &&
      !p.$loaded &&
      css`
        animation: ${imageShimmer} 1.2s ease-in-out infinite;
      `}
    transition: opacity 220ms ease-out;
  }
`;

const ModalPhotoWrap = styled.div<{ $hasPhoto: boolean; $loaded: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  background: ${Colors.greyLightest};

  ${(p) =>
    p.$hasPhoto &&
    `
    &:hover img {
      transform: scale(1.04);
    }
  `}

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: ${(p) => (p.$hasPhoto && !p.$loaded ? 1 : 0)};
    pointer-events: none;
    ${(p) =>
      p.$hasPhoto &&
      !p.$loaded &&
      css`
        animation: ${imageShimmer} 1.2s ease-in-out infinite;
      `}
    transition: opacity 220ms ease-out;
  }
`;

const PhotoImage = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center center;
  opacity: ${(p) => (p.$loaded ? 1 : 0)};
  filter: ${(p) => (p.$loaded ? 'blur(0)' : 'blur(10px)')};
  transform: ${(p) => (p.$loaded ? 'scale(1)' : 'scale(1.02)')};
  transition: opacity 300ms ease-out, filter 420ms ease-out,
    transform 420ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 180ms linear;
    filter: none;
    transform: scale(1);
  }
`;

const Badge = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: ${Colors.primary};
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.16);
`;

const BadgeText = styled(Typography).attrs({
  forwardedAs: 'span',
  size: '2xs',
})`
  font-family: var(--font-montserrat, sans-serif);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.black};
`;

const InlineBadge = styled(Badge)`
  position: static;
  display: inline-flex;
  width: fit-content;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
`;

const ListBody = styled(Body)`
  padding: 16px 18px;
  gap: 4px;
`;

const Cat = styled(Typography).attrs({
  forwardedAs: 'p',
  size: '2xs',
  weight: '700',
})`
  font-family: var(--font-montserrat, sans-serif);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin: 0;
`;

const Name = styled(Typography).attrs({
  forwardedAs: 'h3',
  variant: 'titleSmall',
  size: 'lg',
  weight: '700',
  color: 'black',
})`
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
`;

const Role = styled(Typography).attrs({
  forwardedAs: 'p',
  variant: 'span',
  size: 'xs',
  weight: '600',
  color: 'greyDark',
})`
  margin: 0;
`;

const ListTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ListName = styled(Name)`
  font-size: 18px;
`;

const Quote = styled(Typography).attrs({
  forwardedAs: 'p',
  variant: 'copy',
  size: 'xs',
  color: 'greyDarkest',
})`
  line-height: 1.6;
  margin: 0;
`;

const ModalCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalCat = styled(Typography).attrs({
  forwardedAs: 'p',
  size: '2xs',
  weight: '700',
})`
  font-family: var(--font-montserrat, sans-serif);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${Colors.gold};
  margin: 0;
`;

const ModalName = styled(Typography).attrs({
  forwardedAs: 'h4',
  variant: 'titleSmall',
  size: 'xl',
  weight: '700',
  color: 'black',
})`
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0;
`;

const ModalRoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const ModalQuote = styled(Typography).attrs({
  forwardedAs: 'p',
  variant: 'copy',
  size: 'md',
  color: 'greyDarkest',
})`
  line-height: 1.6;
  border-left: 3px solid ${Colors.primary};
  padding-left: 20px;
  margin: 4px 0 0;
`;

export const AwardeeCard = ({
  awardee,
  badge,
  hidePhoto = false,
  layout = 'card',
}: AwardeeCardProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cardImageRef = useRef<HTMLImageElement | null>(null);
  const modalImageRef = useRef<HTMLImageElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const catLabel = awardee.value ? `Values · ${awardee.value}` : awardee.dept;
  const hasPhoto = Boolean(awardee.photoUrl) && !showFallback;
  const roleLine = awardee.value
    ? [awardee.role, awardee.dept].filter(Boolean).join(' · ')
    : awardee.role;
  const showModalPhoto = hasPhoto || !hidePhoto;
  const previewQuote =
    awardee.quote.length > PREVIEW_QUOTE_LENGTH
      ? `${awardee.quote.slice(0, PREVIEW_QUOTE_LENGTH).trimEnd()}...`
      : awardee.quote;

  useEffect(() => {
    setShowFallback(false);
    setIsImageLoaded(false);
  }, [awardee.photoUrl]);

  useEffect(() => {
    if (!hasPhoto || isImageLoaded) {
      return;
    }

    const cardImage = cardImageRef.current;
    const modalImage = modalImageRef.current;
    const hasCompletedImage =
      (cardImage?.complete && (cardImage?.naturalWidth ?? 0) > 0) ||
      (modalImage?.complete && (modalImage?.naturalWidth ?? 0) > 0);

    if (hasCompletedImage) {
      setIsImageLoaded(true);
    }
  }, [hasPhoto, isImageLoaded, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableSelectors =
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [isOpen]);

  const modalContent = (
    <ModalBackdrop onClick={() => setIsOpen(false)} role="presentation">
      <ModalCard
        $hidePhoto={hidePhoto}
        role="dialog"
        aria-modal="true"
        aria-label={`Profile for ${awardee.name}`}
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
      >
        {showModalPhoto && (
          <ModalPhotoWrap $hasPhoto={hasPhoto} $loaded={isImageLoaded}>
            {hasPhoto ? (
              <PhotoImage
                src={awardee.photoUrl}
                alt=""
                decoding="async"
                ref={modalImageRef}
                $loaded={isImageLoaded}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => {
                  setShowFallback(true);
                  setIsImageLoaded(false);
                }}
              />
            ) : (
              <PortraitPlaceholder name={awardee.name} />
            )}
            {badge && (
              <Badge>
                <BadgeText>{badge}</BadgeText>
              </Badge>
            )}
          </ModalPhotoWrap>
        )}

        <ModalCopy>
          {hidePhoto && badge && (
            <InlineBadge>
              <BadgeText>{badge}</BadgeText>
            </InlineBadge>
          )}
          <ModalCat>{awardee.dept}</ModalCat>
          <ModalName>{awardee.name}</ModalName>
          <ModalRoleRow>
            <Typography as="span" size="xs" weight="600" color="greyDark">
              {awardee.role}
            </Typography>
          </ModalRoleRow>
          <ModalQuote>{awardee.quote}</ModalQuote>
        </ModalCopy>

        <ModalCloseButton
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close profile modal"
          ref={closeButtonRef}
        >
          <ModalCloseButtonIcon />
        </ModalCloseButton>
      </ModalCard>
    </ModalBackdrop>
  );

  return (
    <>
      <TriggerButton
        type="button"
        ref={triggerRef}
        $layout={layout}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Open full profile for ${awardee.name}`}
      >
        {!hidePhoto && (
          <PhotoWrap $hasPhoto={hasPhoto} $loaded={isImageLoaded}>
            {hasPhoto ? (
              <PhotoImage
                src={awardee.photoUrl}
                alt=""
                loading="lazy"
                decoding="async"
                ref={cardImageRef}
                $loaded={isImageLoaded}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => {
                  setShowFallback(true);
                  setIsImageLoaded(false);
                }}
              />
            ) : (
              <PortraitPlaceholder name={awardee.name} />
            )}
            {badge && (
              <Badge>
                <BadgeText>{badge}</BadgeText>
              </Badge>
            )}
          </PhotoWrap>
        )}
        {layout === 'list' ? (
          <ListBody>
            <ListTopRow>
              <ListName>{awardee.name}</ListName>
              {badge && (
                <InlineBadge>
                  <BadgeText>{badge}</BadgeText>
                </InlineBadge>
              )}
            </ListTopRow>
            <Cat>{catLabel}</Cat>
            <Role>{roleLine}</Role>
          </ListBody>
        ) : (
          <Body>
            {hidePhoto && badge && (
              <InlineBadge>
                <BadgeText>{badge}</BadgeText>
              </InlineBadge>
            )}
            <Cat>{catLabel}</Cat>
            <Name>{awardee.name}</Name>
            <Role>{roleLine}</Role>
            <Quote>{previewQuote}</Quote>
          </Body>
        )}
      </TriggerButton>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
};
