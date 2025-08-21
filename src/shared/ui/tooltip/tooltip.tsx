'use client'

import React, {
  useId,
  useRef,
  useState,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactElement,
  type Ref,
} from 'react'
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow as arrowMiddleware,
  useHover,
  useFocus,
  useInteractions,
  useRole,
  useDismiss,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'

/**
 * useMergedRefs: 여러 ref(callback 또는 object)를 하나의 콜백 ref로 병합
 * - 제네릭 T는 HTMLElement | SVGElement 등의 DOM 타입 또는 null
 */
function useMergedRefs<T extends Element | null>(...refs: (Ref<T> | undefined)[]) {
  return useCallback(
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') {
          try {
            ref(node)
          } catch {
            // 안전하게 무시
          }
        } else {
          try {
            ;(ref as React.MutableRefObject<T | null>).current = node
          } catch {
            // 안전하게 무시
          }
        }
      })
    },
    // refs 배열 자체는 참조 동일성에 따라 변할 수 있으니 의존성에 넣음
    // ESLint 경고가 신경 쓰이면 refs를 useRef로 감싸서 고정할 수 있음
    [refs]
  )
}

export interface TooltipProps {
  id?: string
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  openDelay?: number
  closeDelay?: number
  showArrow?: boolean
  testOpen?: boolean
}

export function Tooltip({
  id,
  children,
  content,
  placement = 'top',
  openDelay = 80,
  closeDelay = 80,
  showArrow = false,
  testOpen,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const generatedId = useId()
  const tooltipId = id ?? `tooltip-${generatedId}`

  const {
    refs,
    floatingStyles,
    middlewareData,
    placement: finalPlacement,
    context,
  } = useFloating({
    open: testOpen ?? open,
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

  const hover = useHover(context, { move: false, delay: { open: openDelay, close: closeDelay } })
  const focus = useFocus(context)
  const role = useRole(context, { role: 'tooltip' })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, role, dismiss])

  const isOpen = testOpen ?? open

  // refs.setReference는 floating-ui가 제공하는 ref callback
  // 외부에 이미 존재하는 child.ref와 병합하기 위해 mergedRef를 만듭니다.
  const mergedRef = useMergedRefs<Element | null>(refs.setReference)

  // children이 React element이면 직접 주입 (DOM 요소 또는 forwardRef를 지원하는 컴포넌트에 작동)
  if (isValidElement(children)) {
    const child = children as ReactElement<any, any>

    // getReferenceProps에 child.props를 넣어 기존 이벤트 핸들러들과 병합하게 함
    const referenceProps = getReferenceProps({
      ...(child.props ?? {}),
      'aria-describedby': isOpen ? tooltipId : undefined,
    })

    // cloneElement로 props 주입 (ref는 mergedRef로)
    const cloned = cloneElement(child, {
      ...(referenceProps as any),
      ref: mergedRef,
    })

    return (
      <>
        {cloned}

        {isOpen && (
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            id={tooltipId}
            role="tooltip"
            style={{ ...floatingStyles, zIndex: 50 }}
            className="rounded-md bg-gray-800 px-2 py-1 text-sm text-white shadow-md"
          >
            {content}
            {showArrow && (
              <div
                ref={arrowRef}
                className="absolute h-2 w-2 rotate-45 bg-gray-800"
                style={{
                  left: middlewareData.arrow?.x ?? undefined,
                  top: middlewareData.arrow?.y ?? undefined,
                  ...(finalPlacement.startsWith('top') && { bottom: '-0.25rem' }),
                  ...(finalPlacement.startsWith('bottom') && { top: '-0.25rem' }),
                  ...(finalPlacement.startsWith('left') && { right: '-0.25rem' }),
                  ...(finalPlacement.startsWith('right') && { left: '-0.25rem' }),
                }}
              />
            )}
          </div>
        )}
      </>
    )
  }

  // fallback: children가 문자열/프래그먼트 등일 경우 (ref를 주입할 수 없으므로 wrapper 사용)
  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-flex"
        aria-describedby={isOpen ? tooltipId : undefined}
      >
        {children}
      </span>

      {isOpen && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          id={tooltipId}
          role="tooltip"
          style={{ ...floatingStyles, zIndex: 50 }}
          className="rounded-md bg-gray-800 px-2 py-1 text-sm text-white shadow-md"
        >
          {content}
        </div>
      )}
    </>
  )
}
