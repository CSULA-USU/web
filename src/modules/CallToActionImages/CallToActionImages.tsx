import { Button, FluidContainer, Typography, Image } from 'components';
import { useBreakpoint } from 'hooks';
import styled from 'styled-components';
import { media } from 'theme';
const CenterText = styled.div`
  text-align: center;
`;

interface CallToActionImagesProps {
  title: React.ReactNode;
  children: React.ReactNode;
  buttonHref: string;
  buttonText: string;
}

const CTAImagesContainer = styled.div`
  ${media('desktop')('margin-bottom: 0px;')}
`;

export const CallToActionImages = ({
  title,
  children,
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
            padding="0 4px"
          >
            <Image
              className="square-image"
              src="https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/about/u-krew/U-Krew-Grid.webp"
              alt="Operations collage showing maintenance, clerical support, building services, and media services"
              width="480"
              lazy
            />
          </FluidContainer>
        )}
      </FluidContainer>
    </CTAImagesContainer>
  );
};
