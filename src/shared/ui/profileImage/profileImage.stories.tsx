import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileImage } from './profileImage';

const meta: Meta<typeof ProfileImage> = {
  title: 'shared/ui/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    editable: { control: 'boolean' },
    removable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        component: '프로필 이미지 공용 컴포넌트',
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

/** 이미지  */
export const WithImage: Story = {
  args: {
    label: '이미지',
    src: '/train.webp',
    alt: 'train',
  },
};

/* 업로드 */
export const Editable: Story = {
  render: (args) => {
    const [fileName, setFileName] = React.useState('');
    return (
      <div className="flex items-center gap-3">
        <ProfileImage
          {...args}
          editable
          fallbackText="edit"
          onUpload={(file) => setFileName(file.name)}
        />
        {fileName && <span className="text-xs text-slate-500">{fileName}</span>}
      </div>
    );
  },
  args: {
    label: '수정',
  },
};

/* 제거 */
export const Removable: Story = {
  render: (args) => {
    const [img, setImg] = React.useState<string | undefined>('/train.webp');
    return (
      <ProfileImage
        {...args}
        src={img}
        removable
        fallbackText="–"
        onRemove={() => setImg(undefined)}
      />
    );
  },
  args: {
    label: '제거',
  },
};

/* 에러 상태 */
export const WithError: Story = {
  args: {
    label: '에러',
    fallbackText: 'ER',
    errorText: '이미지 형식이 올바르지 않습니다.',
  },
};

/* 로딩 */
export const Loading: Story = {
  args: {
    label: '로딩',
    loading: true,
    fallbackText: 'loading..',
    className: 'text-[10px]',
  },
};