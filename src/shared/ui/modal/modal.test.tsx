import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './modal'

describe('UI/Modal', () => {
  // 모든 테스트 케이스가 실행되기 전에, 모달이 렌더링될 DOM 요소를 추가합니다.
  beforeEach(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  // 테스트가 끝난 후, 추가했던 DOM 요소를 제거하여 다른 테스트에 영향을 주지 않도록 합니다.
  afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
      document.body.removeChild(modalRoot)
    }
    jest.clearAllMocks() // 모든 mock 함수를 초기화합니다.
  })

  it('isOpen이 false일 때는 렌더링되지 않아야 합니다.', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        Modal Content
      </Modal>
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('isOpen이 true일 때 제목과 내용을 포함하여 렌더링되어야 합니다.', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test Modal">
        Modal Content
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('닫기 버튼을 클릭하면 onClose 콜백이 호출되어야 합니다.', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        Modal Content
      </Modal>
    )

    await user.click(screen.getByLabelText('Close modal'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('배경 오버레이를 클릭하면 onClose 콜백이 호출되어야 합니다.', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        Modal Content
      </Modal>
    )

    // 오버레이는 dialog role의 부모 요소입니다.
    await user.click(screen.getByRole('dialog').parentElement!)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('Escape 키를 누르면 onClose 콜백이 호출되어야 합니다.', () => {
    const handleClose = jest.fn()
    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        Modal Content
      </Modal>
    )

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('모달 컨텐츠 내부를 클릭해도 onClose 콜백이 호출되지 않아야 합니다.', async () => {
    const handleClose = jest.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen onClose={handleClose} title="Test Modal">
        Modal Content
      </Modal>
    )

    await user.click(screen.getByText('Modal Content'))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('닫기 액션 후 애니메이션이 끝나면 DOM에서 사라져야 합니다.', async () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} title="Test Modal">
        Modal Content
      </Modal>
    )

    // 모달이 열려있는 것을 확인
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // 모달을 닫습니다 (isOpen prop을 false로 변경)
    rerender(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        Modal Content
      </Modal>
    )

    // JSDOM은 CSS transition을 실행하지 않으므로, onTransitionEnd 이벤트를 수동으로 발생시킵니다.
    fireEvent.transitionEnd(dialog.parentElement!)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
