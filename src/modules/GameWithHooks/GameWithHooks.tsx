import React, {FC, useState} from "react";

import { GameArea } from "@/components/Game/GameArea";
import { CellState, emptyFieldGenerator, Field } from "@/helpers/Field";
import { ScoreBoard } from "@/components/ScoreBoard";
import { Wrapper } from "@/components/Game/Wrapper";
import { GameOver } from "@/components/Game/GameOver";
import { Grid } from "@/components/Grid/Grid";
import { Top } from "@/components/Top/Top";
import { GameLevels, GameSettings, LevelNames } from "../GameSettings";

export const GameWithHooks: FC = () => {
	const [level, setLevel] = useState<LevelNames>('beginner');

	const [size, bombs] = GameSettings[level];
	const playerField = emptyFieldGenerator(size, CellState.hidden);

	return (
		<Wrapper>
			<Top feature="Flag" firstAction="right click">Minesweeper</Top>
			<GameArea>
				<ScoreBoard
					time="0"
					mines="10"
					levels={GameLevels}
					onReset={() => null}
					onChange={({target: {value}}: {target: {value: LevelNames[number]}}) => setLevel(value)}
					defaultLevel={level}
				/>
				<GameOver onClick={() => null} isWin={true} />
				<Grid
					onClick={() => null}
					onContextMenu={() => null}
				>
					{playerField}
				</Grid>
			</GameArea>
		</Wrapper>
	)
};