import styled from 'styled-components';
import { Image, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { Colors, Spaces } from 'theme';

interface UtilityHeroHeaderProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  height?: string;
  minHeight?: string;
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
  top: -15px;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
  transform: scale(1.05);
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

const Content = styled.div`
  position: relative;
  z-index: 3;
  padding: ${Spaces['2xl']};
  width: 1440px;

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
  alt,
  title,
  description,
  height = '50vh',
  minHeight = '380px',
}: UtilityHeroHeaderProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <HeroContainer height={height} minHeight={minHeight}>
      <BackgroundImage src={src} alt={alt} />
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
          <Typography
            as="p"
            size={isMobile ? 'xs' : 'sm'}
            color="white"
            style={{ marginTop: Spaces.sm, maxWidth: '480px' }}
          >
            {description}
          </Typography>
        </Content>
      </ContentContainer>
    </HeroContainer>
  );
};
