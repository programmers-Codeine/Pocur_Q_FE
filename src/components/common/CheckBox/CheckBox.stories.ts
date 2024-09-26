import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CheckBox from './CheckBox';

const meta = {
  title: 'common/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  args: { onChange: fn() },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    id: 'personalInformation',
    label: '[필수] 개인정보 수집 및 이용 동의',
    isBold: true,
    checked: true,
  },
};

export const Noraml: Story = {
  args: {
    id: 'marketing',
    label: '[선택] 마케팅 정보 수신에 대한 동의',
    isBold: false,
    checked: false,
  },
};
