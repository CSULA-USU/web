import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import { Colors } from 'theme';

type CTAProps = {
  children: React.ReactNode;
  text: string;
  buttonText: string;
  href: string;
  backgroundColorProp?: keyof typeof Colors;
  buttonVariantColor?: 'primary' | 'black' | 'grey' | 'outline';
  textColor?: keyof typeof Colors;
};

const CTAContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  > div:first-child {
    white-space: nowrap;
    margin-right: 36px;
  }
`;

export const CallToAction = ({
  children,
  text,
  buttonText,
  href,
  backgroundColorProp,
  buttonVariantColor,
  textColor,
}: CTAProps) => (
  <FluidContainer
    backgroundColor={backgroundColorProp ? backgroundColorProp : 'primary'}
  >
    <CTAContainer>
      <div>{children}</div>
      <div>
        <Typography color={textColor ? textColor : 'black'} margin="0 0 16px">
          {text}
        </Typography>
        <br />
        <Button
          variant={buttonVariantColor ? buttonVariantColor : 'black'}
          href={href}
        >
          {buttonText}
        </Button>
      </div>
    </CTAContainer>
  </FluidContainer>
);
