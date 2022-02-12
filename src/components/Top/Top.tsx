import React, {FC, memo} from "react";
import styled from "@emotion/styled";
import { GameName, GameNameProps } from "./GameName";
import { Legend, LegendProps } from "./Legend";

export type TopComponentType = LegendProps & GameNameProps;

export const Top: FC<TopComponentType> = memo((props) => {
	const {children, ...legendProps} = props;
	return <Header>
		<GameName>{children}</GameName>
		<Legend {...legendProps} />
	</Header>
})

Top.displayName = 'Top';

const Header = styled.header`
	text-align: center;
	position: relative;
	display: inline-block;
`;