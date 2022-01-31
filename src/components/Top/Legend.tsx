import React, {FC} from "react";
import styled from "@emotion/styled";

export interface LegendProps {
	/**
	 * Feature that sould be activated after first+second actions
	 */
	feature: string;
	/**
	 * First action
	 */
	firstAction: string;
	/**
	 * Second action
	 */
	secondAction?: string; 
}

export const Legend: FC<LegendProps> = (props) => {
	const {feature, firstAction, secondAction} = props;
	return (
		<Parent>
			<strong>{feature}</strong>
			<FlagComboParent>
				<FirstAction>{firstAction}</FirstAction> + <SecondAction>{secondAction}</SecondAction>
			</FlagComboParent>
		</Parent>
	)
}

const FlagComboParent = styled.code`
	background: grey;
`;

const Parent = styled.legend`
	font-size: 1em;
	margin: 0 auto 2vw;
	line-height: 1.25em;
`;

const FirstAction = styled.span`
	color: red;
`;

const SecondAction = styled.span`
	color: blue;
`;