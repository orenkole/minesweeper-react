import React, {FC, useMemo, useState} from "react";

import { GameArea } from "@/components/Game/GameArea";
import { CellState, Coords, emptyFieldGenerator, Field, fieldGenerator } from "@/helpers/Field";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Wrapper } from "@/components/Game/Wrapper";
import { GameOver } from "@/components/Game/GameOver";
import { Grid } from "@/components/Grid/Grid";
import { Top } from "@/components/Top/Top";
import { GameLevels, GameSettings, LevelNames } from "../GameSettings";
import { openCell } from "@/helpers/openCell";

export const GameWithHooks: FC = () => {
	const [level, setLevel] = useState<LevelNames>('beginner');

	const [isGameOver, setIsGameOver] = useState(false);

	const [isWin, setIsWin] = useState(false); 

	const [size, bombs] = GameSettings[level];

	const [gameField, setGameField] = useState<Field>(
		fieldGenerator(size, bombs / (size * size))
	);

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	)

	const onClick = (coords: Coords) => {
		try {
			const newPlayerField = openCell(coords, playerField, gameField);
			setPlayerField([...newPlayerField]);
		} catch (err) {
			// on loose we reveal all field
			setPlayerField([...gameField])
			setIsGameOver(true);
		}
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
	}: React.ChangeEvent<HTMLSelectElement>) => {
		setLevel(level as LevelNames);
		const newSettings = GameSettings[level];
		onResetHandler(newSettings)
	}

	const onReset = () => onResetHandler([size, bombs]);

	return (
		<Wrapper>
			<Top feature="Flag" firstAction="right click">Minesweeper</Top>
			<GameArea>
				<ScoreBoard
					time="0"
					mines="10"
					levels={GameLevels}
					onReset={onReset}
					onChange={onChangeLevel}
					defaultLevel={level}
				/>
				{isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
				<Grid
					onClick={onClick}
					onContextMenu={() => null}
				>
					{playerField}
				</Grid>
			</GameArea>
		</Wrapper>
	)
};