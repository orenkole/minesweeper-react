import { incrementNeighbours } from "./CellsManipulators";

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Field = Cell[][]; 

export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
	empty: 0,
	bomb: 9,
	hidden: 10,
	flag: 11,
	weakFlag: 12,
}

export const fieldExample: Field = [
  [9, 2, 9, 1, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 1, 0, 1, 9, 1, 1, 9, 1],
  [0, 0, 1, 9, 10, 0, 2, 2, 2, 1, 1, 1],
  [0, 0, 10, 10, 1, 0, 1, 9, 1, 2, 2, 2],
  [0, 1, 1, 2, 2, 9, 1, 1, 1, 0, 0, 0],
  [0, 1, 9, 3, 9, 2, 10, 0, 0, 2, 1, 1],
  [0, 2, 2, 4, 9, 2, 10, 1, 1, 1, 9, 1],
  [0, 1, 9, 2, 1, 1, 1, 9, 1, 2, 2, 2],
  [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
  [0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 9, 1],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1],
];

export const emptyFieldGenerator = (size: number, state: Cell = CellState.empty): Field => {
  return Array(size).fill(null).map(() => new Array(size).fill(state));
}

export const fieldGenerator = (size: number, probability: number): Field => {
  if(probability > 1 || probability < 0) throw new Error('Probability must be between 0 and 1');

  let unprocessedCells = size * size;
  let restCellsWithBombs = unprocessedCells * probability;

  const result: Field = emptyFieldGenerator(size);
  for(let y = 0; y < size; y++) {
    for(let x = 0; x < size; x++) {
      if(restCellsWithBombs === 0) {
        return result;
      }
      if(restCellsWithBombs / unprocessedCells > Math.random()) {
        result[y][x] = CellState.bomb;
        incrementNeighbours([y, x], result);
        restCellsWithBombs--;
      }
      unprocessedCells--;
    }
  }
  return result
}