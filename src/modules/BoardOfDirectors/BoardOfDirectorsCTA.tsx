import styled from 'styled-components';
import { Button, Typography } from 'components';
import { useBreakpoint } from 'hooks';

// Define interface for props
interface BoardOfDirectorsCTAContainerProps {
  isMobile: boolean;
}

const BoardOfDirectorsCTAContainer = styled.div<BoardOfDirectorsCTAContainerProps>`
  padding: ${(props) => (props.isMobile ? '48px 16px' : '120px 72px')};
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
        <Typography as="h2" variant="title" size={isMobile ? 'lg' : '3xl'}>
          Board of Directors
        </Typography>
        <Typography margin="revert-layer">
          Apply to be on the board of directors to make a difference while
          developing your leadership skills
        </Typography>
      </BoardOfDirectorsCTAText>
      <BoardOfDirectorsCTAButtons>
        <abbr title="University Student Union Board of Directors Application">
          <Button
            href="https://form.jotform.com/210416532268047"
            isExternalLink
            variant="black"
          >
            BOD Application
          </Button>
        </abbr>
        <Button variant="outline" href="/board-of-directors/roster">
          View Current Members
        </Button>
      </BoardOfDirectorsCTAButtons>
    </BoardOfDirectorsCTAContainer>
  );
};
