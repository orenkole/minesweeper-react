import { CellState, Field } from "@/helpers/Field";
import {renderHook, act} from "@testing-library/react-hooks";
import { GameLevels, GameSettings } from "../GameSettings";
import {useGame} from "./useGame";

jest.mock("@/helpers/Field")

const [beginner, intermediate, expert] = GameLevels;

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

const flatWithFilter = (field: Field, cond: number) => field.flat().filter((v) => v === cond);

describe("GameWithHooks test cases", () => {
	describe("Render behavior", () => {
		it("Render game field by default", () => {
			// const {asFragment} = render(<GameWithHooks />);
			// expect(screen.getAllByRole('cell')).toHaveLength(81);
			const {result} = renderHook(useGame);
			const { level, isGameOver, isWin, settings, playerField, } = result.current;
			expect({level, isGameOver, isWin, settings}).toStrictEqual({
				isGameOver: false,
				isWin: false,
				level: beginner,
				settings: GameSettings.beginner,
			})
			expect(playerField).toHaveLength(9)
		})
	})
	it("onChange game level handler", () => {
		// render(<GameWithHooks />);
		// expect(screen.getAllByRole('cell')).toHaveLength(81);
		// userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
		// expect(screen.getAllByRole('cell')).toHaveLength(256);
		// userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
		// expect(screen.getAllByRole('cell')).toHaveLength(484);
		const {result} = renderHook(useGame);
		const {playerField: beginnerPlayerField, onChangeLevel} = result.current;
		expect(beginnerPlayerField).toHaveLength(9);
		act(() => onChangeLevel({target: {value: intermediate}}))
		const {playerField: intermediatePLayerField} = result.current;
		expect(intermediatePLayerField).toHaveLength(16);
		act(() => onChangeLevel({target: {value: expert}}))
		const {playerField: expertPLayerField} = result.current;
		expect(expertPLayerField).toHaveLength(22);
	})
	describe("Open cell test cases", () => {
		it("Open empty cell on the beginner level", () => {
			// render(<GameWithHooks />);
			// userEvent.click(screen.getByTestId('0,0'));
			// expect(screen.queryAllByRole('cell', { name: String(e)})).toHaveLength(18)
			const {result} = renderHook(useGame);
			const {playerField, onClick} = result.current;
			expect(playerField).toHaveLength(9);
			expect(flatWithFilter(playerField, e)).toHaveLength(0);
			act(() => onClick([0, 0]));
			const {playerField: newPlayerField} = result.current;
			expect(flatWithFilter(newPlayerField, e)).toHaveLength(18);
		})
	})
	it('Context menu handler', () => {
		const {result} = renderHook(useGame);
		const {playerField, onContextMenu} = result.current;
		act(() => onContextMenu([0, 0]))
		const {playerField: newPlayerField} = result.current;
		expect(flatWithFilter(newPlayerField, f)).toHaveLength(1)
	})
	it("Click to the non-empty cells area", () => {
		// render(<GameWithHooks />)
		// userEvent.click(screen.getByTestId('0,8'));
		// expect(screen.queryAllByRole('cell', {name: String(1)})).toHaveLength(1);
	})
	it("Check click the cell when the level is changed", () => {
		// render(<GameWithHooks />)
		// expect(screen.getAllByRole('cell')).toHaveLength(81);
		// userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
		// expect(screen.queryAllByRole('cell')).toHaveLength(256);
		// userEvent.click(screen.getByTestId('15,15'))
		// expect(screen.getAllByRole('cell', {name: String(e)})).toHaveLength(2);

		// userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
		// expect(screen.queryAllByRole('cell')).toHaveLength(484);
		// userEvent.click(screen.getByTestId('21,21'))
		// expect(screen.getAllByRole('cell', {name: String(e)})).toHaveLength(1);
		// expect(screen.getAllByRole('cell', {name: String(1)})).toHaveLength(2);
		// expect(screen.getAllByRole('cell', {name: String(2)})).toHaveLength(1);
	})
	it("onReset game handler", () => {
		// render(<GameWithHooks />)
		// userEvent.click(screen.getByTestId('0,8'));
		// expect(screen.getAllByRole('cell', {name: String(1)})).toHaveLength(1);
		// userEvent.click(screen.getByTestId('0,0'));
		// expect(screen.getAllByRole('cell', {name: String(e)})).toHaveLength(18);
		// userEvent.click(screen.getByRole('button'))
		// expect(screen.getAllByRole('cell', {name: String(h)})).toHaveLength(81);
	})
	describe("Game over behavior", () => {
		it("Player loose the game and resets", () => {
			// render(<GameWithHooks />)
			// userEvent.click(screen.getByTestId('0,7'))
			// const gameLoosePopup = screen.getByText('🙁');
			// expect(gameLoosePopup).toBeInTheDocument();
			// // reset game
			// userEvent.click(gameLoosePopup);
			// expect(screen.getAllByRole('cell', {name: String(h)})).toHaveLength(81);
			// expect(screen.queryByText('🙁')).not.toBeInTheDocument();
		})
	})
	it("Player win the game", () => {
		const {result} = renderHook(useGame);
		const {gameField, onClick, onContextMenu} = result.current;
		for(const y of gameField.keys()) {
			for(const x of gameField[y].keys()) {
				const gameCell = gameField[y][x];
				act(() => {
					gameCell === b ? onContextMenu([y, x]) : onClick([y, x]);
				})
			}
		}
		const {isGameOver, isWin} = result.current;
		expect(isWin).toBe(true);
		expect(isGameOver).toBe(true);
	})
	describe("Scoreboard behavior - timer and bomb counter", () => {
		it("Timer should start by click to a cell", () => {
			jest.useFakeTimers();
			const {result} = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			// Timer shouldn't work before game has been startded
			expect(result.current.time).toBe(0);
			act(() => { result.current.onClick([0, 0]) })
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			expect(result.current.time).toBe(timeMustPass);
		})
		it("TImer should start by mark a cell by a flag", () => {
			const {result} = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			// Timer shouldn't work before game has been startded
			expect(result.current.time).toBe(0);
			act(() => { result.current.onContextMenu([0, 0]) })
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			expect(result.current.time).toBe(timeMustPass);
		})
		it("Time should reset value when onReset have been called", () => {
			const {result} = renderHook(useGame);
			const timeMustPass = 5;
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			// Timer shouldn't work before game has been startded
			expect(result.current.time).toBe(0);
			act(() => { result.current.onContextMenu([0, 0]) })
			for (let i = 0; i < timeMustPass; i++) {
				act(() => {
					jest.advanceTimersByTime(1000);
				})
			}
			expect(result.current.time).toBe(timeMustPass);
			act(result.current.onReset);
			expect(result.current.time).toBe(0)
		})
		it("flagCounter counter increase when onContextMenu called", () => {
			const {result} = renderHook(useGame);
			act(() => { result.current.onContextMenu([0, 0])})
			expect(result.current.flagCounter).toBe(1);
		})
		it("flagCounter counter should stop when flagCounter > bombs", () => {
			const {result} = renderHook(useGame)
			expect(result.current.time).toBe(0);
			for(let y = 0; y < 3; y++) {
				for(let x = 0; x < 4; x++) {
					act(() => result.current.onContextMenu([y, x]))
				}
			}
			expect(result.current.flagCounter).toBe(10);
		})
	})
})