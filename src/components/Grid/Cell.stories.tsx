import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Cell, CellProps } from './Cell';
import { CellState } from '@/core/Field';

export default {
  title: 'Grid/Cell',
  component: Cell,
  argTypes: {
    coords: {defaultValue: [1, 1]},
  },
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: CellState.hidden,
}

export const CellIsEmpty = Template.bind({});
CellIsEmpty.args = {
  children: CellState.empty, 
}

export const CellWithBomb = Template.bind({});
CellWithBomb.args = {
  children: CellState.bomb, 
}

export const CellWithFlag = Template.bind({});
CellWithFlag.args = {
  children: CellState.flag, 
}

export const CellWithWeakFlag = Template.bind({});
CellWithWeakFlag.args = {
  children: CellState.weakFlag, 
}

export const CellWith1 = Template.bind({});
CellWith1.args = {
  children: 1,
};

export const CellWith3 = Template.bind({});
CellWith3.args = {
  children: 3,
};

export const CellWith5 = Template.bind({});
CellWith5.args = {
  children: 5,
};

export const CellWith8 = Template.bind({});
CellWith8.args = {
  children: 8,
};