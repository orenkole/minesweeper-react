import React, {useCallback, useState} from "react";

import { CellState, Coords, emptyFieldGenerator, Field, fieldGenerator } from "@/core/Field";
import { LevelNames } from "../GameSettings";
import { openCell } from "@/core/openCell";
import { setFlag } from "@/core/setFlag";
import { useTime } from "./useTime";
import { useStatus } from "./useStatus";
import { useSettings } from "./useSettings";

interface ReturnType {
	level: LevelNames;
	isGameOver: boolean;
	isWin: boolean;
	settings: [number, number];
	playerField: Field;
	gameField: Field;
	onClick: (coords: Coords) => void;
	onContextMenu: (coords: Coords) => void;
	onChangeLevel: ({target: {value: level}}: {target: {value: LevelNames}}) => void;
	onReset: () => void;
	time: number;
	flagCounter: number;
	isGameStart : boolean;
}

export const useGame = (): ReturnType => {
	const {
		settings: [size, bombs],
		level,
		setLevel,
	} = useSettings();

	const {
		isGameStart,
		isWin,
		isGameOver,
		setNewGame,
		setInProgress,
		setGameWin,
		setGameLoose,
	} = useStatus();

	const [time, resetTime] = useTime(isGameStart, isGameOver);

	const [flagCounter, setFlagCounter] = useState(0);

	const [gameField, setGameField] = useState<Field>(
		fieldGenerator(size, bombs / (size * size))
	);

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	)

	const onClick = useCallback((coords: Coords) => {
		!isGameStart && setInProgress();
		try {
			const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
			if(isSolved) {
				setGameWin();
			}
			setPlayerField([...newPlayerField]);
		} catch (err) {
			// on loose we reveal all field
			setPlayerField([...gameField])
			setGameLoose();
		}
	}, [isGameStart, isGameOver, isWin, level, flagCounter])

	const onContextMenu = useCallback((coords: Coords) => {
		!isGameStart && setInProgress();
		const [newPlayerField, isSolved, newFlagCounter] = 
			setFlag(coords, playerField, gameField, flagCounter, bombs);
		setFlagCounter(newFlagCounter)
		if(isSolved) {
			setGameWin();
		}
		setPlayerField([...newPlayerField])
	}, [isGameStart, isGameOver, isWin, level, flagCounter])

	const onResetHandler = ([size, bombs]: [number, number]) => {
		const newGameField = fieldGenerator(size, bombs / (size * size))
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
		setGameField([...newGameField])
		setPlayerField([...newPlayerField])
		setNewGame();
		resetTime();
	}

	const onChangeLevel = useCallback(({
		target: {value: level},
	}: {target: {value: LevelNames}}) => {
		const newSettings = setLevel(level);
		onResetHandler(newSettings)
	}, [])

	const onReset = useCallback(() => onResetHandler([size, bombs]), [size, bombs]);

	return {
		level,
		isGameOver,
		isWin,
		settings: [size, bombs],
		playerField,
		gameField,
		onClick,
		onContextMenu,
		onChangeLevel,
		onReset,
		time,
		flagCounter,
		isGameStart,
	}
}