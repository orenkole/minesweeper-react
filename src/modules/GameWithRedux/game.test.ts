import { CellState, Field } from '@/core/Field';
import { GameSettings } from '@/modules/GameSettings';

import { actions, reducer, State } from './game';
const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

describe('Game reducer', () => {
  const level = 'beginner';
  const baseInitialState: State = {
    level,
    time: 0,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    isTimerRunning: false,
    settings: GameSettings[level],
    bombs: 1,
    flagCounter: 0,
    gameField: [
      [9, 1],
      [1, 1],
    ],
    playerField: [
      [h, h],
      [h, h],
    ],
  };

  describe('Check action openCell', () => {
    it('Check openCell to cell with a number', () => {
      expect(reducer(baseInitialState, actions.openCell([1, 1]))).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: [
          [h, h],
          [h, 1],
        ],
      });
    });
		it('Check openCell to cell with a bomb', () => {
      expect(reducer(baseInitialState, actions.openCell([0, 0]))).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: false,
        isGameOver: true,
        playerField: baseInitialState.gameField,
      });
    });
		it('Check openCell to cell with a flag', () => {
      const playerFieldWithFlag = [
        [h, h],
        [h, f],
      ] as Field;
      expect(
        reducer(
          {
            ...baseInitialState,
            isGameStarted: true,
            playerField: playerFieldWithFlag,
          },
          actions.openCell([1, 1])
        )
      ).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: playerFieldWithFlag,
      });
		});
  });

	describe('Check action setFlag', () => {
    it('Check setFlag', () => {
      const state1 = reducer(baseInitialState, actions.setFlag([1, 1]));

      expect(state1).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        flagCounter: 1,
        playerField: [
          [h, h],
          [h, f],
        ],
      });

      const state2 = reducer(state1, actions.setFlag([1, 1]));

      expect(state2).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        flagCounter: 1,
        playerField: [
          [h, h],
          [h, w],
        ],
      });

      expect(reducer(state2, actions.setFlag([1, 1]))).toEqual({
        ...baseInitialState,
        isGameStarted: true,
      });
    });
  });
	describe('Win flow', () => {
    it('Setup flag on the last step', () => {
      const state1 = reducer(baseInitialState, actions.openCell([1, 0]));
      const state2 = reducer(state1, actions.openCell([0, 1]));
      const state3 = reducer(state2, actions.openCell([1, 1]));
      const state4 = reducer(state3, actions.setFlag([0, 0]));

      expect(state4).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: true,
        isGameOver: true,
        flagCounter: 1,
        playerField: [
          [f, 1],
          [1, 1],
        ],
      });
    });
    it('Open cell on the last step', () => {
      const state1 = reducer(baseInitialState, actions.setFlag([0, 0]));
      const state2 = reducer(state1, actions.openCell([1, 0]));
      const state3 = reducer(state2, actions.openCell([0, 1]));
      const state4 = reducer(state3, actions.openCell([1, 1]));

      expect(state4).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: true,
        isGameOver: true,
        flagCounter: 1,
        playerField: [
          [f, 1],
          [1, 1],
        ],
      });
    });
  });
});