import React, {FC, useCallback} from "react";

import { ScoreBoard } from "@/components/ScoreBoard";
import { GameOver } from "@/components/Game/GameOver";
import { Grid } from "@/components/Grid/Grid";
import { GameLevels } from "../GameSettings";
import { useGame } from "./useGame";

export const GameWithHooks: FC = () => {
	const {
		level,
		isGameOver,
		isWin,
		settings,
		playerField,
		onClick,
		onContextMenu,
		onChangeLevel,
		onReset,
		time,
		flagCounter,
	} = useGame();

	const [, bombs] = settings;
	const onChangeLevelHandler = useCallback(onChangeLevel,
	// Stryker disable next-line ArrayDeclaration
	[]
)
	
	return (
		<>
			<ScoreBoard
				time={String(time)}
				mines={String(bombs - flagCounter)}
				levels={GameLevels}
				onReset={onReset}
				onChange={onChangeLevelHandler}
				defaultLevel={level}
			/>
			{isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
			<Grid
				onClick={onClick}
				onContextMenu={onContextMenu}
			>
				{playerField}
			</Grid>
		</>
	)
};