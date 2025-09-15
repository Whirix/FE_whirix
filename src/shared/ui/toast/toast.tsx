import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { useToastStore, type Toast } from '../../hooks/use-toast'

type ToastPosition = 'bottom-left' | 'bottom-center' | 'bottom-right'

interface ToasterProps {
  position?: ToastPosition
}

// variant별 Tailwind 클래스
const getToastClass = (variant: string) => {
  switch (variant) {
    case 'success':
      return 'bg-green-50 text-green-700 border border-teal-200'
    case 'error':
      return 'bg-red-50 text-red-700 border border-red-200'
    case 'info':
      return 'bg-blue-50 text-blue-700 border border-blue-200'
    default:
      return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
  }
}

function ToastItem({ toast, onExited }: { toast: Toast; onExited: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mount animation
    setIsVisible(true)

    // Unmount animation
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500) // 2.5초 후 사라짐 애니메이션 시작

    // Cleanup
    return () => clearTimeout(timer)
  }, [toast.id])

  const handleTransitionEnd = () => {
    if (!isVisible) {
      onExited()
    }
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      onTransitionEnd={handleTransitionEnd}
      className={cn(
        'pointer-events-auto flex max-w-[600px] min-w-[300px] items-center justify-between rounded-lg px-5 py-3 shadow-md transition-all duration-300 ease-in-out',
        getToastClass(toast.variant),
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
    >
      <span>{toast.message}</span>
      <button
        className="ml-4 cursor-pointer border-none bg-transparent font-bold text-gray-500"
        onClick={() => setIsVisible(false)} // 즉시 사라짐 애니메이션 시작
        aria-label="닫기"
        type="button"
      >
        ×
      </button>
    </div>
  )
}

export function Toaster({ position = 'bottom-right' }: ToasterProps) {
  const { toasts, removeToast } = useToastStore()

  // 위치별 Tailwind 클래스 설정
  let containerClass = 'fixed bottom-8 z-[9999] flex flex-col gap-3 pointer-events-none'

  if (position === 'bottom-left') {
    containerClass += ' left-8 items-start'
  } else if (position === 'bottom-center') {
    containerClass += ' left-1/2 items-center transform -translate-x-1/2'
  } else {
    // bottom-right
    containerClass += ' right-8 items-end'
  }

  return (
    <div className={containerClass} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onExited={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}
