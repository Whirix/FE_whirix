'use client'

import React, { useId, useRef, useState } from 'react'
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow as arrowMiddleware,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'

export interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  openDelay?: number
  closeDelay?: number
  showArrow?: boolean
}

export default function Tooltip({
  children,
  content,
  placement = 'top',
  openDelay = 80,
  closeDelay = 80,
  showArrow = false,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  const arrowRef = useRef<HTMLDivElement | null>(null)

  const {
    refs,
    floatingStyles,
    middlewareData,
    placement: finalPlacement,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      showArrow ? arrowMiddleware({ element: arrowRef }) : undefined,
    ].filter(Boolean),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let openTimer: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let closeTimer: any
  const show = () => {
    clearTimeout(closeTimer)
    openTimer = setTimeout(() => setOpen(true), openDelay)
  }
  const hide = () => {
    clearTimeout(openTimer)
    closeTimer = setTimeout(() => setOpen(false), closeDelay)
  }

  return (
    <>
      {/* 트리거 */}
      <span
        ref={refs.setReference}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={open ? id : undefined}
        className="inline-flex"
      >
        {children}
      </span>

      {/* 툴팁 박스 */}
      <div
        ref={refs.setFloating}
        id={id}
        role="tooltip"
        style={{ ...floatingStyles, zIndex: 50, pointerEvents: 'none' }}
        className={[
          'rounded-md bg-gray-800 px-2 py-1 text-sm text-white shadow-md',
          'transform transition-all duration-150',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        ].join(' ')}
      >
        {content}

        {/* 꼬리 (옵션) */}
        {showArrow && (
          <div
            ref={arrowRef}
            className="absolute h-2 w-2 rotate-45 bg-gray-800"
            style={{
              left: middlewareData.arrow?.x ?? '',
              top: middlewareData.arrow?.y ?? '',
              ...(finalPlacement.startsWith('top') && { bottom: '-0.25rem' }),
              ...(finalPlacement.startsWith('bottom') && { top: '-0.25rem' }),
              ...(finalPlacement.startsWith('left') && { right: '-0.25rem' }),
              ...(finalPlacement.startsWith('right') && { left: '-0.25rem' }),
            }}
          />
        )}
      </div>
    </>
  )
}
