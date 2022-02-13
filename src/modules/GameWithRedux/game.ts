import { CellState, Coords, Field, fieldGenerator } from "@/core/Field";
import { GameSettings, LevelNames } from "../GameSettings";
import { openCell as openCellHandler } from "@/core/openCell";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setFlag } from "@/core/setFlag";

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
    playerField: fieldGenerator(size, 0.5),
    gameField: fieldGenerator(size, bombs / (size * size)),
  };
};

export const {reducer, actions} = createSlice({
	name: 'game',
	initialState: getInitialState(),
	reducers: {
		openCell: (state, {payload}: PayloadAction<Coords>) => {
			const {playerField, gameField} = state;
			try {
				const [newPlayerField, isSolved] = openCellHandler(
					payload,
					playerField,
					gameField,
				)
				state.isGameStarted = !isSolved;
				state.isGameOver = isSolved;
				state.isWin = isSolved;
				state.playerField = newPlayerField;
			} catch(err) {
				state.isGameStarted = false;
				state.isGameOver = true;
				state.isWin = false;
				state.playerField = gameField;
			}
		},
		setFlag:  (state, {payload}: PayloadAction<Coords>) => {
			const { playerField, gameField, flagCounter, bombs } = state;
			const [newPlayerField, isSolved, newFlagCounter] = setFlag(
				payload,
				playerField,
				gameField,
				flagCounter,
				bombs
			)
			state.isGameStarted = !isSolved;
			state.isGameOver = isSolved;
			state.isWin = isSolved;
			state.playerField = newPlayerField;
			state.flagCounter = newFlagCounter;
			state.playerField = newPlayerField;
		},
		reset: ({level}) => getInitialState(level),
		changeLevel: (state, {payload}: PayloadAction<LevelNames>) => getInitialState(payload),
	}
})