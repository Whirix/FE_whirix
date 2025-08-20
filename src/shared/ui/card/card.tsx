import React from 'react'

type CardVariant = 'default' | 'outlined' | 'filled'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  variant?: CardVariant
  description?: string
}

export function Card({
  children,
  header,
  footer,
  variant = 'default',
  className,
  role = 'article',
  description,
  ...rest
}: CardProps) {
  const baseClasses = 'rounded-lg p-6'

  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white shadow-md',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50',
  }

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className || ''}`
  const descriptionId = description ? `${rest.id || 'card'}-desc` : undefined
  return (
    <div className={finalClasses} role={role} aria-describedby={descriptionId} {...rest}>
      {header && <header className="mb-4 border-b border-gray-200 pb-4">{header}</header>}
      <main>{children}</main>
      {footer && <footer className="mt-4 border-t border-gray-200 pt-4">{footer}</footer>}
    </div>
  )
}
