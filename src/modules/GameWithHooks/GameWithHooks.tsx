import React, {FC} from "react";

import { GameArea } from "@/components/Game/GameArea";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Wrapper } from "@/components/Game/Wrapper";
import { GameOver } from "@/components/Game/GameOver";
import { Grid } from "@/components/Grid/Grid";
import { Top } from "@/components/Top/Top";
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
		onChangeLevel,
		onReset,
	} = useGame();

	const [, bombs] = settings;
	
	return (
		<Wrapper>
			<Top feature="Flag" firstAction="right click">Minesweeper</Top>
			<GameArea>
				<ScoreBoard
					time="0"
					mines={String(bombs)}
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