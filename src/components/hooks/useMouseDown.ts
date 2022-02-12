import {useState, useDebugValue, useCallback} from "react";

export type SetMouseDownStatus = () => void;
export type SetMouseUpStatus = () => void;

export const useMouseDown = (): [
	boolean,
	SetMouseDownStatus,
	SetMouseUpStatus
] => {
	const [mouseDown, setMouseDown] = useState(false);

	useDebugValue(`mouseDown: ${mouseDown}`)

	const onMouseDown = useCallback(
		() => setMouseDown(true),
		// Stryker disable next-line ArrayDeclaration
		[]
	)
	const onMouseUp = () => setMouseDown(false);
	return [mouseDown, onMouseDown, onMouseUp];
}