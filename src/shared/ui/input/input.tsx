'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from '../../lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputTextSize = 'sm' | 'md' | 'lg' | 'xl';
export type NormalizeMode = 'none' | 'digits' | 'alnum' | 'alnum-hyphen';

// input은 동작 옵션 중심이라서 variant는 두지 않았음다

type InputOwnProps = {
  label?: string;
  errorText?: string;
  fullWidth?: boolean;         
  size?: InputSize;            
  textSize?: InputTextSize;    
  monospace?: boolean;         
  uppercase?: boolean;         
  center?: boolean;            

  // UX 보조
  onEnter?: (value: string) => void; 
  showCounter?: boolean;             
  selectOnFocus?: boolean;           
  clearOnEnter?: boolean;            
  trimOnBlur?: boolean;              

  // 값 정규화
  normalize?: NormalizeMode;         
  autoHyphen?: boolean;              // ABCD-1234 자동 하이픈(4-4)
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
      size = 'md',
      textSize = 'md',
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

    // 높이/패딩 프리셋
    const sizeClasses =
      size === 'sm' ? 'h-9 px-3' : size === 'lg' ? 'h-11 px-4' : 'h-10 px-3';

    // 폰트 사이즈 프리셋
    const textClasses =
      textSize === 'sm'
        ? 'text-sm'
        : textSize === 'lg'
        ? 'text-lg'
        : textSize === 'xl'
        ? 'text-xl'
        : 'text-base';

    // 에러 상태 스타일
    const errorClasses = invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : '';

    // 정렬/폰트/대문자 스위치
    const behaviorClasses = cn(
      center && 'text-center',
      monospace && 'font-mono tracking-wider',
      uppercase && 'uppercase'
    );

    // 카운터 표시에 사용할 현재 문자열
    const stringValue =
      typeof value === 'string'
        ? value
        : typeof props.defaultValue === 'string'
        ? (props.defaultValue as string)
        : '';

    // 입력 정규화
    const normalizeValue = (raw: string) => {
      let cleaned = raw;
      if (uppercase) cleaned = cleaned.toUpperCase();
      cleaned = cleaned.replace(/\s+/g, '');
      if (normalize === 'digits') cleaned = cleaned.replace(/\D/g, '');
      if (normalize === 'alnum') cleaned = cleaned.replace(/[^A-Z0-9]/gi, '');
      if (normalize === 'alnum-hyphen') cleaned = cleaned.replace(/[^A-Z0-9-]/gi, '');
      if (autoHyphen) {
        cleaned = cleaned.replace(/-/g, '').slice(0, 8)
          .replace(/(.{4})(.{0,4})/, (_, a, b) => (b ? `${a}-${b}` : a));
      }
      return cleaned;
    };

    return (
  <div className={cn(fullWidth && 'w-full')}>
    {label && (
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
    )}

    {/* 입력창 영역 */}
    <div className="relative">
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'block rounded-md border border-gray-300 bg-white outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          sizeClasses,
          textClasses,
          errorClasses,
          behaviorClasses,
          className
        )}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        required={required}
        maxLength={maxLength}
        // Enter 입력 시 값 전달
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
        // focus 시에 전체 선택
        onFocus={(e) => {
          if (selectOnFocus) e.currentTarget.select();
          onFocus?.(e);
        }}
        // blur 시에 입력값 앞뒤 공백 제거
        onBlur={(e) => {
          if (trimOnBlur) {
            const el = e.currentTarget;
            const t = el.value.trim();
            if (t !== el.value) el.value = t;
          }
          onBlur?.(e);
        }}
        // 입력 시에 값을 정규화해서 상위로 전달
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