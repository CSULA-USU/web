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

export const OpportunitiesCTA = () => (
  <OpportunitiesCTAContainer>
    <OpportunitiesCTAInner>
      <div>
        <Typography as="h2" size="4xl">
          Join the <br />
          <Typography as="span" variant="largeHeading">
            U-Krew!
          </Typography>
        </Typography>
      </div>
      <div>
        <Typography variant="bodySerif" margin="0 0 16px">
          Catalyze your professional development and building your network by
          becoming a valued member of the U-SU.
        </Typography>
        <Button variant="black">View Opportunities</Button>
      </div>
    </OpportunitiesCTAInner>
  </OpportunitiesCTAContainer>
);
