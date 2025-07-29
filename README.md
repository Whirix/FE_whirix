
> ## 코드 컨벤션
>
> ### ✅ 컴포넌트 & 함수 Export 규칙
>
> | 항목                              | 방식              | 예시                              |     |
> | --------------------------------- | ----------------- | --------------------------------- | --- |
> | **페이지 컴포넌트 (`page.tsx`)**  | `default export`  | `export default HomePage(){}`     |     |
> | **일반 UI 컴포넌트**              | `named export`    | `export function Button() {}`     |     |
> | **Hook / Util / Model / Service** | `named export`    | `export const useUser = () => {}` |     |
> | **index.ts**                      | `named re-export` | `export * from './Button'`        |     |
>
> ## ✅ 파일명 컨벤션
>
> - 파일명(케밥케이스): `my-component.tsx` ,`use-user.ts`
>
> ## ✅ 함수명 컨벤션
>
> - 클릭 : `handleButtonClick` ex: `handleStartButtonClick`
> - submit : `handleFormSubmit`
