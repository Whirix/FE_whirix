import { useEffect, useId, useState, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function Modal({ isOpen, onClose, title, children }: PropsWithChildren<ModalProps>) {
  const titleId = useId()
  const descriptionId = useId()

  // isRendered: 모달이 DOM에 마운트되었는지 여부
  // isVisible: 애니메이션 효과를 제어 (opacity, scale 등)
  const [isRendered, setIsRendered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // isOpen prop이 변경될 때 애니메이션 상태를 제어합니다.
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      // DOM에 마운트된 후 다음 프레임에서 애니메이션을 시작합니다.
      const timer = setTimeout(() => setIsVisible(true), 20)
      return () => clearTimeout(timer)
    } else {
      // 닫기 애니메이션을 시작합니다.
      setIsVisible(false)
    }
  }, [isOpen])

  // 닫기 애니메이션이 끝나면 DOM에서 컴포넌트를 언마운트합니다.
  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsRendered(false)
    }
  }

  // Escape 키를 눌렀을 때 모달을 닫는 이벤트 리스너를 등록합니다.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const modalRoot = document.getElementById('modal-root')

  if (!isRendered || !modalRoot) {
    // 방어적 코딩
    return null
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      onClick={onClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={cn(
          'relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all duration-300',
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="flex items-center justify-between border-b pb-3">
          {title && (
            <h3 id={titleId} className="text-lg font-semibold">
              {title}
            </h3>
          )}
          <button
            type="button"
            className="-m-2 p-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div id={descriptionId} className="mt-4">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  )
}
