import styled from 'styled-components';
import { Button, Typography } from 'components';
import { useBreakpoint } from 'hooks';

const BoardOfDirectorsCTAContainer = styled.div`
  background-color: black;
  background-position: center;
  background-size: cover;
  padding: 36px 72px;
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

export const BoardOfDirectorsCTAPromotion = () => {
  const { isMobile } = useBreakpoint();
  return (
    <BoardOfDirectorsCTAContainer>
      <BoardOfDirectorsCTAText>
        <Typography
          color="greyLightest"
          as="h2"
          variant="pageHeader"
          size={isMobile ? '3xl' : '4xl'}
        >
          Become a Student Director
        </Typography>
        <Typography color="greyLightest" margin="revert-layer">
          Applications are now open! Apply to be on the Board of Directors to
          make a difference while developing your leadership skills.
        </Typography>
      </BoardOfDirectorsCTAText>
      {isMobile ? (
        <>
          <BoardOfDirectorsCTAButtons>
            <Button
              variant="primary"
              href="https://form.jotform.com/210416532268047"
            >
              <Typography variant="cta">BOD Application</Typography>
            </Button>
            <Button variant="whiteOutline" href="/governance/meet-the-board">
              <Typography variant="cta" color="greyLightest">
                Board Members
              </Typography>
            </Button>
          </BoardOfDirectorsCTAButtons>
        </>
      ) : (
        <>
          <BoardOfDirectorsCTAButtons>
            <Button
              variant="primary"
              href="https://form.jotform.com/210416532268047"
            >
              <Typography variant="cta">
                U-SU Board of Directors Application
              </Typography>
            </Button>
            <Button variant="whiteOutline" href="/governance/meet-the-board">
              <Typography variant="cta" color="greyLightest">
                View Current Board Members
              </Typography>
            </Button>
          </BoardOfDirectorsCTAButtons>
        </>
      )}
    </BoardOfDirectorsCTAContainer>
  );
};
