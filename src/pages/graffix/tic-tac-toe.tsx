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
    if (turn === 'X') {
      refBoard[col][row] = 'X';
      switchTurn('O');
    } else {
      refBoard[col][row] = 'O';
      switchTurn('X');
    }
    setBoardValues(refBoard);
    checkWinner();
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] !== '' &&
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2]) ||
        (board[0][i] !== '' &&
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i])
      ) {
        setWinner(board[i][0]);
      }
    }

    if (
      (board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[0][2] !== '' &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0])
    ) {
      setWinner(board[1][1]);
    }

    if (board.every((row) => row.every((element) => element !== ''))) {
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
      <FluidContainer backgroundImage="https://images.unsplash.com/photo-1609261834504-d501c8a6771a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
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
            square. First person to get three in the row horizontally,
            vertically, or diagonally, wins!
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
                  {turn}&apos;s turn!<br></br>
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
            <tr>
              <td
                style={{
                  borderBottom: '8px solid',
                  borderRight: '8px solid',
                  width: cellWidth,
                  aspectRatio: '1/1',
                }}
              >
                <CellButton onClick={() => placeMarker(0, 0)}>
                  {board[0][0]}
                </CellButton>
              </td>
              <td style={{ width: cellWidth, height: cellHeight }}>
                <CellButton onClick={() => placeMarker(1, 0)}>
                  {board[1][0]}
                </CellButton>
              </td>
              <td
                style={{
                  borderBottom: '8px solid',
                  borderLeft: '8px solid',
                  width: cellWidth,
                  aspectRatio: '1/1',
                }}
              >
                <CellButton onClick={() => placeMarker(2, 0)}>
                  {board[2][0]}
                </CellButton>
              </td>
            </tr>
            <tr>
              <td style={{ width: cellWidth, height: cellHeight }}>
                <CellButton onClick={() => placeMarker(0, 1)}>
                  {board[0][1]}
                </CellButton>
              </td>
              <td
                style={{
                  border: '8px solid',
                  width: cellWidth,
                  aspectRatio: '1/1',
                }}
              >
                <CellButton onClick={() => placeMarker(1, 1)}>
                  {board[1][1]}
                </CellButton>
              </td>
              <td style={{ width: cellWidth, height: cellHeight }}>
                <CellButton onClick={() => placeMarker(2, 1)}>
                  {board[2][1]}
                </CellButton>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: '8px solid',
                  borderTop: '8px solid',
                  width: cellWidth,
                  aspectRatio: '1/1',
                }}
              >
                <CellButton onClick={() => placeMarker(0, 2)}>
                  {board[0][2]}
                </CellButton>
              </td>
              <td style={{ width: cellWidth, aspectRatio: '1/1' }}>
                <CellButton onClick={() => placeMarker(1, 2)}>
                  {board[1][2]}
                </CellButton>
              </td>
              <td
                style={{
                  borderLeft: '8px solid',
                  borderTop: '8px solid',
                  width: cellWidth,
                  aspectRatio: '1/1',
                }}
              >
                <CellButton onClick={() => placeMarker(2, 2)}>
                  {board[2][2]}
                </CellButton>
              </td>
            </tr>
          </table>
        </FluidContainer>
        <FluidContainer>
          <PopUp isVisible={winner} style={{ width: isTablet ? '70%' : '40%' }}>
            {winner} won!
            <Image
              alt="Mascot Eddie Dabbing Gif"
              src="https://media3.giphy.com/media/iFJ2wQXv5cIKfBRQ7Q/200.gif"
              style={{
                marginTop: '5%',
                marginBottom: '5%',
              }}
              width="100%"
            ></Image>
            <Button onClick={resetBoard}>Play Again</Button>
          </PopUp>
        </FluidContainer>
      </FluidContainer>
    </Page>
  );
}
