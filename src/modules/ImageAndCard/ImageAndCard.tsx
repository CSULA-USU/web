import { Card, FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';

export const ImageAndCard = ({
  imgSrc,
  imgAlt,
  imageWidth = '150px',
  ...props
}: any) => {
  const { isTablet } = useBreakpoint();
  return (
    <FluidContainer
      flex
      flexDirection={isTablet ? 'column' : 'row'}
      alignItems="center"
      padding="16px"
    >
      {!isTablet && (
        <Image
          src={`${imgSrc}`}
          alt={`${imgAlt}`}
          width={imageWidth}
          marginRight="48px"
        />
      )}
      <Card
        iconSrc={isTablet ? imgSrc : undefined}
        iconWidth={imageWidth}
        hoverable
        width="100%"
        minHeight="160px"
        {...props}
      ></Card>
    </FluidContainer>
  );
};
