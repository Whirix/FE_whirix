'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../../shared/lib/utils';

type Casing = 'lower' | 'upper' | 'none';

type RoomInviteCodeInputProps = {
  length?: number;               
  casing?: Casing;               // 입력된 문자의 대소문자 처리
  disabled?: boolean;            
  errorText?: string;            
  initialValue?: string;         
  onChange?: (code: string) => void;   
  onComplete?: (code: string) => void; 
};

export function RoomInviteCodeInput({
  length = 6,
  casing = 'upper',
  disabled = false,
  errorText,
  initialValue,
  onChange,
  onComplete,
}: RoomInviteCodeInputProps) {
  const [digits, setDigits] = useState(Array(length).fill('')); // 현재 입력된 코드 상태
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // 입력 문자를 casing 및 허용 규칙에 맞게 변환
  const formatChar = useCallback(
    (ch: string) => {
      if (!/^[a-z0-9]$/i.test(ch)) return '';
      if (casing === 'upper') return ch.toUpperCase();
      if (casing === 'lower') return ch.toLowerCase();
      return ch;
    },
    [casing]
  );

  // 초대코드 링크를 통해 진입했을 때
  useEffect(() => {
    if (initialValue) {
      const chars = initialValue.slice(0, length).split('').map(formatChar);
      setDigits(chars);
      const code = chars.join('');
      onChange?.(code);
      if (chars.every(Boolean)) onComplete?.(code);
    }
  }, [initialValue, length, formatChar, onChange, onComplete]);

 // 입력 처리
  const handleChange = (i: number, v: string) => {
    const codeChar = formatChar(v.slice(-1));
    if (!codeChar) return;

    const next = [...digits];
    next[i] = codeChar;
    setDigits(next);

    const code = next.join('');
    onChange?.(code);

    if (i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    } else {
      onComplete?.(code);
    }
  };

  // 백스페이스 처리
  const handleBackspace = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];

      if (digits[i]) {
        next[i] = '';
        setDigits(next);
        onChange?.(next.join(''));
      } else if (i > 0) {
        const prev = i - 1;
        inputsRef.current[prev]?.focus();
        next[prev] = '';
        setDigits(next);
        onChange?.(next.join(''));
      }
    }
  };

  // 붙여넣기 처리
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').slice(0, length);
    const chars = text.split('').map(formatChar);

    const next = [...digits];
    chars.forEach((ch, i) => (next[i] = ch));

    setDigits(next);
    const code = next.join('');
    onChange?.(code);
    if (next.every(Boolean)) onComplete?.(code);
  };

  return (
    <div className="inline-block">
      {/* 코드 입력 칸 그룹 */}
      <div className="flex gap-2">
        {digits.map((val, i) => (
          <input
            key={i}
            ref={(el: HTMLInputElement | null) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            maxLength={1} // 각 칸당 1글자 제한
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleBackspace(i, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              'w-10 h-12 text-center text-lg font-mono border rounded-md outline-none',
              errorText
                ? 'border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
              disabled && 'bg-gray-100 cursor-not-allowed opacity-60'
            )}
          />
        ))}
      </div>
      {/* 에러 메시지 출력 */}
      {errorText && <p className="mt-1 text-xs text-red-600">{errorText}</p>}
    </div>
  );
}