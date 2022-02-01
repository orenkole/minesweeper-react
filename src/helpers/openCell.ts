import { checkItemInField, getNeigboursItems } from "./CellsManipulators";
import { Cell, CellState, Coords, Field } from "./Field";
const {empty, hidden, bomb} = CellState;

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const [y, x] = coords;
  const gameCell = gameField[y][x];
  if(gameCell === bomb) {
    // game over if player opened bomb
    throw new Error('Game Over');
  }
  // reveal a cell with the number
  playerField[y][x] = gameCell;

  // reveal neighbour empty cells if use clicked empty cells
  if(gameCell === empty) {
    playerField[y][x] = gameCell;
    const items = getNeigboursItems(coords);
    for (const coords of Object.values(items)) {
      if(checkItemInField(coords, gameField)) {
        const [y, x] = coords;
        const gameCell = gameField[y][x];
        const playerCell = playerField[y][x];
        if (gameCell === empty && playerCell === hidden) {
          playerField = openCell(coords, playerField, gameField);
        }
  
        if(gameCell < bomb) {
          playerField[y][x] = gameCell;
        }
      }
    }
  }
  return playerField;
}