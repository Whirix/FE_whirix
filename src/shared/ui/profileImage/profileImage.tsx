'use client';
import { cn } from '../../lib/utils';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ProfileImageProps = {
  src?: string;
  alt?: string;
  size?: Size;
  fallbackText?: string;
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
  disabled = false,
  loading = false,
  className,
  label,
}: ProfileImageProps) {
  return (
    <div className="inline-block">
      {/* 라벨 */}
      {label && (
        <label className="mb-1 block text-left text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative inline-block align-middle">
        {/* 아바타 컨테이너 */}
        <div
          className={cn(
            'inline-flex items-center justify-center select-none overflow-hidden rounded-full ring-1 ring-inset ring-gray-200',
            'bg-gray-100 text-gray-600',
            sizeMap[size],      
            disabled && 'opacity-60',
            className
          )}
        >
          {/* 로딩중 */}
          {loading ? (
            <img
              src="/loading.webp"
              alt="loading..."
              className="h-1/2 w-1/2 object-contain"
              data-testid="pi-skeleton"
              draggable={false}
            />
          ) : src ? (
            // 이미지가 있으면 이미지 출력
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover rounded-full"
              draggable={false}
            />
          ) : (
            // 이미지 없을 때 텍스트 출력
            <span className="font-medium">{fallbackText ?? ''}</span>
          )}
        </div>
      </div>
    </div>
  );
}