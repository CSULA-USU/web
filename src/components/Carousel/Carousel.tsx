import { useBreakpoint } from 'hooks';
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

export const ReactCarousel = ({ carouselImages }: CarouselProps) => {
  const { isMobile } = useBreakpoint();
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
        showThumbs={true}
      >
        {carouselImages &&
          carouselImages.map((item) => (
            <div key={item.src}>
              <Image
                src={item.src}
                alt={item.alt}
                borderRadius="12px"
                maxWidth={!isMobile ? '50%' : '100%'}
              />
              <Typography className="legend">{item.alt}</Typography>
            </div>
          ))}
      </Carousel>
    </FluidContainer>
  );
};
