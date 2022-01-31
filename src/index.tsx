import React, {FC} from "react";
import ReactDOM from "react-dom";
import { GameArea } from "./components/Game/GameArea";
import { GameOver } from "./components/Game/GameOver";
import { Wrapper } from "./components/Game/Wrapper";
import { Grid } from "./components/Grid/Grid";
import { ScoreBoard } from "./components/ScoreBoard";
import { Top } from "./components/Top/Top";
import { Field } from "./helpers/Field";

const staticField: Field = [
	[9, 1, 0, 0, 0, 0, 1, 1, 1],
	[1, 1, 1, 1, 1, 0, 1, 9, 1],
	[0, 0, 1, 9, 1, 0, 2, 2, 2],
	[0, 0, 1, 1, 2, 1, 2, 9, 1],
	[0, 1, 1, 1, 2, 9, 2, 1, 1],
	[0, 1, 9, 2, 2, 2, 1, 0, 0],
	[0, 1, 1, 2, 9, 1, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
]

interface GameProps {
	children: Field;
}

const Game: FC<GameProps> = () => {
	return (
		<Wrapper>
			<Top feature="Flag" firstAction="right click">Minesweeper</Top>
			<GameArea>
				<ScoreBoard
					time="0"
					mines="10"
					levels={['beginner', 'intermediate', 'expert']}
					onReset={() => null}
					onChange={() => null}
				/>
				<GameOver onClick={() => null} isWin={true} />
				<Grid
					onClick={() => null}
					onContextMenu={() => null}
				>
					{staticField}
				</Grid>
			</GameArea>
		</Wrapper>
	)
};

ReactDOM.render(
	<Game>{staticField}</Game>,
	document.getElementById('root'))