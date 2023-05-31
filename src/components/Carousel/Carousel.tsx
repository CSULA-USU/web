import { Image } from 'components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Colors } from 'theme';
import styled from 'styled-components';

interface CarouselImageProps {
  src: string;
  alt: string;
}

interface CarouselProps {
  carouselImages: CarouselImageProps[];
}

const ListItem = styled.li`
  display: inline;
`;

const PageItem = styled.span`
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
`;

export const ReactCarousel = ({ carouselImages }: CarouselProps) => {
  return (
    <Carousel
      emulateTouch={true}
      infiniteLoop={true}
      showThumbs={false}
      swipeable={true}
      useKeyboardArrows={true}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        const defStyle = {
          marginLeft: 20,
          color: Colors.white,
          cursor: 'pointer',
        };
        const style = isSelected
          ? { ...defStyle, color: Colors.primary }
          : { ...defStyle };
        return (
          <ListItem
            style={style}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="listitem"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          >
            <PageItem>{index + 1}</PageItem>
          </ListItem>
        );
      }}
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
              style={{
                borderRadius: '12px',
                flex: 'none',
                maxWidth: '960px',
                margin: '0px auto',
              }}
            ></Image>
            <p className="legend">{item.alt}</p>
          </div>
        ))}
    </Carousel>
  );
};
