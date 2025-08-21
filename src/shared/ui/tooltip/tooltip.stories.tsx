import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'shared/ui/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 내부에 표시될 콘텐츠입니다.',
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: '자식 요소 대비 툴팁의 위치를 결정합니다.',
    },
    openDelay: {
      control: { type: 'number', min: 0, step: 50 },
      description: '툴팁이 열리기 전의 지연 시간 (ms)',
    },
    closeDelay: {
      control: { type: 'number', min: 0, step: 50 },
      description: '툴팁이 닫히기 전의 지연 시간 (ms)',
    },
    showArrow: {
      control: 'boolean',
      description: '트리거 요소를 가리키는 화살표를 표시할지 여부입니다.',
    },
    children: {
      control: false,
      description: '툴팁을 트리거할 요소입니다.',
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: '이것은 기본 툴팁입니다.',
    placement: 'top',
    children: (
      <button className="rounded bg-blue-500 px-4 py-2 text-white">여기에 마우스를 올리세요</button>
    ),
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args} />
    </div>
  ),
}

export const AllPlacements: Story = {
  name: '모든 위치 보기',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: '60px 80px',
        padding: '100px',
      }}
    >
      {[
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ].map((p) => (
        <Tooltip key={p} content={`Placement: ${p}`} placement={p as any}>
          <button className="rounded bg-gray-200 px-4 py-2">{p}</button>
        </Tooltip>
      ))}
    </div>
  ),
}

export const WithRichContent: Story = {
  name: '리치 HTML 콘텐츠',
  args: {
    content: (
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontWeight: 'bold', color: '#66bfff', margin: 0 }}>리치 콘텐츠</h3>
        <p style={{ margin: '4px 0 0' }}>여기에 React 노드를 추가할 수 있습니다.</p>
      </div>
    ),
    children: (
      <button className="rounded bg-green-500 px-4 py-2 text-white">리치 콘텐츠 보기</button>
    ),
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args} />
    </div>
  ),
}

export const WithArrow: Story = {
  name: '화살표 포함',
  args: {
    content: '이 툴팁에는 화살표가 있습니다.',
    showArrow: true,
    children: (
      <button className="rounded bg-purple-500 px-4 py-2 text-white">화살표 있는 툴팁</button>
    ),
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args} />
    </div>
  ),
}
