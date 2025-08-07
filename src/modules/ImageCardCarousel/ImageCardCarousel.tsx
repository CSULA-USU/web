import { FluidContainer, Typography } from 'components';
import { useBreakpoint } from 'hooks';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors, Spaces, media } from 'theme';

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media('tablet')`
    flex-direction: column;
  `}
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 2000px;
  max-height: 2000px;
  min-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${Colors.pastelYellow};
  transition: width 0.3s ease;
  border: 1px solid ${Colors.greyLighter};

  ${media('tablet')`
    flex-direction: column;
  `}
`;

const LeftColumn = styled.div`
  width: 25%;
  background-color: ${Colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${Spaces.lg};
  padding: ${Spaces['3xl']} 0;

  ${media('tablet')`
    width: 100%;
    flex-direction: row;
    gap: 16px;
  `}
  ${media('mobile')`
    width: 100%;
    flex-direction: row;
    gap: 16px;
    padding: 0;
  `}
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: ${Spaces.lg};
  justify-content: center;

  ${media('tablet')`
    width: 50%;
  `}
`;

const TextWrapper = styled(FluidContainer)`
  flex: 1;
  text-align: center;
  padding: ${Spaces.sm};
  ${media('tablet')`
    text-align: left;
  `};
`;

const RightColumn = styled.div`
  width: 75%;
  background-color: ${Colors.pastelYellow};
  padding: ${Spaces['3xl']};
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media('tablet')`
    width: 100%;
    padding: 24px;
  `}
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  min-width: 150px;
  max-height: 300px;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  background-color: ${Colors.black};
  color: ${Colors.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.greyDarkest};
  }

  ${media('tablet')`
    align-self: center;
  `}
`;

const DotsContainer = styled.div`
  margin-top: ${Spaces.md};
  display: flex;
  justify-content: center;
  gap: ${Spaces.sm};
`;

const Dot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) =>
    active ? Colors.black : Colors.greyLightest};
  cursor: pointer;
  transition: background 0.3s ease;
`;

interface ManualStory {
  department: string;
  major: string;
  quote: string;
  name: string;
  position: string;
  image?: string;
}

interface ImageCardCarouselProps {
  stories: ManualStory[];
}

export const ImageCardCarousel = ({ stories }: ImageCardCarouselProps) => {
  const { isMobile } = useBreakpoint();
  const [index, setIndex] = useState(0);
  if (stories.length === 0) return null;

  const prevSlide = () =>
    setIndex(index === 0 ? stories.length - 1 : index - 1);
  const nextSlide = () => setIndex((index + 1) % stories.length);

  return (
    <FluidContainer padding="0">
      <CarouselWrapper>
        <ArrowButton onClick={prevSlide} aria-label="Previous slide">
          ←
        </ArrowButton>

        <Card>
          <LeftColumn>
            <ImageWrapper>
              <ProfileImage
                src={stories[index].image}
                alt={stories[index].name}
              />
            </ImageWrapper>
            <TextWrapper>
              <Typography variant="labelTitleSmall" weight="400" as="p">
                DEPARTMENT
              </Typography>
              <Typography
                variant="label"
                weight="400"
                size={isMobile ? 'md' : 'lg'}
                as="h3"
              >
                {stories[index].department}
              </Typography>
              <Typography
                variant="labelTitleSmall"
                weight="400"
                as="p"
                margin={`${Spaces.xl} 0 0 0`}
              >
                MAJOR
              </Typography>
              <Typography
                variant="label"
                weight="400"
                size={isMobile ? 'md' : 'lg'}
                as="h3"
              >
                {stories[index].major}
              </Typography>
            </TextWrapper>
          </LeftColumn>

          <RightColumn>
            <Typography
              size={isMobile ? 'lg' : '2xl'}
              variant="title"
              as="h3"
              weight="400"
              style={{ marginBottom: Spaces.xl }}
            >
              “{stories[index].quote}”
            </Typography>
            <Typography variant="labelTitle" as="h3">
              {stories[index].name}
            </Typography>
            <Typography variant="labelTitle" weight="400" as="p">
              {stories[index].position}
            </Typography>
          </RightColumn>
        </Card>

        <ArrowButton onClick={nextSlide} aria-label="Next slide">
          →
        </ArrowButton>
      </CarouselWrapper>

      <DotsContainer>
        {stories.map((_, i) => (
          <Dot
            key={i}
            active={i === index}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </DotsContainer>
    </FluidContainer>
  );
};
