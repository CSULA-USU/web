import styled from 'styled-components';
import { Button, Typography } from 'components';
import { useBreakpoint } from 'hooks';

// Define interface for props
interface BoardOfDirectorsCTAContainerProps {
  isMobile: boolean;
}

const BoardOfDirectorsCTAContainer = styled.div<BoardOfDirectorsCTAContainerProps>`
  background-image: url('/backgrounds/subtle-background-4.jpg');
  background-position: center;
  background-size: cover;
  padding: ${(props) => (props.isMobile ? '60px 16px' : '120px 72px')};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const BoardOfDirectorsCTAText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
`;

const BoardOfDirectorsCTAButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 16px;
`;
export const BoardOfDirectorsCTA = () => {
  const { isMobile } = useBreakpoint();

  return (
    <BoardOfDirectorsCTAContainer isMobile={isMobile}>
      <BoardOfDirectorsCTAText>
        <Typography as="h2" variant="title" size="3xl">
          Board of Directors
        </Typography>
        <Typography margin="revert-layer">
          Apply to be on the board of directors to make a difference while
          developing your leadership skills.
        </Typography>
      </BoardOfDirectorsCTAText>
      <BoardOfDirectorsCTAButtons>
        <abbr title="University Student Union Board of Directors Application">
          <Button
            variant="black"
            href="https://form.jotform.com/240387162166154"
          >
            U-SU Board of Directors Application
          </Button>
        </abbr>
        <Button variant="outline" href="/governance/meet-the-board">
          View Current Board Members
        </Button>
      </BoardOfDirectorsCTAButtons>
    </BoardOfDirectorsCTAContainer>
  );
};
