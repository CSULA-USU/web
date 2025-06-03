import { Button, FluidContainer, Typography, Image } from 'components';
import { Page } from 'modules';
import styled from 'styled-components';
import { useBreakpoint } from 'hooks';
import { useState } from 'react';

const CellButton = styled.button`
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  border: none;
  font-size: 72px;
`;

const PopUp = styled.div<{ isVisible: string }>`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-image: url('https://wallpapers.com/images/hd/gold-confetti-background-ft6r7pr8zxt1911l.jpg');
  box-shadow: 8px 8px 10px;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  padding: 5%;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export default function TicTacToe() {
  const { isMobile, isTablet } = useBreakpoint();
  const cellHeight = isMobile ? '120px' : '200px';
  const cellWidth = isTablet ? '33vw' : '200px';

  const [board, setBoardValues] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [turn, switchTurn] = useState('X');
  const [winner, setWinner] = useState('');
  const [tie, setTie] = useState(false);

  const placeMarker = (col: number, row: number) => {
    const refBoard = [...board];
    if (refBoard[col][row] !== '' || winner) return;

    refBoard[col][row] = turn;
    switchTurn(turn === 'X' ? 'O' : 'X');
    setBoardValues(refBoard);
    checkWinner(refBoard);
  };

  const checkWinner = (refBoard: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (
        (refBoard[i][0] !== '' &&
          refBoard[i][0] === refBoard[i][1] &&
          refBoard[i][1] === refBoard[i][2]) ||
        (refBoard[0][i] !== '' &&
          refBoard[0][i] === refBoard[1][i] &&
          refBoard[1][i] === refBoard[2][i])
      ) {
        setWinner(refBoard[i][0]);
        return;
      }
    }

    if (
      (refBoard[0][0] !== '' &&
        refBoard[0][0] === refBoard[1][1] &&
        refBoard[1][1] === refBoard[2][2]) ||
      (refBoard[0][2] !== '' &&
        refBoard[0][2] === refBoard[1][1] &&
        refBoard[1][1] === refBoard[2][0])
    ) {
      setWinner(refBoard[1][1]);
      return;
    }

    if (refBoard.every((row) => row.every((cell) => cell !== ''))) {
      setTie(true);
    }
  };

  const resetBoard = () => {
    setBoardValues([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('');
    setTie(false);
  };

  return (
    <Page>
      <title>Tic-Tac-Toe</title>
      <FluidContainer backgroundImage="https://images.unsplash.com/photo-1609261834504-d501c8a6771a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8">
        <FluidContainer>
          <Typography
            as="h1"
            variant="pageHeader"
            size={isMobile ? '4xl' : '5xl'}
            lineHeight="1"
          >
            Tic-Tac-Toe
          </Typography>
          <Typography as="h2" variant="copy" lineHeight="1.5">
            How To Play: Take turns placing your piece on the designated 3x3
            square. First person to get three in a row horizontally, vertically,
            or diagonally, wins!
          </Typography>
          <FluidContainer
            flex
            justifyContent="space-evenly"
            alignItems="center"
          >
            {tie ? (
              <>
                <Typography
                  as="h3"
                  variant="titleSmall"
                  size={isMobile ? 'lg' : 'xl'}
                >
                  Tied! Reset the board!
                </Typography>
                <Button onClick={resetBoard}>Play Again</Button>
              </>
            ) : (
              <>
                <Typography as="h3" variant="titleSmall" lineHeight="1.5">
                  {turn}&apos;s turn!
                </Typography>
              </>
            )}
          </FluidContainer>
        </FluidContainer>

        <FluidContainer flex justifyContent="center" alignItems="center">
          <table
            style={{
              aspectRatio: 1 / 1,
              borderCollapse: 'collapse',
            }}
          >
            <tbody>
              {[0, 1, 2].map((row) => (
                <tr key={row}>
                  {[0, 1, 2].map((col) => (
                    <td
                      key={col}
                      style={{
                        width: cellWidth,
                        height: cellHeight,
                        borderTop: row > 0 ? '4px solid black' : 'none',
                        borderLeft: col > 0 ? '4px solid black' : 'none',
                      }}
                    >
                      <CellButton onClick={() => placeMarker(col, row)}>
                        {board[col][row]}
                      </CellButton>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FluidContainer>

        <FluidContainer>
          <PopUp isVisible={winner}>
            {winner} won!
            <Image
              alt="Mascot Eddie Dabbing Gif"
              src="https://media3.giphy.com/media/iFJ2wQXv5cIKfBRQ7Q/200.gif"
              style={{
                marginTop: '5%',
                marginBottom: '5%',
              }}
              width="100%"
            />
            <Button onClick={resetBoard}>Play Again</Button>
          </PopUp>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
