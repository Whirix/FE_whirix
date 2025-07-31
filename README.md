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

<details> <summary><strong>📖 Storybook 사용 가이드</strong></summary>

### ▶️ Storybook 실행

**로컬 개발 환경에서 Storybook을 실행하려면 아래 명령어를 사용하세요.**

```bash
npm run storybook
```

### 🆕 새로운 스토리 추가하기

📁 **파일 위치:** src/stories
📄 **파일 확장자:** `.stories.ts`
🧾 스토리 작성 규칙 (CSF 3.0 기반)

| 항목  | 설명                                               |
| ----- | -------------------------------------------------- |
| meta  | 컴포넌트 메타데이터 정의 (제목, 컴포넌트, 태그 등) |
| Story | 컴포넌트의 특정 상태를 나타내는 객체               |

📌 작성 예시: src/stories/Button.stories.ts

```ts
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button' // 컴포넌트 경로

// Meta: 컴포넌트 정보 정의
const meta = {
  title: 'Example/Button', // Storybook 사이드바에 표시될 경로
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // 자동 문서 생성
  argTypes: {
    backgroundColor: { control: 'color' }, // props 컨트롤 UI 정의
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// 각 상태별 스토리 정의
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
}
```

### 🧪 컴포넌트 테스트

#### 👀 시각적 테스트 (Visual Testing)

- Storybook은 UI 컴포넌트의 시각적인 변화를 빠르게 확인할 수 있는 최고의 도구입니다.

- 브라우저에서 직접 상태별 UI를 확인

- 또는 정적 파일을 빌드하여 공유 및 배포 가능:

```bash
npm run build-storybook
```

#### 🔍 시각적 회귀 테스트 (Visual Regression Testing)

- UI의 미묘한 변화도 자동으로 감지하고, 이전 스냅샷과 비교하여 알려줍니다.

- Chromatic 사용

- PR을 올리면 변경된 컴포넌트를 자동으로 스크린샷 비교

- 팀원들과 리뷰하고 승인 가능 ✅

📦 로컬에서 수동 실행:

```bash
npm run chromatic
```

</details>
