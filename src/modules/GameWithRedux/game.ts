import {AnyAction, Reducer} from "redux";
import { CellState, Coords, Field, fieldGenerator } from "@/core/Field";
import { GameSettings, LevelNames } from "../GameSettings";
import { openCell as openCellHandler } from "@/core/openCell";

export interface State {
  level: LevelNames;
  time: number;
  bombs: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  isTimerRunning: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
}

export const getInitialState = (level: LevelNames = 'beginner'): State => {
  const settings = GameSettings[level];
  const [size, bombs] = settings;

  return {
    level,
    time: 0,
    bombs,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    isTimerRunning: false,
    settings,
    flagCounter: 0,
    playerField: fieldGenerator(size, CellState.hidden),
    gameField: fieldGenerator(size, bombs / (size * size)),
  };
};

// Actions
const OPEN_CELL = 'modules/GameWithRedux/OPEN_CELL';

// Action creators
export const openCell = (coords: Coords): AnyAction => ({
	type: OPEN_CELL,
	payload: { coords },
})

// Reducer
export const reducer: Reducer<State> = (
	state = getInitialState(),
	action: AnyAction
) => {
	const {playerField, gameField} = state;
	switch (action.type) {
		case OPEN_CELL: {
			const {
				payload: {coords},
			} = action;
			try {
				const [newPlayerField, isSolved] = openCellHandler(
					coords,
					playerField,
					gameField,
				)
				return {
					...state,
					isGameStarted: true,
					isGameOver: isSolved,
					isWin: isSolved,
					playerField: newPlayerField,
				};
			} catch(err) {
				return {
					...state,
					isGameStarted: false,
					isGameOver: true,
					isWin: false,
					playerField: gameField,
				};
			}
		}
		default:
			return state;
	}
}