import React, {useState} from "react";

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
}

export const useGame = (): ReturnType => {
	const [level, setLevel] = useState<LevelNames>('beginner');

	const [isGameOver, setIsGameOver] = useState(false);

	const [isWin, setIsWin] = useState(false); 

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

	const onClick = (coords: Coords) => {
		try {
			const [newPlayerField, isSolved, flagCounter] = openCell(coords, playerField, gameField);
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
		const [newPlayerField, isSolved, flagCounter] = setFlag(coords, playerField, gameField);
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
	}
}