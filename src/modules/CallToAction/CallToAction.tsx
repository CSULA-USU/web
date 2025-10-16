import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import { Colors } from 'theme';

type CTAProps = {
  backgroundColorProp?: keyof typeof Colors;
  buttonText?: string;
  buttonVariantColor?: 'primary' | 'black' | 'grey' | 'outline';
  children?: React.ReactNode;
  href?: string;
  isExternalLink?: boolean;
  linkAria?: string;
  margin?: string;
  text?: string;
  textColorProp?: keyof typeof Colors;
};

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  max-width: 1080px;
  align-items: center;
  justify-content: center;
  > div:first-child {
    @media (min-width: 768px) {
      white-space: nowrap;
    }
  }
`;

export const CallToAction = ({
  backgroundColorProp,
  buttonText,
  buttonVariantColor,
  children,
  href,
  isExternalLink,
  linkAria,
  margin,
  text,
  textColorProp,
}: CTAProps) => (
  <FluidContainer
    backgroundColor={backgroundColorProp ? backgroundColorProp : 'primary'}
    margin={margin ? margin : '0'}
  >
    <CTAContainer>
      {children}
      <div>
        {text && (
          <Typography
            variant="titleLarge"
            size="2xl"
            margin="0 0 16px"
            lineHeight="1.5"
            color={textColorProp ? textColorProp : 'black'}
            as="h2"
          >
            {text}
          </Typography>
        )}
        <br />
        <Button
          variant={buttonVariantColor ? buttonVariantColor : 'black'}
          href={href}
          aria-label={linkAria}
          isExternalLink={isExternalLink}
        >
          {buttonText}
        </Button>
      </div>
    </CTAContainer>
  </FluidContainer>
);
