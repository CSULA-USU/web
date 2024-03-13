import { Card, FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';

export const ImageAndCard = ({
  imgSrc,
  imgAlt,
  imageWidth = '150px',
  imageOnRight,
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
      {imageOnRight ? (
        <>
          {!isTablet && (
            <Image
              src={`${imgSrc}`}
              alt={`${imgAlt}`}
              width={imageWidth}
              marginRight="48px"
              lazy
            />
          )}
          <Card
            iconSrc={isTablet ? imgSrc : undefined}
            iconWidth="150px"
            hoverable
            width="100%"
            minHeight="160px"
            {...props}
          />
        </>
      ) : (
        <>
          <Card
            iconSrc={isTablet ? imgSrc : undefined}
            iconWidth="150px"
            hoverable
            width="100%"
            minHeight="160px"
            {...props}
          />
          {!isTablet && (
            <Image
              src={`${imgSrc}`}
              alt={`${imgAlt}`}
              width={imageWidth}
              marginLeft="48px"
              lazy
            />
          )}
        </>
      )}
    </FluidContainer>
  );
};
