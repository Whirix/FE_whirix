import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('버튼 안에 넣은 글자가 제대로 보임', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('버튼 클릭 시 전달한 함수가 실행됨', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('비활성화된 버튼은 클릭해도 동작 안 함', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button disabled onClick={onClick}>Nope</Button>);
    await user.click(screen.getByRole('button', { name: 'Nope' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('버튼에 지정한 스타일이 잘 적용되고 className도 합쳐짐', () => {
    render(<Button variant="secondary" size="sm" className="custom-x">X</Button>);
    const btn = screen.getByRole('button', { name: 'X' });
    expect(btn.className).toContain('bg-gray-200'); // variant
    expect(btn.className).toContain('text-sm');     // size
    expect(btn.className).toContain('custom-x');    // merged
  });
});