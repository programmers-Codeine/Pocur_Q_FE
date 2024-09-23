import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';

const meta = {
  title: 'common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: '메뉴판 관리',
    type: 'menu',
    state: 'normal',
  },
};

export const ActiveBasic: Story = {
  args: {
    title: '메뉴판 관리',
    type: 'menu',
    state: 'active',
  },
};

export const Others: Story = {
  args: {
    title: '결제하기',
    type: 'others',
  },
};
