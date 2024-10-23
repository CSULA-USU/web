import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';
import { FluidContainer, Typography } from 'components';
import { FaRegPauseCircle } from 'react-icons/fa';
import { useBreakpoint } from 'hooks';
// FaRegPlayCircle for play button
interface SlideshowData {
  src: string;
  alt: string;
}
interface CulturalGradsHeaderProps {
  images: SlideshowData[];
}

const moveAnimation = keyframes`
  0% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(-90%);
  }
`;

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #fff 5%,
    #fff 95%,
    transparent
  );
`;

const SlideshowContent = styled.div`
  display: flex;
  animation: ${moveAnimation} 120s linear infinite alternate;
  animation-delay: 2s;
  animation-play-state: running;
  width: 100%;
`;

const InsideContainer = styled.div`
  display: flex;
  z-index: 0;
`;

const MobileOuterContainer = styled.div`
  position: relative;
  height: 240px;
  background: url('/departments/ccc/clsrc/nuestra-grad/header-background.png')
    center bottom/cover no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const OuterContainer = styled.div`
  position: relative;
  height: 670px;
  background: url('/departments/ccc/clsrc/nuestra-grad/header-background.png')
    bottom/cover no-repeat;
  background-color: ${Colors.grey};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StyledPauseButton = styled(FaRegPauseCircle)`
  position: absolute;
  bottom: 12px;
  left: 50%; // positions left edge of button at 50% of parent container
  transform: translateX(
    -50%
  ); // shifts button left by 50% of its own width, centering it
  z-index: 1;
  background-color: ${Colors.greyDarker};
  color: ${Colors.white};
  opacity: 0.7;
  border-radius: 50%;
  padding: 2px;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 48px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const CulturalGradsHeader = ({ images }: CulturalGradsHeaderProps) => {
  const imageList = images;
  const { isDesktop } = useBreakpoint();
  return (
    <>
      {isDesktop ? (
        <>
          <MobileOuterContainer>
            <InsideContainer>
              <FluidContainer
                padding="16px"
                flex
                flexDirection="column"
                innerMaxWidth="198px"
              >
                <Typography variant="title" size="xl" color="white" as="h1">
                  Cultural Graduation Celebrations
                </Typography>
              </FluidContainer>
            </InsideContainer>
          </MobileOuterContainer>
          <SlideshowContainer>
            <SlideshowContent>
              {imageList &&
                imageList.map((img, i: number) => {
                  return (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      key={i}
                      height={200}
                      width={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        marginRight: '4px',
                      }}
                      loading={i < 5 ? 'eager' : 'lazy'}
                    />
                  );
                })}
            </SlideshowContent>
          </SlideshowContainer>
        </>
      ) : (
        <>
          <OuterContainer>
            <InsideContainer>
              <FluidContainer
                flex
                flexDirection="column"
                padding="16px"
                innerMaxWidth="500px"
                alignItems="flex-end"
              >
                {/* <TeaserContainer /> */}
                <Image
                  src="/departments/ccc/cultural-grads/nuestra-grads-celebrating-onstage.png"
                  alt="2022 nuestra graduate participants on stage"
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{
                    width: '400px',
                    height: '470px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                  }}
                />
                <Typography variant="cta" color="white" as="p">
                  Nuestra Grad &apos;22
                </Typography>
              </FluidContainer>
              <FluidContainer
                padding="16px"
                flex
                flexDirection="column"
                innerMaxWidth="316px"
              >
                <Typography variant="title" size="3xl" color="white" as="h1">
                  Cultural Graduation Celebrations
                </Typography>
              </FluidContainer>
            </InsideContainer>
          </OuterContainer>
          <SlideshowContainer>
            <StyledPauseButton />
            <SlideshowContent>
              {imageList &&
                imageList.map((img, i: number) => {
                  return (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      key={i}
                      height={276}
                      width={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        marginRight: '4px',
                      }}
                      loading={i < 5 ? 'eager' : 'lazy'}
                    />
                  );
                })}
            </SlideshowContent>
          </SlideshowContainer>
        </>
      )}
    </>
  );
};
