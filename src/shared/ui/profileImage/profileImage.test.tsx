import { render, screen } from '@testing-library/react';
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

  it('size prop이 클래스에 반영됨 (md 기준)', () => {
    render(<ProfileImage size="md" fallbackText="MD" />);
    const avatar = screen.getByText('MD').closest('div')!;
    expect(avatar).toHaveClass('h-12', 'w-12');
  });

  it('loading이면 스켈레톤이 보이고 fallbackText는 보이지 않음', () => {
    render(<ProfileImage loading fallbackText="LD" />);
    expect(screen.getByTestId('pi-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('LD')).toBeNull();
  });
});