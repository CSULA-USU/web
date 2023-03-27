import styled from 'styled-components';

import { Typography, Image, FluidContainer } from 'components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
interface CarouselImageProps {
  src: string;
  alt: string;
}

interface CarouselProps {
  carouselImages: CarouselImageProps[];
}

const CarouselContainer = styled.div`
  width: 50%;
`;

export const Carousels = ({ carouselImages }: CarouselProps) => (
  <FluidContainer flex justifyContent="center">
    <CarouselContainer>
      <Carousel centerSlidePercentage={100}>
        {carouselImages &&
          carouselImages.map((item) => (
            <div key={item.src}>
              <Image src={item.src} alt={item.alt} />
              <Typography className="legend">{item.alt}</Typography>
            </div>
          ))}
      </Carousel>
    </CarouselContainer>
  </FluidContainer>
);
