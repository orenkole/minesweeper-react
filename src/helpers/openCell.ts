import { checkItemInField, getNeigboursItems } from "./CellsManipulators";
import { detectSolvedPuzzle } from "./DetectSolvedPuzzle";
import { CellState, Coords, Field } from "./Field";

const {empty, hidden, bomb, flag, weakFlag} = CellState;

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] => {
  const [y, x] = coords;
  const gameCell = gameField[y][x];
  const playerCell = playerField[y][x];

  if(gameCell === bomb) {
    // game over if player opened bomb
    throw new Error('Game Over');
  }

  if(flag === playerCell) {
    return [playerField, false];
  }

  // reveal a cell with the number
  playerField[y][x] = gameCell;

  // reveal neighbour empty cells if use clicked empty cells
  if(gameCell === empty && [hidden, weakFlag].includes(playerCell)) {
    const items = getNeigboursItems(coords);
    for (const coords of Object.values(items)) {
      if(checkItemInField(coords, gameField)) {
        const [y, x] = coords;
        if(checkItemInField([y, x], gameField)) {
          [playerField] = openCell(coords, playerField, gameField);
        }
      }
    }
  }
  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
  return [playerField, isSolved];
}