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
})