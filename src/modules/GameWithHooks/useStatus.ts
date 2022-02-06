import {useState} from "react";

export interface ReturnType {
	isGameOver: boolean;
	isWin: boolean;
	isGameStart: boolean;
	setNewGame: () => void;
	setInProgress: () => void;
	setGameWin: () => void;
	setGameLoose: () => void;
}

export enum GameStatuses {
	NewGame,
	InProgress,
	Win,
	Loose,
}

export const useStatus = (): ReturnType => {
	const {NewGame, InProgress, Win, Loose} = GameStatuses;

	const [isGameOver, setIsGameOver] = useState(false);
	const [isWin, setIsWin] = useState(false);
	const [isGameStart, setIsGameStart] = useState(false);

	const setGameStatus = (status: GameStatuses) => {
		setIsGameStart(status === InProgress);
		setIsWin(status === Win);
		setIsGameOver([Win, Loose].includes(status));
	}

	const setNewGame = () => setGameStatus(NewGame);
	const setInProgress = () => setGameStatus(InProgress);
	const setGameWin = () => setGameStatus(Win);
	const setGameLoose = () => setGameStatus(Loose);


	return {
		isGameOver,
		isWin,
		isGameStart,
		setNewGame,
		setInProgress,
		setGameWin,
		setGameLoose,
	}
}