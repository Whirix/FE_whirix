'use client'

import { RoomInviteCodeInput } from '../feature/main/components/room-invite-code-input/room-invite-code-input'
import { Button } from '../shared/ui'

export default function MainPage() {
  return (
    <div
      id="home-component-container"
      className="grid h-screen grid-cols-[0.75fr_3fr_1.25fr] grid-rows-[auto_1fr_auto] gap-3 p-6"
    >
      {/* 헤더: 로고 */}
      <div id="header" className="col-span-3 flex items-center justify-center p-4">
        <span className="text-2xl font-bold">로고</span>
      </div>

      {/* 메인 */}
      <div id="main" className="col-span-3 flex items-center justify-center gap-10 rounded-lg p-4">
        {/* 왼쪽: 프로필 이미지 / 닉네임 설정 / 방 만들기 */}
        <div className="flex min-h-[945px] min-w-[500px] flex-[1.2] flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
          <div className="mb-10 h-60 w-60 rounded-full bg-gray-300" />
          <input
            type="text"
            placeholder="UserName"
            className="mb-8 w-72 rounded-md border px-6 py-4 text-center"
            disabled
          />
          <Button className="w-72 rounded-md bg-blue-400 py-4 text-white" disabled>
            방 만들기
          </Button>
        </div>

        {/* 오른쪽: 초대코드 입력 */}
        <div className="flex min-h-[945px] min-w-[500px] flex-[1.2] flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
          <p className="mb-12 text-3xl font-semibold">초대코드를 입력해주세요.</p>
          <div className="scale-125">
            <RoomInviteCodeInput length={6} disabled />
          </div>
          <Button className="mt-12 w-88 rounded-md bg-green-400 py-4 text-white" disabled>
            입장하기
          </Button>
        </div>
      </div>
    </div>
  )
}
