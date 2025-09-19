import { GameSettingModal } from '../feature/game/components/game-setting-modal'

export default function GamePage() {
  return (
    <div
      id="game-component-container"
      className="grid h-screen grid-cols-[0.75fr_3fr_1.25fr] grid-rows-[auto_1fr_auto] gap-3 p-6"
    >
      {/* 헤더, 설정 칸 */}
      <div id="header" className="col-span-3 flex items-center justify-end p-4">
        <div id="answer">정답</div>
        <span id="timer" className="mr-2">
          120s
        </span>
        <GameSettingModal isOpen={false} />
      </div>

      {/* 좌측 유저/팔레트 */}
      <div id="left-sidebar" className="row-span-3 flex flex-col gap-4">
        <div id="user-list" className="flex-1 bg-gray-300">
          User
        </div>
        <div id="tldraw-palette" className="flex-1 bg-gray-300">
          Palette
        </div>
      </div>

      {/* 중앙 메인 */}
      <div id="main" className="row-span-2 bg-gray-300">
        Main
      </div>

      {/* 우측 채팅 */}
      <div id="chat" className="row-span-3 bg-gray-300">
        Chat
      </div>

      {/* 하단 진행바 */}
      <div id="progress-bar" className="col-span-1 h-10 bg-gray-300">
        Progress
      </div>
    </div>
  )
}
