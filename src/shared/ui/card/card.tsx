import React from 'react'

type CardVariant = 'default' | 'outlined' | 'filled'

interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  variant?: CardVariant
  className?: string
  // Accessibility props
  role?: string
  ariaLabel?: string
  ariaLabelledby?: string
}

export default function Card({
  children,
  header,
  footer,
  variant = 'default',
  className = '',
  role = 'article', // Default role
  ariaLabel,
  ariaLabelledby,
}: CardProps) {
  const baseClasses = 'rounded-lg p-6'

  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white shadow-md',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50',
  }

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <div
      className={finalClasses}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {header && <header className="mb-4 border-b border-gray-200 pb-4">{header}</header>}
      <main>{children}</main>
      {footer && <footer className="mt-4 border-t border-gray-200 pt-4">{footer}</footer>}
    </div>
  )
}
