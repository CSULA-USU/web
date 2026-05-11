import styled, { css } from 'styled-components';
import { Typography } from '../Typography';
import { FluidContainer } from '../FluidContainer';
import { Colors } from 'theme';

type QuoteVariant = 'default' | 'yellow';

interface QuoteBannerProps {
  quote: string;
  attribution?: string;
  name?: string;
  title?: string;
  variant?: QuoteVariant;
}

const BannerWrapper = styled(FluidContainer)<{ $variant: QuoteVariant }>`
  width: 100%;
  text-align: center;
  ${(p) =>
    p.$variant === 'yellow'
      ? css`
          background-color: ${Colors.primary};
        `
      : css`
          background-color: ${Colors.greyLightest};
        `}
`;

const QuoteContent = styled.div<{ $variant: QuoteVariant }>`
  max-width: ${(p) => (p.$variant === 'yellow' ? '980px' : '960px')};
  margin: 0 auto;
  position: relative;
  ${(p) =>
    p.$variant === 'yellow' &&
    css`
      padding: 60px 0 8px;
    `}
`;

const Mark = styled.span`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-bitter), serif;
  font-style: italic;
  font-size: 96px;
  line-height: 1;
  opacity: 0.5;
  color: ${Colors.black};
  pointer-events: none;
`;

const AttrStack = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const QuoteBanner = ({
  quote,
  attribution,
  name,
  title,
  variant = 'default',
}: QuoteBannerProps) => {
  const isYellow = variant === 'yellow';
  const hasSplitAttr = !!(name || title);

  return (
    <BannerWrapper $variant={variant}>
      <QuoteContent $variant={variant}>
        {isYellow && <Mark aria-hidden="true">&ldquo;</Mark>}

        <Typography
          as="p"
          variant="quote"
          size={isYellow ? 'xl' : 'xl'}
          color="black"
          lineHeight={isYellow ? '1.4' : '1.5'}
        >
          {isYellow ? quote : `“${quote}”`}
        </Typography>

        {hasSplitAttr ? (
          <AttrStack>
            {name && (
              <Typography
                as="p"
                variant="labelTitle"
                size="sm"
                weight="700"
                color="black"
              >
                {name}
              </Typography>
            )}
            {title && (
              <Typography
                as="p"
                variant="labelTitleSmall"
                size="2xs"
                weight="600"
                color="greyDarker"
              >
                {title}
              </Typography>
            )}
          </AttrStack>
        ) : (
          attribution && (
            <Typography
              as="p"
              variant="subheader"
              margin="24px 0 0 0"
              color="greyDarker"
              size="md"
              weight="400"
            >
              — {attribution}
            </Typography>
          )
        )}
      </QuoteContent>
    </BannerWrapper>
  );
};
