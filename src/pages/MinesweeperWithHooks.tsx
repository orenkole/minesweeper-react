import React, { FC } from 'react';

import { GameLayout } from '@/components/Game/GameLayout';
import { Top } from '@/components/Top/Top';
import { GameWithHooks } from '@/modules/GameWithHooks';
import { useParams } from 'react-router';
import {useQuery} from '@/components/hooks/useQuery';

export const MinesweeperWithHooks: FC = () => {
	const {username} = useParams<{username?: string}>();
	
	const query = useQuery();
	const id = Number(useQuery().get('id'))

	return (
		<GameLayout
			top={
				<Top feature="flag" firstAction="right click">
					Minesweeper with ReactHooks
					{username && `, ${username}`}
					{id &&`; userId: ${id}`}
				</Top>
			}
		>
			<GameWithHooks />
		</GameLayout>
	)
}