import styled from 'styled-components';
import { FluidContainer, Typography } from 'components';
// import { HorizontalImageSlider } from 'partials';

const InsideContainer = styled.div`
  display: flex;
  z-index: 2;
`;
const OuterContainer = styled.div`
  position: relative;
  height: 800px;
  background: url(/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg) center
    bottom/cover no-repeat;
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
  width: 500px;
  height: 520px;
  background: center / contain no-repeat
    url('/departments/ccc/nuestra-teaser.jpeg');
  border-radius: 12px;
`;

export const CulturalGradsHeader = () => {
  return (
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
              Graduate
            </Typography>
            <Typography variant="title" size="3xl" color="white">
              Celebrations
            </Typography>
          </FluidContainer>
        </InsideContainer>
      </OuterContainer>
      {/* <HorizontalImageSlider /> */}
    </>
  );
};
