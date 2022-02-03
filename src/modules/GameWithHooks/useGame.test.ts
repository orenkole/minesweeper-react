import { CellState, Field } from "@/helpers/Field";
import {renderHook, act} from "@testing-library/react-hooks";
import { GameLevels, GameSettings } from "../GameSettings";
import {useGame} from "./useGame";

jest.mock("@/helpers/Field")

const [beginner, intermediate, expert] = GameLevels;

const { empty: e, hidden: h, bomb: b } = CellState;

const flatWithFilter = (field: Field, cond: number) => field.flat().filter((v) => v === cond);

describe("GameWithHooks test cases", () => {
	it("Render game field by default", () => {})
	it("Render game field by default", () => {})
	it("Render game field by default", () => {})
	it("Render game field by default", () => {})
	it("Render game field by default", () => {})
})