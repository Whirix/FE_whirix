import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Modal from './modal'
import { Button } from '../button/button'

/**
 * `Modal` 컴포넌트는 `isOpen` 상태에 따라 동적으로 렌더링되므로,
 * Storybook에서 상호작용을 통해 상태를 제어하기 위해 `useState` 훅을 사용하는 래퍼(wrapper) 컴포넌트가 필요합니다.
 */
const meta: Meta<typeof Modal> = {
  title: 'shared/ui/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: false, // `isOpen`은 스토리 내의 `useState`로 제어되므로 Storybook UI 컨트롤에서 제외합니다.
      description: '모달의 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: '모달이 닫힐 때 호출되는 콜백 함수',
    },
    title: {
      control: 'text',
      description: '모달의 제목',
    },
    children: {
      control: false,
      description: '모달의 컨텐츠',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 모달의 상태를 관리하고 인터랙션을 제공하기 위한 템플릿 컴포넌트입니다.
const ModalTemplate = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="pt-4">
          <p>This is the modal content.</p>
          <p>You can add any React elements here.</p>
          <div className="flex justify-end pt-4">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  args: {
    title: 'Modal Title',
  },
  render: ModalTemplate,
}
