import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'theme';
import { Typography } from '../Typography';
import { PortraitPlaceholder } from './PortraitPlaceholder';
import type { Awardee } from 'types';

interface AwardeeCardProps {
  awardee: Awardee;
  badge?: string;
  index?: number;
  isFirst?: boolean;
}

const PREVIEW_QUOTE_LENGTH = 248;

const Article = styled.article`
  background: ${Colors.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
    transform: translateY(-2px);
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

const ModalCard = styled.article`
  width: min(1040px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  background: ${Colors.white};
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
  display: grid;
  grid-template-columns: 5fr 7fr;
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
  top: 10px;
  right: 10px;
  border: 0;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  background: ${Colors.white};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
  color: ${Colors.black};
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
`;

const PhotoWrap = styled.div<{ $hasPhoto: boolean }>`
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
`;

const ModalPhotoWrap = styled.div<{ $hasPhoto: boolean }>`
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
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center center;
  transform: scale(1);
  transition: transform 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
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

export const AwardeeCard = ({ awardee, badge }: AwardeeCardProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const catLabel = awardee.value ? `Values · ${awardee.value}` : awardee.dept;
  const hasPhoto = Boolean(awardee.photoUrl) && !showFallback;
  const roleLine = awardee.value
    ? [awardee.role, awardee.dept].filter(Boolean).join(' · ')
    : awardee.role;
  const previewQuote =
    awardee.quote.length > PREVIEW_QUOTE_LENGTH
      ? `${awardee.quote.slice(0, PREVIEW_QUOTE_LENGTH).trimEnd()}...`
      : awardee.quote;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <Article
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={`Open full profile for ${awardee.name}`}
      >
        <PhotoWrap $hasPhoto={hasPhoto}>
          {hasPhoto ? (
            <PhotoImage
              src={awardee.photoUrl}
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setShowFallback(true)}
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
        <Body>
          <Cat>{catLabel}</Cat>
          <Name>{awardee.name}</Name>
          <Role>{roleLine}</Role>
          <Quote>{previewQuote}</Quote>
        </Body>
      </Article>

      {isOpen && (
        <ModalBackdrop onClick={() => setIsOpen(false)} role="presentation">
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalPhotoWrap $hasPhoto={hasPhoto}>
              {hasPhoto ? (
                <PhotoImage
                  src={awardee.photoUrl}
                  alt=""
                  decoding="async"
                  onError={() => setShowFallback(true)}
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

            <ModalCopy>
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
            >
              x
            </ModalCloseButton>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
};
