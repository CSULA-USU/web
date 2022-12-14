import { Button, FluidContainer, Typography } from 'components';
import styled from 'styled-components';

type CTAProps = {
  children: React.ReactNode;
  text: string;
  buttonText: string;
  href: string;
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
}: CTAProps) => (
  <FluidContainer backgroundColor="primary">
    <CTAContainer>
      <div>{children}</div>
      <div>
        <Typography margin="0 0 16px">
          {text}
        </Typography>
        <br />
        <Button variant="black" href={href}>
          {buttonText}
        </Button>
      </div>
    </CTAContainer>
  </FluidContainer>
);
