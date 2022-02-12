import {useState, useEffect} from "react";

export const useTime = (isGameStart: boolean, isGameOver: boolean): [number, () => void ]  => {
	const [time, setTime] = useState(0);
	
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if(isGameStart) {
			interval = setInterval(() => {setTime(time + 1)}, 1000);
			if(isGameOver) {
				clearInterval(interval);
			}
		}
		return () => {clearInterval(interval)}
	},
	// Stryker disable next-line ArrayDeclaration
	[isGameOver, isGameStart, time])

	const onReset = () => setTime(0);

	return [time, onReset];
}