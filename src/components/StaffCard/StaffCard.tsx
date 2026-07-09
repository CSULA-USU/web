import styled from 'styled-components';
import { Typography } from '../Typography';
import { Image, Panel } from 'components';
import { Colors, media } from 'theme';

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
}

// Every card is the same fixed size, so the roster grid stays even no matter
// how long or short a member's name or title is.
const HoverPanel = styled(Panel)`
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
  padding: 0;
  overflow: hidden;
  height: 184px;
  max-width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  ${media('mobile')(`
    height: 156px;
  `)}
`;

// Full-bleed photo on the left. object-fit: cover locks any source image into
// the frame, so photos never need to be pre-cropped to a fixed size.
const PhotoFrame = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 100%;
  background-color: ${Colors.greyLightest};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  ${media('mobile')(`
    width: 124px;
  `)}
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width = '380px',
  ...props
}: CardProps) => {
  return (
    <HoverPanel {...props} width={width}>
      <PhotoFrame>
        <Image src={src} alt={alt} />
      </PhotoFrame>
      <Info>
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
          {name}
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
