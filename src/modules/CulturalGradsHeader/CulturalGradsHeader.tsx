import styled, { keyframes } from 'styled-components';
import { FluidContainer, Typography } from 'components';
import { useBreakpoint } from 'hooks';

interface SlideshowData {
  src: string;
  alt: string;
}
interface CulturalGradsHeaderProps {
  images: SlideshowData[];
}

const moveAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-250%);
  }
`;

const SlideshowContainer = styled.div`
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
`;

const HorizontalSlideshowImage = styled.img`
  width: 400px;
  height: auto;
  flex-shrink: 0;
  margin-right: 4px;
`;

const InsideContainer = styled.div`
  display: flex;
  z-index: 2;
`;

const MobileHorizontalSlideshowImage = styled.img`
  width: 200px;
  height: auto;
  flex-shrink: 0;
  margin-right: 4px;
`;

const MobileOuterContainer = styled.div`
  position: relative;
  height: 240px;
  background: url(/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg) center
    bottom/cover no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterContainer = styled.div`
  position: relative;
  height: 670px;
  background: url(https://www.dropbox.com/scl/fi/rqq1vcllbcojj9o3venab/header-background.png?rlkey=b1lpen7p61hizqrtkmq03ude9&raw=1)
    center bottom/cover no-repeat;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const TeaserContainer = styled.div`
  width: 400px;
  height: 470px;
  background: center / contain no-repeat
    url('/departments/ccc/clsrc/nuestra-grad/nuestra-grads-celebrating-onstage.jpg');
  border-radius: 12px;
`;

export const CulturalGradsHeader = ({ images }: CulturalGradsHeaderProps) => {
  const imageList = images.concat(images);
  const { isDesktop } = useBreakpoint();
  return (
    <>
      {isDesktop ? (
        <>
          <MobileOuterContainer>
            <Overlay />
            <InsideContainer>
              <FluidContainer
                padding="16px"
                flex
                flexDirection="column"
                innerMaxWidth="500px"
              >
                <Typography variant="title" size="xl" color="white">
                  Cultural
                </Typography>
                <Typography variant="title" size="xl" color="white">
                  Graduation
                </Typography>
                <Typography variant="title" size="xl" color="white">
                  Celebrations
                </Typography>
              </FluidContainer>
            </InsideContainer>
          </MobileOuterContainer>
          <SlideshowContainer>
            <SlideshowContent>
              {imageList &&
                imageList.map((img, i: number) => {
                  return (
                    <MobileHorizontalSlideshowImage
                      src={img.src}
                      alt={img.alt}
                      key={i}
                    />
                  );
                })}
            </SlideshowContent>
          </SlideshowContainer>
        </>
      ) : (
        <>
          <OuterContainer>
            <Overlay />
            <InsideContainer>
              <FluidContainer
                flex
                flexDirection="column"
                padding="16px"
                innerMaxWidth="500px"
                alignItems="flex-end"
              >
                <TeaserContainer />
                <br />
                <Typography variant="cta" color="white">
                  Nuestra Grad &apos;22
                </Typography>
              </FluidContainer>
              <FluidContainer
                padding="16px"
                flex
                flexDirection="column"
                innerMaxWidth="500px"
              >
                <Typography variant="title" size="3xl" color="white">
                  Cultural
                </Typography>
                <Typography variant="title" size="3xl" color="white">
                  Graduation
                </Typography>
                <Typography variant="title" size="3xl" color="white">
                  Celebrations
                </Typography>
              </FluidContainer>
            </InsideContainer>
          </OuterContainer>
          <SlideshowContainer>
            <SlideshowContent>
              {imageList &&
                imageList.map((img, i: number) => {
                  return (
                    <HorizontalSlideshowImage
                      src={img.src}
                      alt={img.alt}
                      key={i}
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
