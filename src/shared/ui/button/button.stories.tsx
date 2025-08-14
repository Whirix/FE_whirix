import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }, 
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Primary Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const Small: Story = {
  args: { children: 'Small Button', size: 'sm' },
};