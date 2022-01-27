import { Cell, CellState, emptyFieldGenerator, fieldGenerator } from "./Field"

const {empty, bomb, hidden} = CellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe('FIeld generator', () => {
	describe('emptyFieldGenerator tests', () => {
		it('2x2', () => {
			expect(emptyFieldGenerator(2)).toStrictEqual([
				[empty, empty],
				[empty, empty]
			])
		});
		it('3x3 with hidden state', () => {
			expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
				[hidden, hidden, hidden],
				[hidden, hidden, hidden],
				[hidden, hidden, hidden],
			])
		})
	});

	describe('fieldGenerator tests', () => {
		it('wrong probability', () => {
			const errorText = 'Probability must be between 0 and 1';
			expect(() => fieldGenerator(1, -1)).toThrowError(errorText);
			expect(() => fieldGenerator(1, 2)).toThrowError(errorText);
		})
		it('Smallest possible field with mine', () => {
			expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]])
		})
		it('Smallest possible field without mine', () => {
			expect(fieldGenerator(1, 0)).toStrictEqual([[empty]])
		})
		it('2x2 field with 50% probability', () => {
			const field = fieldGenerator(2, 0.5);
			const flatField = field.flat();
			const cellsWithBombs = flatField.filter(cell => cell === bomb);
			const emptyCells = flatField.filter(cell => cell === 2);
			expect(cellsWithBombs).toHaveLength(2)
			expect(emptyCells).toHaveLength(2)
		})
	})

	it('Real game field size = 10x10 with 1/4 mined cells (25 mines)', () => {
		const size = 10;
		const mines = 25;

		const probability = mines / (size * size);
		const field = fieldGenerator(size, probability);

		const flatField = field.flat();

		expect([...field[0], ...field[1]].join('')).not.toBe(
			'99999999999999999999'
		);

		expect(flatField.filter(cellWithBombFilter)).toHaveLength(mines);
	});
})