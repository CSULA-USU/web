import styled from 'styled-components';
import { Typography } from '../Typography';
import { Image, Panel, RainbowText } from 'components';
import { Colors, media, Shadows } from 'theme';

interface CardStyles {
  margin?: string;
  width?: string;
  hoverable?: boolean;
  rounded?: boolean;
}

interface CardProps extends CardStyles {
  name: string;
  head?: string;
  title: string;
  children?: React.ReactNode;
  src: string;
  alt: string;
  tags?: string[];
  // Gives this member's name the rainbow treatment. Driven by "special" in
  // staff.json.
  special?: boolean;
  // 'horizontal' is a fixed-height row (photo beside the text) that keeps a
  // roster even. 'vertical' stacks the photo above the text and grows with its
  // content, so long titles stay readable in a multi-column directory grid.
  orientation?: 'horizontal' | 'vertical';
}

// Horizontal cards are all the same fixed size, so the roster grid stays even
// no matter how long or short a member's name or title is.
const HoverPanel = styled(Panel)<{ $vertical?: boolean }>`
  flex-direction: ${(p) => (p.$vertical ? 'column' : 'row')};
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
  padding: 0;
  overflow: hidden;
  height: ${(p) => (p.$vertical ? '100%' : '184px')};
  max-width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${Shadows.lifted};
  }

  ${(p) =>
    !p.$vertical &&
    media('mobile')(`
    height: 156px;
  `)}
`;

// Full-bleed photo. object-fit: cover locks any source image into the frame, so
// photos never need to be pre-cropped to a fixed size. The fill matches the
// panel behind it: several headshots have transparent backgrounds, and anything
// other than white reads as a discoloured patch on those cards.
const PhotoFrame = styled.div<{ $vertical?: boolean }>`
  flex-shrink: 0;
  width: ${(p) => (p.$vertical ? '100%' : '150px')};
  height: ${(p) => (p.$vertical ? 'auto' : '100%')};
  ${(p) => p.$vertical && 'aspect-ratio: 1 / 1;'}
  background-color: ${Colors.white};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  ${(p) =>
    !p.$vertical &&
    media('mobile')(`
    width: 124px;
  `)}
`;

const Info = styled.div<{ $vertical?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${(p) => (p.$vertical ? 'flex-start' : 'center')};
  ${(p) => p.$vertical && 'flex: 1;'}
  gap: 4px;
  min-width: 0;
  padding: 16px 20px;
  text-align: left;
`;

export const StaffCard = ({
  name,
  head,
  title,
  children,
  src,
  alt,
  special,
  width = '380px',
  orientation = 'horizontal',
  ...props
}: CardProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <HoverPanel {...props} width={width} $vertical={isVertical}>
      <PhotoFrame $vertical={isVertical}>
        <Image src={src} alt={alt} />
      </PhotoFrame>
      <Info $vertical={isVertical}>
        {head && (
          <Typography
            as="h4"
            color="gold"
            variant="copy"
            weight="700"
            size="sm"
            margin="0"
          >
            {head}
          </Typography>
        )}
        <Typography
          as="h3"
          variant="labelTitle"
          weight="700"
          size="md"
          color="greyDarkest"
          margin="0"
        >
          <RainbowText active={special}>{name}</RainbowText>
        </Typography>
        <Typography
          as="p"
          variant="copy"
          weight="700"
          size="sm"
          color="gold"
          margin="0"
        >
          {title}
        </Typography>
        {children}
      </Info>
    </HoverPanel>
  );
};
