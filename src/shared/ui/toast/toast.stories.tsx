import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { useToastStore } from '../../hooks/use-toast'
import { Toaster } from './toast'
export const InteractiveToast: Story = {
  name: '버튼 클릭으로 토스트',
  render: (args: StoryArgs) => {
    const { addToast } = useToastStore()
    const [count, setCount] = useState(0)
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            addToast(args.message || '테스트 메시지', args.variant || 'success')
            setCount((c) => c + 1)
          }}
        >
          토스트 띄우기
        </button>
        <span className="text-sm text-gray-500">{count}번 클릭됨</span>
        <Toaster position={args.position} />
      </div>
    )
  },
  args: {
    position: 'bottom-right',
    variant: 'success',
    message: '버튼으로 토스트!',
  },
  parameters: {
    docs: { description: { story: '버튼을 클릭하면 토스트가 표시됩니다.' } },
  },
}

// ToasterProps에 variant, message 확장
type StoryArgs = {
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right'
  variant?: 'success' | 'error' | 'info' | 'warning'
  message?: string
}

const meta: Meta<typeof Toaster> = {
  title: 'shared/ui/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toaster 컴포넌트는 position prop을 통해 토스트의 위치를 지정할 수 있습니다. 실제 토스트 메시지는 useToastStore를 통해 관리됩니다.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom-left', 'bottom-center', 'bottom-right'],
      defaultValue: 'bottom-right',
      description: '토스트 위치',
    },
  },
}
export default meta

type Story = StoryObj<typeof Toaster> & { args: StoryArgs }

const ToastStory = (args: StoryArgs) => {
  const { addToast, toasts } = useToastStore()
  useEffect(() => {
    // 스토리북에서 스토리 변경 시마다 토스트를 하나만 띄움
    if (toasts.length === 0) {
      addToast(args.message || '테스트 메시지', args.variant || 'success')
    }
    // eslint-disable-next-line
  }, [args.variant, args.message, args.position])
  return <Toaster position={args.position} />
}

export const Success: Story = {
  name: '성공 토스트',
  render: ToastStory,
  args: {
    position: 'bottom-right',
    variant: 'success',
    message: '성공적으로 처리되었습니다!',
  },
  parameters: {
    docs: { description: { story: '성공 상태의 토스트가 표시됩니다.' } },
  },
}

export const Error: Story = {
  name: '에러 토스트',
  render: ToastStory,
  args: {
    position: 'bottom-right',
    variant: 'error',
    message: '에러가 발생했습니다!',
  },
  parameters: {
    docs: { description: { story: '에러 상태의 토스트가 표시됩니다.' } },
  },
}

export const Info: Story = {
  name: '정보 토스트',
  render: ToastStory,
  args: {
    position: 'bottom-right',
    variant: 'info',
    message: '안내 메시지입니다.',
  },
  parameters: {
    docs: { description: { story: '정보 상태의 토스트가 표시됩니다.' } },
  },
}

export const Warning: Story = {
  name: '경고 토스트',
  render: ToastStory,
  args: {
    position: 'bottom-right',
    variant: 'warning',
    message: '경고 메시지입니다.',
  },
  parameters: {
    docs: { description: { story: '경고 상태의 토스트가 표시됩니다.' } },
  },
}

export const BottomLeft: Story = {
  name: '왼쪽 하단',
  render: ToastStory,
  args: {
    position: 'bottom-left',
    variant: 'info',
    message: '왼쪽 하단 토스트',
  },
  parameters: {
    docs: { description: { story: '왼쪽 하단에 토스트가 표시됩니다.' } },
  },
}

export const BottomCenter: Story = {
  name: '가운데 하단',
  render: ToastStory,
  args: {
    position: 'bottom-center',
    variant: 'success',
    message: '가운데 하단 토스트',
  },
  parameters: {
    docs: { description: { story: '가운데 하단에 토스트가 표시됩니다.' } },
  },
}
