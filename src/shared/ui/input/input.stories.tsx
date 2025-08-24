import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from '@storybook/addon-actions';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'shared/ui/input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    textSize: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
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
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/** 초대코드 */
export const InviteCode: Story = {
  args: {
    label: '초대코드',
    placeholder: 'ABCD-1234',
    fullWidth: false,
    className: 'w-[12ch]',
    monospace: true,
    uppercase: true,
    center: true,
    textSize: 'lg',
    normalize: 'alnum',   // 영문+숫자만 허용
    autoHyphen: true,     // 4-4 자동 하이픈
    selectOnFocus: true,  // 포커스 시 전체 선택
    trimOnBlur: true,     // blur 시 공백 제거
  },
};

/** 방 코드*/
export const RoomCode: Story = {
  args: {
    label: '방 코드',
    placeholder: '123456',
    fullWidth: false,
    className: 'w-[8ch]',
    monospace: true,
    center: true,
    textSize: 'lg',
    normalize: 'digits',  // 숫자만 입력 가능
    selectOnFocus: true,
    trimOnBlur: true,
  },
};

/** 닉네임  */
export const Nickname: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력하세요',
    fullWidth: false,
    className: 'w-[16ch]',
    maxLength: 12,
    showCounter: true,
    textSize: 'md',
  },
};

/** 정답 입력 */
export const GuessAnswer: Story = {
  args: {
    placeholder: '정답을 입력하고 Enter',
    onEnter: action('onEnter'),
    clearOnEnter: true,   // Enter 후 입력 비움
    fullWidth: false,
    className: 'w-full sm:w-80',
    textSize: 'lg',
  },
};

/** 에러 메시지 케이스 */
export const WithError: Story = {
  args: {
    label: '방 코드',
    placeholder: '123456',
    fullWidth: false,
    className: 'w-[8ch]',
    monospace: true,
    uppercase: true,
    center: true,
    errorText: '유효하지 않은 코드입니다.',
    textSize: 'lg',
  },
};

/** 다양한 글자 크기 프리뷰 */
export const TextSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="sm" placeholder="sm" fullWidth={false} className="w-[16ch]" textSize="sm" />
      <Input label="md" placeholder="md" fullWidth={false} className="w-[16ch]" textSize="md" />
      <Input label="lg" placeholder="lg" fullWidth={false} className="w-[16ch]" textSize="lg" />
      <Input label="xl" placeholder="xl" fullWidth={false} className="w-[16ch]" textSize="xl" />
    </div>
  ),
};