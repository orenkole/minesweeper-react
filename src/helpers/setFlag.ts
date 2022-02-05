import { checkItemInField, getNeigboursItems } from "./CellsManipulators";
import { detectSolvedPuzzle } from "./DetectSolvedPuzzle";
import { CellState, Coords, Field } from "./Field";

const {empty, hidden, bomb} = CellState;

/**
 * Set flag to the cell
 * @param {Coords} coords 
 * @param {Field} playerField 
 * @param {Field} gameField 
 * @param {number} prevFlagCounter
 * @param {number} bombs
 * @returns 
 */

export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field,
	prevFlagCounter: number,
	bombs: number,
): [Field, boolean, number] => {
	const [y, x] = coords;
	const cell = playerField[y][x]
	const {flag, weakFlag, hidden} = CellState;
	
	switch(cell) {
		case flag: 
			playerField[y][x] = weakFlag;
			break;
		case weakFlag:
			playerField[y][x] = hidden;
			break;
		case hidden: 
			if(prevFlagCounter < bombs) {
				playerField[y][x] = flag;
			}
			break;
	}
	const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
  return [playerField, isSolved, flagCounter];
}