import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ItemButton from './ItemButton';

const meta = {
  title: 'common/ItemButton',
  component: ItemButton,
  parameters: {
    layout: 'centered',
  },
  args: { onContextMenu: fn() },
} satisfies Meta<typeof ItemButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '메인메뉴',
    state: 'normal',
  },
};

export const Active: Story = {
  args: {
    title: '사이드메뉴',
    state: 'active',
  },
};
