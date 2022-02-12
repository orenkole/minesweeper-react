import React, {FC} from "react";
import {render, screen, fireEvent, createEvent} from "@testing-library/react";
import { CellState, Coords, Cell as CellType} from "@/core/Field";
import { areEqual, Cell, checkCellIsActive } from "./Cell";

describe("Cell component check", () => {
	const coords: Coords = [1, 1];
	const props = {
		coords,
		flagCounter: 0,
		bombs: 10,
		onClick: jest.fn(),
		onContextMenu: jest.fn(),
	}

	for(let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
		it("Check prevent default contextMenu for every type of cell", () => {
			const props = {
				coords,
				onClick: jest.fn(),
				onContextMenu: jest.fn(),
			}
			render(<Cell {...props}>{cell}</Cell>)
			const cellComp = screen.getByTestId(`${coords}`);
			const contextMenuEvent = createEvent.contextMenu(cellComp);
			fireEvent(cellComp, contextMenuEvent); // Note: return
			expect(contextMenuEvent.defaultPrevented).toBe(true);
		})
		it("onClick and onContextMenu handler should be called for active cells", () => {
			const props = {
				coords,
				onClick: jest.fn(),
				onContextMenu: jest.fn(),
			}
			render(<Cell {...props}>{cell}</Cell>)
			const cellComp = screen.getByTestId(`${coords}`);
			fireEvent.click(cellComp);
			fireEvent.contextMenu(cellComp);
			if(checkCellIsActive(cell)) {
				expect(props.onClick).toBeCalled();
				expect(props.onContextMenu).toBeCalled();
			} else {
				expect(props.onClick).not.toBeCalled();
				expect(props.onContextMenu).not.toBeCalled();
			}
		})
		it("Check areEqual", () => {
			const prevProps = {
				...props,
				children: 0 as CellType,
			}

			expect(areEqual(prevProps, {...prevProps, coords: [2, 1]})).toBe(false);
			expect(areEqual(prevProps, {...prevProps, children: 1 as CellType})).toBe(false);
			expect(areEqual(prevProps, {...prevProps, onClick: jest.fn()})).toBe(false);
			expect(areEqual(prevProps, {...prevProps, onContextMenu: jest.fn()})).toBe(false);
		})
	}
})