import { Button, FluidContainer, Typography, Image } from 'components';
import { useBreakpoint } from 'hooks';
import styled from 'styled-components';
import { media } from 'theme';
const CenterText = styled.div`
  text-align: center;
`;
interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  margin?: string;
}

interface CallToActionImagesProps {
  title: React.ReactNode;
  children: React.ReactNode;
  images: ImageProps[];
  buttonHref: string;
  buttonText: string;
}

const CTAImagesContainer = styled.div`
  ${media('desktop')('margin-bottom: 0px;')}
`;

export const CallToActionImages = ({
  title,
  children,
  images,
  buttonHref,
  buttonText,
}: CallToActionImagesProps) => {
  const { isDesktop, isMobile } = useBreakpoint();
  return (
    <CTAImagesContainer>
      <FluidContainer
        flex
        backgroundColor="primary"
        padding={isMobile ? '48px 0' : '0'}
      >
        <FluidContainer>
          <CenterText>
            <Typography
              as="h2"
              variant="titleLarge"
              lineHeight="1"
              size={isMobile ? 'xl' : '3xl'}
            >
              {title}
            </Typography>
            <FluidContainer>
              <Typography as="p">{children}</Typography>
            </FluidContainer>
            <Button href={buttonHref} variant="black">
              {buttonText}
            </Button>
          </CenterText>
        </FluidContainer>
        {!isDesktop && (
          <FluidContainer
            flex
            flexWrap="wrap"
            justifyContent="space-evenly"
            backgroundColor="white"
            padding="0"
          >
            {images.map((i) => (
              <Image
                key={i.alt}
                src={i.src}
                alt={i.alt}
                width={i.width && i.width}
                margin={i.margin && i.margin}
              />
            ))}
          </FluidContainer>
        )}
      </FluidContainer>
    </CTAImagesContainer>
  );
};
