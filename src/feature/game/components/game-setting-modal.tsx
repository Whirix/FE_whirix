import { useState } from 'react'
import { Button, Input, Modal, Toaster } from '../../../shared/ui'
import { useToast } from '../../../shared/hooks'
import { FormItem } from './form-item'

interface GameSettingModalProps {
  isOpen: boolean
}

export function GameSettingModal({ isOpen }: GameSettingModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen)
  const [isSettingComplete, setIsSettingComplete] = useState<boolean>(false)

  const toast = useToast()

  const handleStartButtonClick = () => {
    if (!isSettingComplete) {
      setIsSettingComplete(true) // 임시로 설정 완료 상태로 변경
      return toast.error('게임 설정을 완료해주세요.')
    }
    // 게임 시작 로직 추가
  }

  // const handleInviteButtonCllick = () => toast.success('초대 기능은 곧 제공될 예정입니다.')

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>설정</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="게임 설정">
        <form className="space-y-4">
          <FormItem label="난이도">
            <Input type="text" id="difficulty" />
          </FormItem>
          <FormItem label="제한 시간">
            <Input type="text" id="time-limit" />
          </FormItem>
          <FormItem label="참가자 수">
            <Input type="number" id="participants" />
          </FormItem>
          <FormItem label="라운드 횟수">
            <Input type="number" id="rounds" />
          </FormItem>
        </form>
        <div className="flex justify-around">
          <Button onClick={handleStartButtonClick}>시작하기</Button>
          <Button onClick={() => toast.success('초대코드 복사 완료')}>초대하기</Button>
        </div>
        <Toaster position="bottom-center" />
      </Modal>
    </>
  )
}
