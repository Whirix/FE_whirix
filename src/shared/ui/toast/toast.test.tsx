import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useToastStore } from '../../hooks/use-toast'
import { Toaster } from './toast'

describe('Toast UI', () => {
  beforeEach(() => {
    useToastStore.getState().toasts = []
  })

  it('variant별 토스트가 올바르게 렌더링된다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('성공', 'success')
      addToast('에러', 'error')
      addToast('정보', 'info')
      addToast('경고', 'warning')
    })
    expect(screen.getByText('성공')).toBeInTheDocument()
    expect(screen.getByText('에러')).toBeInTheDocument()
    expect(screen.getByText('정보')).toBeInTheDocument()
    expect(screen.getByText('경고')).toBeInTheDocument()
  })

  it('position에 따라 올바른 위치 클래스가 적용된다', () => {
    const { addToast } = useToastStore.getState()

    render(<Toaster position="bottom-left" />)
    act(() => {
      addToast('왼쪽 위치', 'info')
    })
    const leftContainer = screen.getByText('왼쪽 위치').parentElement?.parentElement
    expect(leftContainer).toHaveClass('left-8')
    expect(leftContainer).toHaveClass('items-start')
    cleanup()

    render(<Toaster position="bottom-center" />)
    act(() => {
      addToast('가운데 위치', 'info')
    })
    const centerContainer = screen.getByText('가운데 위치').parentElement?.parentElement
    expect(centerContainer).toHaveClass('left-1/2')
    expect(centerContainer).toHaveClass('items-center')
    expect(centerContainer).toHaveClass('transform')
    expect(centerContainer).toHaveClass('-translate-x-1/2')
    cleanup()

    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('오른쪽 위치', 'info')
    })
    const rightContainer = screen.getByText('오른쪽 위치').parentElement?.parentElement
    expect(rightContainer).toHaveClass('right-8')
    expect(rightContainer).toHaveClass('items-end')
    cleanup()
  })

  it('addToast 호출 시 토스트가 나타나고, 닫기 버튼 클릭 시 사라진다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('닫기 테스트', 'info')
    })
    expect(screen.getByText('닫기 테스트')).toBeInTheDocument()
    const closeBtn = screen.getByLabelText('닫기')
    fireEvent.click(closeBtn)
    expect(screen.queryByText('닫기 테스트')).not.toBeInTheDocument()
  })

  it('role, aria-live 등 접근성 속성이 적용된다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('접근성', 'info')
    })
    const toast = screen.getByRole('alert')
    expect(toast).toHaveAttribute('aria-live', 'assertive')
  })

  it('여러 개의 토스트가 동시에 표시된다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('첫번째', 'info')
      addToast('두번째', 'success')
    })
    expect(screen.getByText('첫번째')).toBeInTheDocument()
    expect(screen.getByText('두번째')).toBeInTheDocument()
  })

  it('토스트의 넓이가 min/maxWidth 조건을 만족한다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('넓이 테스트', 'info')
    })
    const toast = screen.getByText('넓이 테스트').parentElement
    expect(toast).toHaveClass('min-w-[300px]')
    expect(toast).toHaveClass('max-w-[600px]')
  })

  it('전달한 메시지가 정확히 표시된다', () => {
    const { addToast } = useToastStore.getState()
    render(<Toaster position="bottom-right" />)
    act(() => {
      addToast('메시지 확인', 'success')
    })
    expect(screen.getByText('메시지 확인')).toBeInTheDocument()
  })
})
