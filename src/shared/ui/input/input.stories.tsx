import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'
import React from 'react'

const withDesc = (story: string) => ({
  docs: { description: { story } },
})

const meta = {
  title: 'shared/ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    monospace: { control: 'boolean' },
    uppercase: { control: 'boolean' },
    center: { control: 'boolean' },
    normalize: { control: 'select', options: ['none', 'digits', 'alnum', 'alnum-hyphen'] },
    autoHyphen: { control: 'boolean' },
    selectOnFocus: { control: 'boolean' },
    clearOnEnter: { control: 'boolean' },
    trimOnBlur: { control: 'boolean' },
    showCounter: { control: 'boolean' },
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        component:
          'Input은 공통 컴포넌트로 만들었고, 글자체/정렬/대문자 같은 스타일 옵션이나 UX 기능(Enter 제출, 전체 선택, blur 시 트림), 입력 정규화·자동 하이픈 같은 기능들을 상황에 맞게 조합해서 쓸 수 있도록 나눠서 적용 가능하게 했습니다.',
      },
    },
  },
  args: {
    fullWidth: false,
    onEnter: () => ({}),
  },
} satisfies Meta<typeof Input>
export default meta

type Story = StoryObj<typeof Input>

// 공용 템플릿
const Template = (args: React.ComponentProps<typeof Input>) => <Input {...args} />

/** 기본 */
export const Default: Story = {
  render: Template,
  args: {
    placeholder: '기본 입력',
    className: 'w-[20ch]',
  },
  parameters: withDesc('옵션을 최소화한 기본 상태'),
}

/** 정규화: 숫자만 */
export const NormalizeDigits: Story = {
  render: (args) => {
    const [val, setVal] = React.useState('')
    return (
      <Input
        {...args}
        label="숫자만"
        placeholder="123456"
        className="w-[10ch]"
        center
        monospace
        normalize="digits"
        selectOnFocus
        trimOnBlur
        value={val}
        onValueChange={(next) => {
          setVal(next)
        }}
      />
    )
  },
  parameters: withDesc('입력값에서 숫자만 유지'),
}

/** 정규화: 영문+숫자 + 자동 하이픈(4-4) */
export const NormalizeAlnumHyphen: Story = {
  render: (args) => {
    const [val, setVal] = React.useState('')
    return (
      <Input
        {...args}
        label="영문/숫자 + 하이픈"
        placeholder="ABCD-1234"
        className="w-[12ch]"
        center
        monospace
        uppercase
        normalize="alnum"
        autoHyphen
        selectOnFocus
        trimOnBlur
        value={val}
        onValueChange={(next) => {
          setVal(next) // "ABCD-1234" 형태가 인풋에 표시됨
        }}
      />
    )
  },
  parameters: withDesc('영문/숫자만 허용하고 4-4 패턴으로 자동 하이픈 적용'),
}

/** 글자 수 카운터 */
export const WithCounter: Story = {
  render: (args) => {
    const [val, setVal] = React.useState('')
    return (
      <Input
        {...args}
        label="닉네임"
        placeholder="닉네임을 입력"
        className="w-[18ch]"
        maxLength={12}
        showCounter
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    )
  },
  parameters: withDesc('maxLength + showCounter로 길이 카운트 표시'),
}

/** Enter 제출 + 자동 초기화 */
export const EnterAndClear: Story = {
  render: Template,
  args: {
    placeholder: '정답 입력 후 Enter',
    className: 'w-[24ch]',
    clearOnEnter: true,
  },
  parameters: withDesc('Enter 시 onEnter 호출, clearOnEnter=true면 입력 초기화'),
}

/** 에러 표시 */
export const WithError: Story = {
  render: Template,
  args: {
    label: '입력값',
    placeholder: '값을 입력',
    className: 'w-[18ch]',
    errorText: '유효하지 않은 입력입니다.',
  },
  parameters: withDesc('errorText가 있으면 aria-invalid=true 및 에러 문구 표시'),
}
