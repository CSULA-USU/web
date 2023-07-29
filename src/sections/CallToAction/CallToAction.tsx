import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';
import { CallToActionProps } from './props';

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  > div:first-child {
    white-space: nowrap;
  }
`;

export const CallToAction = ({
  variant,
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
}: CallToActionProps) => {
  const backgroundColor = variant === 'gold' ? 'primary' : 'black';
  const textColor = variant === 'gold' ? 'black' : 'white';
  const buttonColor = variant !== 'gold' ? 'primary' : 'black';
  return (
    <FluidContainer backgroundColor={backgroundColor}>
      <CTAContainer>
        <Typography variant="label" size="lg" color={textColor}>
          {title}
        </Typography>
        <Typography
          variant="titleLarge"
          size="2xl"
          margin="0 0 24px"
          lineHeight="1.5"
          color={textColor}
        >
          {description}
        </Typography>
        <Button variant={buttonColor} href={primaryButtonHref}>
          {primaryButtonText}
        </Button>
      </CTAContainer>
    </FluidContainer>
  );
};
