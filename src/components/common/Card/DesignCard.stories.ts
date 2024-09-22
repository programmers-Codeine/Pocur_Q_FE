import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DesignCard from './DesignCard';

const meta = {
  title: 'Card/DesignCard',
  component: DesignCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onContextMenu: fn() },
} satisfies Meta<typeof DesignCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const normal: Story = {
  args: {
    title: '디자인 이름',
    edit: '최근에 수정됨',
    state: 'normal',
  },
};

export const active: Story = {
  args: {
    title: '선택된 디자인 이름',
    edit: '최근에 수정됨',
    state: 'active',
  },
};
