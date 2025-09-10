import { Button } from '../../ui'

export function GameLayout() {
  return (
    <div className="grid h-screen grid-cols-[0.75fr_3fr_1.25fr] grid-rows-[auto_1fr_auto] gap-3 p-6">
      {/* 헤더, 설정 칸 */}
      <div className="col-span-3 flex items-center justify-end p-4">
        <div>정답</div>
        <span className="mr-2">120s</span>
        <Button className="rounded-full bg-gray-300 px-4 py-2">설정</Button>
      </div>

      {/* 좌측 유저/팔레트 */}
      <div className="row-span-3 flex flex-col gap-4">
        <div className="flex-1 bg-gray-300">User</div>
        <div className="flex-1 bg-gray-300">Palette</div>
      </div>

      {/* 중앙 메인 */}
      <div className="row-span-2 bg-gray-300">Main</div>

      {/* 우측 채팅 */}
      <div className="row-span-3 bg-gray-300">Chat</div>

      {/* 하단 진행바 */}
      <div className="col-span-1 h-10 bg-gray-300">Progress</div>
    </div>
  )
}
