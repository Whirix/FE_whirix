import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './card'

const meta: Meta<typeof Card> = {
  title: 'shared/ui/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled'],
    },
    children: {
      control: false,
    },
    header: {
      control: false,
    },
    footer: {
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  name: 'Default (Elevated)',
  args: {
    variant: 'default',
    children: (
      <>
        <h2 className="mb-2 text-xl font-semibold">Default Card</h2>
        <p className="text-gray-700">This is the default card with a shadow.</p>
      </>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <h2 className="mb-2 text-xl font-semibold">Outlined Card</h2>
        <p className="text-gray-700">This card has a visible border.</p>
      </>
    ),
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <h2 className="mb-2 text-xl font-semibold">Filled Card</h2>
        <p className="text-gray-700">This card has a different background color.</p>
      </>
    ),
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    variant: 'outlined',
    header: <h2 className="text-xl font-bold">This is the Header</h2>,
    children: (
      <p>
        This card demonstrates the header and footer sections. You can pass any React node into
        them.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">Cancel</button>
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Submit
        </button>
      </div>
    ),
  },
}

export const AccessibleCard: Story = {
  name: 'Accessibility Example',
  args: {
    variant: 'default',
    ariaLabelledby: 'accessible-card-title',
    header: (
      <h2 id="accessible-card-title" className="text-xl font-bold">
        Accessible Card Title
      </h2>
    ),
    children: (
      <p>
        This card has an `aria-labelledby` attribute that points to the title's id. Screen readers
        will announce the title when this card is focused.
      </p>
    ),
  },
}
