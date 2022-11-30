import styled from 'styled-components';
import { Button, Typography } from 'components';
import { Colors } from 'theme';

const BoardOfDirectorsCTAContainer = styled.div`
  background-image: url('bod-cta-background.jpg');
  background-position: center;
  background-size: cover;
  padding: 240px 72px;
`;

const BoardOfDirectorsCTAText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
`;

const BoardOfDirectorsCTAButtons = styled.div`
  display: flex;
  justify-content: center;
`;
export const BoardOfDirectorsCTA = () => (
  <BoardOfDirectorsCTAContainer>
    <BoardOfDirectorsCTAText>
      <Typography as="h2" variant="largeHeading">
        Board of Directors
      </Typography>
      <Typography variant="bodySerif" margin="0 0 24px" size="md">
        Join the board of directors to make a difference while developing your
        leadership skills
      </Typography>
    </BoardOfDirectorsCTAText>
    <BoardOfDirectorsCTAButtons>
      <Button margin="0 24px 0 0" variant="black">Apply To Be A Student Leader</Button>
      <Button variant="outline">View Current Chair Members</Button>
    </BoardOfDirectorsCTAButtons>
  </BoardOfDirectorsCTAContainer>
);
