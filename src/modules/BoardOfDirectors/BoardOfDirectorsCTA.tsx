import styled from 'styled-components';
import { Button, Typography } from 'components';

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
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;

const BoardOfDirectorsCTAButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;
`;
export const BoardOfDirectorsCTA = () => (
  <BoardOfDirectorsCTAContainer>
    <BoardOfDirectorsCTAText>
      <Typography as="h2" variant="pageHeader">
        Board of Directors
      </Typography>
      <Typography margin="0 0 24px">
        Join the board of directors to make a difference while developing your
        leadership skills
      </Typography>
    </BoardOfDirectorsCTAText>
    <BoardOfDirectorsCTAButtons>
      <Button variant="black">Apply To Be A Student Leader</Button>
      <Button variant="outline">View Current Chair Members</Button>
    </BoardOfDirectorsCTAButtons>
  </BoardOfDirectorsCTAContainer>
);
