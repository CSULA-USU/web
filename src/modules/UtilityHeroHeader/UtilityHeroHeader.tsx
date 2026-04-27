import styled from 'styled-components';
import { Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';

interface UtilityHeroHeaderProps {
  src: string;
  mobileSrc?: string;
  alt: string;
  title: string;
  description?: string;
  height?: string;
  minHeight?: string;
  maxDescriptionWidth?: string;
  children?: React.ReactNode;
}

const HeroContainer = styled.section<{ height: string; minHeight: string }>`
  position: relative;
  width: 100%;
  height: ${(p) => p.height};
  min-height: ${(p) => p.minHeight};
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background-color: black;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Adjust these % values to keep people in frame (X% Y%) */
  object-position: 20% center;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.25) 55%,
    transparent 100%
  );
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  gap: ${Spaces.md};
  margin: ${Spaces.md} 0 0 0;
  width: 100%;

  /* Mobile: 1 column */
  grid-template-columns: repeat(1, 1fr);

  /* iPad/Tablet (e.g., 768px): 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width: max-content; /* Keeps buttons from stretching too wide on larger screens */
  }

  /* Desktop (e.g., 1024px): 3 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  padding: ${Spaces['2xl']};
  width: 100%;
  max-width: 1440px;

  @media (max-width: 580px) {
    padding: ${Spaces.xl} ${Spaces.md};
  }
`;

const GoldAccent = styled.div`
  width: 48px;
  height: 3px;
  background-color: ${Colors.primary};
  margin-bottom: ${Spaces.md};
`;

export const UtilityHeroHeader = ({
  src,
  mobileSrc,
  alt,
  title,
  description,
  height = '91vh',
  minHeight = '380px',
  maxDescriptionWidth = '1000px',
  children,
}: UtilityHeroHeaderProps) => {
  const { isMobile, isWidescreen } = useBreakpoint();
  const activeSrc = isWidescreen && mobileSrc ? mobileSrc : src;
  return (
    <HeroContainer height={height} minHeight={minHeight}>
      <BackgroundImage src={activeSrc} alt={alt} />
      <Overlay />
      <ContentContainer>
        <Content>
          <GoldAccent />
          <Typography
            as="h1"
            variant="pageHeader"
            size={isMobile ? '2xl' : '4xl'}
            color="white"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              as="p"
              size={isMobile ? 'xs' : 'sm'}
              color="white"
              margin={`${Spaces.md} 0 0 0`}
              style={{ maxWidth: maxDescriptionWidth }}
            >
              {description}
            </Typography>
          )}
          {children && <ButtonContainer>{children}</ButtonContainer>}
        </Content>
      </ContentContainer>
    </HeroContainer>
  );
};
