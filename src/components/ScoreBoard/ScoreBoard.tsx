import React, {FC} from "react";
import styled from "@emotion/styled";
import { Counter } from "./Counter.stories";
import { Reset } from "./Reset";
import { Level } from "./Level";
import { GameLevels, LevelNames } from "@/modules/GameSettings";

export interface ScoreboardProps {
	/**
	 * Timer
	 */
	time: string;
	
	/**
	 * Possible game scenarios
	 */
	levels: typeof GameLevels;

	/**
	 * Action handler when the GameReset butoon is clicked
	 */
	onReset: () => void;

	onChange: ({
		target: {value},
	}: React.ChangeEvent<HTMLSelectElement>) => void;

	/**
	 * Bombs in the field
	 */
	mines: string;
	defaultLevel: string;
}

export const ScoreBoard: FC<ScoreboardProps> = ({
  time,
  levels,
  mines,
  onReset,
	onChange,
}) => (
  <Wrapper>
    <Counter>{time}</Counter>
    <div>
      <Level onChange={onChange}>
        {levels}
      </Level>
      <Reset onReset={onReset} />
    </div>
    <Counter>{mines}</Counter>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  justify-content: space-between;
	padding-bottom: 2vw;
`;
