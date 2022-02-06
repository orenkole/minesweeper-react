import React, {useEffect, useState} from "react";

import { CellState, Coords, emptyFieldGenerator, Field, fieldGenerator } from "@/helpers/Field";
import { GameSettings, LevelNames } from "../GameSettings";
import { openCell } from "@/helpers/openCell";
import { setFlag } from "@/helpers/setFlag";


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
	const [level, setLevel] = useState<LevelNames>('beginner');

	const [isGameOver, setIsGameOver] = useState(false);

	const [isWin, setIsWin] = useState(false); 

	const [isGameStart, setIsGameStart] = useState(false);

	const [time, setTime] = useState(0);

	const [flagCounter, setFlagCounter] = useState(0);

	const setGameOver = (isSolved = false) => {
		setIsGameOver(true);
		setIsWin(isSolved);
	}

	const [size, bombs] = GameSettings[level];

	const [gameField, setGameField] = useState<Field>(
		fieldGenerator(size, bombs / (size * size))
	);

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	)

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if(isGameStart) {
			interval = setInterval(() => {setTime(time + 1)}, 1000);
			if(isGameOver) {
				clearInterval(interval);
			}
		}
		return () => {clearInterval(interval)}
	}, [isGameOver, isGameStart, time])

	const onClick = (coords: Coords) => {
		!isGameStart && setIsGameStart(true);
		try {
			const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
			if(isSolved) {
				setGameOver(isSolved);
			}
			setPlayerField([...newPlayerField]);
		} catch (err) {
			// on loose we reveal all field
			setPlayerField([...gameField])
			setGameOver(false);
		}
	}

	const onContextMenu = (coords: Coords) => {
		!isGameStart && setIsGameStart(true);
		const [newPlayerField, isSolved, newFlagCounter] = 
			setFlag(coords, playerField, gameField, flagCounter, bombs);
		setFlagCounter(newFlagCounter)
		if(isSolved) {
			setGameOver(isSolved);
		}
		setPlayerField([...newPlayerField])
	}

	const onResetHandler = ([size, bombs]: [number, number]) => {
		const newGameField = fieldGenerator(size, bombs / (size * size))
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
		setGameField([...newGameField])
		setPlayerField([...newPlayerField])
		setIsGameOver(false);
		setIsWin(false);
		setIsGameStart(false);
		setTime(0);
	}

	const onChangeLevel = ({
		target: {value: level},
	}: {target: {value: LevelNames}}) => {
		setLevel(level as LevelNames);
		const newSettings = GameSettings[level];
		onResetHandler(newSettings)
	}

	const onReset = () => onResetHandler([size, bombs]);

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