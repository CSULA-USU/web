import styled, { keyframes } from 'styled-components';

const moveAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const SlideshowContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 4px;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #fff 20%,
    #fff 80%,
    transparent
  );
`;

const SlideshowContent = styled.div`
  display: flex;
  animation: ${moveAnimation} 40s linear infinite alternate;
  animation-delay: 2s;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  flex-shrink: 0;
  margin-right: 4px;
`;

export const HorizontalImageSlider = () => {
  return (
    <SlideshowContainer>
      <SlideshowContent>
        {/* Repeat this block for each image */}
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 1"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 1"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 1"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 2"
        />
        <Image
          src="/departments/ccc/pasrc/black-grad/2022/grad-chorus.jpg"
          alt="Image 1"
        />
        {/* Add more images as needed */}
      </SlideshowContent>
    </SlideshowContainer>
  );
};
