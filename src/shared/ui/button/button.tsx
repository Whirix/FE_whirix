import * as React from 'react';
import { cn } from '../../lib/utils';
import type { ButtonProps } from './button.types';

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400';

  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-1 text-sm'
      : 'px-4 py-2 text-base';

  return (
    <button
      type="button"
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
      {...props}
    />
  );
}