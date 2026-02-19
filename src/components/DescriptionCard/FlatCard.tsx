import { Image, Typography } from 'components';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';
import { useBreakpoint } from 'hooks';

interface FlatCardProps {
  children: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
}

const BorderedContainer = styled.div<{ $cardWidth: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid ${Colors.greyLighter};
  padding: ${Spaces.lg};
  margin-bottom: ${Spaces.lg};
  max-height: 275px;
  border-radius: ${Spaces.lg};
  gap: ${Spaces.xl};

  // Apply the width here
  width: ${(props) => props.$cardWidth};

  // Fix for Safari: Ensure the container doesn't collapse
  flex: 0 0 auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 45%;
  flex-shrink: 0; // Essential for Safari
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; // Keeps SVG looking crisp and centered
  }
`;

export const FlatCard = ({ children, imgSrc, imgAlt }: FlatCardProps) => {
  const { isTablet, returnByBreakpoint } = useBreakpoint();

  const descriptionCardWidth = returnByBreakpoint({
    tablet: '100%',
    desktop: 'calc(50% - 16px)',
    widescreen: 'calc(25% - 16px)',
  });

  return (
    <BorderedContainer
      $cardWidth={descriptionCardWidth}
      style={{ justifyContent: isTablet ? 'space-around' : 'flex-start' }}
    >
      <ImageWrapper>
        <Image alt={imgAlt} src={imgSrc} lazy />
      </ImageWrapper>
      <Typography as="p" variant="copy">
        {children}
      </Typography>
    </BorderedContainer>
  );
};
