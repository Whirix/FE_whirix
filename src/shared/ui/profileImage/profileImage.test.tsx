import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileImage } from './profileImage';

describe('ProfileImage', () => {
  it('이미지 alt가 반영됨', () => {
    render(<ProfileImage src="https://picsum.photos/80" alt="user1" />);
    const img = screen.getByAltText('user1') as HTMLImageElement;
    expect(img).toBeInTheDocument();
  });

  it('src가 없으면 fallbackText가 보임', () => {
    render(<ProfileImage fallbackText="SJ" />);
    expect(screen.getByText('SJ')).toBeInTheDocument();
  });

  it('editable이면 파일 선택 트리거가 동작함', async () => {
    const user = userEvent.setup();
    const onUpload = jest.fn();

    render(<ProfileImage editable onUpload={onUpload} fallbackText="UP" />);

    await user.click(screen.getByRole('button', { name: '프로필 이미지 업로드' }));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText('이미지 파일 선택') as HTMLInputElement;
    await user.upload(input, file);

    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload.mock.calls[0][0].name).toBe('hello.png');
  });

  it('removable이면 제거 버튼이 보이고 클릭 시 콜백 호출', async () => {
    const user = userEvent.setup();
    const onRemove = jest.fn();
    render(<ProfileImage removable onRemove={onRemove} src="x" />);
    await user.click(screen.getByRole('button', { name: '프로필 이미지 제거' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('errorText가 있으면 aria-invalid=true와 문구가 표시됨', () => {
    render(<ProfileImage errorText="에러입니다" fallbackText="ER" />);
    const avatar = screen.getByText('ER').closest('div')!;
    expect(avatar).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('에러입니다')).toBeInTheDocument();
  });

  it('size prop이 클래스에 반영됨', () => {
    render(<ProfileImage size="md" fallbackText="MD" />);
    const avatar = screen.getByText('MD').closest('div')!;
    expect(avatar).toHaveClass('h-12', 'w-12');
  });

  it('loading이면 스켈레톤이 보이고 fallbackText도 그대로 보임', () => {
    render(<ProfileImage loading fallbackText="LD" />);
    expect(screen.getByTestId('pi-loading-overlay')).toBeInTheDocument();
    expect(screen.getByText('LD')).toBeInTheDocument();
  });

  it('disabled이면 업로드/제거 버튼이 disabled 상태', () => {
    const { rerender } = render(
      <ProfileImage editable removable disabled onRemove={() => {}} fallbackText="D" />
    );
    expect(screen.getByRole('button', { name: '프로필 이미지 업로드' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '프로필 이미지 제거' })).toBeDisabled();

    rerender(<ProfileImage editable removable onRemove={() => {}} fallbackText="D" />);
    expect(screen.getByRole('button', { name: '프로필 이미지 업로드' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: '프로필 이미지 제거' })).not.toBeDisabled();
  });
});