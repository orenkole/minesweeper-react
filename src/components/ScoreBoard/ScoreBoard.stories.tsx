import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ScoreBoard, ScoreboardProps } from './ScoreBoard';

export default {
  title: 'Scoreboard/Scoreboard',
  component: ScoreBoard,
} as Meta;

const Template: Story<ScoreboardProps> = (args) => <ScoreBoard {...args} />;

export const ScoreboardExample = Template.bind({});
ScoreboardExample.args = {
  time: '000',
  levels: ['beginner', 'intermediate', 'expert'],
  mines: '010',
};