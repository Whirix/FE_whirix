<details>
  
<summary> 코드 컨벤션 </summary>

### ✅ 컴포넌트 & 함수 Export 규칙

| 항목                              | 방식              | 예시                              |     |
| --------------------------------- | ----------------- | --------------------------------- | --- |
| **페이지 컴포넌트 (`page.tsx`)**  | `default export`  | `export default HomePage(){}`     |     |
| **일반 UI 컴포넌트**              | `named export`    | `export function Button() {}`     |     |
| **Hook / Util / Model / Service** | `named export`    | `export const useUser = () => {}` |     |
| **index.ts**                      | `named re-export` | `export * from './Button'`        |     |

### ✅ 파일명 컨벤션

- 파일명(케밥케이스): `my-component.tsx` ,`use-user.ts`

### ✅ 함수명 컨벤션

- 클릭 : `handleButtonClick` ex: `handleStartButtonClick`
- submit : `handleFormSubmit`
</details>



<details>
  
<summary> Git Commit 컨벤션 </summary>
 
### 🏷️  사용 가능한 커밋 타입

| 타입        | 설명 |
|-------------|------|
| `feat`      | 새로운 기능 추가 |
| `fix`       | 버그 수정 (작동 오류, 예외 상황 등) |
| `refactor`  | 코드 리팩토링 (동작 변화 없이 구조 개선) |
| `bug`       | QA나 사용자 피드백 기반의 오류 수정 |
| `chore`     | 빌드 설정, 패키지 업데이트, 기타 유지보수 작업 |

> `fix`와 `bug`는 모두 오류 수정용이지만 구분해서 사용합니다:
> - `fix`: 개발 중 발견한 버그, 논리 오류 수정
> - `bug`: QA, 테스트, 운영 중 발견된 사용자 영향 이슈 대응

### 커밋메시지 작성법
```text
(지라카드 키값)  (타입) : (진행한 내용)
```
</details>


<details>
  <summary>공통 컴포넌트 개발 가이드</summary>

# 🛠 공통 컴포넌트 개발 가이드

## 📂 폴더 구조

공통 UI 컴포넌트는 `/src/shared/ui/` 하위에 위치합니다.

```
/src
├── shared
│ └── ui
│   ├── button
│   │ ├── button.tsx // 필수 
│   │ ├── button.test.tsx // 필수
│   │ ├── button.stories.tsx // 필수
│   │ ├── button.types.ts //  선택
│   │ ├── button.module.css (또는 Tailwind + cva) // 선택
│   │ └── index.ts // 필수
│   └── ...
```

---

## 개발 절차

### 2.1 컴포넌트 생성

1. `/src/shared/ui/` 하위에 작업할 컴포넌트 폴더 생성
2. 파일 구성 :
   - **`컴포넌트명.tsx`** : 컴포넌트 본문
   - **`컴포넌트명.stories.tsx`** : Storybook 스토리
   - **`컴포넌트명.test.tsx`** : Jest 테스트 코드
   - **`index.ts`** : export 모음

### 2.2 cva(Class Variance Authority) 사용법

**Tailwind CSS 변형 스타일** 을 관리하기 위해 cva를 사용합니다.

```ts
// Button.tsx
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
};

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
};

```

---

### 2.3 Storybook 작성

1. `.stories.tsx` 파일 생성
2. 컴포넌트의 다양한 상태(variant, size, disabled 등) 정의
3. `Controls`로 props를 실시간 변경 가능하게 설정
4. `docs` 탭에서 자동 문서화 확인

```ts
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}
```

---

### 2.3 테스트 코드 작성 (Jest + React Testing Library)

1. `.test.tsx` 파일 작성
2. 기본 렌더링 테스트
3. 상호작용 이벤트 테스트 (click, input 등)
4. 접근성 속성 검사(`getByRole`, `getByLabelText` 등)

```ts
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
```

---

## 3. 접근성(Accessibility, A11y) 체크

- `aria-label`, `role` 속성을 통해 스크린 리더에서 의미 있게 읽히도록 함
- 버튼, 링크, 폼 요소는 키보드로 접근 가능해야 함
- `getByRole` 기반의 테스트로 접근성 보장

---

## 4. Storybook 실행 & 배포

**실행**

```bash
yarn storybook
```

**빌드**

```bash
yarn build-storybook
```

## 5. 테스트 코드 실행

**실행**

```bash
yarn test
```

**변경사항 감지 모드**

```bash
yarn test --watch
```

## 6. 개발 체크리스트

- [] 컴포넌트는 단일 책임 원칙 준수
- [] props 타입 정의 완료 (.type.ts)
- [] Storybook 에서 모든 상태 확인 가능
- [] Jest테스트 80% 이상 커버리지 유지
- [] 접근성 속성 (aria-\* , role) 적용
- [] TailwindCSS + CVA 로 variant 관리

## 6. PR 작성 시

1. 구현 내용 요약 (필수)
2. Stroybook 링크 (필수)
3. 리뷰 포인트

## 목표

- 재사용성 높은 컴포넌트 개발
- UI/UX 일관성 유지
- 접근성 준수
- 스토리북 기반 시각적 문서화
- 테스트 코드 기반 신뢰성 확보

</details>
