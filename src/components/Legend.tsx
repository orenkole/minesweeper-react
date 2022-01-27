import React, {FC} from "react";
import styled from "@emotion/styled";

export const Legend: FC = () => {
	return (
		<Parent>
			<strong>flag: </strong>
			<FlagComboParent>
				<Key>ctrl</Key> + <Click>click</Click>
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

const Key = styled.span`
	color: red;
`;

const Click = styled.span`
	color: blue;
`;