import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('label이랑 input이 잘 연결됨', () => {
    render(<Input id="room" label="방 코드" />);
    const input = screen.getByLabelText('방 코드');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'room');
  });

  it('errorText 있으면 aria-invalid=true 되고 에러 메시지 보임', () => {
    render(<Input label="닉네임" errorText="유효하지 않은 닉네임" />);
    const input = screen.getByLabelText('닉네임');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('유효하지 않은 닉네임')).toBeInTheDocument();
  });

  it('입력한 값이 반영됨', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="정답" />);
    const input = screen.getByPlaceholderText('정답') as HTMLInputElement;
    await user.type(input, '호랑이');
    expect(input.value).toBe('호랑이');
  });

  it('Enter 치면 onEnter가 호출됨', async () => {
    const user = userEvent.setup();
    const handleEnter = jest.fn();
    render(<Input placeholder="정답" onEnter={handleEnter} />);
    const input = screen.getByPlaceholderText('정답') as HTMLInputElement;
    await user.type(input, '사자{enter}');
    expect(handleEnter).toHaveBeenCalledWith('사자');
  });

  it('showCounter + maxLength 있으면 글자 수 카운터가 보임', async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [val, setVal] = React.useState('');
      return (
        <Input
          label="닉네임"
          maxLength={10}
          showCounter
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByLabelText('닉네임') as HTMLInputElement;
    await user.type(input, 'abc');
    expect(screen.getByText('3 / 10')).toBeInTheDocument();
  });

  it('스타일 옵션(monospace/uppercase/center)이 클래스에 잘 반영됨', () => {
    render(
      <Input
        placeholder="코드"
        monospace
        uppercase
        center
        fullWidth={false}
        className="w-[10ch]"
      />
    );
    const input = screen.getByPlaceholderText('코드');
    expect(input).toHaveClass('font-mono');
    expect(input).toHaveClass('uppercase');
    expect(input).toHaveClass('text-center');
  });

  it('clearOnEnter 있으면 Enter 후 입력값이 비워짐', async () => {
    const user = userEvent.setup();
    const handleEnter = jest.fn();
    render(<Input placeholder="정답" onEnter={handleEnter} clearOnEnter />);
    const input = screen.getByPlaceholderText('정답') as HTMLInputElement;

    await user.type(input, '토끼{enter}');
    expect(handleEnter).toHaveBeenCalledWith('토끼');
    expect(input.value).toBe('');
  });

  it('selectOnFocus 있으면 focus 시 전체 선택됨', () => {
    render(<Input defaultValue="ABCD1234" selectOnFocus placeholder="코드" />);
    const input = screen.getByPlaceholderText('코드') as HTMLInputElement;

    input.focus();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe('ABCD1234'.length);
  });

  it('trimOnBlur 있으면 blur 시 앞뒤 공백이 제거됨', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="닉네임" trimOnBlur />);
    const input = screen.getByPlaceholderText('닉네임') as HTMLInputElement;

    await user.type(input, '  abc  ');
    expect(input.value).toBe('  abc  ');
    input.blur();
    expect(input.value).toBe('abc');
  });

  it('normalize="digits"면 숫자만 유지됨', async () => {
    const user = userEvent.setup();
    const spy = jest.fn();
    render(<Input placeholder="방 코드" normalize="digits" onValueChange={spy} />);
    const input = screen.getByPlaceholderText('방 코드') as HTMLInputElement;

    await user.type(input, '12ab34');
    const lastValue = spy.mock.calls[spy.mock.calls.length - 1]?.[0];
    expect(lastValue).toBe('1234');
  });

  it('normalize="alnum" + autoHyphen이면 "abcd1234" → "ABCD-1234" 됨', async () => {
    const user = userEvent.setup();
    const spy = jest.fn();
    render(
      <Input
        placeholder="초대코드"
        normalize="alnum"
        autoHyphen
        uppercase
        onValueChange={spy}
      />
    );
    const input = screen.getByPlaceholderText('초대코드') as HTMLInputElement;

    await user.type(input, 'abcd1234');
    const last = spy.mock.calls[spy.mock.calls.length - 1]?.[0];
    expect(last).toBe('ABCD-1234');
  });
});