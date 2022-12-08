import styled from 'styled-components';
import { Button, Typography } from 'components';
import { Colors } from 'theme';

const CTAContainer = styled.div`
  background-color: ${Colors.primary};
  padding: 36px 72px;
`;
const CTAInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  > div:first-child {
    white-space: nowrap;
    margin-right: 36px;
  }
`;

type CTAProps = {
  children: React.ReactNode;
  text: string;
  buttonText: string;
}

export const CallToAction = ({children, text, buttonText}: CTAProps) => (
  <CTAContainer>
    <CTAInner>
      <div>
        {children}
      </div>
      <div>
        <Typography variant="bodySerif" margin="0 0 16px">
          {text}
        </Typography>
        <br />
        <Button variant="black">
          {buttonText}
        </Button>
      </div>
    </CTAInner>
  </CTAContainer>
);
