import { useState } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { Colors } from 'theme';
import { FluidContainer, Typography } from 'components';
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';
import { useBreakpoint } from 'hooks';
interface SlideshowData {
  src: string;
  alt: string;
}
interface CulturalGradsHeaderProps {
  images: SlideshowData[];
  isPaused: boolean;
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

const SlideshowContent = styled.div<{ isPaused?: boolean }>`
  display: flex;
  animation: ${moveAnimation} 120s linear infinite alternate;
  animation-delay: 2s;
  animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
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
  background-color: ${Colors.black};
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

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%; // positions left edge of button at 50% of parent container
  transform: translateX(
    -50%
  ); // shifts button left by 50% of its own width, centering it
  z-index: 1;
  border-radius: 50%;
  padding: 2px;
`;
const StyledPauseButton = styled(FaRegPauseCircle)`
  background-color: ${Colors.black};
  color: ${Colors.white};
  opacity: 0.65;
  border-radius: 50%;
  padding: 2px;
  border: none;
  cursor: pointer;
  height: 36px;
  width: 36px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;
const StyledPlayButton = styled(FaRegPlayCircle)`
  background-color: ${Colors.black};
  color: ${Colors.white};
  opacity: 0.65;
  border-radius: 50%;
  padding: 2px;
  border: none;
  cursor: pointer;
  height: 36px;
  width: 36px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

export const CulturalGradsHeader = ({ images }: CulturalGradsHeaderProps) => {
  const imageList = images;
  const { isDesktop } = useBreakpoint();
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

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
            <ButtonContainer>
              {isPaused ? (
                <StyledPlayButton
                  onClick={() => handlePause()}
                  tabIndex={0}
                  aria-label="Play carousel"
                />
              ) : (
                <StyledPauseButton
                  onClick={() => handlePause()}
                  tabIndex={0}
                  aria-label="Pause carousel"
                />
              )}
            </ButtonContainer>
            <SlideshowContent isPaused={isPaused}>
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
            <ButtonContainer>
              {isPaused ? (
                <StyledPlayButton
                  onClick={() => handlePause()}
                  tabIndex={0}
                  aria-label="Play carousel"
                />
              ) : (
                <StyledPauseButton
                  onClick={() => handlePause()}
                  tabIndex={0}
                  aria-label="Pause carousel"
                />
              )}
            </ButtonContainer>
            <SlideshowContent isPaused={isPaused}>
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
