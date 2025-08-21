// tooltip.test.tsx
import { render, screen } from '@testing-library/react'
import { Tooltip } from './tooltip'

describe('Tooltip Component', () => {
  const triggerText = '트리거 버튼'
  const tooltipText = '툴팁 내용'

  const renderTooltip = (props = {}) =>
    render(
      <Tooltip content={tooltipText} {...props}>
        <button>{triggerText}</button>
      </Tooltip>
    )

  it('testOpen이 true면 바로 열림', () => {
    renderTooltip({ testOpen: true })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText(tooltipText)).toBeInTheDocument()
  })

  it('showArrow가 true면 화살표 렌더링', () => {
    renderTooltip({ testOpen: true, showArrow: true })
    expect(screen.getByRole('tooltip').querySelector('.rotate-45')).toBeInTheDocument()
  })

  it('showArrow가 false면 화살표 없음', () => {
    renderTooltip({ testOpen: true, showArrow: false })
    expect(screen.getByRole('tooltip').querySelector('.rotate-45')).toBeNull()
  })

  it('aria-describedby가 trigger에 설정됨', async () => {
    renderTooltip({ testOpen: true })
    const trigger = screen.getByText(triggerText)
    const tooltip = await screen.findByRole('tooltip')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it("툴팁은 role='tooltip'을 가진다", () => {
    renderTooltip({ testOpen: true })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('기본 스타일 클래스가 적용된다', () => {
    renderTooltip({ testOpen: true })
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveClass('rounded-md')
    expect(tooltip).toHaveClass('bg-gray-800')
  })

  it('zIndex 스타일이 적용된다', () => {
    renderTooltip({ testOpen: true })
    expect(screen.getByRole('tooltip')).toHaveStyle({ zIndex: '50' })
  })
})
