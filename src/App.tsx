import React, {FC} from "react";

import {BrowserRouter as Router, Route, Link, Routes, Navigate} from "react-router-dom";
import { MinesweeperWithHooks } from "./pages/MinesweeperWithHooks";

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>;

export const NotFoundPage = () => <h2>Page not found</h2>

export const App: FC = () => (
	<Router>
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/game-with-hooks">Game with hooks</Link>
				</li>
			</ul>
		</nav>
		<Routes>
			<Route path="/game-with-hooks" element={<MinesweeperWithHooks />} />
			<Route path="/game-with-hooks/:username" element={<MinesweeperWithHooks />} />
			<Route path="/" element={<Home />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</Router>
)