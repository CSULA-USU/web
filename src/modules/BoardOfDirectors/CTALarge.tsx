import styled from 'styled-components';
import { Button, Typography } from 'components';
import { Colors } from 'theme';

const CTALargeContainer = styled.div`
  background-image: url('bod-cta-background.jpg');
  background-position: center;
  background-size: cover;
  padding: 240px 72px;
`;

const CTALargeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
`;

const CTALargeButtons = styled.div`
  display: flex;
  justify-content: center;
`;

type CTALargeProps = {
    headingText: string,
    text: string,
    leftButtonText: string,
    rightButtonText: string
}
export const CTALarge = ({headingText, text, leftButtonText, rightButtonText}: CTALargeProps) => (
    <CTALargeContainer>
        <CTALargeText>
            <Typography as="h2" variant="largeHeading">
                {headingText}
            </Typography>
            <Typography variant="bodySerif" margin="0 0 24px" size="md">
                {text}
            </Typography>
        </CTALargeText>
        <CTALargeButtons>
            <Button margin="0 24px 0 0" variant="black">{leftButtonText}</Button>
            <Button variant="outline">{rightButtonText}</Button>
        </CTALargeButtons>
    </CTALargeContainer>
);
