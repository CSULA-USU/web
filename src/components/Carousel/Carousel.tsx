import { Image, FluidContainer } from 'components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
interface CarouselImageProps {
  src: string;
  alt: string;
}

interface CarouselProps {
  carouselImages: CarouselImageProps[];
}

export const ReactCarousel = ({ carouselImages }: CarouselProps) => {
  return (
    <FluidContainer flex justifyContent="center" backgroundColor="white">
      <Carousel
        centerSlidePercentage={100}
        centerMode={true}
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        dynamicHeight={true}
        showThumbs={false}
      >
        {carouselImages &&
          carouselImages.map((item) => (
            <div key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                borderRadius="12px"
                maxWidth="100%"
              />
            </div>
          ))}
      </Carousel>
    </FluidContainer>
  );
};
