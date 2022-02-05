import {CellState, Field} from "./Field";
import {detectSolvedPuzzle} from "./DetectSolvedPuzzle";

const {empty: e, hidden: h, bomb: b, flag: f, weakFlag: w} = CellState;

describe("Detect solved puzzle function test cases", () => {
	it("Simplets 3x3 case", () => {
		const gameField: Field = [
			[1, 1, e],
			[b, 1, e],
			[1, 1, e],
		];
		const playerField: Field = [
			[1, 1, e],
			[f, 1, e],
			[1, 1, e],
		]

		const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);
		expect(flagCounter).toBe(1);
		expect(isSolved).toBe(true);
	})
	it('Wrong 3*3 hidden cells case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, h],
      [h, 1, h],
      [1, 1, h],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

    expect(flagCounter).toBe(0);
    expect(isSolved).toBe(false);
  });
	it('Wrong 3*3 hidden cells case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, h, e],
      [f, 1, e],
      [1, 1, e],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

    expect(flagCounter).toBe(1);
    expect(isSolved).toBe(false);
  });
  it('Loose 3x3 case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

    expect(flagCounter).toBe(0);
    expect(isSolved).toBe(false);
  });
  it('Wrong flag on 3*3 case', () => {
    const gameField: Field = [
      [1, 1, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const playerField: Field = [
      [1, f, e],
      [b, 1, e],
      [1, 1, e],
    ];

    const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

    expect(flagCounter).toBe(1);
    expect(isSolved).toBe(false);
  });
})