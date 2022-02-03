import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameWithHooks } from "./GameWithHooks";
import { CellState } from "@/helpers/Field";

const {empty: e, hidden: h, bomb: b, flag: f} = CellState;

jest.mock("@/helpers/Field");

describe("GameWithHooks test cases", () => {
	describe("Render game field by default", () => {})
	it("Cell click works fine", () => {})
	it("Reset handler works fine", () => {})
	it("Change level works fine", () => {})
	it("Game over works fine", () => {})
})