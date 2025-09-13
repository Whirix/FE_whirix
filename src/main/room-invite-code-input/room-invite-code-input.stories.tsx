import type { Meta, StoryObj } from '@storybook/react-vite';
import { RoomInviteCodeInput } from './room-invite-code-input';

const meta: Meta<typeof RoomInviteCodeInput> = {
  title: 'main/RoomInviteCodeInput',
  component: RoomInviteCodeInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
    casing: { control: 'select', options: ['lower', 'upper', 'none'] },
    disabled: { control: 'boolean' },
    errorText: { control: 'text' },
    initialValue: { control: 'text' },
    onChange: { action: 'onChange' },
    onComplete: { action: 'onComplete' },
  },
  args: {
    length: 6,
    casing: 'upper',
    disabled: false,
    errorText: '',
  },
  parameters: {
    docs: {
      description: {
        component:
          '게임 방 초대 코드 입력. 고정 길이, 대소문자 변환, 에러 표시, 비활성화, 초기 코드(initialValue)를 지원합니다.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof RoomInviteCodeInput>;

/** 기본 */
export const Default: Story = {};

/** 소문자 모드 */
export const Lowercase: Story = {
  args: {
    casing: 'lower',
  },
};

/** 대소문자 변환 없음 */
export const NoCasing: Story = {
  args: {
    casing: 'none',
  },
};

/** 8자리 초대 코드 */
export const Length8: Story = {
  args: {
    length: 8,
  },
};

/** 초기 코드(initialValue) 적용 */
export const WithInitialValue: Story = {
  args: {
    initialValue: 'AB12CD',
  },
};

/** 에러 상태 */
export const WithError: Story = {
  args: {
    errorText: '유효하지 않은 초대 코드입니다.',
  },
};

/** 비활성화 */
export const Disabled: Story = {
  args: {
    disabled: true,
    initialValue: 'AB12CD',
  },
};
