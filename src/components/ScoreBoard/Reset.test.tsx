import React, {FC} from "react";
import {render, screen, fireEvent} from "@testing-library/react";

import {Reset} from "./Reset";

describe('Reset button check', () => {
	const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => null} />
	it('Should render elements with default state' , () => {
		render(<Reset onReset={() => null} />);
		//  screen.debug();
		expect(screen.getByText('🙂')).toBeInTheDocument();
	})
	it('onReset handler should be called' , () => {
		const onReset = jest.fn();
		render(<Reset onReset={onReset} />);
		fireEvent.click(screen.getByText('🙂'));
		expect(onReset).toBeCalled();
	})
	it('Should change state when onMouseDown and onMouseUp events happened' , () => { 
		render(<ResetWithDummyHandlerOnReset />)
		fireEvent.mouseDown(screen.getByText('🙂'))
		expect(screen.getByText('😯')).toBeInTheDocument();
		fireEvent.mouseUp(screen.getByText('😯'));
		expect(screen.getByText('🙂')).toBeInTheDocument();
	})
	it('Should change state hwen onMouseDown and onMouseLeave events happened' , () => { 
		render(<ResetWithDummyHandlerOnReset />)
		fireEvent.mouseDown(screen.getByText('🙂'))
		expect(screen.getByText('😯')).toBeInTheDocument();
		fireEvent.mouseLeave(screen.getByText('😯'));
		expect(screen.getByText('🙂')).toBeInTheDocument();
	})
})