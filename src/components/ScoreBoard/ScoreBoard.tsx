import React, {FC} from "react";
import styled from "@emotion/styled";
import { Counter } from "./Counter.stories";
import { Reset } from "./Reset";
import { Level } from "./Level";

export interface ScoreboardProps {
	/**
	 * Timer
	 */
	time: string;
	
	/**
	 * Possible game scenarios
	 */
	levels: string[];

	/**
	 * Action handler when the GameReset butoon is clicked
	 */
	onReset: () => void;

	/**
	 * Bombs in the field
	 */
	mines: string;
}

export const ScoreBoard: FC<ScoreboardProps> = ({
  time,
  levels,
  mines,
  onReset,
}) => (
  <Wrapper>
    <Counter>{time}</Counter>
    <div>
      <Level>
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
