import { Button, FluidContainer, Typography } from 'components';
import { Page } from 'modules';
import styled from 'styled-components';

import { useState } from 'react';

const TableCell = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  border: none;
`;

export default function TicTacToe() {
  const [buttonValues, setButtonValues] = useState<string[]>([
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
  ]);
  const [turn, switchTurn] = useState(0);

  const placeMarker = (index: number) => {
    const refButtonValues = [...buttonValues];
    if (turn === 0) {
      refButtonValues[index] = 'X';
      switchTurn(1);
    } else {
      refButtonValues[index] = 'O';
      switchTurn(0);
    }
    setButtonValues(refButtonValues);
  };

  return (
    <Page>
      <title>Tic-Tac-Toe</title>
      <FluidContainer backgroundImage="https://images.unsplash.com/photo-1609261834504-d501c8a6771a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <FluidContainer>
          <Typography as="h1" variant="pageHeader" size="5xl" lineHeight="1">
            Tic-Tac-Toe
          </Typography>
          <Typography as="h2" variant="copy" lineHeight="1.5">
            How To Play: Take turns placing your piece on the designated 3x3
            square. First person to get three in the row either horizontally,
            vertically, or diagonally, wins!
          </Typography>
        </FluidContainer>

        <FluidContainer flex justifyContent="center" alignItems="center">
          <table
            style={{
              width: '80%',
              height: '50vh',
              borderCollapse: 'collapse',
            }}
          >
            <tr>
              <td
                style={{ borderBottom: '8px solid', borderRight: '8px solid' }}
              >
                <TableCell onClick={() => placeMarker(0)}>
                  {buttonValues[0]}
                </TableCell>
              </td>
              <td>
                <TableCell onClick={() => placeMarker(1)}>
                  {buttonValues[1]}
                </TableCell>
              </td>
              <td
                style={{ borderBottom: '8px solid', borderLeft: '8px solid' }}
              >
                <TableCell onClick={() => placeMarker(2)}>
                  {buttonValues[2]}
                </TableCell>
              </td>
            </tr>
            <tr>
              <td>
                <TableCell onClick={() => placeMarker(3)}>
                  {buttonValues[3]}
                </TableCell>
              </td>
              <td style={{ border: '8px solid' }}>
                <TableCell onClick={() => placeMarker(4)}>
                  {buttonValues[4]}
                </TableCell>
              </td>
              <td>
                <TableCell onClick={() => placeMarker(5)}>
                  {buttonValues[5]}
                </TableCell>
              </td>
            </tr>
            <tr>
              <td style={{ borderRight: '8px solid', borderTop: '8px solid' }}>
                <TableCell onClick={() => placeMarker(6)}>
                  {buttonValues[6]}
                </TableCell>
              </td>
              <td>
                <TableCell onClick={() => placeMarker(7)}>
                  {buttonValues[7]}
                </TableCell>
              </td>
              <td style={{ borderLeft: '8px solid', borderTop: '8px solid' }}>
                <TableCell onClick={() => placeMarker(8)}>
                  {buttonValues[8]}
                </TableCell>
              </td>
            </tr>
          </table>
        </FluidContainer>
        <Button variant="grey">Reset</Button>
      </FluidContainer>
    </Page>
  );
}
