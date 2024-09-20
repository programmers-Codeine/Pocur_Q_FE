import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button2 from './Button2';

const meta = {
  title: 'Example/Button2',
  component: Button2,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    children: '로그인',
    type: 'button',
    color: 'primary',
    size: 'medium',
  },
};

export const Second: Story = {
  args: {
    children: '로그인',
    type: 'submit',
    color: 'second',
    size: 'large',
  },
};
