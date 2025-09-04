import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileImage } from './profileImage';

const meta: Meta<typeof ProfileImage> = {
  title: 'shared/ui/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          '프로필 이미지 공용 컴포넌트',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProfileImage>;

/* 기본 */
export const Default: Story = {
  args: {
    label: '기본',
    fallbackText: 'SJ',
    alt: '',
  },
};

/* 사이즈 프리뷰 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <ProfileImage size="xs" fallbackText="SJ" />
      <ProfileImage size="sm" fallbackText="SJ" />
      <ProfileImage size="md" fallbackText="SJ" />
      <ProfileImage size="lg" fallbackText="SJ" />
      <ProfileImage size="xl" fallbackText="SJ" />
    </div>
  ),
};

/* 이미지 */
export const WithImage: Story = {
  args: {
    label: '이미지',
    src: '/train.webp',
    alt: 'train',
  },
};

/* 로딩 */
export const Loading: Story = {
  args: {
    label: '로딩',
    loading: true, 
  },
};

/* 비활성화 */
export const Disabled: Story = {
  args: {
    label: '비활성화',
    disabled: true,
    fallbackText: 'SJ',
  },
};