import { Image } from 'components';
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
    <Carousel
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
      useKeyboardArrows={true}
      showThumbs={false}
    >
      {carouselImages &&
        carouselImages.map((item) => (
          <div
            key={item.src}
            style={{
              maxHeight: '560px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              style={{ borderRadius: '12px', flex: 'none' }}
            ></Image>
            <p className="legend">{item.alt}</p>
          </div>
        ))}
    </Carousel>
  );
};
