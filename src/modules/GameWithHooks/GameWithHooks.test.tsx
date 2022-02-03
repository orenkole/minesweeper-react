import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameWithHooks } from "./GameWithHooks";
import { CellState } from "@/helpers/Field";

const {empty: e, hidden: h, bomb: b, flag: f} = CellState;

jest.mock("@/helpers/Field");

describe("GameWithHooks test cases", () => {
	// describe("Render behavior", () => {
	// 	it("Render game field by default", () => {
	// 		const {asFragment} = render(<GameWithHooks />);
	// 		expect(screen.getAllByRole('cell')).toHaveLength(81);
	// 	})
	// })
	// it("onChange game level handler", () => {
	// 	render(<GameWithHooks />);
	// 	expect(screen.getAllByRole('cell')).toHaveLength(81);
	// 	userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
	// 	expect(screen.getAllByRole('cell')).toHaveLength(256);
	// 	userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
	// 	expect(screen.getAllByRole('cell')).toHaveLength(484);
	// })
	describe("Open cell test cases", () => {
		it("Open empty cell on the beginner level", () => {
			render(<GameWithHooks />);
			userEvent.click(screen.getByTestId('0,0'));
			screen.debug();
			expect(screen.queryAllByRole('cell', { name: String(e)})).toHaveLength(18)
		})
	})
	it("Click to the non-empty cells area", () => {
		render(<GameWithHooks />)
		userEvent.click(screen.getByTestId('0,8'));
		expect(screen.queryAllByRole('cell', {name: String(1)})).toHaveLength(1);
	})
})