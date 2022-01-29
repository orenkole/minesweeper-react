import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Cell, CellProps } from './Cell';

export default {
  title: 'Grid/Cell',
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellClosed = Template.bind({});
CellClosed.args = {
  children: 10,
}

export const CellIsEmpty = Template.bind({});
CellIsEmpty.args = {
  children: 0, 
}