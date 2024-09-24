import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ContextOptions from './ContextOptions';

const meta = {
  title: 'common/ContextOptions',
  component: ContextOptions,
  parameters: {
    layout: 'centered',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ContextOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { id: 1, name: '적용하기' },
      { id: 2, name: '수정하기' },
      { id: 3, name: '삭제하기' },
    ],
  },
};
