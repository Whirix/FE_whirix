'use client';

import React, { useId, useRef } from 'react';
import { cn } from '../../lib/utils';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ProfileImageProps = {
  src?: string;
  alt?: string;
  size?: Size;
  fallbackText?: string;
  editable?: boolean;
  removable?: boolean;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  errorText?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  label?: string;
};

const sizeMap: Record<Size, string> = {
  xs: 'h-8 w-8 text-[10px]',
  sm: 'h-10 w-10 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
  xl: 'h-20 w-20 text-lg',
};

export function ProfileImage({
  src,
  alt = '',
  size = 'md',
  fallbackText,
  editable = false,
  removable = false,
  onUpload,
  onRemove,
  errorText,
  disabled = false,
  loading = false,
  className,
  label,
}: ProfileImageProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const invalid = Boolean(errorText);
  const fileRef = useRef<HTMLInputElement>(null);

  // 파일 선택 트리거
  const handlePick = () => {
    if (disabled) return;
    fileRef.current?.click();
  };

  // 파일 선택 결과 전달
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) onUpload(file);
    e.currentTarget.value = '';
  };

  return (
    <div className="inline-block">
      {label && (
        <label className="mb-1 block text-left text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* 컨테이너 */}
      <div className="relative inline-block align-middle">
        {/* 아바타 */}
        <div
          className={cn(
            'inline-flex items-center justify-center select-none bg-gray-100 text-gray-600 overflow-hidden',
            sizeMap[size],
            'rounded-full',
            'ring-1 ring-inset ring-gray-200',
            invalid && 'ring-2 ring-red-500',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
        >
          {/* 이미지 또는 폴백 */}
          {src ? (
            <img
              src={src}
              alt={alt}
              className="relative z-10 h-full w-full object-cover rounded-full"
              draggable={false}
            />
          ) : (
            <span className="relative z-10 font-medium">{fallbackText ?? ''}</span>
          )}

          {/* 로딩 오버레이 */}
          {loading && (
            <div
              className="absolute inset-0 z-0 animate-pulse bg-gray-200/50 pointer-events-none"
              data-testid="pi-loading-overlay"
            />
          )}
        </div>

        {/* 제거 버튼 */}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="프로필 이미지 제거"
            disabled={disabled}
            className={cn(
              'absolute -top-2 -right-2 z-10',
              'h-6 w-6 rounded-full bg-white/95 shadow ring-1 ring-gray-200 grid place-items-center',
              'hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-300'
            )}
          >
            <span aria-hidden>×</span>
          </button>
        )}

        {/* 업로드 버튼 + 숨김 input */}
        {editable && (
          <>
            <button
              type="button"
              onClick={handlePick}
              aria-label="프로필 이미지 업로드"
              disabled={disabled}
              className={cn(
                'absolute -bottom-2 -right-2 z-10',
                'h-6 w-6 rounded-full bg-white/95 shadow ring-1 ring-gray-200 grid place-items-center',
                'hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300'
              )}
            >
              ✏️
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              aria-label="이미지 파일 선택"
            />
          </>
        )}
      </div>

      {/* 에러 메시지 */}
      {errorText && (
        <p id={errorId} className="mt-1 text-xs text-red-600 text-left">
          {errorText}
        </p>
      )}
    </div>
  );
}