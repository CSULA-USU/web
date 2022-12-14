import styled from 'styled-components';
import {
  Typography,
  Button,
  FluidContainer,
  VerticalLine,
  NonBreakingSpan,
} from 'components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Header = () => (
  <FluidContainer backgroundImage="/subtle-background-2.jpg">
    <HeaderContainer>
      <Typography as="h1" variant="heroHeading">
        Governance
      </Typography>
      <VerticalLine />
      <Typography as="h2" variant="bodySerif" margin="24px 0">
        The University-Student Union&apos;s Board of Directors is the governing
        board of the Union. The purpose of the Board is to establish policy for
        the Union as a student body center for the benefit of students, faculty,
        staff and alumni at{' '}
        <NonBreakingSpan>Cal State Los Angeles</NonBreakingSpan>.
      </Typography>
      <ButtonContainer>
        <Button href="governance/board-of-directors" variant="black">
          Meet the Board of Directors
        </Button>
        <Button href="governance/student-leaders" variant="outline">
          Be a Student Leader
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  </FluidContainer>
);
