import { render, screen } from '@testing-library/react'
import { Card } from './card'

describe('Card 컴포넌트', () => {
  it('자식 요소(children)를 올바르게 렌더링해야 합니다', () => {
    render(
      <Card>
        <p>이것은 자식 컨텐츠입니다.</p>
      </Card>
    )
    expect(screen.getByText('이것은 자식 컨텐츠입니다.')).toBeInTheDocument()
  })

  it('header와 footer prop이 제공될 때 해당 컨텐츠를 렌더링해야 합니다', () => {
    render(
      <Card header={<h2>카드 헤더</h2>} footer={<p>카드 푸터</p>}>
        <p>메인 컨텐츠</p>
      </Card>
    )
    expect(screen.getByRole('heading', { name: '카드 헤더' })).toBeInTheDocument()
    expect(screen.getByText('카드 푸터')).toBeInTheDocument()
  })

  describe('Variants (스타일 변형)', () => {
    it('기본적으로 "elevated" 스타일(그림자)을 적용해야 합니다', () => {
      const { container } = render(<Card>Elevated</Card>)
      expect(container.firstChild).toHaveClass('shadow-md')
    })

    it('"outlined" variant가 지정되면 테두리 스타일을 적용해야 합니다', () => {
      const { container } = render(<Card variant="outlined">Outlined</Card>)
      expect(container.firstChild).toHaveClass('border-2 border-gray-200')
    })

    it('"filled" variant가 지정되면 채우기 스타일을 적용해야 합니다', () => {
      const { container } = render(<Card variant="filled">Filled</Card>)
      expect(container.firstChild).toHaveClass('bg-gray-50')
    })
  })

  it('사용자 정의 className을 적용해야 합니다', () => {
    const { container } = render(<Card className="my-custom-class">Custom</Card>)
    expect(container.firstChild).toHaveClass('my-custom-class')
  })

  describe('Accessibility (접근성)', () => {
    it('기본적으로 role="article" 속성을 가져야 합니다', () => {
      render(<Card>Default Role</Card>)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('role prop을 오버라이드할 수 있어야 합니다', () => {
      render(<Card role="region">Custom Role</Card>)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('aria-label prop이 제공되면 적용해야 합니다', () => {
      render(<Card aria-label="접근 가능한 카드">Label</Card>)
      expect(screen.getByRole('article')).toHaveAttribute('aria-label', '접근 가능한 카드')
    })

    it('aria-labelledby prop이 제공되면 적용해야 합니다', () => {
      render(<Card aria-labelledby="card-title">Labelled By</Card>)
      expect(screen.getByRole('article')).toHaveAttribute('aria-labelledby', 'card-title')
    })
  })
})
