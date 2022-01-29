import React from "react";
import ReactDOM from "react-dom";

import { ScoreBoard } from "./components/ScoreBoard/ScoreBoard";
import { Top } from "./components/Top/Top";

ReactDOM.render(
	<>
		<Top feature='Flag' firstAction='ctrl' secondAction='click'>Minesweeper</Top>
		<ScoreBoard
			time="000"
			levels={['beginner', 'intermediate', 'expert']}
			mines='010'
			onReset={() => null}
		/>
	</>
	, document.getElementById('root'))