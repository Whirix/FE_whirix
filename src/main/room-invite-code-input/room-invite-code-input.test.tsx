import { render, screen, fireEvent } from '@testing-library/react';
import { RoomInviteCodeInput } from './room-invite-code-input';

describe('RoomInviteCodeInput', () => {
  it('렌더링 시 지정한 길이만큼 input을 생성', () => {
    render(<RoomInviteCodeInput length={6} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('초기값이 있으면 자동으로 채워짐', () => {
    render(<RoomInviteCodeInput length={6} initialValue="ABC123" />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.map((el) => (el as HTMLInputElement).value).join('')).toBe('ABC123');
  });

  it('입력 시 onChange 콜백이 호출', () => {
    const handleChange = jest.fn();
    render(<RoomInviteCodeInput length={4} onChange={handleChange} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'A' } });

    expect(handleChange).toHaveBeenCalledWith('A');
  });

  it('모든 칸이 채워지면 onComplete 콜백 호출', () => {
    const handleComplete = jest.fn();
    render(<RoomInviteCodeInput length={2} onComplete={handleComplete} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'A' } });
    fireEvent.change(inputs[1], { target: { value: 'B' } });

    expect(handleComplete).toHaveBeenCalledWith('AB');
  });

  it('Backspace로 이전 칸으로 이동하며 값을 삭제할 수 있음', () => {
    render(<RoomInviteCodeInput length={2} initialValue="AB" />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    // 두 번째 input에 포커스 후 백스페이스
    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });

    expect(inputs[0].value).toBe('A');
    expect(inputs[1].value).toBe('');
  });

  it('붙여넣기 시 전체 코드가 입력됨', () => {
    render(<RoomInviteCodeInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => 'ABCD' },
    } as unknown as React.ClipboardEvent<HTMLInputElement>);

    expect(inputs.map((el) => (el as HTMLInputElement).value).join('')).toBe('ABCD');
  });

  it('에러 메시지가 있으면 표시됨', () => {
    render(<RoomInviteCodeInput errorText="유효하지 않은 코드입니다." />);
    expect(screen.getByText('유효하지 않은 코드입니다.')).toBeInTheDocument();
  });
});