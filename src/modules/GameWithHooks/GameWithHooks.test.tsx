import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameWithHooks } from "./GameWithHooks";

describe("GameWithHooks test cases", () => {
	describe("Render behavior", () => {
		it("Render game field by default", () => {
			const {asFragment} = render(<GameWithHooks />);
			expect(screen.getAllByRole('cell')).toHaveLength(81);
		})
	})
	it("onChange game level handler", () => {
		render(<GameWithHooks />);
		expect(screen.getAllByRole('cell')).toHaveLength(81);
		userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate');
		expect(screen.getAllByRole('cell')).toHaveLength(256);
		userEvent.selectOptions(screen.getByRole('combobox'), 'expert');
		expect(screen.getAllByRole('cell')).toHaveLength(484);
	})
})