import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';

type CTAProps = {
  variant: 'gold' | 'black';
  backgroundImage?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryButtonText: string;
  primaryButtonHref: string;
};

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
}: CTAProps) => {
  const backgroundColor = variant === 'gold' ? 'primary' : 'black';
  const textColor = variant === 'gold' ? 'black' : 'white';
  const buttonColor = variant !== 'gold' ? 'primary' : 'black';
  return (
    <FluidContainer backgroundColor={backgroundColor}>
      <CTAContainer>
        <Typography color={textColor}>{title}</Typography>
        <Typography color={textColor}>{description}</Typography>
        <Button variant={buttonColor} href={primaryButtonHref}>
          {primaryButtonText}
        </Button>
      </CTAContainer>
    </FluidContainer>
  );
};