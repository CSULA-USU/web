import { Button, Typography } from 'components';

import styled from 'styled-components';

const StudentOrgsOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 552px;
  margin: auto;
  text-align: center;
`;
const Border = styled.div`
  height: 100px;
  border: 1px solid #000000;
  margin: 2em auto;
`;
const BoardOfDirectorsCTAButtons = styled.div`
  display: flex;
  justify-content: center;
`;
export const StudentOrgsHeroSection = () => (
  <StudentOrgsOuterContainer>
    <Typography variant="smallHeading" margin="72px 0 24px 0">
      University-Student Union
    </Typography>
    <Typography lineHeight="1.3" weight="600px" variant="heroHeading">
      Join a Student Organization
    </Typography>
    <Border></Border>
    <Typography weight="400px" variant="bodySerif" margin="0 0 24px" size="sm">
      Cal State LA is home to over 150+ student organizations that represent a
      variety of student interests and plan hundreds of events each year.
    </Typography>

    <BoardOfDirectorsCTAButtons>
      <Button margin="0 24px 0 0" variant="black">
        Get Involved
      </Button>
      <Button variant="outline">Start Your Own</Button>
    </BoardOfDirectorsCTAButtons>
  </StudentOrgsOuterContainer>
);
