import './App.css'
import { Input } from './shared/ui/input/input'

function App() {
  return (
    <div className="flex flex-col gap-[1vh] bg-amber-300 p-5">
      <Input label="" placeholder="Default" />
      <Input label="with Label" placeholder="WithLabel" />
      <Input maxLength={10} placeholder="maxLength 10" />
      <Input fullWidth placeholder="Full Width" />
      <Input required placeholder="Required" />
      <Input errorText="입력해주세요" placeholder="Error Text" />
      <Input showCounter placeholder="Counter" maxLength={12} />
    </div>
  )
}

export default App
