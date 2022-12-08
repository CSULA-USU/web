import styled from 'styled-components';
import { Button, Typography } from 'components';
import { Colors } from 'theme';

const OpportunitiesCTAContainer = styled.div`
  background-color: ${Colors.primary};
  padding: 36px 72px;
`;
const OpportunitiesCTAInner = styled.div`
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

type ReusableOpportunitiesCTAProps = {
  leftTop: string;
  leftBottom: string;
  text: string;
  buttonText: string;
}

export const ReusableOpportunitiesCTA = ({leftTop, leftBottom, text, buttonText}: ReusableOpportunitiesCTAProps) => (
  <OpportunitiesCTAContainer>
    <OpportunitiesCTAInner>
      <div>
        <Typography as="h2" size="4xl">
          {leftTop} <br />
          <Typography as="span" variant="largeHeading">
            {leftBottom}
          </Typography>
        </Typography>
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
    </OpportunitiesCTAInner>
  </OpportunitiesCTAContainer>
);
