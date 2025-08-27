'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';

export type NormalizeMode = 'none' | 'digits' | 'alnum' | 'alnum-hyphen';

type InputOwnProps = {
  label?: string;
  errorText?: string;
  fullWidth?: boolean;

  // 모양 옵션
  monospace?: boolean;
  uppercase?: boolean;
  center?: boolean;

  // UX 보조 옵션
  onEnter?: (value: string) => void;
  showCounter?: boolean;
  selectOnFocus?: boolean;
  clearOnEnter?: boolean;
  trimOnBlur?: boolean;

  // 값 정규화
  normalize?: NormalizeMode;
  autoHyphen?: boolean; // ABCD-1234 → 4-4 하이픈 자동 적용
  onValueChange?: (value: string) => void;
};

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & InputOwnProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      errorText,
      className,
      fullWidth = true,
      required,

      // UX
      onEnter,
      showCounter = false,
      selectOnFocus = false,
      clearOnEnter = false,
      trimOnBlur = false,

      // 정규화
      normalize = 'none',
      autoHyphen = false,
      onValueChange,

      monospace = false,
      uppercase = false,
      center = false,

      value,
      maxLength,

      onKeyDown,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const invalid = Boolean(errorText);

    // 기본 높이/패딩/글자크기
    const baseSizing = 'h-10 px-3 text-base';

    // 에러 상태 시 스타일
    const errorClasses = invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : '';

    // 정렬/폰트/대문자 옵션 클래스
    const behaviorClasses = cn(
      center && 'text-center',
      monospace && 'font-mono tracking-wider',
      uppercase && 'uppercase'
    );

    // 카운터용 현재 문자열 값
    const stringValue =
      typeof value === 'string'
        ? value
        : typeof props.defaultValue === 'string'
        ? (props.defaultValue as string)
        : '';

    // 입력값 정규화 로직
    const normalizeValue = (raw: string) => {
      let cleaned = raw;
      if (uppercase) cleaned = cleaned.toUpperCase();
      cleaned = cleaned.replace(/\s+/g, '');
      if (normalize === 'digits') cleaned = cleaned.replace(/\D/g, '');
      if (normalize === 'alnum') cleaned = cleaned.replace(/[^A-Z0-9]/gi, '');
      if (normalize === 'alnum-hyphen') cleaned = cleaned.replace(/[^A-Z0-9-]/gi, '');
      if (autoHyphen) {
        cleaned = cleaned
          .replace(/-/g, '')
          .slice(0, 8)
          .replace(/(.{4})(.{0,4})/, (_, a, b) => (b ? `${a}-${b}` : a));
      }
      return cleaned;
    };

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {/* 라벨 */}
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}

        {/* 입력창 */}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'block rounded-md border border-gray-300 bg-white outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
              baseSizing,
              errorClasses,
              behaviorClasses,
              className
            )}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            required={required}
            maxLength={maxLength}
            // Enter 입력 시 onEnter 콜백 실행
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onEnter) {
                const raw = (e.target as HTMLInputElement).value;
                const next = normalizeValue(raw).trim();
                if (next) {
                  onEnter(next);
                  if (clearOnEnter) (e.target as HTMLInputElement).value = '';
                }
              }
              onKeyDown?.(e);
            }}
            // focus 시 전체 선택
            onFocus={(e) => {
              if (selectOnFocus) e.currentTarget.select();
              onFocus?.(e);
            }}
            // blur 시 앞뒤 공백 제거
            onBlur={(e) => {
              if (trimOnBlur) {
                const el = e.currentTarget;
                const t = el.value.trim();
                if (t !== el.value) el.value = t;
              }
              onBlur?.(e);
            }}
            // 입력값 정규화 + 상위 전달
            onChange={(e) => {
              const next = normalizeValue(e.target.value);
              onValueChange?.(next);
              onChange?.(e);
            }}
            {...(value !== undefined ? { value } : {})}
            {...props}
          />
        </div>

        {/* 에러 메시지 */}
        {errorText && (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {errorText}
          </p>
        )}

        {/* 글자 수 카운터 */}
        {showCounter && typeof stringValue === 'string' && maxLength && (
          <p className="mt-1 text-[11px] text-gray-400 text-right">
            {stringValue.length} / {maxLength}
          </p>
        )}
      </div>
    );
  }
);