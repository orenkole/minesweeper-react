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

	const [size, bombs] = GameSettings[level];

	const gameField = useMemo(
		() => fieldGenerator(size, bombs / (size * size)),
		[size, bombs]
	);

	const [playerField, setPlayerField] = useState<Field>(
		emptyFieldGenerator(size, CellState.hidden)
	)

	const onClick = (coords: Coords) => {
		const newPlayerField = openCell(coords, playerField, gameField);
		setPlayerField([...newPlayerField]);
	}

	const onChangeLevel = ({
		target: {value: level},
	}: React.ChangeEvent<HTMLSelectElement>) => {
		setLevel(level as LevelNames);
		const [size, bombs] = GameSettings[level];
		const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
		setPlayerField([...newPlayerField]);
	}

	return (
		<Wrapper>
			<Top feature="Flag" firstAction="right click">Minesweeper</Top>
			<GameArea>
				<ScoreBoard
					time="0"
					mines="10"
					levels={GameLevels}
					onReset={() => null}
					onChange={onChangeLevel}
					defaultLevel={level}
				/>
				<GameOver onClick={() => null} isWin={true} />
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